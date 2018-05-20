$(document).ready(function ($) {

    getXlsxFileCreateJSON = (path, fileName, purposeFile, saveTxtPath, updateFileAction, oldFileName, functionToDoInDB, paramFunctionToDoInDB) => {
        
        var ExcelFile = path + fileName + ".xlsx";

        var Request = new XMLHttpRequest();        
        Request.open("GET", "../." + ExcelFile, true);
        Request.responseType = 'arraybuffer';
             
        Request.onload = (e) => {
            if (Request.status === 200) {
                JSONStr = doXlsxStuff(Request.response, purposeFile);

                if (JSONStr == null) {
                    var mainmessage = "El formato no es el correcto. Mostrar foto";
                    var secmessage = "Presione el botón para continuar";
                    showMessage("wArNinGbTn_AcTiOn", 410, mainmessage, secmessage);
                    deleteFile(ExcelFile);
                    return;

                    //Eliminar XLSX incorrecto (actual)
                }
                
                if (updateFileAction) {
                    var oldExcelTargetFile = path + oldFileName + ".xlsx";
                    var oldTxtTargetFile = saveTxtPath + oldFileName + ".txt";

                    deleteFile(oldExcelTargetFile); deleteFile(oldTxtTargetFile);
                }

                var splitedfileName = fileName.split(".");
                var JSONfileName = splitedfileName[0];

                var paramsForFile = {
                    fileName: JSONfileName, 
                    contentForFile : JSONStr, 
                    targetPath: saveTxtPath
                };

                $.ajax({
                    url: '../../index_ajax.php?controller=file&action=create_writeFile',                    
                    type: 'POST',
                    dataType: 'json',
                    data: paramsForFile
                }).done(function (resCreateWriteJSONtxt) {
                    if (!resCreateWriteJSONtxt.error){
                        deleteFile(ExcelFile);
                        functionToDoInDB(fileName, paramFunctionToDoInDB);
                    }
                    console.log(resCreateWriteJSONtxt);
                }).fail(function () {
                    AJAXrequestFailed("No funciona petición AJAX para crear/sobreescribir JSON --> .txt.");
                });                                        
            }
            else {
                AJAXrequestFailed("No funciona petición AJAX para cargar Excel.");
            }
        };    
        Request.send(fileName);
        return;
    }

        doXlsxStuff = (xlsxResponse, purposeFile) => {                  
            var arraybuffer = xlsxResponse;
            /* Convert data to binary string */            
            var data = new Uint8Array(arraybuffer);
            var arr = new Array();
            for (var i = 0; i != data.length; ++i)
                arr[i] = String.fromCharCode(data[i]);

            var bstr = arr.join("");

            /* Call XLSX */
            var workbook = XLSX.read(bstr, { type: "binary" });
            /* Do Something with Workbook here */
            var first_sheet_name = workbook.SheetNames[0];
            /* Get Worksheet */
            var worksheet = workbook.Sheets[first_sheet_name];
            var JSONStr = JSON.stringify(XLSX.utils.sheet_to_json(worksheet));  
            /* Get Column Headers (JSON Keys)  */
            var xlsxKeys = Object.keys(XLSX.utils.sheet_to_json(worksheet)[0]);                 


            //Checar própósito de archivo
            switch (purposeFile) {
                case 1:
                        if (xlsxKeys[0] == "Nombre" && xlsxKeys[1] == "Clave" && xlsxKeys[2] == "Valor Parcial") {
                            XLSX.utils.sheet_to_json(worksheet).forEach(XlsxRow => {
                                console.log(XlsxRow);
                            });
                        } else {
                            JSONStr = null;
                        }
                    break;
            
                default:
                    break;
            }
            
            console.log(JSONStr);
            return JSONStr;            
        }

        deleteFile = (targetFile) => {
            dataFile = {
                targetFile: targetFile
            };

            $.ajax({
                url: '../../index_ajax.php?controller=file&action=deleteFile',
                type: 'POST',
                dataType: 'json',
                data: dataFile
            }).done(function () {
                //
            }).fail(function () {
                AJAXrequestFailed("No sirve petición AJAX para eliminar archivo xlsx");
            });
        }

});

