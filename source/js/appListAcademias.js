$(document).ready(function ($) {

    insertModalRequestAcademia = () => {
        $(".buttonnewinst").removeClass('active');
        $(".subdropumen").removeClass('active');

        actionsCookieName = "aiCoTndDtoO";
        setCookie(actionsCookieName, "insertModalRequestAcademia", 10);
        $("#modforactions").fadeIn("400");
        $("#modalforactionscontainer").fadeIn("400");

        $.ajax({
            url: '../../sourcephp/views/Users/profesor/requestGpoAcad.php',
            type: 'POST'
        }).done(function (resRequestAcadFrom) {
            insertRequestAcademiaForm(resRequestAcadFrom);
        }).fail(function (resRequestAcadFrom) {
            AJAXrequestFailed("Fallo en petición AJAX para reaccionar a boton de academia en groups bar.");
        });
    }

        insertRequestAcademiaForm = (resRequestAcadFrom) => {
            document.getElementById("modalforactionscontainer").innerHTML = resRequestAcadFrom;
            getAndExecuteNewInsertedScript(document.getElementById("modalforactionscontainer"));
        }

    $('body').on('click', '#requestBtn', function (e) { insertModalRequestAcademia(); });
    
});