var realFileName;
var fileType;
$(document).ready(function ($) {

    getAcademiaToUpdateFile = () => {
        dataArray = {
            fromJS: 1
        };

        $.ajax({
            url: '../../index_ajax.php?controller=academia&action=getAcademiaByCoordinador',
            type: 'POST',
            dataType: 'json',
            data: dataArray
        }).done(function (resAcademia) {
            let academia = resAcademia.academia;
            //console.log(academia);
            updateXlsxListaProfes(academia);
        }).fail(function () {
            AJAXrequestFailed("No funciona petición AJAX para obtener academia anterior.");
        });
    }

        updateXlsxListaProfes = (academia) => {
            var num = Math.random() * 10000;
            var numForFile = Math.round(num);
            newRealFileName = "listaProf" + numForFile.toString() + realFileName;

            var oldListaProfFileName = academia.Lista_Prof;
            academia.Lista_Prof = newRealFileName;

            dataUpdateFile = new FormData();
            dataUpdateFile.append('fileType', fileType);
            dataUpdateFile.append('file', fileInput.files[0]);
            dataUpdateFile.append('fileName', newRealFileName);
            dataUpdateFile.append('targetPath', "./source/files/temp/");
            dataUpdateFile.append('targetPathTxt', "./source/files/listasGruposAcademia/");

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
                        var saveTxtPath = "source/files/listasGruposAcademia/";
                        getXlsxFileCreateJSON(JSONres.filePath, JSONres.fileName, 2, saveTxtPath, true, oldListaProfFileName, sendDataForUpdateAcademia, academia);
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
                AJAXrequestFailed("No funciona petición AJAX para actualizar archivo lista profesores.");
            });
        }

        sendDataForUpdateAcademia = (fileName, academia) => {
            academia.Lista_Prof = fileName;
            //console.log(academia);
            $.ajax({
                url: '../../index_ajax.php?controller=academia&action=updateAcademia',
                type: 'POST',
                dataType: 'json',
                data: academia
            }).done(function (resUpdateListaProfMateria) {
                if (!resUpdateListaProfMateria.error) {
                    var mainmessage = "Archivo creado/actualizado exitosamente.";
                    var secmessage = "Presione el botón para continuar";
                    showMessage("wArNinGbTn_AcTiOn", 13, mainmessage, secmessage);
                }
            }).fail(function () {
                AJAXrequestFailed("No funciona petición AJAX para actualizar nombre lista profesores en BD.");
            });
        }


    $("#listaProfInput").change(function (e) { checkNewUploadedFile(2, "listaProfInput"); });
});