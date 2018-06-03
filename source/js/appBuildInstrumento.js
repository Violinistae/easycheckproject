var tipoInstrumento;
var rowsInstrument = [];

$(document).ready(function ($) {

    
     
    getInstrumentData = () => {
        var JSON_CreatedInstrData = JSON.parse(sessionStorage.getItem("createdInst"));
        console.log(JSON_CreatedInstrData);

        tipoInstrumento = JSON_CreatedInstrData.tipoInstrumento;
        let claveElemento = JSON_CreatedInstrData.claveElemento;
        let nombreElemento = JSON_CreatedInstrData.nombreElemento;
        setInstrumentTypeNameKey(tipoInstrumento, claveElemento, nombreElemento);
    }

        setInstrumentTypeNameKey = (tipoInstrumento, claveElemento, nombreElemento) => {
            let typeInstrumentoLbl = document.getElementById("typeInstrumento");
            let claveNombreInstrumento = document.getElementById("claveNombreInstr");
            let headTable = document.getElementById("tableInstrumentHead");

            let URLHeadTable;

            switch (tipoInstrumento) {
                case 1:
                    typeInstrumentoLbl.textContent += "Rúbrica";
                    URLHeadTable = '../../sourcephp/views/buildInst/R/headRowR.php';
                    break;
                case 2:
                    typeInstrumentoLbl.textContent += "Lista de Cotejo";
                    URLHeadTable = '../../sourcephp/views/buildInst/LC/headRowLC.php';
                    break;
                case 3:
                    typeInstrumentoLbl.textContent += "Guía de Observación";
                    URLHeadTable = '../../sourcephp/views/buildInst/GO/headRowGO.php';
                    break;
                case 4:
                    typeInstrumentoLbl.textContent += "Cuestionario";
                    URLHeadTable = '../../sourcephp/views/buildInst/C/headRowC.php';
                    break;
            }

            claveNombreInstrumento.textContent = claveElemento + " - " + nombreElemento;
            
            $.ajax({
                url: URLHeadTable,
                type: 'POST'
            }).done(function (resHeadTable) {
                headTable.innerHTML = resHeadTable;
            }).fail(function () {
                AJAXrequestFailed("Fallo en petición AJAX para cargar head table build instrumento");
            });

                //Here for refresh or load existent rows

        }

        /**
         *  When refresh, load or update buildinstrumento page --> verifyTheInstrument table
         *  that for verifing existent rows and those rows push them to the rowsInstrument[]
        */
        //Verify changes --> if (saveCookie = newEditCookie)
        //Set saveCookie = newEditCookie -->  Push SaveChanges

    setNewHashToCookieAfterAction = () => {
        let newEditID = generateUUID();
        setCookie('&lxaAdCs3_¡#dl', newEditID, 1);
    }

        /**
         * Function to produce UUID.
         * See: http://stackoverflow.com/a/8809472
         */
        generateUUID = () => {
            var d = new Date().getTime();

            if (window.performance && typeof window.performance.now === "function") {
                d += performance.now();
            }

            var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
                var r = (d + Math.random() * 16) % 16 | 0;
                d = Math.floor(d / 16);
                return (c == 'x' ? r : (r & 0x3 | 0x8)).toString(16);
            });

            return uuid;
        }


    checkAddNewRowToInstrument = () => {
        let auxRow = null;
        switch (tipoInstrumento) {
            case 1:
                auxRow = addRRow(rowsInstrument.length + 1);
                break;
            case 2:
                auxRow = addLCRow(rowsInstrument.length + 1);
                break;
            case 3:
                auxRow = addGORow(rowsInstrument.length + 1);
                break;
            case 4:
                auxRow = addCRow(rowsInstrument.length + 1);
                break;
        }
        
        if (auxRow != null) {
            rowsInstrument.push(auxRow);
            setNewHashToCookieAfterAction();
            //console.log(rowsInstrument);
        }
    }

    updateSorted = () => {
        let posAux = $('#rowsContainer').sortable('toArray');
        let radiosValues = [];

        //Save radios
        for (let i = 0; i < posAux.length; ++i) {
            let elementToSort = document.getElementById(posAux[i]);
            radiosValues.push(saveRadiosValues(elementToSort));
        }

        //UpdateNames
        for (let i = 0; i < posAux.length; ++i) {
            let elementToSort = document.getElementById(posAux[i]);
            updateArrayAfterDrag(elementToSort, i + 1);
        }

        //Set radios
        for (let i = 0; i < posAux.length; ++i) {
            let n = i + 1;
            let aspEv = document.getElementsByName("aspEvRow" + n);
            for (let j = 1; j < 4; ++j) {
                if (j == radiosValues[i]) {
                    aspEv[j - 1].checked = true;
                }
            }
        }

        let rowsContainer = document.getElementById("rowsContainer");
        for (let i = 1; i < rowsContainer.childNodes.length; ++i) {
            let elementToSort = rowsContainer.childNodes[i];
            switch (tipoInstrumento) {
                case 1:
                    
                    break;
                case 2:
                    elementToSort.id = "rowLC" + (i - 1);
                    break;
                case 3:
                    elementToSort.id = "rowGO" + (i - 1);
                    break;
                case 4:

                    break;
            }
            
        }

        rowsInstrument = getArrayFormDataLCRows(posAux.length);
        setNewHashToCookieAfterAction();
        //console.log(rowsInstrument);
    }

        saveRadiosValues = (parentElement) => {
            let aspEvContainer = parentElement.childNodes[1];
            for (let i = 0; i < 3; ++i) {
                let inputAspEv = aspEvContainer.childNodes[i].childNodes[0];
                if (inputAspEv.checked) {
                    return inputAspEv.value;
                }
            }
        }

        updateArrayAfterDrag = (elemento, newIndex) => {
            let iElem =  newIndex - 1;
            replaceIdsAndNamesRowsGeneral(elemento, newIndex);
            switch (tipoInstrumento) {
                case 1:
                
                    break;
                case 2:
                    replaceIdsAndNamesRowsLC(elemento, newIndex);
                    break;
                case 3:
                    replaceIdsAndNamesRowsLC(elemento, newIndex);
                    replaceIdsAndNamesRowsGO(elemento, newIndex);
                    break;
                case 4:
                    
                    break;
            }
        }

            replaceIdsAndNamesRowsGeneral = (parentElement, index) => {
                let numElemContainer = parentElement.childNodes[0];
                let aspEvContainer = parentElement.childNodes[1];
                
                let lastIndexRowInst = parentElement.childNodes.length - 1;
                let deleteRowContainer = parentElement.childNodes[lastIndexRowInst];

                numElemContainer.id = "numElem" + index;
                let numElem = numElemContainer.childNodes[0];                  /** */
                numElem.id = "numElemento" + index;
                numElem.textContent = index;


                for (let i = 0; i < 3; ++i) {
                    let inputAspEv = aspEvContainer.childNodes[i].childNodes[0];
                    inputAspEv.name = "aspEvRow" + index;
                    inputAspEv.setAttribute("dataq", index - 1);
                }

                deleteRowContainer.id = "deleteRow" + index;

                let deleteRowBtn = deleteRowContainer.childNodes[0];
                deleteRowBtn.id = "deleteRowBtn" + index;
                deleteRowBtn.setAttribute("dataq", index - 1);
            }

        getArrayFromDataRows = (numRows) => {
            let auxArr = [];
            switch (tipoInstrumento) {
                case 1:

                    break;
                case 2:
                    auxArr = getArrayFormDataLCRows(numRows);
                    break;
                case 3:
                    auxArr = getArrayFormDataLCRows(numRows);
                    break;
                case 4:

                    break;
            }
            return auxArr;
        }


    deleteInstrumentRow = (e) => {
        let indexArrayRows = parseInt(e.currentTarget.getAttribute("dataq"));

        let rowsContainer = document.getElementById("rowsContainer");
        rowsContainer.removeChild(rowsContainer.childNodes[indexArrayRows + 1]);
        
        updateSorted();
    }

    checkContentAndSaveChanges = () => {
        alert("Ready for save changes. First delete from DB and then get rowsInstrument[]");
    }

/* --------------------------------------------------------------------------------------------------------------------- */

    createAspEv = (rowElem, newIndexArray) => {
        for (let j = 0; j < 3; ++j) {
            let auxDiv = document.createElement("div");
            auxDiv.classList.add("aspEvDiv");

            let auxText;
            auxCol = document.createElement("input");
            auxCol.setAttribute("type", "radio");
            auxCol.setAttribute("name", "aspEvRow" + newIndexArray);
            auxCol.setAttribute("dataq", newIndexArray - 1);
            auxCol.classList.add("aspEvInst");
            auxCol.classList.add("aspEvItem");
            auxCol.value = j + 1;

            auxText = document.createElement("label");
            auxText.classList.add("aspEvItem");

            if (j == 0) {
                auxText.textContent = "Saber";
                auxCol.checked = true;
            } else if (j == 1) {
                auxText.textContent = "Hacer";
            } else if (j == 2) {
                auxText.textContent = "Ser";
            }

            auxDiv.appendChild(auxCol);
            auxDiv.appendChild(auxText);
            rowElem.appendChild(auxDiv);

        }
    }

    createIndicadoresEv = (rowElem, newIndexArray) => {
        auxCol = document.createElement("div");
        let txtIndEv = document.createElement("textarea");
        let lblLeftChar = document.createElement("label");

        auxCol.classList.add("lblsindicadoresEv");
        lblLeftChar.id = "countCharIndicadoresEv" + newIndexArray;
        lblLeftChar.textContent = "Caracteres restantes: 260";
        auxCol.appendChild(lblLeftChar);

        txtIndEv.classList.add("indicadoresEv");
        txtIndEv.id = "indicadoresEv" + newIndexArray;
        txtIndEv.setAttribute("name", "indicadoresEv" + newIndexArray);
        txtIndEv.setAttribute("dataq", newIndexArray - 1);
        txtIndEv.setAttribute("autocomplete", "off");

        rowElem.appendChild(auxCol);
        rowElem.appendChild(txtIndEv);
        return txtIndEv.value;
    }

/* --------------------------------------------------------------------------------------------------------------------- */

    changeAspEvRadio = (e) => {
        let newRadioValue = parseInt(e.currentTarget.value);
        let indexRowChanged = e.currentTarget.getAttribute('dataq');
        rowsInstrument[indexRowChanged][1] = newRadioValue;
        setNewHashToCookieAfterAction();
    }

    changeIndevTxt = (e) => {
        let strTxtAreaChanged = e.currentTarget.value;
        let indexRowChanged = e.currentTarget.getAttribute('dataq');

        let res = updateLeftCharstxtArea(e.currentTarget);

        if (res == 1) {
            rowsInstrument[indexRowChanged][2] = strTxtAreaChanged;   
            setNewHashToCookieAfterAction();
        }
        
    }

        updateLeftCharstxtArea = (eTrigger) => {
            let instLlenadoTxtArea = eTrigger;
            let indexTxtAreaChanged = parseInt(eTrigger.id.replace("indicadoresEv", ""));
            let lblLeftChars = document.getElementById("countCharIndicadoresEv" + indexTxtAreaChanged);
            let leftChars = 260 - instLlenadoTxtArea.value.length;

            if (leftChars >= 0) {
                lblLeftChars.textContent = "Caracteres restantes: " + leftChars;
                return 1;
            } else {
                instLlenadoTxtArea.value = instLlenadoTxtArea.value.substring(0, instLlenadoTxtArea.value.length - 1);
                return 0;
            }

        }

    changePondElem = (e) => {
        let pondElem = parseInt(e.currentTarget.value);
        let indexRowChanged = e.currentTarget.getAttribute('dataq');

        if (pondElem <= 100 && pondElem >= 1) {
            rowsInstrument[indexRowChanged][3] = pondElem;
            setNewHashToCookieAfterAction();
        } else if (pondElem < 1 || pondElem > 100) {
            e.currentTarget.value = "";
        }
    }
    

/* --------------------------------------------------------------------------------------------------------------------- */
    
    /** Event Triggers for All Instrumentos */
    $("#saveChangesBtn").click(function (e) { checkContentAndSaveChanges(); });
    $("#addRowBtn").click(function (e) { setNewHashToCookieAfterAction(); checkAddNewRowToInstrument(); });    
    $('body').on('change', '.aspEvInst', function (e) { changeAspEvRadio(e); });
    $('body').on('click', '.deleteRowBtn', function (e) { deleteInstrumentRow(e); })


    $('#rowsContainer').sortable({
        stop: function (e, ui) {
            updateSorted();
        }
    });
    $('#rowsContainer').disableSelection();



    /** Event Triggers for Lista de Cotejo && Guia de Observación */
    $('body').on('input', '.indicadoresEv', function (e) { changeIndevTxt(e); });

    /** Event Triggers for Rubrica */


    /** Event Triggers for Lista de Cotejo */


    /** Event Triggers for Guia de Observación */    
    $('body').on('input', '.ponderacionElemento', function (e) { changePondElem(e); });

    /** Event Triggers for Cuestionario */



/* --------------------------------------------------------------------------------------------------------------------- */

    getInstrumentData();    

});