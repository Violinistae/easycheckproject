$(document).ready(function ($) {
    getXlsxFileCreateJSON = (path, fileName) => {
        var Request = new XMLHttpRequest();        

        Request.open("GET", "../." + path, true);        

        Request.responseType = 'arraybuffer';
             
        Request.onload = (e) => {
            if (Request.status === 200) {
                JSONStr = doXlsxStuff(Request.response);
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
                    if (resCreateWriteJSONtxt.error) {
                        console.log(resCreateWriteJSONtxt.message); 
                    }
                }).fail(function () {
                    AJAXrequestFailed("No funciona petición AJAX para crear/sobreescribir JSON --> .txt.");
                });
                                        
            }
            else {
                AJAXrequestFailed("No funciona petición AJAX para cargar Excel.");
            }
        };    
        Request.send(fileName);        
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
            var o = Object.keys(XLSX.utils.sheet_to_json(worksheet)[0]);     
            console.log(o);

            //Check format of Xlsx
            return JSONStr;            
        }
});

