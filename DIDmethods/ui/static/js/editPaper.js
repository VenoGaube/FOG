let originalTitle;
let originalKeywords;
let originalAbstract;

$(document).ready(async function () {
    await initWeb3();
    await displayPaperDataToEdit();
    applyUpdateListeners();
});


function displayPaperDataToEdit() {
    paperMethodContract.methods.getPaperDataForAuthor(updatingDid).call({from: connectedAccount}).then(
        function (paperData) {
            originalTitle = paperData["title"];
            originalKeywords = paperData["keywords"];
            originalAbstract = paperData["paperAbstract"];
            $(".edit-wrapper>label>input[name=title]").val(originalTitle);
            $(".edit-wrapper>label>input[name=keywords]").val(originalKeywords);
            $(".edit-wrapper>label>textarea[name=abstract]").val(originalAbstract);
            $(".edit-wrapper").show();
        },
        function (error) {
            alertByErrorMessage("edit", error.message, updatingDid);
            window.location = "/journal/my-papers";
        }
    );
}


function applyUpdateListeners() {
    updatePaperFileListener();
    updatePaperTitleListener();
    updatePaperKeywordsListener();
    updatePaperAbstractListener();
}

function updatePaperFileListener() {
    $("input[type=button].paper-confirm-new-pdf").click(function () {
        let pdfUpload = $(".edit.paper-upload-pdf");

        if (pdfUpload[0].files.length === 0) {
            alert("Please upload new paper PDF in order to update it.");
            return;
        }
        let file = pdfUpload[0].files[0];
        if (file["type"] !== "application/pdf") {
            alert("Only PDF files are accepted.");
            return;
        }

        let formData = new FormData();
        formData.append("file", file);

        paperMethodContract.methods.paperReUploaded(updatingDid, timestampSeconds()).send({from: connectedAccount}).then(
            function () {
                $.ajax({
                    url: "http://localhost:5002/" + updatingDid + "/update-file",
                    type: "POST",

                    data: formData,

                    cache: false,
                    contentType: false,
                    processData: false,

                    success: function () {
                        alert("Paper PDF successfully re-uploaded");
                    },
                    error: function (response) {
                        alertByErrorMessage("edit", response.message);
                    }
                });
            },
            function (error) {
                alertByErrorMessage("edit", error.message);
            }
        );
    });
}

function updatePaperTitleListener() {
    $("input[type=button].paper-confirm-new-title").click(function () {
        let title = $(".edit-wrapper>label>input[name=title]").val();
        if (title === originalTitle) {
            alert("Please edit title in order to update it.");
            return;
        }
        paperMethodContract.methods.editPaperTitle(updatingDid, title, timestampSeconds()).send({from: connectedAccount}).then(
            function () {
                alert("Successfully updated title for paper with DID " + updatingDid);
            },
            function (error) {
                alertByErrorMessage("edit", error.message);
            }
        );
    });
}

function updatePaperKeywordsListener() {
    $("input[type=button].paper-confirm-new-keywords").click(function () {
        let keywords = $(".edit-wrapper>label>input[name=keywords]").val();
        if (keywords === originalKeywords) {
            alert("Please edit keywords in order to update them.");
            return;
        }
        paperMethodContract.methods.editPaperKeywords(updatingDid, keywords, timestampSeconds()).send({from: connectedAccount}).then(
            function () {
                alert("Successfully updated keywords for paper with DID " + updatingDid);
            },
            function (error) {
                alertByErrorMessage("edit", error.message);
            }
        );
    });
}

function updatePaperAbstractListener() {
    $("input[type=button].paper-confirm-new-abstract").click(function () {
        let abstract = $(".edit-wrapper>label>textarea[name=abstract]").val();
        if (abstract === originalAbstract) {
            alert("Please edit abstract in order to update it");
            return;
        }
        paperMethodContract.methods.editPaperAbstract(updatingDid, abstract, timestampSeconds()).send({from: connectedAccount}).then(
            function () {
                alert("Successfully updated abstract for paper with DID " + updatingDid);
            },
            function (error) {
                alertByErrorMessage("edit", error.message);
            }
        );
    });
}