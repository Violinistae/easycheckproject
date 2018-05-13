getXlsxFile = (path) => {
    var Request = new XMLHttpRequest();
    Request.open("GET", path, true);
    Request.responseType = "arraybuffer";

    Request.onload = (e) => {
        var arraybuffer = Request.response;

        /* Convert data to binary string */
        var data = new Uint8Array(arraybuffer);
        var arr = new Array();
        for (var i = 0; i != data.length; ++i)
            arr[i] = String.fromCharCode(data[i]);

        var bstr = arr.join("");

        /* Call XLSX */
        var workbook = XLSX.read(bstr, {type:"binary"});

        /* Do Something with Workbook here */
        var first_sheet_name = workbook.SheetNames[0];

        /* Get Worksheet */
        var worksheet = workbook.Sheets[first_sheet_name];
        console.log(XLSX.utils.sheet_to_json(worksheet));

    }
}