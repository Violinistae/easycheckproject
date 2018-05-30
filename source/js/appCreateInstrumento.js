$(document).ready(function ($) {

    verifyFromCreateInstrumento = () => {
        let flag = false;
        let claveElemInput = document.getElementById("claveElemInput");
        let nombreElemInput = document.getElementById("nombreElemInput");
        let tipoEvSelect = document.getElementById("tipoEvSelect");
        let selectParcial = document.getElementById("selectParcial");
        let materiasSelect = document.getElementById("materiasSelect");
        let instruccLlenado = document.getElementById("instruccLlenado");

        let inputsFormCreateInstr = document.getElementsByClassName("createFormInput");


        Array.prototype.forEach.call(inputsFormCreateInstr, function (input, index) {
            if (flag) {
                return;
            }            
            if (input.value.length < 1) {
                flag = true;
                var mainmessage = "Por favor llene todos los campos del formulario.";
                var secmessage = "Presione el boton para continuar.";
                showMessage("wArNinGbTn_AcTiOn", 0, mainmessage, secmessage);
            }
        });
        //console.log(document.getElementById("titleFormCreateInst").value);

        //Agregar hidden input
        if (!flag) {
            if (claveElemInput.value.length > 6) {

            } if (nombreElemInput > 15) {

            } //if (instruccLlenado > )

            
        }

    }

    $("#createInstrumento").click(function (e) { verifyFromCreateInstrumento(); });
});