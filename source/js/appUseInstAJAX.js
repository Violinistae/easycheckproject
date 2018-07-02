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

    /* -------------------------- Guia de Observacion ----------------------------- */
    cleanAndSaveEvalGO = (uncommitedChanges, actualAlumnoEval, Id_Instrumento) => {
        let numCurrentRows = uncommitedChanges.length;

        dataArraySaveGOEval = {
            Eval_FilasGO: uncommitedChanges,
            Alumno: actualAlumnoEval,
            numEvalFilasGO: numCurrentRows
        };

        $.ajax({
            url: '../../index_ajax.php?controller=evaluacionfilaguiaobs&action=cleanAlumnoEvLCByFilaGO',
            type: 'POST',
            dataType: 'json',
            data: dataArraySaveGOEval
        }).done(function (resCleanEvGORows) {
            if (!resCleanEvGORows.error) {
                saveGOEvalchanges(dataArraySaveGOEval);
            }
        }).fail(function () {
            AJAXrequestFailed("Fallo en peticion AJAX para limpiar evaluacion de alumno con GO");
        });
    }

    saveGOEvalchanges = (dataArraySaveGOEval) => {
        $.ajax({
            url: '../../index_ajax.php?controller=evaluacionfilaguiaobs&action=saveAlumnoEvGO',
            type: 'POST',
            dataType: 'json',
            data: dataArraySaveGOEval
        }).done(function (resCleanEvGORows) {
            if (!resCleanEvGORows.error) {
                alert("Cambios almacenados exitosamente");
            } else {
                console.log("Error al almacenar los cambios en la BD");
            }
        }).fail(function () {
            AJAXrequestFailed("Fallo en peticion AJAX para almacenar evaluacion de alumno con GO");
        });
    }

    getAndSetGOEvalRows = (actualAlumnoEval, Id_Instrumento) => {
        dataGetGOAlEval = {
            Alumno: actualAlumnoEval,
            Id_Instrumento: Id_Instrumento
        };

        $.ajax({
            url: '../../index_ajax.php?controller=evaluacionfilaguiaobs&action=getEvalGOByAlumno',
            type: 'POST',
            dataType: 'json',
            data: dataGetGOAlEval
        }).done(function (resEvalGOAlum) {
            if (!resEvalGOAlum.error) {
                if (resEvalGOAlum.data != null) {

                    uncommitedChanges = resEvalGOAlum.data;

                    for (let i = 0; i < uncommitedChanges.length; ++i) {
                        let evalGO = document.getElementsByName("resGO-" + uncommitedChanges[i][0]);
                        for (let j = 0; j < evalGO.length; ++j) {
                            if (evalGO[j].value == parseInt(uncommitedChanges[i][1])) {
                                evalGO[j].checked = true;
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