var tipoInstrumento;
var rowsInstrument = [];

//Verify user session here

$(document).ready(function ($) {

    window.onbeforeunload = function (e) {

        if (getCookie('s&b!pd?_#d') == getCookie("&lxaAdCs3_¡#dl")) {

        } else {
            return "Han sido detectados algunos cambios, ¿está seguro de abandonar la página? Los cambios no almacenados serán descartados.";
        }

    }
    
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

            setNewHashToCookieAfterAction();
            updateSaveChangesCookie();


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
                displayAddQuestion();
                break;
        }
        
        if (auxRow != null && tipoInstrumento != 4) {
            //console.log(auxRow);
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
                    elementToSort.id = "rowC" + (i - 3);
                    break;
            }
            
        }

        rowsInstrument = getArrayFromDataRows(posAux.length);
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
                    replaceIdsAndNamesRowsC(elemento, newIndex);
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
                    auxArr = getArrayFormDataGORows(numRows);
                    break;
                case 4:
                    auxArr = getArrayFormDataCRows(numRows);
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
        updateSaveChangesCookie();
        //alert("Ready for save changes. First delete from DB and then get rowsInstrument[]");
    }

        updateSaveChangesCookie = () => {
            let lastChangeDetected = getCookie("&lxaAdCs3_¡#dl");
            setCookie('s&b!pd?_#d', lastChangeDetected, 1);
        }

    checkTypeCToCreateRow = (e) => {
        $("#questionTypeDropMenu").removeClass('active');
        let typeC = e.currentTarget.getAttribute("dataCT");

        let auxRow = null;

        if (typeC > 1 && typeC < 5) {
            auxRow = addCCommonRow (rowsInstrument.length + 1, parseInt(typeC));
        } else if (typeC == 1) {
            auxRow = addCMultipleRow(rowsInstrument.length + 1, parseInt(typeC));
        }

        if (auxRow != null) {
            //console.log(auxRow);
            rowsInstrument.push(auxRow);
            setNewHashToCookieAfterAction();
        }

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

    createPreguntaTxtArea = (rowElem, newIndexArray, typeC) => {
        auxCol = document.createElement("div");
        let pregTxtArea = document.createElement("textarea");
        let lblTypeC = document.createElement("label");
        let lblLeftChar = document.createElement("label");

        auxCol.classList.add("lblsPregTxtArea");

        lblTypeC.id = "lblTypeC" + newIndexArray;
        lblLeftChar.id = "countCharPreg" + newIndexArray;
        lblLeftChar.textContent = "Caracteres restantes: 260";
        
        pregTxtArea.classList.add("pregTxtArea");
        pregTxtArea.id = "pregTxtArea" + newIndexArray;
        pregTxtArea.setAttribute("name", "pregTxtArea" + newIndexArray);
        pregTxtArea.setAttribute("dataq", newIndexArray - 1);
        pregTxtArea.setAttribute("autocomplete", "off");

        let auxDivPreg = document.createElement("div");
        auxDivPreg.classList.add("pregCol");

        switch (typeC) {
            case 1:
                lblTypeC.textContent = "Opción múltiple"; 
                lblTypeC.setAttribute("datacty", 1); 
                break;
            case 2: 
                lblTypeC.textContent = "Completar campo"; 
                lblTypeC.setAttribute("datacty", 2); 
                break;
            case 3: 
                lblTypeC.textContent = "Pregunta cerrada"; 
                lblTypeC.setAttribute("datacty", 3); 
                break;
            case 4: 
                lblTypeC.textContent = "Pregunta abierta"; 
                lblTypeC.setAttribute("datacty", 4); 
                break;
        }        

        auxCol.appendChild(lblTypeC);
        auxCol.appendChild(lblLeftChar);
        auxDivPreg.appendChild(auxCol);
        auxDivPreg.appendChild(pregTxtArea);
        rowElem.appendChild(auxDivPreg);

        return pregTxtArea.value;
        
    }

    createMultipleOpPreg = (rowElem, newIndexArray, typeC) => {
        
        let allPregArr = [];
        let pregValue = createPreguntaTxtArea(rowElem, newIndexArray, typeC);
        let arrOpcPreg = [];

        let auxDivRes = document.createElement("div");
        auxDivRes.classList.add("resCol");
        auxDivRes.id = "resCol" + newIndexArray;

        let opcPregPart = document.createElement("div");
        opcPregPart.classList.add("opcPregPart");

        for (let i = 1; i < 3; i++) {
            let simpleOption = [];
            let pregOpcion = document.createElement("div");
            pregOpcion.classList.add("pregOpcion");

            let lblsPregOpcTxtArea = document.createElement("div");
            lblsPregOpcTxtArea.classList.add("lblsPregOpcTxtArea");

                let countCharPregOpc = document.createElement("label");
                countCharPregOpc.id = "countCharPregOpc" + newIndexArray + "" + i;
                countCharPregOpc.textContent = "Restantes: 60";
                lblsPregOpcTxtArea.appendChild(countCharPregOpc);

            let opcPregTxtInput = document.createElement("input");
            opcPregTxtInput.classList.add("opcPregTxtInput");
            opcPregTxtInput.id = "opcPregTxtInput" + newIndexArray + "" + i;
            opcPregTxtInput.name = "opcPregTxtInput" + newIndexArray + "" + i;
            opcPregTxtInput.setAttribute("dataqop", i - 1);
            opcPregTxtInput.setAttribute("autocomplete", "off");
            opcPregTxtInput.setAttribute("type", "text");

            if (i == 1) {
                opcPregTxtInput.setAttribute("placeholder", "Opción A");
                simpleOption.push("A");
            } else if (i == 2) {
                opcPregTxtInput.setAttribute("placeholder", "Opción B");
                simpleOption.push("B");
            }

            simpleOption.push(opcPregTxtInput.value);
            arrOpcPreg.push(simpleOption);
            
            pregOpcion.appendChild(lblsPregOpcTxtArea);
            pregOpcion.appendChild(opcPregTxtInput);

            opcPregPart.appendChild(pregOpcion);
        }
        auxDivRes.appendChild(opcPregPart);


        opcPregPart = document.createElement("div");
        opcPregPart.classList.add("opcPregPart");

        for (let i = 3; i < 5; i++) {
            let simpleOption = [];
            let pregOpcion = document.createElement("div");
            pregOpcion.classList.add("pregOpcion");

            let lblsPregOpcTxtArea = document.createElement("div");
            lblsPregOpcTxtArea.classList.add("lblsPregOpcTxtArea");

            let countCharPregOpc = document.createElement("label");
            countCharPregOpc.id = "countCharPregOpc" + newIndexArray + "" + i;
            countCharPregOpc.textContent = "Restantes: 60";
            lblsPregOpcTxtArea.appendChild(countCharPregOpc);

            let opcPregTxtInput = document.createElement("input");
            opcPregTxtInput.classList.add("opcPregTxtInput");
            opcPregTxtInput.id = "opcPregTxtInput" + newIndexArray + "" + i;
            opcPregTxtInput.name = "opcPregTxtInput" + newIndexArray + "" + i;
            opcPregTxtInput.setAttribute("dataqop", i - 1);
            opcPregTxtInput.setAttribute("autocomplete", "off");
            opcPregTxtInput.setAttribute("type", "text");

            if (i == 3) {
                opcPregTxtInput.setAttribute("placeholder", "Opción C");
                simpleOption.push("C");
            } else if (i == 4) {
                opcPregTxtInput.setAttribute("placeholder", "Opción D");
                simpleOption.push("D");
            }

            simpleOption.push(opcPregTxtInput.value);
            arrOpcPreg.push(simpleOption);

            pregOpcion.appendChild(lblsPregOpcTxtArea);
            pregOpcion.appendChild(opcPregTxtInput);

            opcPregPart.appendChild(pregOpcion);

        }
        auxDivRes.appendChild(opcPregPart);

        allPregArr.push(pregValue);
        allPregArr.push(arrOpcPreg);

        rowElem.appendChild(auxDivRes);

        return allPregArr;
    }

    createPonderacionElemento = (rowElem, newIndexArray) => {
        let pondElem = document.createElement("input");

        pondElem.classList.add("ponderacionElemento");
        pondElem.id = "pondElem" + newIndexArray;
        pondElem.setAttribute("dataq", newIndexArray - 1);
        pondElem.setAttribute("autocomplete", "off");
        pondElem.setAttribute("type", "text");

        rowElem.appendChild(pondElem);

        if (pondElem.value == "")
            return 0;
        else
            return parseInt(pondElem.value);
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
            let txtArea = eTrigger;
            let indexTxtAreaChanged = parseInt(eTrigger.id.replace("indicadoresEv", ""));
            let lblLeftChars = document.getElementById("countCharIndicadoresEv" + indexTxtAreaChanged);
            let leftChars = 260 - txtArea.value.length;

            if (leftChars >= 0) {
                lblLeftChars.textContent = "Caracteres restantes: " + leftChars;
                return 1;
            } else {
                txtArea.value = txtArea.value.substring(0, txtArea.value.length - 1);
                return 0;
            }

        }

    changePondElem = (e) => {
        let pondElem = e.currentTarget;
        let indexRowChanged = e.currentTarget.getAttribute('dataq');

        if (/^([0-9])*$/.test(pondElem.value)){
            if (parseInt(pondElem.value) <= 100 && parseInt(pondElem.value) >= 1) {
                rowsInstrument[indexRowChanged][3] = parseInt(pondElem.value);
                setNewHashToCookieAfterAction();
            } else if (pondElem.value < 1 || pondElem.value > 100) {
                pondElem.value = pondElem.value.substring(0, pondElem.value.length - 1);
                return;
            }   
        } else {
            rowsInstrument[indexRowChanged][3] = 0;
            pondElem.value = pondElem.value.substring(0, pondElem.value.length - 1);
            return;
        }
        
    }
    
    changePreg = (e) => {
        let strTxtAreaChanged = e.currentTarget.value;
        let indexRowChanged = parseInt(e.currentTarget.getAttribute('dataq'));
        let indexTypeC = indexRowChanged + 1;
        let res = updateLeftCharsPreg(e.currentTarget);
        let typeC = parseInt(document.getElementById("lblTypeC" + indexTypeC).getAttribute("dataCTy"));

        if (res == 1) {
            if (typeC == 1) {
                rowsInstrument[indexRowChanged][2][0] = strTxtAreaChanged;
            } else if (typeC > 1 && typeC < 5) {
                rowsInstrument[indexRowChanged][2] = strTxtAreaChanged;
            }
            setNewHashToCookieAfterAction();
        }
    }

        updateLeftCharsPreg = (eTrigger) => {
            let txtArea = eTrigger;
            let indexTxtAreaChanged = parseInt(eTrigger.id.replace("pregTxtArea", ""));
            let lblLeftChars = document.getElementById("countCharPreg" + indexTxtAreaChanged);
            let leftChars = 260 - txtArea.value.length;

            if (leftChars >= 0) {
                lblLeftChars.textContent = "Caracteres restantes: " + leftChars;
                return 1;
            } else {
                txtArea.value = txtArea.value.substring(0, txtArea.value.length - 1);
                return 0;
            }

        }

    changeOpcPreg = (e) => {
        let strTxtAreaChanged = e.currentTarget.value;
        let indSec = e.currentTarget.getAttribute("dataqop");
        let indexRowChanged = parseInt(e.currentTarget.id.replace("opcPregTxtInput", ""));
        let res = updateLeftCharsOption(e.currentTarget);
        
        if (res == 1) {
            let iDec = Math.floor(indexRowChanged / 10) - 1;
            rowsInstrument[iDec][2][1][indSec][1] = strTxtAreaChanged;
        }
    }

        updateLeftCharsOption = (eTrigger) => {
            let txtArea = eTrigger;
            let indexTxtAreaChanged = parseInt(eTrigger.id.replace("opcPregTxtInput", ""));
            let lblLeftChars = document.getElementById("countCharPregOpc" + indexTxtAreaChanged);
            let leftChars = 60 - txtArea.value.length;

            if (leftChars >= 0) {
                lblLeftChars.textContent = "Restantes: " + leftChars;
                return 1;
            } else {
                txtArea.value = txtArea.value.substring(0, txtArea.value.length - 1);
                return 0;
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
    $('body').on('input', '.pregTxtArea', function (e) { changePreg(e); });
    $('body').on('input', '.opcPregTxtInput', function (e) { changeOpcPreg(e); });

    

/* --------------------------------------------------------------------------------------------------------------------- */

    getInstrumentData();    

});