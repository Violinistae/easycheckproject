var valParData = [];
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
            } if (nombreElemInput.value.length > 25) {
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
                    let purpuseTxtFile = 2;             //Get valores parciales

                    arrayToEvalWithGeneratedTxt = {
                        claveElemento: claveElemInput.options[claveElemInput.selectedIndex].text,
                        nombreElemento: nombreElemInput.options[nombreElemInput.selectedIndex].text
                    };

                    dataForCreateInstrument = {
                        tipoInstrumento: parseInt(tipoInst.value),
                        tipoEv: parseInt(tipoEvSelect.value),
                        claveElemento: claveElemInput.options[claveElemInput.selectedIndex].text,
                        nombreElemento: nombreElemInput.options[nombreElemInput.selectedIndex].text,
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

            $.ajax({
                url: '../../index_ajax.php?controller=instrumento&action=insertInstrumento',
                type: 'POST',
                dataType: 'json',
                data: dataArray
            }).done(function (resCreateIns) {
                let instrData = resCreateIns.instrumento;
                //Verify in same function if there is an instrument for specific key !!!
                sendDataOpenPageBuildInstr(instrData);
            }).fail(function () {
                AJAXrequestFailed("Fallo en peticion AJAX para crear Instrumento de evaluación");
            });

        }

            sendDataOpenPageBuildInstr = (instrData) => {
                let str = JSON.stringify(instrData);
                let buildInstrURL = "../../sourcephp/views/buildInstrumento.php";
                //console.log(instrData);

                $(".subdropumen").removeClass('active');
                $(".buttonnewinst").removeClass('active');
                $("#modforactions").fadeOut("300");

                sessionStorage.setItem("createdInst", str);
                window.open(buildInstrURL, "_blank");
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

    updateNombreElemToEval = (e) => {
        let materiasSelect = e.currentTarget;
        let toTry = parseInt(materiasSelect.value);

        if (!/^([0-9])*$/.test(toTry)) {
            clearKeyNameElemSelects ();
            return;
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

                getGeneratedTxt(materia, purpuseTxtFile, null, setValParDataToSelect, null);
            }
        }).fail(function () {
            AJAXrequestFailed("No funciona petición AJAX para obtener materia.");
        });
    }

        setValParDataToSelect = (valParData) => {
            let claveElemInput = document.getElementById("claveElemInput");
            let firstOp = document.createElement("option");
            firstOp.value = "null";
            firstOp.text = "- Seleccione una clave de elemento -";
        
            for (i = claveElemInput.options.length - 1; i >= 0; i--) {
                claveElemInput.remove(i);
            }

            claveElemInput.add(firstOp);
            claveElemInput.disabled = false;

            let nombreElemInput = document.getElementById("nombreElemInput");
            firstOp = document.createElement("option");
            firstOp.value = "null";
            firstOp.text = "- Seleccione una clave de elemento -";
            
            for (i = nombreElemInput.options.length - 1; i >= 0; i--) {
                nombreElemInput.remove(i);
            }

            nombreElemInput.add(firstOp);

            claveElemInput.disabled = false;

            for (let i = 0; i < valParData.length; ++i) {
                let newValParOptionKey = document.createElement("option");
                let newValParOptionName = document.createElement("option");

                newValParOptionKey.value = i;
                newValParOptionKey.text = valParData[i][1];

                newValParOptionName.value = i;
                newValParOptionName.text = valParData[i][0];

                claveElemInput.add(newValParOptionKey);
                nombreElemInput.add(newValParOptionName);  
            }
        }

        clearKeyNameElemSelects = () => {
            let claveElemInput = document.getElementById("claveElemInput");
            let firstOp = document.createElement("option");
            firstOp.value = "null";
            firstOp.text = "- Seleccione una materia -";

            for (i = claveElemInput.options.length - 1; i >= 0; i--) {
                claveElemInput.remove(i);
            }

            claveElemInput.add(firstOp);
            claveElemInput.disabled = false;

            let nombreElemInput = document.getElementById("nombreElemInput");
            firstOp = document.createElement("option");
            firstOp.value = "null";
            firstOp.text = "- Seleccione una materia -";

            for (i = nombreElemInput.options.length - 1; i >= 0; i--) {
                nombreElemInput.remove(i);
            }
            nombreElemInput.add(firstOp);

            claveElemInput.disabled = true;
            nombreElemInput.disabled = true;
        }

    selectedNameElem = (e) => {
        let currentValue = e.currentTarget.value;
        let claveElemInput = document.getElementById("nombreElemInput");
        claveElemInput.value = currentValue;
    }

    selectedAcad = (e) => {
        let idAcad = parseInt(e.currentTarget.value);
        clearMateriasSelect();
        console.log(idAcad);

        if (/^([0-9])*$/.test(idAcad)) {
            materiasSelect.disabled = false;            

            readMateriasData = {
                purpose: 2,
                idAcademia: idAcad
            }
            $.ajax({
                url: '../../index_ajax.php?controller=materia&action=readMateria',
                type: 'POST',
                dataType: 'json',
                data: readMateriasData
            }).done(function (materiasAcademia) {
                insertMateriasIntoSelectAfterAcad(materiasAcademia);
            }).fail(function () {
                AJAXrequestFailed("Fallo en petición AJAX obtener materias de una academia");
            }); 
            
        } else {            
            let materiasSelect = document.getElementById("materiasSelect");
            materiasSelect.disabled = true;
            return;
        }
        
    }

        clearMateriasSelect = () => {
            let materiasSelect = document.getElementById("materiasSelect");
            for (i = materiasSelect.options.length - 1; i >= 0; i--) {
                materiasSelect.remove(i);
            }
            let opc = document.createElement("option");
            opc.textContent = "- Selecione una academia -"
            opc.value = "null"
            materiasSelect.add(opc);

            let claveElemInput = document.getElementById("claveElemInput");
            for (i = claveElemInput.options.length - 1; i >= 0; i--) {
                claveElemInput.remove(i);
            }
            opc = document.createElement("option");
            opc.textContent = "- Selecione una academia -"
            opc.value = "null"
            claveElemInput.add(opc);

            let nombreElemInput = document.getElementById("nombreElemInput");
            for (i = nombreElemInput.options.length - 1; i >= 0; i--) {
                nombreElemInput.remove(i);
            }
            opc = document.createElement("option");
            opc.textContent = "- Selecione una academia -"
            opc.value = "null"
            nombreElemInput.add(opc);

            materiasSelect.disabled = true;
            claveElemInput.disabled = true;
            nombreElemInput.disabled = true;

        }

        insertMateriasIntoSelectAfterAcad = (materiasAcademia) => {
            console.log(materiasAcademia);
            if (!materiasAcademia.error) {
                let materiasSelect = document.getElementById("materiasSelect");
                let materiasForSelect = materiasAcademia.materias;
                materiasSelect.remove(0);
                materiasSelect.disabled = false;
                let opc = document.createElement("option");
                opc.value = "null";
                opc.textContent = "- Seleccione una materia -";
                materiasSelect.add(opc);

                materiasForSelect.forEach(materia => {
                    let optionMateria = document.createElement("option");
                    optionMateria.value = materia.Id_Materia;
                    optionMateria.text = materia.Materia;
                    materiasSelect.add(optionMateria);
                });
            } else {       
                let academiaMateriaSelect = document.getElementById("academiaMateriaSelect");         
                let materiasSelect = document.getElementById("materiasSelect");
                academiaMateriaSelect.options[0].selected = true;
                materiasSelect.disabled = true;
                let mainmessage = "Lo sentimos pero no hay materias disponibles por parte de la academia que seleccionó.";
                let secmessage = "Presione el botón para continuar";
                showMessage("wArNinGbTn_AcTiOn", 0, mainmessage, secmessage);
            }
        }

    $("#createInstrumento").click(function (e) { verifyFromCreateInstrumento(); });
    $("#instruccLlenado").on('input', function (e) { updateLeftChars(e); });
    $("#materiasSelect").on('change', function (e) { updateNombreElemToEval(e); });
    $("#claveElemInput").on('change', function (e) { selectedNameElem(e); });
    $("#academiaMateriaSelect").on('change', function (e) { selectedAcad(e); });
});