let connectedAccount;
const registryApiUrl = "http://127.0.0.1:5002/"
const web3 = new Web3(Web3.givenProvider);
let paperMethodContract;

async function initWeb3() {
    await checkEthConnection();
    await $.ajax({
        url: registryApiUrl + "api/fetch-paper-method-contract-data",
    }).then((contractData) => {
        let contract_abi = contractData["abi"];
        let contract_address = contractData["address"];
        paperMethodContract = new web3.eth.Contract(contract_abi, contract_address);
    });
}


$(document).ready(async function () {
    await initWeb3();
    $(".user-info > .user-account").html(connectedAccount);

    let splitPathname = window.location.pathname.split("/");
    await loadPapers(splitPathname[splitPathname.length - 1]);


    // navigation when submit button is clicked
    $(".new-paper-submit").click(function () {
        window.location = "/journal/submit-paper"
    });

    $(".submit-paper-button").click(submitPaper);
});


async function checkEthConnection() {
    if (typeof ethereum === "undefined") {
        window.location = "/connect";
        return;
    }

    ethereum.on("accountsChanged", async () => {
        // if no accounts, user will be asked to connect, if account was swapped it will redirect to journal
        window.location = "/connect";
    });

    const accounts = await ethereum.request({method: 'eth_accounts'});
    if (accounts.length !== 0) {
        connectedAccount = web3.utils.toChecksumAddress(accounts[0]);
        return;
    }
    window.location = "/connect";
}


async function submitPaper() {
    let file = undefined;
    let invalidData = false;
    let pdfUpload = $(".paper-upload-pdf");

    if (pdfUpload[0].files.length === 0) {
        $(pdfUpload).addClass("invalid");
        pdfUpload.siblings(".invalid-submit-input").hide();
        invalidData = true;
    } else {
        file = pdfUpload[0].files[0];
        if (file["type"] !== "application/pdf") {
            $(pdfUpload).addClass("invalid");
            pdfUpload.siblings(".invalid-submit-input").show();
            invalidData = true;
        } else {
            $(pdfUpload).removeClass("invalid");
            pdfUpload.siblings(".invalid-submit-input").hide();
        }
    }

    let paperTitleInput = $("input[name=title]");
    let paperTitle = paperTitleInput.val();
    if (paperTitle.length === 0) {
        paperTitleInput.addClass("invalid");
        paperTitleInput.siblings(".invalid-submit-input").show();
        invalidData = true;
    } else {
        paperTitleInput.removeClass("invalid");
        paperTitleInput.siblings(".invalid-submit-input").hide();
    }

    let paperKeywordsInput = $("input[name=keywords]");
    paperKeywordsInput.siblings(".invalid-submit-input").html("Empty paper keywords");
    let keywords = paperKeywordsInput.val().split("|");
    if (keywords.length === 1 && keywords[0].length === 0) {
        paperKeywordsInput.addClass("invalid");
        paperKeywordsInput.siblings(".invalid-submit-input").show();
        invalidData = true;
    } else if (keywords.includes("")) {
        paperKeywordsInput.addClass("invalid");
        paperKeywordsInput.siblings(".invalid-submit-input").html("Empty string cannot be a keyword");
        paperKeywordsInput.siblings(".invalid-submit-input").show();
    } else {
        paperKeywordsInput.removeClass("invalid");
        paperKeywordsInput.siblings(".invalid-submit-input").hide();
    }
    keywords = keywords.join("|");


    let paperAbstractInput = $("textarea[name=abstract]");
    let abstract = paperAbstractInput.val();
    if (abstract.length === 0) {
        paperAbstractInput.addClass("invalid");
        paperAbstractInput.siblings(".invalid-submit-input").show();
        invalidData = true;
    } else {
        paperAbstractInput.removeClass("invalid");
        paperAbstractInput.siblings(".invalid-submit-input").hide();
    }


    if (invalidData) {
        // Show error message and exit function to avoid ajax POST call
        $(".form-error-message").show();
        return;
    } else {
        // Hide error message as data is input correctly
        $(".form-error-message").hide();
    }

    let formData = new FormData();
    formData.append("file", file);
    formData.append("author", connectedAccount);
    formData.append("title", paperTitle);
    formData.append("keywords", keywords);
    formData.append("abstract", abstract);

    // timestamp in seconds
    let timestampCreated = timestampSeconds();

    let did = await $.ajax({url: registryApiUrl + "api/generate-paper-did"});

    paperMethodContract.methods.addPaper(did, paperTitle, keywords, abstract, timestampCreated).send({from: connectedAccount}).then(
        function () {
            // Upload data to server
            $.ajax({
                url: "http://localhost:5002/" + did + "/create",
                type: "POST",

                data: formData,

                cache: false,
                contentType: false,
                processData: false,

                success: function () {
                    window.location = "/journal/my-papers";
                },
                error: function (response) {
                    alert("Error occurred while trying to submit paper:\n" + response);
                }
            });
        },
        function (error) {
            alert("Error occurred while trying to submit paper:\n" + error);
        }
    );
}


async function loadPapers(papersType) {
    if (papersType !== "my-papers") {
        return;
    }

    // get papers from paper method contract for currently connected user
    let papersFromContract = await paperMethodContract.methods.getPapersForAuthor(connectedAccount).call();
    if (papersFromContract.length === 0) {
        let divNoPapers = document.createElement("div");
        $(divNoPapers).addClass("paper-row-title message-no-papers");
        $(divNoPapers).html("You don't have submitted papers at this time.")
        $(".main-content").append(divNoPapers);
        return;
    }
    for (let paperData of papersFromContract) {
        let paperDid = paperData["did"]
        let paperTitle = paperData["title"];
        let paperKeywords = paperData["keywords"].split("|");

        let divPaperRow = document.createElement("div");
        let divPaperRowInfo = document.createElement("div");
        let divPaperRowTitle = document.createElement("div");
        let divPaperRowKeywordsContainer = document.createElement("div");
        let divPaperRowKeywordsTitle = document.createElement("div");
        let divPaperRowKeywords = document.createElement("div");

        $(divPaperRow).addClass("paper-row row pointer");
        $(divPaperRow).attr("data-did", paperDid)
        $(divPaperRowInfo).addClass("paper-row-info");
        $(divPaperRowTitle).addClass("paper-row-title row");
        $(divPaperRowKeywordsContainer).addClass("paper-row-keywords-container row");
        //$(divPaperRowKeywordsTitle).addClass("paper-row-keywords-title");
        //$(divPaperRowKeywords).addClass("paper-row-keywords");

        $(divPaperRow).click(function () {
            window.location = "/journal/" + paperDid + "/view"
        });

        let divPaperOptions = document.createElement("div");

        let divPaperRowButtonRead = document.createElement("div");
        let imgPaperRowButtonRead = document.createElement("img");
        let divPaperRowButtonEdit = document.createElement("div");
        let imgPaperRowButtonEdit = document.createElement("img");
        let divPaperRowButtonDelete = document.createElement("div");
        let imgPaperRowButtonDelete = document.createElement("img");

        $(divPaperOptions).addClass("paper-options row");
        $(divPaperRowButtonRead).addClass("paper-row-button button-read");
        $(divPaperRowButtonEdit).addClass("paper-row-button button-edit");
        $(divPaperRowButtonDelete).addClass("paper-row-button button-delete");

        $(divPaperRowButtonRead).attr("title", "Read paper");
        $(divPaperRowButtonRead).attr("data-did", paperDid);
        $(imgPaperRowButtonRead).attr("src", "/static/icons/read.svg");
        $(imgPaperRowButtonRead).attr("alt", "Read");
        $(divPaperRowButtonEdit).attr("title", "Edit paper information");
        $(divPaperRowButtonEdit).attr("data-did", paperDid);
        $(imgPaperRowButtonEdit).attr("src", "/static/icons/edit.svg");
        $(imgPaperRowButtonEdit).attr("alt", "Edit");
        $(divPaperRowButtonDelete).attr("title", "Delete submitted paper");
        $(divPaperRowButtonDelete).attr("data-did", paperDid);
        $(imgPaperRowButtonDelete).attr("src", "/static/icons/delete.svg");
        $(imgPaperRowButtonDelete).attr("alt", "Delete");

        // Listeners for operation buttons
        $(divPaperRowButtonRead).click(function (e) {
            e.stopPropagation();
            window.location = "/journal/" + paperDid + "/read";
        })
        applyEditPaperButtonListener($(divPaperRowButtonEdit));
        $(divPaperRowButtonDelete).click(async function (e) {
            e.stopPropagation();
            let paperDid = $(this).attr("data-did");
            let paperTitle = $(this).parent().parent().find(".paper-row-title").html();
            await removePaper(paperDid, paperTitle);
        });

        divPaperRowButtonRead.append(imgPaperRowButtonRead);
        divPaperRowButtonEdit.append(imgPaperRowButtonEdit);
        divPaperRowButtonDelete.append(imgPaperRowButtonDelete);
        divPaperOptions.append(divPaperRowButtonRead);
        divPaperOptions.append(divPaperRowButtonEdit);
        divPaperOptions.append(divPaperRowButtonDelete);

        $(divPaperRowTitle).html(paperTitle);
        $(divPaperRowKeywordsTitle).html("Keywords:")
        $(divPaperRowKeywords).html(paperKeywords.join(", "));

        divPaperRowInfo.append(divPaperRowTitle);
        divPaperRowKeywordsContainer.append(divPaperRowKeywordsTitle);
        divPaperRowKeywordsContainer.append(divPaperRowKeywords);
        divPaperRowInfo.append(divPaperRowKeywordsContainer);
        divPaperRow.append(divPaperRowInfo);
        divPaperRow.append(divPaperOptions);

        $(".main-content").append(divPaperRow);
    }
}

function applyEditPaperButtonListener(editButton) {
    editButton.click(function (e) {
        e.stopPropagation();
        let paperDid = $(this).attr("data-did");
        window.location = "/" + paperDid + "/edit";
    });
}


function timestampSeconds() {
    return Math.floor(Date.now() / 1000);
}
