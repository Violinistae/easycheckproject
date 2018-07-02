$(document).ready(function ($) {


    /* -------------------------- Lista de Cotejo ----------------------------- */
    cleanAndSaveEvalLC = (uncommitedChanges, actualAlumnoEval, Id_Instrumento) => {
        let numCurrentRows = uncommitedChanges.length;

        dataArraySaveLCEval = {
            Eval_FilasLC: uncommitedChanges,
            Alumno: actualAlumnoEval,
            numEvalFilasLC: numCurrentRows
        };

        $.ajax({
            url: '../../index_ajax.php?controller=evaluacionfilalistac&action=cleanAlumnoEvLCByFilaLC',
            type: 'POST',
            dataType: 'json',
            data: dataArraySaveLCEval
        }).done(function (resCleanEvLCRows) {
            if (!resCleanEvLCRows.error) {
                saveLCEvalchanges(dataArraySaveLCEval);
            }
        }).fail(function () {
            AJAXrequestFailed("Fallo en peticion AJAX para limpiar evaluacion de alumno con lista de cotejo");
        });
    }

        saveLCEvalchanges = (dataArraySaveLCEval) => {
            $.ajax({
                url: '../../index_ajax.php?controller=evaluacionfilalistac&action=saveAlumnoEvLC',
                type: 'POST',
                dataType: 'json',
                data: dataArraySaveLCEval
            }).done(function (resCleanEvLCRows) {
                if (!resCleanEvLCRows.error) {
                    alert("Cambios almacenados exitosamente");
                } else {
                    console.log("Error al almacenar los cambios en la BD");
                }
            }).fail(function () {
                AJAXrequestFailed("Fallo en peticion AJAX para almacenar evaluacion de alumno con lista de cotejo");
            });
        }

    getAndSetLCEvalRows = (actualAlumnoEval, Id_Instrumento) => {
        dataGetLCAlEval = {
            Alumno: actualAlumnoEval,
            Id_Instrumento: Id_Instrumento
        };

        $.ajax({
            url: '../../index_ajax.php?controller=evaluacionfilalistac&action=getEvalLCByAlumno',
            type: 'POST',
            dataType: 'json',
            data: dataGetLCAlEval
        }).done(function (resEvalLCAlum) {
            if (!resEvalLCAlum.error) {
                if (resEvalLCAlum.data != null) {

                    uncommitedChanges = resEvalLCAlum.data;

                    for (let i = 0; i < uncommitedChanges.length; ++i) {
                        let evalLC = document.getElementsByName("resLC-" + uncommitedChanges[i][0]);
                        for (let j = 0; j < evalLC.length; ++j) {
                            if (evalLC[j].value == parseInt(uncommitedChanges[i][1])) {
                                evalLC[j].checked = true;
                            }
                        }
                    }
                    
                }
            }
        }).fail(function () {
            AJAXrequestFailed("Fallo en peticion AJAX para obtener evaluacion de alumno con lista de cotejo");
        });
    }


});