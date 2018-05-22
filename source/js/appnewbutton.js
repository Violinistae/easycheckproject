$(document).ready(function ($) {
    $("#createNewInstrumentoBtn").click(function () { selectInstrumentCreate(); });

    $("#buttonNew").click(function () {
        $(".buttonnewinst").toggleClass('active').siblings().removeClass('active');
        $(".subdropumen").removeClass('active');
    });
});