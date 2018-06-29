var clickedFileMateria;
var realFileName;
var materia;
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
            case "e":
                //Edit
                break;
            case "t":
                //Delete
                checkDeleteMateria(materiaId);
                break;
            default:
                break;
        }
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

                var num = Math.random() * 10000;
                var numForFile = Math.round(num);
                newRealFileName = "valPar" + numForFile.toString() + realFileName;

                var oldVarParFileName = oldMateria.Valores_Parciales;
                oldMateria.Valores_Parciales = newRealFileName;

                dataUpdateFile = new FormData();
                dataUpdateFile.append('fileType', fileType);
                dataUpdateFile.append('file', fileInput.files[0]);
                dataUpdateFile.append('fileName', newRealFileName);
                dataUpdateFile.append('targetPath', "./source/files/temp/");
                dataUpdateFile.append('targetPathTxt', "./source/files/ValoresParciales/");

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
                            var saveTxtPath = "source/files/valoresParciales/";
                            getXlsxFileCreateJSON(JSONres.filePath, JSONres.fileName, 1, saveTxtPath, true, oldVarParFileName, sendDataForUpdateMateria, oldMateria);
                        } else {
                            var mainmessage = JSONres.message;
                            var secmessage = "Presione el botón para continuar";
                            showMessage("wArNinGbTn_AcTiOn", 410, mainmessage, secmessage);
                        }
                    } catch (Exception) {                        
                        var mainmessage = "Error JSON inesperado. Inténtelo más tarde.";
                        var secmessage = "Presione el botón para continuar";
                        showMessage("wArNinGbTn_AcTiOn", 410, mainmessage, secmessage);
                    }     
                }).fail(function () {
                    AJAXrequestFailed("No funciona petición AJAX para actualizar archivo Valores Parciales.");
                });
            
            }

                sendDataForUpdateMateria = (fileName, newMateria) => {
                    newMateria.Valores_Parciales = fileName;

                    $.ajax({
                        url: '../../index_ajax.php?controller=materia&action=updateMateria',
                        type: 'POST',
                        data: newMateria
                    }).done(function (resUpdateValParMateria) {
                        if (!resUpdateValParMateria.error) {
                            var mainmessage = "Archivo actualizado exitosamente.";
                            var secmessage = "Presione el botón para continuar";
                            showMessage("wArNinGbTn_AcTiOn", 410, mainmessage, secmessage);
                        }
                    }).fail(function () {
                        AJAXrequestFailed("No funciona petición AJAX para actualizar nombre Valores Parciales en BD.");
                    });
                }



    checkDeleteMateria = (matId) => {
        dataMateria = {
            materiaID: matId
        };

        $.ajax({
            url: '../../index_ajax.php?controller=materia&action=getMateriaById',
            type: 'POST',
            dataType: 'json',
            data: dataMateria
        }).done(function (resMateriaSelected) {
            if (!resMateriaSelected.error) {
                materia = resMateriaSelected.materia;
                var mainmessage = '¿Está seguro de eliminar la materia "' + materia.Materia + '" ?';
                var secmessage = "Ya no se podrá recuperar la información de esta al confirmar la acción.";
                showMessage("wArNinGbTn_AcTiOn", 3, mainmessage, secmessage);
            }
        }).fail(function () {
            AJAXrequestFailed("Petición AJAX para borrar materia ha fallado");
        });

    }

        deleteMateriaSelected = () => {

            dataMateria = {
                Id_Materia: materia.Id_Materia
            };

            $.ajax({
                url: '../../index_ajax.php?controller=materia&action=deleteMateria',
                type: 'POST',
                dataType: 'json',
                data: dataMateria
            }).done(function (resMateriaDeleted) {
                if (!resMateriaDeleted.error) {

                    deleteFile('./source/files/valoresParciales/' + materia.Valores_Parciales + '.txt');

                    var mainmessage = "Materia eliminada exitosamente.";
                    var secmessage = "Presione el botón para continuar";
                    showMessage("wArNinGbTn_AcTiOn", 10, mainmessage, secmessage);
                } else {
                    var mainmessage = "No se pudo borrar la materia, inténtelo más tarde.";
                    var secmessage = "Presione el botón para continuar";
                    showMessage("wArNinGbTn_AcTiOn", 410, mainmessage, secmessage);                    
                }
            }).fail(function () {
                AJAXrequestFailed("Petición AJAX para borrar materia ha fallado");
            });
        }


    checkSearchedMaterias = (e) => {
        var searchMateriaInput = e.currentTarget;
        console.log(searchMateriaInput.value);
        if (searchMateriaInput == " ") {
            //Show materias
            return;
        } else {
            
            var searchValue = searchMateriaInput.value;
            return;

            $.ajax({
                type: "method",
                url: "url",
                data: "data",
                dataType: "dataType",
            }).done(function (searchMateriasResponse) {
            
            }).fail(function () { 
                AJAXrequestFailed("Fallo en petición AJAX para buscar materias");
             });
        }
    }

    $("#inputValoresParciales").change(function (e) { checkNewUploadedFile(1, "inputValoresParciales"); });
    $("#searchMateriaInput").on('input', function (e) { checkSearchedMaterias(e); });

});