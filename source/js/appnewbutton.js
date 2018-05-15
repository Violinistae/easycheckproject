$(document).ready(function ($) {

    selectInstrumentCreate = () => {
        $(".buttonnewinst").removeClass('active');
        $(".subdropumen").removeClass('active');

        actionsCookieName = "aiCoTndDtoO";
        setCookie(actionsCookieName, "selectInstrument", 8);
        $("#modforactions").fadeIn("400");

        $.ajax({
            url: "../../sourcephp/views/shared/CoordAndProf/selectInstrumento.php",
            type: "POST"
        }).done(function (resSelectInstrumentCreate) {
            insertCreateMateriaForm(resSelectInstrumentCreate);
        }).fail(function () {
            AJAXrequestFailed("Fallo en petición AJAX para insertar formulario selección de instrumento de evaluación.");
        });
    }

        insertCreateMateriaForm = (resSelectInstrumentCreate) => {
            document.getElementById("modalforactionscontainer").innerHTML = resSelectInstrumentCreate;
            getAndExecuteNewInsertedScript(document.getElementById("modalforactionscontainer"));
        }

    $("#createNewInstrumentoBtn").click(function () { selectInstrumentCreate(); });

    $("#buttonNew").click(function () {
        $(".buttonnewinst").toggleClass('active').siblings().removeClass('active');
        $(".subdropumen").removeClass('active');
    });
});