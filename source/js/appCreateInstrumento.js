$(document).ready(function ($) {

    verifyFromCreateInstrumento = () => {
        let flag = false;
        let tipoInst = document.getElementById("instTypeHidden");
        let tipoEvSelect = document.getElementById("tipoEvSelect");
        let materiasSelect = document.getElementById("materiasSelect");
        let claveElemInput = document.getElementById("claveElemInput");
        let nombreElemInput = document.getElementById("nombreElemInput");               
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

        if (!flag) {
            if (claveElemInput.value.length > 6) {
                var mainmessage = "Por favor ingrese una clave de elemento de máximo 6 caracteres.";
                var secmessage = "Presione el boton para continuar.";
                showMessage("wArNinGbTn_AcTiOn", 0, mainmessage, secmessage);
                return;
            } if (nombreElemInput.value.length > 15) {
                var mainmessage = "Por favor ingrese una nombre de elemento de máximo 15 caracteres.";
                var secmessage = "Presione el boton para continuar.";
                showMessage("wArNinGbTn_AcTiOn", 0, mainmessage, secmessage);
                return;
            } if (materiasSelect.value == "null") {
                var mainmessage = "Por favor seleccione una materia.";
                var secmessage = "Presione el boton para continuar.";
                showMessage("wArNinGbTn_AcTiOn", 0, mainmessage, secmessage);
                return;
            }

            switch (tipoEvSelect.value) {
                case "1": break;
                case "2": break;
                case "3": break;
                case "null":
                    var mainmessage = "Por favor seleccione un tipo de evaluación";
                    var secmessage = "Presione el boton para continuar.";
                    showMessage("wArNinGbTn_AcTiOn", 0, mainmessage, secmessage);
                    return;
                    break;
                default:
                    var mainmessage = "Por favor seleccione un tipo de evaluación válido.";
                    var secmessage = "Presione el boton para continuar.";
                    showMessage("wArNinGbTn_AcTiOn", 0, mainmessage, secmessage);
                    return;
                    break;
            } 

            dataMateria = {
                materiaID: parseInt(materiasSelect.value)
            };


            $.ajax({
                url: '../../index_ajax.php?controller=materia&action=getMateriaById',
                type: 'POST',
                dataType: 'json',
                data: dataMateria
            }).done(function (resMateria) {
                if (!resMateria.error) {
                    let materia = resMateria.materia;
                    let purpuseTxtFile = 1;             //Get valores parciales

                    arrayToEvalWithGeneratedTxt = {
                        claveElemento: claveElemInput.value,
                        nombreElemento: nombreElemInput.value
                    };

                    //TO UPPER CASE clave value and lower nombre, luego almacanar en forma de palabra

                    dataForCreateInstrument = {
                        tipoInstrumento: parseInt(tipoInst.value),
                        tipoEv: parseInt(tipoEvSelect.value),
                        claveElemento: claveElemInput.value,
                        nombreElemento: nombreElemInput.value,
                        instruccionesLlenado: instruccLlenado.value,
                        materiaId: parseInt(materiasSelect.value)
                    }

                    getGeneratedTxt(materia, purpuseTxtFile, arrayToEvalWithGeneratedTxt, sendDataCreateInstrument, dataForCreateInstrument);
                }
            }).fail(function () {
                AJAXrequestFailed("No funciona petición AJAX para obtener materia.");
            });
                                            
        }

    }

        sendDataCreateInstrument = (dataArray) => {
            //AJAX create instrument function, replace in getGenereatedTxt()
            let str = JSON.stringify(dataArray)
            let createInstrURL = "../../sourcephp/views/buildInstrumento.php";

            let formToCreateInstrument = document.createElement("form");
            let hiddenContent = document.getElementById("hiddenContent");
            
            hiddenContent.appendChild(formToCreateInstrument);
            formToCreateInstrument.target = "_blank";
            formToCreateInstrument.method = "post";
            formToCreateInstrument.action = createInstrURL;

            for (var dataElement in dataArray) {
                let auxInput = document.createElement("input");
                auxInput.type = "hidden";
                auxInput.name = dataElement;
                auxInput.value = dataArray[dataElement];
                formToCreateInstrument.appendChild(auxInput);
            }

            $(".subdropumen").removeClass('active');
            $(".buttonnewinst").removeClass('active');
            $("#modforactions").fadeOut("300");

            sessionStorage.setItem("createdInst", str);

            formToCreateInstrument.submit();

        }

    updateLeftChars = (e) => {
        let instLlenadoTxtArea = e.currentTarget;
        let lblLeftChars = document.getElementById("countCharInstrucciones");
        let leftChars = 260 - instLlenadoTxtArea.value.length;
        
        if (leftChars >= 0) {
            lblLeftChars.textContent = leftChars;
        } else {
            instLlenadoTxtArea.value = instLlenadoTxtArea.value.substring(0, instLlenadoTxtArea.value.length-1);
        }

    }

    $("#createInstrumento").click(function (e) { verifyFromCreateInstrumento(); });
    $("#instruccLlenado").on('input', function (e) { updateLeftChars(e); })
});