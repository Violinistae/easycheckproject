$(document).ready(function ($) {    

        goToEditBuiltIntr = (eTrigger) => {
            //console.log(eTrigger);
            let o = {
                Id_Instrumento: parseInt(eTrigger.getAttribute("dataidins"))
            };

            let str = JSON.stringify(o);

            $(".subdropumen").removeClass('active');
            $(".buttonnewinst").removeClass('active');
            $("#modforactions").fadeOut("300");

            //Verificar id usuario para saber si puede modificar
            //*******

            let buildInstrURL = "../../sourcephp/views/buildInstrumento.php";
            sessionStorage.setItem("createdInst", str);
            window.open(buildInstrURL, "_blank");
        }

        deleteInstrumentConfirmed = () => {
            dataArray = {
                Id_Instrumento: IdAux
            };

            $.ajax({
                url: '../../index_ajax.php?controller=instrumento&action=deleteInstrumento',
                type: "POST",
                dataType: 'json',
                data: dataArray
            }).done(function (resRequestDeleteInstr) {
                var mainmessage = resRequestDeleteInstr.message;
                var secmessage = "Presione el botón para continuar.";
                showMessage("wArNinGbTn_AcTiOn", 15, mainmessage, secmessage);
            }).fail(function () {
                AJAXrequestFailed("Fallo en petición AJAX para volver a página principal");
            });
        }

        shareInstrInAcad = () => {
            dataArray = {
                Id_Instrumento: IdAux,
                Id_Academia: IdAcad,
                Id_Materia: IdMat
            }

            $.ajax({
                url: '../../index_ajax.php?controller=instrumentoscompartidos&action=insertSharedInstr',
                type: "POST",
                dataType: 'json',
                data: dataArray
            }).done(function (resShareInstrToAcad) {
                var mainmessage = resShareInstrToAcad.message;
                var secmessage = "Presione el botón para continuar.";
                showMessage("wArNinGbTn_AcTiOn", 15, mainmessage, secmessage);
            }).fail(function () {
                AJAXrequestFailed("Fallo en petición AJAX para volver a página principal");
            });
        }
});