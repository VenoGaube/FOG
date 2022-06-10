$(document).ready(function () {
    resultsRadioListener();
});


function resultsRadioListener() {
    let radio = $("input[type=radio][name=result-option]");
    radio.change(function () {
        // remove active class from all radio labels and add it back only to currently selected
        radio.parent().removeClass("active");
        $(this).parent().addClass("active");
    });
}