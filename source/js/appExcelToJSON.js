$(document).ready(function ($) {

    getXlsxFileCreateJSONValPar = (path, fileName, functionToDoInDB) => {
        
        var Request = new XMLHttpRequest();        

        Request.open("GET", "../." + path, true);        

        Request.responseType = 'arraybuffer';
             
        Request.onload = (e) => {
            if (Request.status === 200) {
                JSONStr = doXlsxStuff(Request.response);

                if (JSONStr == null) {
                    var mainmessage = "El formato no es el correcto. Mostrar foto";
                    var secmessage = "Presione el botón para continuar";
                    showMessage("wArNinGbTn_AcTiOn", 410, mainmessage, secmessage);
                    return;
                }
                
                var splitedfileName = fileName.split(".");
                var JSONfileName = splitedfileName[0];

                var paramsForFile = {
                    fileName: JSONfileName, 
                    contentForFile : JSONStr, 
                    targetPath: "source/files/valoresParciales/",
                    outDirTimes: 2
                };

                $.ajax({
                    url: '../../index_ajax.php?controller=file&action=create_writeFile',                    
                    type: 'POST',
                    dataType: 'json',
                    data: paramsForFile
                }).done(function (resCreateWriteJSONtxt) {
                    if (!resCreateWriteJSONtxt.error){
                        functionToDoInDB(fileName);
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

        doXlsxStuff = (xlsxResponse) => {                  
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

            if (xlsxKeys[0] == "Nombre" && xlsxKeys[1] == "Clave" && xlsxKeys[2] == "Valor Parcial") {
                XLSX.utils.sheet_to_json(worksheet).forEach(XlsxRow => {
                    console.log(XlsxRow);
                });
            } else {
                JSONStr = null;
            }
            
            console.log(JSONStr);
            return JSONStr;            
        }

});

