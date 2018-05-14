$(document).ready(function ($) {
    getXlsxFile = (path) => {
        var Request = new XMLHttpRequest();
        Request.open("GET", "../." + path, true);        

        Request.responseType = 'arraybuffer';
        
        Request.onload = function () {
            if (Request.status === 200) {
                doXlsxStuff(Request.response);
            }
            else {
                AJAXrequestFailed("No funciona petición AJAX para cargar Excel.");
            }
        };

        Request.send();
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

            var JSONStr = JSON.stringify(XLSX.utils.sheet_to_json(worksheet))            
            
            
        }
});

