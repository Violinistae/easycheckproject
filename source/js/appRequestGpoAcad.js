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
                            if (!getGeneratedTxt(resRequestedAcad.Acad, 3, resRequestedAcad.userData, insertNewAcadMember, resRequestedAcad.userData)) {
                                var mainmessage = "El coordinador de academia aún no ha modificado la lista de profesores, favor de contactarlo.";
                                var secmessage = "Presione boton para continuar.";
                                showMessage("wArNinGbTn_AcTiOn", 0, mainmessage, secmessage);
                            }
                        } else {                            
                            var mainmessage = "La clave de acceso a academia no es correcta, por favor verifíquela.";
                            var secmessage = "Presione boton para continuar.";
                            showMessage("wArNinGbTn_AcTiOn", 0, mainmessage, secmessage);
                        }
                    } else {
                        var mainmessage = "La academia que a la que intentar realizar una solictud no existe. Verifice el nombre de la academia.";
                        var secmessage = "Presione boton para continuar.";
                        showMessage("wArNinGbTn_AcTiOn", 0, mainmessage, secmessage);
                    }                 
                } else {
                    var mainmessage = "La academia que a la que intentar realizar una solictud no existe. Verifice la clave de la academia.";
                    var secmessage = "Presione boton para continuar.";
                    showMessage("wArNinGbTn_AcTiOn", 0, mainmessage, secmessage);
                }
            }
        }

            insertNewAcadMember = (arrayDataInsert) => {
                //console.log(arrayDataInsert);
                dataArray = {
                    Id_Academia: parseInt(arrayDataInsert[4]),
                    Registro_U: parseInt(arrayDataInsert[0]),
                    Academia: arrayDataInsert[5]
                };

                $.ajax({
                    url: '../../index_ajax.php?controller=integrantesacademia&action=verifyToInsertNewMember',
                    type: 'POST',
                    dataType: 'json',
                    data: dataArray
                }).done(function (resCheckMemberIntoAcad) {
                    if (!resCheckMemberIntoAcad.already) {
                        if (!resCheckMemberIntoAcad.error) {
                            var mainmessage = 'Felicidades! Su solicitud fué aprovada. Ahora es miembro de la Academia "' 
                                    + resCheckMemberIntoAcad.nameAcad + '"';
                            var secmessage = "Presione boton para continuar.";
                            showMessage("wArNinGbTn_AcTiOn", 13, mainmessage, secmessage);                            
                        } else {
                            var mainmessage = "Lo sentimos, no se pudo procesar la petición, inténtelo más tarde.";
                            var secmessage = "Presione boton para continuar.";
                            showMessage("wArNinGbTn_AcTiOn", 13, mainmessage, secmessage);    
                        }
                    } else {
                        var mainmessage = "Usted ya pertenece a esta academia.";
                        var secmessage = "Presione boton para continuar.";
                        showMessage("wArNinGbTn_AcTiOn", 13, mainmessage, secmessage);
                    }
                }).fail(function () {
                    AJAXrequestFailed("Fallo en petición AJAX verificar miembro de academia.");
                });   
            }

    $('body').on('submit', '#requestAcadForm', function (e) { checkFromAcadRequestFields(e); })
});