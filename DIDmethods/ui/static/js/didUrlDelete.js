$(document).ready(async function () {
    if (typeof operation === "undefined") {
        return;
    }

    await initWeb3();
    let  paperData = await getPaperDataFromContract();
    if (paperData === undefined || paperData["status"] === "deactivated") {
        return;
    }
    if (operation === "delete") {
        await urlRemovePaper(paperData);
    }
});


async function getPaperDataFromContract() {
    try {
        let paperData = await paperMethodContract.methods.getPaperDataForAuthor(urlSpecifiedDid).call({from: connectedAccount});
        if (paperData["status"] === "deactivated") {
            alertByErrorMessage("delete", "You cannot edit deactivated paper's data!");
        } else {
            return paperData;
        }
    } catch (error) {
        alertByErrorMessage(operation, error.message);
        window.location = "/journal/my-papers";
    }
}


async function urlRemovePaper(paperData) {
    try {
        await removePaper(urlSpecifiedDid, paperData["title"]);
    } catch (error) {
        alertByErrorMessage(operation, error.message);
        window.location = "/journal/my-papers";
    }
}


async function removePaper(paperDid, paperTitle) {
    let paperDelete = confirm('Are you sure you want to remove paper with title\n"' + paperTitle + '"?\n('
        + paperDid + ")\nThis action is irreversible.");
    if (paperDelete) {
        paperMethodContract.methods.removePaper(paperDid, timestampSeconds()).send({from: connectedAccount}).then(
            function () {
                $.ajax({
                    url: "http://localhost:5002/" + paperDid + "/delete",
                    type: "POST",
                    success: function () {
                        window.location = "/journal/my-papers";
                    },
                    error: function (response) {
                        alertByErrorMessage("delete", response)
                        window.location = "/journal/my-papers";
                    }
                });
            },
            function (error) {
                alertByErrorMessage("delete", error.message);
                window.location = "/journal/my-papers";
            }
        );
    } else if (!["/journal/my-papers", "/journal/" + paperDid + "/view"].includes(window.location.pathname)) {
        window.location = "/journal/my-papers";
    }
}


async function editPaperTitle(paperDid, newTitle) {
    try {
        await paperMethodContract.methods.editPaperTitle(paperDid, newTitle, timestampSeconds()).send({from: connectedAccount});
    } catch (error) {
        alertByErrorMessage("edit", error.message);
    }
}


function alertByErrorMessage(operationType, message, messageDid=urlSpecifiedDid) {
    let alertMessageBase = "Cannot " + operationType + " paper with DID " + messageDid + ":\n";
    let alertMessage = "Error occurred while trying to " + operationType + " paper with DID " + messageDid + ":\n" + message;

    if (message.includes("Specified paper does not exist")) {
        alertMessage = alertMessageBase + "Specified paper DID does not exist";
    } else if (message.includes("You do not have permission to access this paper info.")
        || message.includes("You do not have permissions to edit this paper")) {
        alertMessage = alertMessageBase + "You are not paper DID's controller.";
    } else if (message.includes("Specified paper already exists!")) {
        alertMessage = alertMessageBase + "Specified DID already exists.";
    } else if (message.includes("Invalid timestamp")) {
        alertMessage = alertMessageBase + "Invalid timestamp specified";
    } else if (message.includes("You cannot edit deactivated paper's data!")) {
        if (operationType === "delete") {
            alertMessage = "Cannot delete paper with DID " + messageDid + ":\npaper DID is already deactivated";
        } else {
            alertMessage = alertMessageBase + "paper DID is deactivated";
        }
    }

    alert(alertMessage);
}