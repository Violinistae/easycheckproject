$(document).ready(function ($) {
    checkCreateMateriaForm = (e) => {

        e.preventDefault();

        $("#createmateriabtn").prop("disabled", true);

        var flag = false;
        var inputsCreateMateria = $("#createmateriainputs input");

        //Verificar campos vacíos
        $(inputsCreateMateria).each(function verifyCreateMateriaInput() {
            if (flag)
                return;
            if ($(this).val().length == 0) {
                var mainmessage = "Por favor llene todos los campos del formulario para crear una materia.";
                var secmessage = "Presione el botón para continuar";
                showMessage("wArNinGbTn_AcTiOn", 410, mainmessage, secmessage);
                flag = true;
            }
        });

        if (!flag) {
            var sem = $("#createmateriainputs select[name=semestreselect]").val();

            var f = document.getElementById("valoresparcialesinput").value.split("\\");
            
            var filename = f[2];
            filename = filename.replace(/\s+/g, '');
            var filenamesplit = filename.split(".");
            var filetype = filenamesplit[1];

            if (parseInt(sem) < 1 || parseInt(sem) > 8 ) {
                var mainmessage = "Por favor seleccione un semestre válido para la materia.";
                var secmessage = "Presione el botón para continuar";
                showMessage("wArNinGbTn_AcTiOn", 410, mainmessage, secmessage);
                return;
            } if (filetype != "xlsx") { //Ver si agregar más excel extensions y formato de Excel
                var mainmessage = "Por favor adjunte un archivo de extenión .xlsx (archivo Excel).";
                var secmessage = "Presione el botón para continuar";
                showMessage("wArNinGbTn_AcTiOn", 410, mainmessage, secmessage);
                return;
            }
            
            file = new FormData();
            file.append('file', document.getElementById("valoresparcialesinput").files[0]);
            file.append('fileName', filename);
            file.append('targetPath', "./source/files/temp/");

            $.ajax({
                url: '../../index_ajax.php?controller=file&action=saveFile_getPathForJS',
                type: 'POST',
                contentType: false,
                processData: false,
                data: file
            }).done(function (responseCheckExcelFile) {
                try {
                    //Parse JSON for PHP echo json encode
                    var JSONres = JSON.parse(responseCheckExcelFile);                    
                    if (!JSONres.error) {
                        getXlsxFileCreateJSON(JSONres.path, JSONres.fileName);
                        //sendDataForCreateMateria();       Cambiar nombre
                    } else {
                        var mainmessage = JSONres.message;
                        var secmessage = "Presione el botón para continuar";
                        showMessage("wArNinGbTn_AcTiOn", 410, mainmessage, secmessage);
                    }

                } catch (Exception) {
                    var mainmessage = "Error inesperado. Inténtelo más tarde.";
                   var secmessage = "Presione el botón para continuar";
                   showMessage("wArNinGbTn_AcTiOn", 410, mainmessage, secmessage);
                }                
            }).fail(function () {
                AJAXrequestFailed("No funciona petición AJAX para crear verificar Excel.");
            });
        }
    }

        sendDataForCreateMateria = () => {
            newMateriaParms = new FormData();

            newMateriaParms.append("nombreMateria", $("#createmateriainputs input[name=nombremateria]").val());
            newMateriaParms.append("semestre", parseInt(sem));
            newMateriaParms.append("valoresparciales", filename);
            newMateriaParms.append("file", document.getElementById("valoresparcialesinput").files[0]);

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