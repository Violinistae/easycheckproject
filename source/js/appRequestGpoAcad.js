$(document).ready(function ($) {
    checkFromAcadRequestFields = (e) => {
        e.preventDefault();
        let requestAcadData = [];
        let flag = false;

        let inputsRequestAcad = $("#requestAcadForm input:not(input[type=submit])");
        $(inputsRequestAcad).each(function () {
            if (flag)
                return;

            if ($(this).val().length < 1) {
                flag = true;
                var mainmessage = "Favor de llenar todos los campos para realizar la solicitud.";
                var secmessage = "Presione boton para continuar.";
                showMessage("wArNinGbTn_AcTiOn", 0, mainmessage, secmessage);
            } else {
                requestAcadData.push($(this).val());
            }
        });

        if (!flag) {
            let checkAcadKey = parseInt(requestAcadData[0]);            
            if (checkAcadKey != NaN) {
                requestAcadData[0] = parseInt(requestAcadData[0]);
                
                dataArray = {
                    Id_Academia: requestAcadData[0],
                    Academia: requestAcadData[1],
                    Clave_Acceso: requestAcadData[2]        
                };

                $.ajax({
                    url: '../../index_ajax.php?controller=academia&action=verifyRequestToAcad',
                    type: 'POST',
                    dataType: 'json',
                    data: dataArray
                }).done(function (resRequestedAcad) {
                    checkDataRequestAcad(resRequestedAcad);
                }).fail(function () {
                    AJAXrequestFailed("Fallo en petición AJAX obtener academia por ID");
                });                
            } else {
                var mainmessage = "La clave de academia debe ser estrictamente un número.";
                var secmessage = "Presione boton para continuar.";
                showMessage("wArNinGbTn_AcTiOn", 0, mainmessage, secmessage);
            }
        }
    }

        checkDataRequestAcad = (resRequestedAcad) => {               
            if (!resRequestedAcad.error) {
                if (resRequestedAcad.built) {                    
                    if (resRequestedAcad.nameV) {
                        if (resRequestedAcad.keyAccess) {
                            console.log(resRequestedAcad.userData);
                        } else {
                            var mainmessage = "La clave de acceso a academia no es correcta. Contacte a su coordinador de academia.";
                            var secmessage = "Presione boton para continuar.";
                            showMessage("wArNinGbTn_AcTiOn", 0, mainmessage, secmessage);
                        }
                    } else {
                        var mainmessage = "La academia que a la que intentar realizar una solictud no existe. Verifice su clave de academia.";
                        var secmessage = "Presione boton para continuar.";
                        showMessage("wArNinGbTn_AcTiOn", 0, mainmessage, secmessage);
                    }                 
                } else {
                    var mainmessage = "La academia que a la que intentar realizar una solictud no existe. Verifice su clave de academia.";
                    var secmessage = "Presione boton para continuar.";
                    showMessage("wArNinGbTn_AcTiOn", 0, mainmessage, secmessage);
                }
            }
        }

    $('body').on('submit', '#requestAcadForm', function (e) { checkFromAcadRequestFields(e); })
});