$(document).ready(function ($) {

    getInstrumentData = () => {
        var JSON_CreatedInstrData = JSON.parse(sessionStorage.getItem("createdInst"));
        console.log(JSON_CreatedInstrData);
    }

/* --------------------------------------------------------------------------------------------------------------------- */

    /** Event Triggers for Rubrica */


    /** Event Triggers for Lista de Cotejo */



    /** Event Triggers for Guia de Observación */    



    /** Event Triggers for Cuestionario */



/* --------------------------------------------------------------------------------------------------------------------- */
    getInstrumentData();

});