$(document).ready(function ($) {
    checkCreateMateriaForm = () => {

        $("#createmateriabtn").prop("disabled", true);

        var flag = false;
        var inputsCreateMateria = $("#createmateriainputs input");

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
            console.log(document.getElementById("valoresparcialesinput").value);
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

            newMateriaParms = {
                nombreMateria: $("#createmateriainputs input[name=nombremateria]").val(),
                semestre: parseInt(sem), 
                valoresparciales: filename
            };

            $.ajax({
                url: '../../index_ajax.php?controller=materia&action=insertMateria',
                type: 'POST',
                dataType: 'json',
                data: newMateriaParms
            }).done(function (insertMateriaRes) {
                var mainmessage = insertMateriaRes.message;
                var secmessage = "Presione el botón para continuar";
                showMessage("wArNinGbTn_AcTiOn", 10, mainmessage, secmessage);                
                return;
            }).fail(function () {
                AJAXrequestFailed("No funciona petición AJAX para crear materia.");
            });
        }

    }

    $('#createmateriabtn').click(function () { checkCreateMateriaForm() });

});