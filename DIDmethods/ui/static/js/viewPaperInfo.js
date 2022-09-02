$(document).ready(async function () {
    await initWeb3();
    await displayPaperData();
});

function displayPaperData() {
    paperMethodContract.methods.getPaperDataForAuthor(viewingDid).call({from: connectedAccount}).then(
        function (paperData) {
            let title = paperData["title"];
            let keywords = paperData["keywords"];
            let abstract = paperData["paperAbstract"];

            $(".view-paper-title").html(title);
            $(".view-paper-did").html(viewingDid);
            $(".view-paper-keywords").html(keywords.split("|").join(", "));
            $(".view-paper-abstract").html(abstract);
            
            $(".view-paper-option-button.button-read").click(function () {
                window.location = "/journal/" + viewingDid + "/read";
            });

            $(".view-paper-option-button.button-edit").click(function () {
                window.location = "/" + viewingDid + "/edit";
            });

            $(".view-paper-option-button.button-delete").click(async function () {
                await removePaper(viewingDid, title);
            });
        },
        function (error) {
            alertByErrorMessage("view", error.message, viewingDid);
        }
    )
}