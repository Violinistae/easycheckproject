var clickedFileMateria;
var realFileName;
var fileType;
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
            case "t":
                //Delete
                break;
            case "e":
                //edit
                break;
            default:
                break;
        }
    } 

    checkNewUploadedFile = () => {
        fileInput = document.getElementById("inputValoresParciales");

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

        var mainmessage = "¿Seguro que desea actualizar el archivo de valores parciales?";
        var secmessage = "Al confirmar esta acción ???.";
        showMessage("wArNinGbTn_AcTiOn", 2, mainmessage, secmessage);      

    }

        //Called from doActionsConfirm in case 2
        updateXlsxValoresParciales = () => {            

            var num = Math.random() * 1000;
            var numForFile = Math.round(num);

            newRealFileName = "valPar" + numForFile.toString() + realFileName;

            dataUpdateFile = new FormData();
            dataUpdateFile.append('file', fileInput.files[0]);
            dataUpdateFile.append('fileName', newRealFileName);
            dataUpdateFile.append('targetPath', "./source/files/temp/");
            dataUpdateFile.append('materiaID', clickedFileMateria);
        
            console.log(realFileName);
            console.log(fileType);
            console.log(newRealFileName);

            return;

            $.ajax({
                url: '../../index_ajax.php?controller=usuario&action=updateFileValoresParciales',
                type: 'POST',
                contentType: false,
                processData: false,
                data: dataUpdateFile
            }).done(function () {

            }).fail(function () {

            });
           
        }

    $(".materiaBtn").click(function (e) { switchActionOnMateria(e); });
    $("#inputValoresParciales").change( function (e) { checkNewUploadedFile(); });

});