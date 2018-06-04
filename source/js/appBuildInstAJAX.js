$(document).ready(function ($) {

    /* -------------------------- Lista de Cotejo ----------------------------- */

    cleanAndSaveLC = (rowsI, idBuildingInst) => {
        let numCurrentRows = rowsI.length;
        
        dataArray = {
            Id_Instrumento: idBuildingInst
        };

        $.ajax({
            url: '../../index_ajax.php?controller=listacotejo&action=cleanListaCotejo',
            type: 'POST',
            dataType: 'json',
            data: dataArray
        }).done(function (resCleanLCRows) {
            saveLCchanges(rowsI, idBuildingInst, numCurrentRows);
        }).fail(function () {
            AJAXrequestFailed("Fallo en peticion AJAX para limpiar lista de cotejo");
        });
    }

        saveLCchanges = (rowsI, idBuildingInst, numCurrentRows) => {
            dataArray = {
                rowsI: rowsI,
                Id_Instrumento: idBuildingInst,
                numRowsI: numCurrentRows
            }

            $.ajax({
                url: '../../index_ajax.php?controller=listacotejo&action=saveListaCotejo',
                type: 'POST',
                dataType: 'json',
                data: dataArray
            }).done(function (resSaveLCchanges) {
                if (!resSaveLCchanges.error) {
                    alert("Cambios almacenados exitosamente");
                } else {
                    console.log("Error al almacenar los cambios en la BD");
                }
            }).fail(function () {
                AJAXrequestFailed("Fallo en peticion AJAX para almacenar cambios en lista de cotejo");
            });
        }

    /* ------------------------ Guía de Observación --------------------------- */

    cleanAndSaveGO = (rowsI, idBuildingInst) => {
        let numCurrentRows = rowsI.length;
        
        dataArray = {
            Id_Instrumento: idBuildingInst
        };

        $.ajax({
            url: '../../index_ajax.php?controller=guiadeobservacion&action=cleanGuiaObs',
            type: 'POST',
            dataType: 'json',
            data: dataArray
        }).done(function (resCleanGORows) {
            saveGOchanges(rowsI, idBuildingInst, numCurrentRows);
        }).fail(function () {
            AJAXrequestFailed("Fallo en peticion AJAX para limpiar lista de cotejo");
        });
    }

        saveGOchanges = (rowsI, idBuildingInst, numCurrentRows) => {
            dataArray = {
                rowsI: rowsI,
                Id_Instrumento: idBuildingInst,
                numRowsI: numCurrentRows
            }

            $.ajax({
                url: '../../index_ajax.php?controller=guiadeobservacion&action=saveGuiaObs',
                type: 'POST',
                dataType: 'json',
                data: dataArray
            }).done(function (resSaveGOchanges) {
                if (!resSaveGOchanges.error) {
                    alert("Cambios almacenados exitosamente");
                } else {
                    console.log("Error al almacenar los cambios en la BD");
                }
            }).fail(function () {
                AJAXrequestFailed("Fallo en peticion AJAX para almacenar cambios en lista de cotejo");
            });
        }


    /* --------------------------- Cuestionario ------------------------------ */


});