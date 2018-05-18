$(document).ready(function ($) {

    checkCreateMateriaForm = (e) => {

        e.preventDefault();

        $("#createmateriabtn").prop("disabled", true);

        var flag = false;
        var inputsCreateMateria = $("#createmateriainputs input");

        //Verificar campos vacíos
        $(inputsCreateMateria).each( function verifyCreateMateriaInput () {
            if (flag)
                return;
            if ($(this).val().length == 0) {
                var mainmessage = "Por favor llene todos los campos del formulario para crear una materia.";
                var secmessage = "Presione el botón para continuar";
                showMessage("wArNinGbTn_AcTiOn", 410, mainmessage, secmessage);
                flag = true;
            }
        });
        
        var realFileName;
        var fileType;
        var newRealFileName;

        if (!flag) {
            //Get inputs and select 
            var materiaNameInput = document.getElementById("inputNameMateria");
            var semestreSelect = document.getElementById("selectSemestreMateria");
            var fileInput = document.getElementById("valoresparcialesinput");
                    
            //Split file name to basic name (no extension) and get fileType
            var splitedFileName = fileInput.value.split("\\");                   
            var originFileName = splitedFileName[2];
            originFileName = originFileName.replace(/\s+/g, '');
            var splitedOriginFileName = originFileName.split(".");

            realFileName = splitedOriginFileName[0];
            fileType = splitedOriginFileName[1];

            //Checks: range of semestre and fileType
            if (parseInt(semestreSelect.value) < 1 || parseInt(semestreSelect.value) > 8 ) {
                var mainmessage = "Por favor seleccione un semestre válido para la materia.";
                var secmessage = "Presione el botón para continuar";
                showMessage("wArNinGbTn_AcTiOn", 410, mainmessage, secmessage);
                return;
            } if (fileType != "xlsx") {
                var mainmessage = "Por favor adjunte un archivo de extenión .xlsx (archivo Excel).";
                var secmessage = "Presione el botón para continuar";
                showMessage("wArNinGbTn_AcTiOn", 410, mainmessage, secmessage);
                return;
            }
            
            //Generated fileName, no extension
            var num = Math.random() * 1000;
            var numForFile = Math.round(num);
            newRealFileName = "valPar" + numForFile.toString() + realFileName;

            var dataFile = new FormData();
            dataFile.append('fileType', fileType);
            dataFile.append('file', fileInput.files[0]);
            dataFile.append('fileName', newRealFileName);            
            dataFile.append('oldfileName', null);
            dataFile.append('targetPath', "./source/files/temp/");

            $.ajax({
                url: '../../index_ajax.php?controller=file&action=saveFile_getPathForJS',
                type: 'POST',
                contentType: false,
                processData: false,
                data: dataFile
            }).done(function (responseCheckExcelFile) {
                try {                    
                    var JSONres = JSON.parse(responseCheckExcelFile);        
                    if (!JSONres.error) {
                        var x = getXlsxFileCreateJSONValPar(JSONres.filePath, JSONres.fileName);              //Send excel file complete path and file real name (no extension)
                        if (!x)
                            sendDataForCreateMateria(JSONres.fileName);
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
                AJAXrequestFailed("No funciona petición AJAX para crear verificar Excel.");
            });
        }
    }
        //Insert data for materia in DB
        sendDataForCreateMateria = (fileName) => {           

            var materiaNameInput = document.getElementById("inputNameMateria");
            var semestreSelect = document.getElementById("selectSemestreMateria");
            var fileInput = document.getElementById("valoresparcialesinput");

            newMateriaParms = new FormData();
            newMateriaParms.append("nombreMateria", materiaNameInput.value);
            newMateriaParms.append("semestre", semestreSelect.value);
            newMateriaParms.append("valoresparciales", fileName);

            $.ajax({
                url: '../../index_ajax.php?controller=materia&action=insertMateria',
                type: 'POST',
                contentType: false,
                processData: false,
                data: newMateriaParms
            }).done(function (insertMateriaRes) {
                resJSON = JSON.parse(insertMateriaRes);

                if (!resJSON.error) {
                    var mainmessage = resJSON.message;
                    var secmessage = "Presione el botón para continuar";
                    showMessage("wArNinGbTn_AcTiOn", 10, mainmessage, secmessage);
                } else {
                    var mainmessage = resJSON.message;
                    var secmessage = "Presione el botón para continuar";
                    showMessage("wArNinGbTn_AcTiOn", 410, mainmessage, secmessage);
                }
            }).fail(function () {
                AJAXrequestFailed("No funciona petición AJAX para crear materia.");
            });
        }

    $('#createmateriabtn').click(function (e) { checkCreateMateriaForm(e) });

});