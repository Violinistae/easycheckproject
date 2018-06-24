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
        setCookie(actionsCookieName, "configAcad", 13);
        $("#modforactions").fadeIn("400");

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
                AJAXrequestFailed("Fallo en petición AJAX para obtener academia para config de academia.");
            });
            
        }

            setAcademiaForConfig = (resAcademia) => {
                let idAcademia = resAcademia.academia.Id_Academia;
                let Academia = resAcademia.academia.Academia;

                let acadConfigTitle = document.getElementById("acadConfigTitle");


                acadConfigTitle.textContent += Academia;
            }


/* --------------------------------------------------------------------------------------------- */

    noMoreShareInstr = () => {
        let arrData = {
            Id_Instrumento: IdAux
        };

        $.ajax({
            url: '../../index_ajax.php?controller=instrumentoscompartidos&action=noShareInstr',
            type: 'POST',
            dataType: 'json',
            data: arrData
        }).done(function (resNoShareInstr) {
            if (!resNoShareInstr.error) {
                if (resNoShareInstr.built) {
                    var mainmessage = "El instrumento seleccionado se dejó de compartir.";
                } else {
                    var mainmessage = "El instrumento seleccionado no está compartido con su academia, favor de cerrar sesión.";
                }          
            } else {
                var mainmessage = "No se pudo realizar la acción solicitada, inténtelo más tarde."
            }
            var secmessage = "Presione el botón para continuar.";
            showMessage("wArNinGbTn_AcTiOn", 0, mainmessage, secmessage);
            gotoAcademiaOverview();

        }).fail(function () {
            AJAXrequestFailed("Fallo en petición AJAX para dejar de compartir instrumento en academia.");
        });

    }

/* --------------------------------------------------------------------------------------------- */

    $("#acadInfoBtn").click(function (e) { showAcadInfo(); });
    $("#acadConfigBtn").click(function (e) { configAcad(); });
    $("#acadAdminIntegBtn").click(function (e) { });    
    
});
