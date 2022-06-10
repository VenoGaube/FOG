let resultJson;

$(document).ready(function () {
    resultsRadioListener();
    buttonListeners();
});


/**
 * Function for switching displayed result when selected result tab is changed.
 * Also Updates selected result tab style.
 */
function resultsRadioListener() {
    let radio = $("input[type=radio][name=result-tabs]");
    radio.change(function () {
        // remove active class from all radio labels and add it back only to currently selected
        radio.parent().removeClass("active");
        $(this).parent().addClass("active");

        // update displayed result if result JSON is defined
        if (resultJson !== undefined) {
            displayResult();
        }
    });
}


/**
 * Function for applying click listeners for Resolve and Clear buttons.
 */
function buttonListeners() {
    $(".button-resolve").click(function () {
        let did = $(".input-did").val();
        if (did === undefined || did.length === 0) {
            return;
        }
        getResult(did);
    });

    $(".button-clear").click(clearInput);
}


/**
 * Function for fetching, saving and displaying DID data from API when Resolve button is clicked.
 * @param did DID string which was input into DID input element.
 */
function getResult(did) {
    $.ajax({
        url: "/api/resolve-whole/" + did,
        complete: function (jqXHR) {
            updateResult(jqXHR);
        }
    });
}

/**
 * Updates saved resolved result and its display. Also handles invalid input message displaying and hiding.
 * @param jqXHR jQuery's XMLHTTPRequest object from the GET response. If undefined, saved resolved result data is reset.
 */
function updateResult(jqXHR) {
    // if jqXHR object is undefined, reset result JSON, otherwise retrieve JSON from response
    if (jqXHR === undefined) resultJson = undefined;
    else resultJson = jqXHR.responseJSON;

    if (resultJson && resultJson.resolutionMetadata && resultJson.resolutionMetadata.error) {
        let error = resultJson.resolutionMetadata.error;
        // show invalid input message according to type of error
        if (error === "invalidDid") {
            showInvalidInput("Invalid DID input. Check DID syntax.");
        } else if (error !== "notFound") {
            showInvalidInput("Invalid DID input. Unsupported DID method.");
        } else {
            // error == notFound -> DID not found but error is still valid
            hideInvalidInput();
        }
    } else {
        // if resolution metadata doesn't contain error message, make invalid input alert not displayed
        hideInvalidInput();
    }

    // after result is updated, update displayed result data
    displayResult();
}


/**
 * Resets input DID, hides displayed invalid input message, removes and clears fetched resolved result
 */
function clearInput() {
    hideInvalidInput();
    updateResult(undefined);
    displayResult();
    $(".input-did").val("");
}


/**
 * Shows message and DID input style for invalid input indication.
 * @param message Message string indicating how input is invalid.
 */
function showInvalidInput(message) {
    $(".input-did").addClass("invalid");
    $(".msg-invalid-input").html(message);
}


/**
 * Clears message and DID input style for invalid input indication.
 */
function hideInvalidInput() {
    $(".input-did").removeClass("invalid");
    $(".msg-invalid-input").html("");
}


/**
 * Displays resolved result from saved result JSON according to which result tab is selected.
 * If JSON is empty, empties field for displaying resolved result.
 */
function displayResult() {
    let resultDisplayEl = $(".result-display");
    if (resultJson === undefined) {
        // result JSON is undefined -> there is no result to display
        resultDisplayEl.html("");
        return;
    }

    let selectedResult = $("input[type=radio][name=result-tabs]:checked").val();
    let dataToDisplay;

    // display result data according to selected result tab
    if (selectedResult === "result") {
        dataToDisplay = resultJson;
    } else {
        dataToDisplay = resultJson[selectedResult];
    }

    resultDisplayEl.html(JSON.stringify(dataToDisplay, null, 4));
}
