$(document).ready(function ($) {

    showAcadInfo = () => {
        $(".buttonnewinst").removeClass('active');
        $(".subdropumen").removeClass('active');

        actionsCookieName = "aiCoTndDtoO";
        setCookie(actionsCookieName, "selectInstrument", 9);
        $("#modforactions").fadeIn("400");
        $("#modalforactionscontainer").fadeIn("400");

        return;
        $.ajax({
            url: '../../sourcephp/views/Users/profesor/listAcademias.php',
            type: 'POST'
        }).done(function (resAcadInfo) {
            
        }).fail(function () {
            AJAXrequestFailed("Fallo en petición AJAX para reaccionar a boton de academia en groups bar.");
        });
    }

    configAcad = () => {
        $(".buttonnewinst").removeClass('active');
        $(".subdropumen").removeClass('active');

        actionsCookieName = "aiCoTndDtoO";
        setCookie(actionsCookieName, "selectInstrument", 10);
        $("#modforactions").fadeIn("400");
        $("#modalforactionscontainer").fadeIn("400");

        $.ajax({
            url: '../../sourcephp/views/Users/coordinador/acadConfig.php',
            type: 'POST'
        }).done(function (resAcadConfigForm) {
            insertAcadConfigForm(resAcadConfigForm);
        }).fail(function () {
            AJAXrequestFailed("Fallo en petición AJAX para reaccionar a boton de academia en groups bar.");
        });
    }

        insertAcadConfigForm = (resAcadConfigForm) => {
            document.getElementById("modalforactionscontainer").innerHTML = resAcadConfigForm;
            getAndExecuteNewInsertedScript(document.getElementById("modalforactionscontainer"));

            dataAcademiaFromJS = {
                fromJS: 1
            };
            $.ajax({
                url: '../../index_ajax.php?controller=academia&action=getAcademiaByCoordinador',
                type: 'POST',
                dataType: 'json',
                data: dataAcademiaFromJS
            }).done(function (resAcademia) {
                setAcademiaForConfig(resAcademia);
            }).fail(function () {
                AJAXrequestFailed("Fallo en petición AJAX para reaccionar a boton de academia en groups bar.");
            });
            
        }

            setAcademiaForConfig = (resAcademia) => {
                let idAcademia = resAcademia.academia.Id_Academia;
                let Academia = resAcademia.academia.Academia;

                let acadConfigTitle = document.getElementById("acadConfigTitle");


                acadConfigTitle.textContent += Academia;
            }


/* --------------------------------------------------------------------------------------------- */        

    $("#acadInfoBtn").click(function (e) { showAcadInfo(); });
    $("#acadConfigBtn").click(function (e) { configAcad(); });
    $("#acadAdminIntegBtn").click(function (e) { });    
    
});
