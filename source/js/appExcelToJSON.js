var fileType;
$(document).ready(function ($) {

    getXlsxFileCreateJSON = (path, fileName, purposeFile, saveTxtPath, updateFileAction, oldFileName, functionToDoInDB, paramFunctionToDoInDB) => {
        //console.log("Hola");
        var ExcelFile = path + fileName + ".xlsx";

        var Request = new XMLHttpRequest();        
        Request.open("GET", "../." + ExcelFile, true);
        Request.responseType = 'arraybuffer';

        //console.log(ExcelFile);
        Request.onload = (e) => {
            if (Request.status === 200) {
                JSONStr = doXlsxStuff(Request.response, purposeFile);

                if (JSONStr == null) {
                    $("#modwarning").fadeOut("400", function (){
                        var mainmessage = "El formato del archivo cargado no es el correcto.";
                        var secmessage = "Presione aceptar para descargar un ejemplo, para regresar sin descarga presione cancelar.";
                        switch (purposeFile) {
                            case 1:
                                showMessage("wArNinGbTn_AcTiOn", 501, mainmessage, secmessage);
                                break;
                            case 2:
                                showMessage("wArNinGbTn_AcTiOn", 511, mainmessage, secmessage);
                                break;
                            case 3:
                                showMessage("wArNinGbTn_AcTiOn", 521, mainmessage, secmessage);
                                break;
                            default:
                                showMessage("wArNinGbTn_AcTiOn", 410, mainmessage, secmessage);
                                break;
                        }
                        deleteFile(ExcelFile);
                    });
                    return;
                }
                
                if (updateFileAction) {
                    var oldExcelTargetFile = path + oldFileName + ".xlsx";
                    var oldTxtTargetFile = saveTxtPath + oldFileName + ".txt";

                    //console.log(oldExcelTargetFile); console.log(oldTxtTargetFile);

                    //deleteFile(oldExcelTargetFile); 
                    deleteFile(oldTxtTargetFile);
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
                    //console.log(resCreateWriteJSONtxt);
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

            //console.log(JSONStr);

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
                    if (xlsxKeys[0] == "NumNomina" && xlsxKeys[1] == "Nombres" && xlsxKeys[2] == "Apellidos" ) {
                        XLSX.utils.sheet_to_json(worksheet).forEach(XlsxRow => {
                            //console.log(XlsxRow);
                        });
                    } else {
                        JSONStr = null;
                    }
                    break;
                case 3:
                    if (xlsxKeys[0] == "NumRegistro" && xlsxKeys[1] == "Nombres" && xlsxKeys[2] == "Apellidos") {
                        XLSX.utils.sheet_to_json(worksheet).forEach(XlsxRow => {
                            //console.log(XlsxRow);
                        });
                    } else {
                        JSONStr = null;
                    }
                    break;
                default:
                    break;
            }
            
            return JSONStr;
        }

        checkNewUploadedFile = (purpose, elementUploadFile) => {
            //console.log("Hola");
            fileInput = document.getElementById(elementUploadFile);

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

            switch (purpose) {
                case 1:
                    var mainmessage = "¿Seguro que desea actualizar el archivo de valores parciales?";
                    var secmessage = "";
                    showMessage("wArNinGbTn_AcTiOn", 2, mainmessage, secmessage);
                    break;
                case 2:
                    var mainmessage = "¿Desea actualizar/cargar el archivo de lista de profesores?";
                    var secmessage = "";
                    showMessage("wArNinGbTn_AcTiOn", 12, mainmessage, secmessage);
                    break;
                case 3: 
                    var mainmessage = "¿Seguro que desea actualizar el archivo de lista de alumnos?";
                    var secmessage = "";
                    showMessage("wArNinGbTn_AcTiOn", 31, mainmessage, secmessage);
                    break;
            }

        }


    getGeneratedTxt = (objJSON, purposeTxtFile, arrayToEval, functionToDo, arrayForFunctionToDo) => {
        let txtFileName;
        let targetPath;
        if (purposeTxtFile == 0 || purposeTxtFile == 1 || purposeTxtFile == 2) {
            txtFileName = objJSON.Valores_Parciales;
            targetPath = "source/files/valoresParciales/";        
        } else if (purposeTxtFile == 3) {
            txtFileName = objJSON.Lista_Prof;
            targetPath = "source/files/listasGruposAcademia/";
            arrayForFunctionToDo.push(objJSON.Id_Academia);
            arrayForFunctionToDo.push(objJSON.Academia);
        } else if (purposeTxtFile == 4) {
            txtFileName = objJSON.Lista_Alumnos;
            targetPath = "source/files/listasGruposPeriodos/"
        }

        if (txtFileName == "null") {
            return false;
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
                evalKeyWithGeneratedTxt(resFile.fileContent, purposeTxtFile, arrayToEval, functionToDo, arrayForFunctionToDo);
            } else {
                alert("Verificar error");
            }          
        }).fail(function () {
            AJAXrequestFailed("Error en petición AJAX para obtener archivo txt.");
        });

    }

        evalKeyWithGeneratedTxt = (resFileContent, purposeFile, arrayToEval, functionToDoAfter, arrayForFunctionToDo) => {
            let txtFile_JSON = JSON.parse(resFileContent);

            if (purposeFile == 0) {
                let valParData = [];

                for (let i = 0; i < txtFile_JSON.length; ++i) {
                    //To lower case para hacer la comprovacion
                    if (txtFile_JSON[i]["Nombre"] != "Parcial" && txtFile_JSON[i]["Clave"] != "parcial") {
                        let auxArr = [];
                        auxArr.push(txtFile_JSON[i]["Nombre"]);         //nombre
                        auxArr.push(txtFile_JSON[i]["Clave"]);          //clave
                        auxArr.push(txtFile_JSON[i]["Valor Parcial"]);          //clave
                        valParData.push(auxArr);
                    }
                }
                functionToDoAfter(valParData, arrayForFunctionToDo);
            } else if (purposeFile == 1) {
                let valParData = [];

                for (let i = 0; i < txtFile_JSON.length; ++i) {
                    //To lower case para hacer la comprovacion
                    if (txtFile_JSON[i]["Nombre"] != "Parcial" && txtFile_JSON[i]["Clave"] != "parcial") {
                        let auxArr = [];
                        auxArr.push(txtFile_JSON[i]["Nombre"]);         //nombre
                        auxArr.push(txtFile_JSON[i]["Clave"]);          //clave
                        valParData.push(auxArr);
                    }
                }
                functionToDoAfter(valParData);
            } else if (purposeFile == 2) {                                 //Eval als ValPar                
                let flagKeyName_ValPar = false;

                txtFile_JSON.forEach(xlsxRow => {
                    if (arrayToEval.claveElemento == xlsxRow.Clave &&
                    arrayToEval.nombreElemento == xlsxRow.Nombre) {
                        flagKeyName_ValPar = true;
                        return;
                    }
                });

                if (flagKeyName_ValPar) {
                    functionToDoAfter(arrayForFunctionToDo);
                } else if (!flagKeyName_ValPar) {
                    var mainmessage = "Por favor seleccione una clave y/o nombre de elemento a evaluar válidos (contenidos dentro del archivo valores parciales).";
                    var secmessage = "Presione el boton para continuar.";
                    showMessage("wArNinGbTn_AcTiOn", 0, mainmessage, secmessage);
                    return;
                }
            } else if (purposeFile == 3) {
                if (txtFile_JSON == null) {
                    return;
                }
                let flagUserNotOnFile = false;                
                txtFile_JSON.forEach(xlsxRow => {                    
                    if (arrayToEval[0] == xlsxRow.NumNomina &&
                        arrayToEval[1] == xlsxRow.Nombres && 
                        arrayToEval[2] == xlsxRow.Apellidos) {
                        flagUserNotOnFile = true;
                        return;
                    }
                });

                if (flagUserNotOnFile) {
                    functionToDoAfter(arrayForFunctionToDo);
                } else if (!flagUserNotOnFile) {
                    var mainmessage = "Lo sentimos, usted no se encuentra en la lista de miembros de esta academia. Favor de contactar a su coordinador de academia.";
                    var secmessage = "Presione el boton para continuar.";
                    showMessage("wArNinGbTn_AcTiOn", 0, mainmessage, secmessage);
                    return;
                }
            } else if (purposeFile == 4) {
                if (txtFile_JSON == null) {
                    return;
                }
                let flagUserNotOnFile = false;
                txtFile_JSON.forEach(xlsxRow => {
                    console.log(xlsxRow);
                    if (arrayToEval[0] == xlsxRow.NumRegistro &&
                        arrayToEval[1] == xlsxRow.Nombres &&
                        arrayToEval[2] == xlsxRow.Apellidos) {
                        flagUserNotOnFile = true;
                        return;
                    }
                });

                if (flagUserNotOnFile) {
                    functionToDoAfter(arrayForFunctionToDo);
                } else if (!flagUserNotOnFile) {
                    var mainmessage = "Lo sentimos, usted no se encuentra en la lista de miembros de este Grupo Periodo. Favor de contar a su profesor.";
                    var secmessage = "Presione el boton para continuar.";
                    showMessage("wArNinGbTn_AcTiOn", 0, mainmessage, secmessage);
                    return;
                }
            }
        }
    
});