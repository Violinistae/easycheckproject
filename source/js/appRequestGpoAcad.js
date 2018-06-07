$(document).ready(function ($) {
    checkFromAcadRequestFields = (e) => {
        e.preventDefault();
        let requestAcadData = [];
        let flag = false;

        let inputsRequestAcad = $(".inputDataRqstAcad");
        $(inputsRequestAcad).each(function () {
            if (flag)
                return;

            if ($(this).val().length < 1) {
                flag = true;
                var mainmessage = "Favor de llenar todos los campos para realizar la solicitud.";
                var secmessage = "Presione boton para continuar.";
                showMessage("wArNinGbTn_AcTiOn", 0, mainmessage, secmessage);
            } else {
                requestAcadData.push($(this).val());
            }
        });

        if (!flag) {
            let checkAcadKey = parseInt(requestAcadData[0]);
            if (checkAcadKey) {
                requestAcadData[0] = parseInt(requestAcadData[0]);
                console.log(requestAcadData);
                //Query to Db and then check with xlsx
            } else {
                var mainmessage = "La clave de academia debe ser estrictamente un número.";
                var secmessage = "Presione boton para continuar.";
                showMessage("wArNinGbTn_AcTiOn", 0, mainmessage, secmessage);
            }
        }
    }

    $('body').on('submit', '#requestAcadForm', function (e) { checkFromAcadRequestFields(e); })
});