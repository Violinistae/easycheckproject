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
                    var mainmessage = "El formato del archivo cargado no es el correcto.";
                    var secmessage = "Presione aceptar para descargar un ejemplo, para regresar sin descarga presione cancelar.";
                    switch (purposeFile) {
                        case 1:
                            showMessage("wArNinGbTn_AcTiOn", 501, mainmessage, secmessage);
                            break;
                        case 2:

                            break;
                        case 3:

                            break;
                        default:
                            showMessage("wArNinGbTn_AcTiOn", 410, mainmessage, secmessage);
                            break;
                    }                    
                    deleteFile(ExcelFile);
                    return;
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
                                //console.log(XlsxRow);
                            });
                        } else {
                            JSONStr = null;
                        }
                    break;
                case 2:

                    break;
                case 3:

                    break;
                default:
                    break;
            }
            
            return JSONStr;            
        }


    getGeneratedTxt = (objJSON, purposeTxtFile, arrayToEval, functionToDoCreateInst, arrayForFunctionToDo) => {
        let txtFileName;
        let targetPath;
        if (purposeTxtFile == 1) {
            txtFileName = objJSON.Valores_Parciales;
            targetPath = "source/files/valoresParciales/";        
        } else if (purposeTxtFile == 2) {
            
        }

        let targetFile = targetPath + txtFileName + ".txt";

        dataGetTxtFile = {
            targetFile: targetFile
        }

        $.ajax({
            url: '../../index_ajax.php?controller=file&action=getContentFile',
            type: 'POST',
            dataType: 'json', 
            data: dataGetTxtFile
        }).done(function (resFile) {
            if (!resFile.error) {
                evalKeyWithGeneratedTxt(resFile.fileContent, purposeTxtFile, arrayToEval, functionToDoCreateInst, arrayForFunctionToDo);
            } else {
                alert("Verificar error");
            }          
        }).fail(function () {
            AJAXrequestFailed("Error en petición AJAX para obtener archivo txt.");
        });

    }

        evalKeyWithGeneratedTxt = (resFileContent, purposeFile, arrayToEval, functionToDoCreateInst, arrayForFunctionToDo) => {
            let txtFile_JSON = JSON.parse(resFileContent);
            if (purposeFile == 1) {                                 //Eval als ValPar                
                let flagKeyName_ValPar = false;

                txtFile_JSON.forEach(xlsxRow => {
                    if (arrayToEval.claveElemento == xlsxRow.Clave &&
                    arrayToEval.nombreElemento == xlsxRow.Nombre) {
                        flagKeyName_ValPar = true;
                        return;
                    }
                });

                if (flagKeyName_ValPar) {
                    functionToDoCreateInst(arrayForFunctionToDo);
                } else if (!flagKeyName_ValPar) {
                    var mainmessage = "Por favor ingrese una clave y/o nombre de elemento a evaluar válidos (contenidos dentro del archivo valores parciales).";
                    var secmessage = "Presione el boton para continuar.";
                    showMessage("wArNinGbTn_AcTiOn", 0, mainmessage, secmessage);
                    return;
                }

            }
        }
    
});