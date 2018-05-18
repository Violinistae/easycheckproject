var clickedFileMateria;
var realFileName;
var fileType;
$(document).ready(function ($) {

    switchActionOnMateria = (e) => {        
        var attr = e.originalEvent.path[1].getAttribute("id");

        if (attr == null) {
            return;
        }

        var splitedAttr = attr.split("-")


        var action = splitedAttr[0];
        var materiaId = parseInt(splitedAttr[1]);

        switch (action) {
            case "f":
                $("#inputValoresParciales").trigger("click");
                clickedFileMateria = materiaId;
                break;
            case "t":
                //Delete
                break;
            case "e":
                //edit
                break;
            default:
                break;
        }
    } 

    checkNewUploadedFile = () => {
        fileInput = document.getElementById("inputValoresParciales");

        var splitedFileName = fileInput.value.split("\\");
        var originFileName = splitedFileName[2];
        originFileName = originFileName.replace(/\s+/g, '');
        var splitedOriginFileName = originFileName.split(".");

        realFileName = splitedOriginFileName[0];
        fileType = splitedOriginFileName[1];

        if (fileType != "xlsx") {
            var mainmessage = "Por favor adjunte un archivo de extenión .xlsx (archivo Excel).";
            var secmessage = "Presione el botón para continuar";
            showMessage("wArNinGbTn_AcTiOn", 410, mainmessage, secmessage);
            fileInput.value = null;
            return;
        }

        var mainmessage = "¿Seguro que desea actualizar el archivo de valores parciales?";
        var secmessage = "Al confirmar esta acción ???.";
        showMessage("wArNinGbTn_AcTiOn", 2, mainmessage, secmessage);      

    }

        getMateriatoUpdateFile = () => {
            dataMateria = {
                materiaID: clickedFileMateria
            };

            $.ajax({
                url: '../../index_ajax.php?controller=materia&action=getMateriaById',
                type: 'POST',
                dataType: 'json',
                data: dataMateria
            }).done(function (resOldMateria) {
                if (!resOldMateria.error) {
                    updateXlsxValoresParciales(resOldMateria.materia);
                }
            }).fail(function () {
                AJAXrequestFailed("No funciona petición AJAX para obtener materia anterior.");
            });
        }

            updateXlsxValoresParciales = (oldMateria) => {

                var oldVarParFileName = oldMateria.Valores_Parciales;

                var num = Math.random() * 1000;
                var numForFile = Math.round(num);

                newRealFileName = "valPar" + numForFile.toString() + realFileName;

                dataUpdateFile = new FormData();
                dataUpdateFile.append('fileType', fileType);
                dataUpdateFile.append('file', fileInput.files[0]);
                dataUpdateFile.append('fileName', newRealFileName);            
                dataUpdateFile.append('materiaID', clickedFileMateria);
                dataUpdateFile.append('oldfileName', oldVarParFileName);
                dataUpdateFile.append('targetPath', "./source/files/temp/");                                 

                $.ajax({
                    url: '../../index_ajax.php?controller=file&action=saveFile_getPathForJS',
                    type: 'POST',
                    contentType: false,
                    processData: false,
                    data: dataUpdateFile
                }).done(function (resUpdateExcelFile) {
                    try {
                        var JSONres = JSON.parse(resUpdateExcelFile);
                        if (!JSONres.error) {
                            var x = getXlsxFileCreateJSONValPar(JSONres.filePath, JSONres.fileName);
                            if (!x)
                                sendDataForUpdateMateria(oldMateria, JSONres.fileName);
                            else {
                                var mainmessage = "El formato no es el correcto. Mostrar foto";
                                var secmessage = "Presione el botón para continuar";
                                showMessage("wArNinGbTn_AcTiOn", 410, mainmessage, secmessage);
                            }
                        } else {
                            var mainmessage = JSONres.message;
                            var secmessage = "Presione el botón para continuar";
                            showMessage("wArNinGbTn_AcTiOn", 410, mainmessage, secmessage);
                        }
                    } catch (Exception) {
                        console.log(Exception);
                        var mainmessage = "Error inesperado. Inténtelo más tarde.";
                        var secmessage = "Presione el botón para continuar";
                        showMessage("wArNinGbTn_AcTiOn", 410, mainmessage, secmessage);
                    }     
                }).fail(function () {
                    AJAXrequestFailed("No funciona petición AJAX para actualizar archivo Valores Parciales.");
                });
            
            }

                sendDataForUpdateMateria = (oldMateria, newFileName) => {
                    var newMateria = oldMateria;
                    newMateria.Valores_Parciales = newFileName;

                    $.ajax({
                        usrl: '../../index_ajax.php?controller=materia&action=updateMateria',
                        type: 'POST',
                        dataType: 'json',
                        data: newMateria
                    }).done(function () {
                        //
                    }).fail(function () {
                        AJAXrequestFailed("No funciona petición AJAX para actualizar nombre Valores Parciales en BD.");
                    });
                }

    $(".materiaBtn").click(function (e) { switchActionOnMateria(e); });
    $("#inputValoresParciales").change(function (e) { checkNewUploadedFile(); });

});