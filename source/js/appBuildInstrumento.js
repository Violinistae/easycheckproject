$(document).ready(function ($) {

    getInstrumentData = () => {
        var JSON_CreatedInstrData = JSON.parse(sessionStorage.getItem("createdInst"));
        console.log(JSON_CreatedInstrData);

        let tipoInstrumento = JSON_CreatedInstrData.tipoInstrumento;
        let claveElemento = JSON_CreatedInstrData.claveElemento;
        let nombreElemento = JSON_CreatedInstrData.nombreElemento;
        setInstrumentTypeNameKey(tipoInstrumento, claveElemento, nombreElemento);
    }

        setInstrumentTypeNameKey = (tipoInstrumento, claveElemento, nombreElemento) => {
            let typeInstrumentoLbl = document.getElementById("typeInstrumento");
            let claveNombreInstrumento = document.getElementById("claveNombreInstr");

            switch (tipoInstrumento) {
                case 1:
                    typeInstrumentoLbl.textContent += "Rúbrica";
                    break;
                case 2:
                    typeInstrumentoLbl.textContent += "Lista de Cotejo";
                    break;
                case 3:
                    typeInstrumentoLbl.textContent += "Guía de Observación";
                    break;
                case 4:
                    typeInstrumentoLbl.textContent += "Cuestionario";
                    break;
            }

            claveNombreInstrumento.textContent = claveElemento + " - " + nombreElemento;

        }

/* --------------------------------------------------------------------------------------------------------------------- */

    /** Event Triggers for Rubrica */


    /** Event Triggers for Lista de Cotejo */



    /** Event Triggers for Guia de Observación */    



    /** Event Triggers for Cuestionario */



/* --------------------------------------------------------------------------------------------------------------------- */
    getInstrumentData();

});