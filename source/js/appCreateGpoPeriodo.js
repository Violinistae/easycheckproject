$(document).ready(function ($) {
    
    selectedAcadGpoP = (e) => {
        let idAcad = parseInt(e.currentTarget.value);
        clearMateriasSelectGpoP();
        console.log(idAcad);

        if (/^([0-9])*$/.test(idAcad)) {
            let materiasSelect = document.getElementById("materiaSelect");
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
                insertMateriasIntoSelectAfterAcadGpoP(materiasAcademia);
            }).fail(function () {
                AJAXrequestFailed("Fallo en petición AJAX obtener materias de una academia");
            });

        } else {
            let materiasSelect = document.getElementById("materiaSelect");
            materiasSelect.disabled = true;
            return;
        }

    }

    clearMateriasSelectGpoP = () => {
        let materiasSelect = document.getElementById("materiaSelect");
        for (i = materiasSelect.options.length - 1; i >= 0; i--) {
            materiasSelect.remove(i);
        }
        let opc = document.createElement("option");
        opc.textContent = "- Selecione una academia -"
        opc.value = "null"
        materiasSelect.add(opc);

        materiasSelect.disabled = true;

    }

        insertMateriasIntoSelectAfterAcadGpoP = (materiasAcademia) => {
            //console.log(materiasAcademia);
            if (!materiasAcademia.error) {
                let materiasSelect = document.getElementById("materiaSelect");
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
                let academiaMateriaSelect = document.getElementById("academiaSelect");         
                let materiasSelect = document.getElementById("materiaSelect");
                academiaMateriaSelect.options[0].selected = true;
                materiasSelect.disabled = true;
                let mainmessage = "Lo sentimos pero no hay materias disponibles por parte de la academia que seleccionó.";
                let secmessage = "Presione el botón para continuar";
                showMessage("wArNinGbTn_AcTiOn", 0, mainmessage, secmessage);
            }
        }


/* --------------------------------------------------------------------------- */

    checkCreateGpoPFields = (e) => {
        e.preventDefault();

        $("#creategpoperbtn").prop("disabled", true);

        var flag = false;
        var inputsCreateMateria = $("#createGpoPeriodoInputs input");

        //Verificar campos vacíos
        $(inputsCreateMateria).each(function verifyCreateMateriaInput() {
            if (flag)
                return;
            if ($(this).val().length == 0) {
                var mainmessage = "Por favor llene todos los campos del formulario para crear un Grupo Periodo.";
                var secmessage = "Presione el botón para continuar";
                showMessage("wArNinGbTn_AcTiOn", 420, mainmessage, secmessage);
                flag = true;
            }
        });

        var realFileName;
        var fileType;
        var newRealFileName;

        if (!flag) {
            var academiaSelect = document.getElementById("academiaSelect");
            var materiaSelect = document.getElementById("materiaSelect");
            var periodoCiclo = document.getElementById("periodoCiclo");
            var periodoYear = document.getElementById("periodoYear");
            var grupoSelect = document.getElementById("grupoSelect");
            var claveAccesoInput = document.getElementById("claveAccesoInput");
            var claveAccesoVerf = document.getElementById("claveAccesoVerf");
            var fileInput = document.getElementById("listaAlumFile");

            //Split file name to basic name (no extension) and get fileType
            var splitedFileName = fileInput.value.split("\\");
            var originFileName = splitedFileName[2];
            originFileName = originFileName.replace(/\s+/g, '');
            var splitedOriginFileName = originFileName.split(".");

            realFileName = splitedOriginFileName[0];
            fileType = splitedOriginFileName[1];

            //Checks: range of semestre and fileType
            if (academiaSelect.value == "null") {
                var mainmessage = "Por favor seleccione una academia.";
                var secmessage = "Presione el botón para continuar";
                showMessage("wArNinGbTn_AcTiOn", 420, mainmessage, secmessage);
                return;
            } if (materiaSelect.value == "null") {
                var mainmessage = "Por favor seleccione una materia.";
                var secmessage = "Presione el botón para continuar";
                showMessage("wArNinGbTn_AcTiOn", 420, mainmessage, secmessage);
                return;
            } if (grupoSelect.value == "null") {
                var mainmessage = "Por favor seleccione un grupo.";
                var secmessage = "Presione el botón para continuar";
                showMessage("wArNinGbTn_AcTiOn", 420, mainmessage, secmessage);
                return;
            } if (periodoCiclo.value != "Feb-Jun" && periodoCiclo.value != "Ago-Dic") {
                var mainmessage = "Seleccione un periodo válido para el ciclo escolar.";
                var secmessage = "Presione el botón para continuar";
                showMessage("wArNinGbTn_AcTiOn", 420, mainmessage, secmessage);
                return;
            } if (/^([0-9])*$/.test(e.currentTarget.value)) {
                var mainmessage = "Seleccione un año válido para el ciclo escolar.";
                var secmessage = "Presione el botón para continuar";
                showMessage("wArNinGbTn_AcTiOn", 420, mainmessage, secmessage);
                return;
            } if (claveAccesoInput.value != claveAccesoVerf.value) {
                var mainmessage = "Las claves de acceso no coinciden.";
                var secmessage = "Presione el botón para continuar";
                showMessage("wArNinGbTn_AcTiOn", 420, mainmessage, secmessage);
                return;
            } if (claveAccesoInput.value.length > 20 || claveAccesoInput.value.length < 8) {
                var mainmessage = "Por favor ingrese una clave de acceso mayor a 7 caracteres y menor a 21.";
                var secmessage = "Presione el botón para continuar";
                showMessage("wArNinGbTn_AcTiOn", 420, mainmessage, secmessage);
                return;
            } if (fileType != "xlsx") {
                var mainmessage = "Por favor adjunte un archivo de extenión .xlsx (archivo Excel).";
                var secmessage = "Presione el botón para continuar";
                showMessage("wArNinGbTn_AcTiOn", 420, mainmessage, secmessage);
                return;
            }

            //Generated fileName, no extension
            var num = Math.random() * 10000;
            var numForFile = Math.round(num);
            newRealFileName = "listaAlum" + numForFile.toString() + realFileName;

            var dataFile = new FormData();
            dataFile.append('fileType', fileType);
            dataFile.append('file', fileInput.files[0]);
            dataFile.append('fileName', newRealFileName);
            dataFile.append('targetPath', "./source/files/temp/");
            dataFile.append('targetPathTxt', "./source/files/listasGruposPeriodos/");

            $.ajax({
                url: '../../index_ajax.php?controller=file&action=saveFile_getPathForJS',
                type: 'POST',
                contentType: false,
                processData: false,
                data: dataFile
            }).done(function (responseCheckExcelFile) {
                try {
                    var JSONres = JSON.parse(responseCheckExcelFile);
                    if (!JSONres.error) {
                        var saveTxtPath = "source/files/listasGruposPeriodos/";
                        //file Xlsx path, file Name, purpose, pathSaveTxt converted JSON, updateFileOption, oldNameFile, Function to do, params function to do                        
                        getXlsxFileCreateJSON(JSONres.filePath, JSONres.fileName, 3, saveTxtPath, false, null, sendDataForCreateGpoPeriodo, null);
                    } else {
                        var mainmessage = JSONres.message;
                        var secmessage = "Presione el botón para continuar";
                        showMessage("wArNinGbTn_AcTiOn", 410, mainmessage, secmessage);
                    }
                } catch (Exception) {
                    console.log(Exception);
                    var mainmessage = "Error inesperado. Inténtelo más tarde.";
                    var secmessage = "Presione el botón para continuar";
                    showMessage("wArNinGbTn_AcTiOn", 410, mainmessage, secmessage);
                }
            }).fail(function () {
                AJAXrequestFailed("No funciona petición AJAX para crear verificar Excel.");
            });

        }

    }


    sendDataForCreateGpoPeriodo = (fileName, parmX) => {        
        var materiaSelect = document.getElementById("materiaSelect");
        var periodoCiclo = document.getElementById("periodoCiclo");
        var periodoYear = document.getElementById("periodoYear");
        var grupoSelect = document.getElementById("grupoSelect");
        var claveAccesoInput = document.getElementById("claveAccesoInput");

        newGpoPParam = {
            Materia: materiaSelect.value,
            Grupo: grupoSelect.value,
            Periodo: periodoCiclo.value + " " + periodoYear.value,
            Lista_Alumnos: fileName,
            Clave_Acceso: claveAccesoInput.value
        };

        $.ajax({
            url: '../../index_ajax.php?controller=grupoperiodo&action=insertGrupoPeriodo',
            type: 'POST',
            dataType: 'json',
            data: newGpoPParam
        }).done(function (insertMateriaRes) {
            if (!insertMateriaRes.error) {
                if (!insertMateriaRes.alreadyExists) {
                    var mainmessage = "Grupo periodo creado exitosamente";
                    var secmessage = "Presione el botón para continuar";
                    showMessage("wArNinGbTn_AcTiOn", 20, mainmessage, secmessage);
                } else {
                    var mainmessage = "El grupo periodo que desea crear ya existe, intentelo con información diferente.";
                    var secmessage = "Presione el botón para continuar";
                    showMessage("wArNinGbTn_AcTiOn", 420, mainmessage, secmessage);
                }
            } else {                
                var mainmessage = insertMateriaRes.message;
                var secmessage = "Presione el botón para continuar";
                showMessage("wArNinGbTn_AcTiOn", 420, mainmessage, secmessage);
            }
        }).fail(function () {
            AJAXrequestFailed("No funciona petición AJAX para crear grupo periodo.");
        });



    }


/* --------------------------------------------------------------------------- */


    $('body').on('submit', '#createGpoPeriodoInputs', function (e) { checkCreateGpoPFields(e); });
    $("#academiaSelect").on('change', function (e) { selectedAcadGpoP(e); });
    
});