$(document).ready(function ($) {

    verifyRequestGpoP = (e) => {
        e.preventDefault();

        //Deshabilitar form o return si no se ha salido del modal

        let requestGpoPData = [];
        let flag = false;

        let inputsRequestGpoP = $("#requestGpoPForm input:not(input[type=submit])");
        $(inputsRequestGpoP).each(function () {
            if (flag)
                return;

            if ($(this).val().length < 1) {
                flag = true;
                var mainmessage = "Favor de llenar todos los campos para realizar la solicitud.";
                var secmessage = "Presione boton para continuar.";
                showMessage("wArNinGbTn_AcTiOn", 0, mainmessage, secmessage);
            } else {
                requestGpoPData.push($(this).val());
            }
        });

        if (!flag) {
            let checkGpoPKey = parseInt(requestGpoPData[0]);
            if (/^([0-9])*$/.test(checkGpoPKey)) {

                let grupoSelect = document.getElementById("grupoSelect");
                if (grupoSelect.value == "null") {
                    var mainmessage = "Por favor seleccione un grupo.";
                    var secmessage = "Presione el botón para continuar";
                    showMessage("wArNinGbTn_AcTiOn", 420, mainmessage, secmessage);
                    return;
                }

                let dataArray = {
                    Id_GpoPeriodo: parseInt(requestGpoPData[0]),
                    Materia: requestGpoPData[1],
                    Grupo: parseInt(grupoSelect.value),
                    Clave_Acceso: requestGpoPData[2]
                };

                $.ajax({
                    url: '../../index_ajax.php?controller=grupoperiodo&action=verifyRequestToGpoP',
                    type: 'POST',
                    dataType: 'json',
                    data: dataArray
                }).done(function (resRequestedGpoP) {
                    checkDataRequestedGpoP(resRequestedGpoP);
                }).fail(function () {
                    AJAXrequestFailed("Fallo en petición AJAX obtener GpoP por ID");
                })

            } else {
                var mainmessage = "La clave de Grupo Periodo debe ser estrictamente un número.";
                var secmessage = "Presione boton para continuar.";
                showMessage("wArNinGbTn_AcTiOn", 0, mainmessage, secmessage);
            }
        }
    }

        checkDataRequestedGpoP = (resRequestedGpoP) => {
            if (!resRequestedGpoP.error) {
                if (resRequestedGpoP.built) {
                    if (resRequestedGpoP.builtMat) {
                        if (resRequestedGpoP.correctMateria) {
                            if (resRequestedGpoP.correctGpo) {
                                if (resRequestedGpoP.keyAccess) {
                                    let userData = resRequestedGpoP.userData;
                                    let gpoPData = resRequestedGpoP.gpoPeriodo;
                                    console.log(userData);
                                    console.log(gpoPData);

                                    let dataForInsertnewGPMember = [];
                                    dataForInsertnewGPMember.push(userData);
                                    dataForInsertnewGPMember.push(gpoPData);

                                    //Verficar con la lista de alumnos

                                } else {
                                    var mainmessage = "La clave de acceso al grupo que ingresó no es la correcta, favor de verificarla.";
                                    var secmessage = "Presione boton para continuar.";
                                    showMessage("wArNinGbTn_AcTiOn", 0, mainmessage, secmessage);
                                }
                            } else {
                                var mainmessage = "El grupo que ingresó no es la correcto, favor de verificarlo.";
                                var secmessage = "Presione boton para continuar.";
                                showMessage("wArNinGbTn_AcTiOn", 0, mainmessage, secmessage);
                            }
                        } else {
                            var mainmessage = "La materia que ingresó no es la correcta, favor de verificarla.";
                            var secmessage = "Presione boton para continuar.";
                            showMessage("wArNinGbTn_AcTiOn", 0, mainmessage, secmessage);
                        }
                    } else {
                        var mainmessage = "La materia que ingresó no existe, favor de verificarla";
                        var secmessage = "Presione boton para continuar.";
                        showMessage("wArNinGbTn_AcTiOn", 0, mainmessage, secmessage);
                    }
                } else {
                    var mainmessage = "La Grupo Periodo al que intentar realizar una solictud no existe. Verifice la clave de la Grupo Periodo.";
                    var secmessage = "Presione boton para continuar.";
                    showMessage("wArNinGbTn_AcTiOn", 0, mainmessage, secmessage);
                }
            } else {
                var mainmessage = "Lo sentimos, sucedió un error inesperado, inténtelo más tarde.";
                var secmessage = "Presione boton para continuar.";
                showMessage("wArNinGbTn_AcTiOn", 0, mainmessage, secmessage);
            }
        }

        insertNewGpoPMember = (dataForInsertnewGPMember) => {
            
            //Ir al método para getGenetratedTxt


        }

});