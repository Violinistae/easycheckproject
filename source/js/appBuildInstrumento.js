var claveElemento;
var creador;
var Id_Instrumento;
var InstruccLlenado;
var Materia;
var nombreElemento
var TipoEv;
var tipoInstrumento;
var userreg;

var rowsInstrument = [];
var numCriteriosR = 0;

//Verify user session here
//Verify there is no other place where is being modified



$(document).ready(function ($) {

    window.onbeforeunload = function (e) {

        if (getCookie('s&b!pd?_#d') == getCookie("&lxaAdCs3_¡#dl")) {
            //destroy variable sessionstorage createdInst
        } else {
            return "Han sido detectados algunos cambios, ¿está seguro de abandonar la página? Los cambios no almacenados serán descartados.";
        }

    }

    verifyToBuild = (sessionVariables) => {
        if (!sessionVariables.error) {
            switch (parseInt(sessionVariables.usertype)) {
                case 1:
                    userreg = parseInt(sessionVariables.userreg);
                    getInstrumentData();
                    break;
                case 2:
                    userreg = parseInt(sessionVariables.userreg);
                    getInstrumentData();
                    break;
                default:
                    console.log("Cerrar Sesión");
                    window.location.replace("../../index.php");
                    break;
            }
        } else if (sessionVariables.error) {
            console.log("Cerrar Sesión");
            window.location.replace("../../index.php");
        }
    }

    getInstrumentData = () => {
        
        var JSON_CreatedInstrData = JSON.parse(sessionStorage.getItem("createdInst"));    

        if (JSON_CreatedInstrData == null) {
            console.log("Cerrar Sesión");
            window.location.replace("../../index.php");
            return;
        }

        Id_Instrumento = parseInt(JSON_CreatedInstrData.Id_Instrumento);

        if (JSON_CreatedInstrData == null) {
            console.log("Cerrar Sesión");
            window.location.replace("../../index.php");
            return;
        }
        

        dataArray = {
            purpose: 1,
            Id_Instrumento: Id_Instrumento
        };

        $.ajax({
            url: '../../index_ajax.php?controller=instrumento&action=readInstrumento',
            type: 'POST',
            dataType: 'json',
            data: dataArray
        }).done(function (resInstrData) {
            if (resInstrData.built) {
                let iRows = resInstrData.iRows[0];
                //console.log(iRows);

                claveElemento = iRows.ClaveElem;
                creador = parseInt(iRows.Creador);
                InstruccLlenado = iRows.InstruccLlenado;
                Materia = parseInt(iRows.Materia);
                nombreElemento = iRows.NombElemento;
                TipoEv = parseInt(iRows.TipoEvaluacion);
                tipoInstrumento = parseInt(iRows.TipoInstrumento);

                if (creador != userreg) {
                    console.log("Cerrar y no dar permiso");
                }

                setInstrumentTypeNameKey(tipoInstrumento, claveElemento, nombreElemento);
            }
        }).fail(function () {
            AJAXrequestFailed("Fallo en petición AJAX para obtener información de insturmento ");
        })
    }

        setInstrumentTypeNameKey = (tipoInstrumento, claveElemento, nombreElemento) => {
            let typeInstrumentoLbl = document.getElementById("typeInstrumento");
            let claveNombreInstrumento = document.getElementById("claveNombreInstr");
            let headTable = document.getElementById("tableInstrumentHead");
            claveNombreInstrumento.textContent = claveElemento + " - " + nombreElemento;

            let URLHeadTable;
            let readInstrumentRowsURL;
            //console.log(tipoInstrumento);

            switch (tipoInstrumento) {
                case 1:
                    typeInstrumentoLbl.textContent += "Rúbrica";
                    URLHeadTable = '../../sourcephp/views/buildInst/R/headRowR.php';
                    readInstrumentRowsURL = '../../index_ajax.php?controller=rubrica&action=readRubrica';
                    document.getElementById("addRowBtn").style.color = "rgb(220, 220, 220)";
                    getBuiltInstrumentRows(readInstrumentRowsURL);
                    insertCommonTableHead(URLHeadTable, headTable);
                    break;
                case 2:
                    typeInstrumentoLbl.textContent += "Lista de Cotejo";
                    URLHeadTable = '../../sourcephp/views/buildInst/LC/headRowLC.php';
                    readInstrumentRowsURL = '../../index_ajax.php?controller=listacotejo&action=readListaCotejo';
                    insertCommonTableHead(URLHeadTable, headTable);
                    getBuiltInstrumentRows(readInstrumentRowsURL);
                    break;
                case 3:
                    typeInstrumentoLbl.textContent += "Guía de Observación";
                    URLHeadTable = '../../sourcephp/views/buildInst/GO/headRowGO.php';
                    readInstrumentRowsURL = '../../index_ajax.php?controller=guiadeobservacion&action=readGuiaObs';
                    insertCommonTableHead(URLHeadTable, headTable);
                    getBuiltInstrumentRows(readInstrumentRowsURL);
                    break;
                case 4:
                    typeInstrumentoLbl.textContent += "Cuestionario";
                    URLHeadTable = '../../sourcephp/views/buildInst/C/headRowC.php';
                    readInstrumentRowsURL = '../../index_ajax.php?controller=cuestionario&action=readCuestionario';
                    insertCommonTableHead(URLHeadTable, headTable);

                    let questionTypeDropMenu = document.getElementById("questionTypeDropMenu");
                    let dropMenuContent = document.createElement("ul");
                    dropMenuContent.classList.add("dropMenuContent");

                    for (let i = 1; i < 4; ++i) {
                        let dropMenuElem = document.createElement("li");
                        dropMenuElem.classList.add("dropMenuElem");
                        dropMenuElem.classList.add("typeC");
                        dropMenuElem.setAttribute("datact", i);

                        let lblDropM = document.createElement("label");
                        lblDropM.classList.add("lblDropM");

                        switch (i) {
                            case 1: lblDropM.textContent = "Opción múltiple"; break;
                            case 2: lblDropM.textContent = "Completar campo"; break;
                            case 3: lblDropM.textContent = "Pregunta abierta"; break;
                        }

                        dropMenuElem.appendChild(lblDropM);
                        dropMenuContent.appendChild(dropMenuElem);
                    }

                    questionTypeDropMenu.appendChild(dropMenuContent);
                    getBuiltInstrumentRows(readInstrumentRowsURL);

                    break;
            }
            
            setNewHashToCookieAfterAction();
            updateSaveChangesCookie();

        }

            insertCommonTableHead = (URLHeadTable, headTable) => {
                $.ajax({
                    url: URLHeadTable,
                    type: 'POST'
                }).done(function (resHeadTable) {
                    headTable.innerHTML = resHeadTable;
                }).fail(function () {
                    AJAXrequestFailed("Fallo en petición AJAX para cargar head table build instrumento");
                });
            }

            getBuiltInstrumentRows = (readInstrumentRowsURL) => {

                dataArray = {
                    Id_Instrumento: Id_Instrumento
                };

                $.ajax({
                    url: readInstrumentRowsURL,
                    type: 'POST',
                    dataType: 'json',
                    data: dataArray
                }).done(function (resReadRowsI) {
                    //console.log(resReadRowsI);

                    if (!resReadRowsI.error) {
                        if (resReadRowsI.built) {
                            builtRows = resReadRowsI.builtRows;
                            switch (resReadRowsI.tInst) {
                                case 1:
                                    let nC = builtRows[0].NumCriterios;
                                    numCriteriosR = nC;
                                    rowsInstrument = insertBuiltRRows(builtRows, numCriteriosR);
                                    if (numCriteriosR > 0) {
                                        let sendNumCriterios = document.getElementById("sendNumCriterios");
                                        sendNumCriterios.setAttribute("dataAvailable", "0");
                                        sendNumCriterios.style.color = "gray";
                                        let numCriterios = document.getElementById("numCriterios");
                                        numCriterios.value = numCriteriosR;
                                        numCriterios.disabled = true;
                                        document.getElementById("addRowBtn").style.color = "white";
                                    }
                                    updateAllLeftCharsR(builtRows, numCriteriosR);
                                    break;
                                case 2:
                                    rowsInstrument = insertBuiltLCRows(builtRows);
                                    updateAllLeftCharsLC(builtRows);
                                    break;
                                case 3:
                                    rowsInstrument = insertBuiltGORows(builtRows);
                                    updateAllLeftCharsLC(builtRows);
                                    break;
                                case 4:
                                    rowsInstrument = insertBuiltCRows(builtRows);
                                    updateAllLeftCharsC(builtRows);
                                    break;
                            }
                        }
                    }
                }).fail(function () {
                    AJAXrequestFailed("Fallo en peticion AJAX para cargar filas creadas de instrumento");
                });

            }                            

    setNewHashToCookieAfterAction = () => {
        let newEditID = generateUUID();
        setCookie('&lxaAdCs3_¡#dl', newEditID, 1);

        let saveBtn = document.getElementById("saveChangesBtn");
        saveBtn.disabled = false;
        saveBtn.style.color = "white";
        saveBtn.style.borderColor = "white";
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
                if (numCriteriosR > 0) {
                    auxRow = addRRow(numCriteriosR, rowsInstrument.length + 1);            
                } else {
                    alert("Ingrese un determinado numero de criterios para cada fila de la rúbrica.");
                }
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
        //console.log(posAux);
        let radiosValues = [];
        let mtx = [];

        //Save radios
        for (let i = 0; i < posAux.length; ++i) {
            let elementToSort = document.getElementById(posAux[i]);
            radiosValues.push(saveRadiosValues(elementToSort));
        }

        if (tipoInstrumento == 4) {
            
            for (let i = 0; i < posAux.length; ++i) {
                let superIndex = parseInt(posAux[i].replace("rowC", "")) + 1;
                let ctyp = parseInt(document.getElementById("lblTypeC" + superIndex).getAttribute("datacty"))
                if (ctyp == 1) {
                    let correctXOpc = parseInt(document.querySelector('input[name="correctOption' + superIndex + '"]:checked').value);
                    mtx.push(correctXOpc);
                } else {
                    mtx.push(null);
                }
            }

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

        //Set right option to each multiple option question
        if (tipoInstrumento == 4) {
            for (let i = 0; i < posAux.length; ++i) {
                let n = i + 1;
                let ct = parseInt(document.getElementById("lblTypeC" + n).getAttribute("datacty"));

                if (ct == 1) {
                    let op = document.getElementsByName("correctOption" + n);
                    for (let j = 1; j < 4; ++j) {
                        if (j == mtx[i]) {
                            op[j - 1].checked = true;
                        }
                    }
                }               
            }
        }

        let rowsContainer = document.getElementById("rowsContainer");
        for (let i = 1; i < rowsContainer.childNodes.length; ++i) {
            let elementToSort = rowsContainer.childNodes[i];
            switch (tipoInstrumento) {
                case 1:
                    elementToSort.id = "rowR" + (i - 1);
                    break;
                case 2:
                    elementToSort.id = "rowLC" + (i - 1);
                    break;
                case 3:
                    elementToSort.id = "rowGO" + (i - 1);
                    break;
                case 4:
                    elementToSort.id = "rowC" + (i - 1);                    
                    break;
            }
        }
        //console.log(rowsInstrument);

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
                    replaceIdsAndNamesRowsR(elemento, newIndex, numCriteriosR);
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
                    auxArr = getArrayFormDataRRows(numRows, numCriteriosR);
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
        
        switch (tipoInstrumento) {
            case 1:
                if (verifyCommonRowsFields()) {
                    if (verifyIdentValR()) {
                        cleanAndSaveR(rowsInstrument, Id_Instrumento, numCriteriosR);
                        updateSaveChangesCookie();
                    }
                }
                break;
            case 2:
                if (verifyCommonRowsFields()){
                    cleanAndSaveLC(rowsInstrument, Id_Instrumento);
                    updateSaveChangesCookie();
                }
                break;
            case 3:
                if (verifyCommonRowsFields()) {
                    cleanAndSaveGO(rowsInstrument, Id_Instrumento);
                    updateSaveChangesCookie();
                }
                break;
            case 4:                
                if (verifyCommonRowsFields()) {
                    cleanAndSaveC(rowsInstrument, Id_Instrumento);
                    updateSaveChangesCookie();
                }
                break;
        }

    }

        verifyCommonRowsFields = () => {
            let allInputs = $("#rowsContainer input:not(input[type=radio])");
            let flag = false;

            $(allInputs).each(function () {
                if (flag)
                    return;
                if ($(this).val().length == 0) {
                    flag = true;
                    console.log($(this).val());
                    alert("Favor de llenar todos los campos para guardar cambios");

                }
            });
            if (!flag) {
                let allTxtArea = $("#rowsContainer textarea");
                $(allTxtArea).each(function () {
                    if (flag)
                        return;
                    if ($(this).val().length == 0) {
                        flag = true;
                        alert("Favor de llenar todos los campos para guardar cambios");
                    }
                });

                if (!flag) {
                    let allPondElem = $("#rowsContainer .ponderacionElemento");
                    let sumaPond = 0;

                    if (allPondElem.length > 0) {
                        $(allPondElem).each(function () {
                            sumaPond += parseInt($(this).val());
                        });
                        if (sumaPond != 100) {
                            alert("La suma de las ponderaciones de cada pregunta debe ser estrictamente igual a 100. Favor de verificar las ponderaciones de cada pregunta.");
                            return false;
                        } else if (sumaPond == 100) {
                            return true;
                        }
                    } else {
                        return true;
                    }
                } else {
                    return false;
                }
            } else {
                return false;
            }

        }


        updateSaveChangesCookie = () => {
            let lastChangeDetected = getCookie("&lxaAdCs3_¡#dl");
            setCookie('s&b!pd?_#d', lastChangeDetected, 1);

            let saveBtn = document.getElementById("saveChangesBtn");
            saveBtn.disabled = true;
            saveBtn.style.color = "rgb(220, 220, 220)";
            saveBtn.style.borderColor = "rgb(220, 220, 220)";
        }

    checkTypeCToCreateRow = (e) => {
        $("#questionTypeDropMenu").removeClass('active');
        let typeC = e.currentTarget.getAttribute("dataCT");

        let auxRow = null;

        if (typeC > 1 && typeC < 4) {
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
                lblTypeC.textContent = "Tipo: Opción múltiple"; 
                lblTypeC.setAttribute("datacty", 1); 
                break;
            case 2: 
                lblTypeC.textContent = "Tipo: Completar campo"; 
                lblTypeC.setAttribute("datacty", 2); 

                var lblClosePregRes = document.createElement("div");
                lblClosePregRes.classList.add("lblClosePregRes");

                let lblInfoResClose = document.createElement("label");
                lblInfoResClose.textContent = "Respuesta";
                let countCharPreg = document.createElement("label");
                countCharPreg.id = "countCharResClosePreg" + newIndexArray;
                countCharPreg.textContent = "Caracteres restantes: 60";

                lblClosePregRes.appendChild(lblInfoResClose);
                lblClosePregRes.appendChild(countCharPreg);

                var closePregRes = document.createElement("input");
                closePregRes.classList.add("closePregRes");
                closePregRes.setAttribute("type", "text");
                closePregRes.setAttribute("dataqcr", newIndexArray - 1);
                closePregRes.setAttribute("autocomplete", "off");
                closePregRes.id = "closePregRes" + newIndexArray;
                closePregRes.name = "closePregRes" + newIndexArray;

                break;
            case 3: 
                lblTypeC.textContent = "Tipo: Pregunta Abierta"; 
                lblTypeC.setAttribute("datacty", 3); 
                break;
        }        

        auxCol.appendChild(lblTypeC);
        auxCol.appendChild(lblLeftChar);
        auxDivPreg.appendChild(auxCol);
        auxDivPreg.appendChild(pregTxtArea);

        if (typeC == 2) {
            auxDivPreg.appendChild(lblClosePregRes);
            auxDivPreg.appendChild(closePregRes);
            rowElem.appendChild(auxDivPreg);

            let arrA = [];
            arrA.push(pregTxtArea.value);
            arrA.push(closePregRes.value);
            return arrA;
        }

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

                let optionContainer = document.createElement("div");
                optionContainer.classList.add("optionContainer");

                    let correctOption = document.createElement("input");
                    correctOption.classList.add("correctOption");
                    correctOption.setAttribute("type", "radio");
                    correctOption.setAttribute("dataopcc", newIndexArray - 1);
                    correctOption.name = "correctOption" + newIndexArray;

                    let opcPregTxtInput = document.createElement("input");
                    opcPregTxtInput.classList.add("opcPregTxtInput");
                    opcPregTxtInput.id = "opcPregTxtInput" + newIndexArray + "" + i;
                    opcPregTxtInput.name = "opcPregTxtInput" + newIndexArray + "" + i;
                    opcPregTxtInput.setAttribute("dataqop", i - 1);
                    opcPregTxtInput.setAttribute("autocomplete", "off");
                    opcPregTxtInput.setAttribute("type", "text");

            if (i == 1) {
                opcPregTxtInput.setAttribute("placeholder", "Opción A");
                correctOption.value = 1;
                correctOption.checked = true;
                simpleOption.push(1);
            } else if (i == 2) {
                opcPregTxtInput.setAttribute("placeholder", "Opción B");
                correctOption.value = 2;
                simpleOption.push(2);
            }

            optionContainer.appendChild(correctOption);
            optionContainer.appendChild(opcPregTxtInput);

            simpleOption.push(opcPregTxtInput.value);
            arrOpcPreg.push(simpleOption);
            
            pregOpcion.appendChild(lblsPregOpcTxtArea);
            pregOpcion.appendChild(optionContainer);

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

                let optionContainer = document.createElement("div");
                optionContainer.classList.add("optionContainer");

                    let correctOption = document.createElement("input");
                    correctOption.classList.add("correctOption");
                    correctOption.setAttribute("type", "radio");
                    correctOption.setAttribute("dataopcc", newIndexArray - 1);
                    correctOption.name = "correctOption" + newIndexArray;

                    let opcPregTxtInput = document.createElement("input");
                    opcPregTxtInput.classList.add("opcPregTxtInput");
                    opcPregTxtInput.id = "opcPregTxtInput" + newIndexArray + "" + i;
                    opcPregTxtInput.name = "opcPregTxtInput" + newIndexArray + "" + i;
                    opcPregTxtInput.setAttribute("dataqop", i - 1);
                    opcPregTxtInput.setAttribute("autocomplete", "off");
                    opcPregTxtInput.setAttribute("type", "text");

            if (i == 3) {
                opcPregTxtInput.setAttribute("placeholder", "Opción C");
                correctOption.value = 3;
                simpleOption.push(3);
            } else if (i == 4) {
                opcPregTxtInput.setAttribute("placeholder", "Opción D");
                correctOption.value = 4;
                simpleOption.push(4);
            }

            optionContainer.appendChild(correctOption);
            optionContainer.appendChild(opcPregTxtInput);

            simpleOption.push(opcPregTxtInput.value);
            arrOpcPreg.push(simpleOption);

            pregOpcion.appendChild(lblsPregOpcTxtArea);
            pregOpcion.appendChild(optionContainer);

            opcPregPart.appendChild(pregOpcion);

        }
        auxDivRes.appendChild(opcPregPart);

        allPregArr.push(pregValue);
        allPregArr.push(arrOpcPreg);
        allPregArr.push(1);

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

    changeCorrectOpc = (e) => {
        let newRadioValue = parseInt(e.currentTarget.value);
        let indexRowChanged = e.currentTarget.getAttribute('dataopcc');
        rowsInstrument[indexRowChanged][2][2] = newRadioValue;
        setNewHashToCookieAfterAction();
    }

    changeIndevTxt = (e) => {
        let strTxtAreaChanged = e.value;
        let indexRowChanged = e.getAttribute('dataq');

        let res = updateLeftCharstxtArea(e);

        if (res == 1) {
            rowsInstrument[indexRowChanged][2] = strTxtAreaChanged;   
            setNewHashToCookieAfterAction();
        }
        
    }

        updateLeftCharstxtArea = (eTrigger) => {
            let maxChars = 260;
            let txtArea = eTrigger;
            let indexTxtAreaChanged = parseInt(eTrigger.id.replace("indicadoresEv", ""));
            let lblLeftChars = document.getElementById("countCharIndicadoresEv" + indexTxtAreaChanged);
            let leftChars = maxChars - txtArea.value.length;

            if (leftChars >= 0) {
                lblLeftChars.textContent = "Caracteres restantes: " + leftChars;
                return 1;
            } else {
                let toSub = txtArea.value.length - maxChars;
                txtArea.value = txtArea.value.substring(0, txtArea.value.length - toSub);
                lblLeftChars.textContent = "Caracteres restantes: 0";
                return 0;
            }

        }

    changePondElem = (e) => {
        let pondElem = e;
        let indexRowChanged = e.getAttribute('dataq');

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
        let strTxtAreaChanged = e.value;
        let indexRowChanged = parseInt(e.getAttribute('dataq'));
        let indexTypeC = indexRowChanged + 1;
        let res = updateLeftCharsPreg(e);
        let typeC = parseInt(document.getElementById("lblTypeC" + indexTypeC).getAttribute("dataCTy"));

        if (res == 1) {
            if (typeC == 1 || typeC == 2) {
                rowsInstrument[indexRowChanged][2][0] = strTxtAreaChanged;
            } else if (typeC == 3) {
                rowsInstrument[indexRowChanged][2] = strTxtAreaChanged;
            }
            setNewHashToCookieAfterAction();
        }
    }

        updateLeftCharsPreg = (eTrigger) => {
            let maxChars = 260;
            let txtArea = eTrigger;
            let indexTxtAreaChanged = parseInt(eTrigger.id.replace("pregTxtArea", ""));
            let lblLeftChars = document.getElementById("countCharPreg" + indexTxtAreaChanged);
            let leftChars = maxChars - txtArea.value.length;

            if (leftChars >= 0) {
                lblLeftChars.textContent = "Caracteres restantes: " + leftChars;
                return 1;
            } else {
                let toSub = txtArea.value.length - maxChars;
                txtArea.value = txtArea.value.substring(0, txtArea.value.length - toSub);
                lblLeftChars.textContent = "Caracteres restantes: 0";
                return 0;
            }

        }

    changeResClosePreg = (e) => {
        let strTxtAreaChanged = e.value;
        let indexRowChanged = parseInt(e.getAttribute('dataqcr'));

        let res = updateLeftCharsResClosePreg(e);

        if (res == 1) {
            rowsInstrument[indexRowChanged][2][1] = strTxtAreaChanged;
            setNewHashToCookieAfterAction();
        }
        
    }

        updateLeftCharsResClosePreg = (eTrigger) => {
            let maxChars = 60;
            let txtArea = eTrigger;
            let indexTxtAreaChanged = parseInt(eTrigger.id.replace("closePregRes", ""));            
            let lblLeftChars = document.getElementById("countCharResClosePreg" + indexTxtAreaChanged);
            let leftChars = maxChars - txtArea.value.length;

            if (leftChars >= 0) {
                lblLeftChars.textContent = "Caracteres restantes: " + leftChars;
                return 1;
            } else {
                let toSub = txtArea.value.length - maxChars;
                txtArea.value = txtArea.value.substring(0, txtArea.value.length - toSub);
                lblLeftChars.textContent = "Caracteres restantes: 0";
                return 0;
            }

        }

    changeOpcPreg = (e) => {
        let strTxtAreaChanged = e.value;
        let indSec = e.getAttribute("dataqop");
        let indexRowChanged = parseInt(e.id.replace("opcPregTxtInput", ""));
        let res = updateLeftCharsOption(e);
        
        if (res == 1) {
            let iDec = Math.floor(indexRowChanged / 10) - 1;
            rowsInstrument[iDec][2][1][indSec][1] = strTxtAreaChanged;
            setNewHashToCookieAfterAction();
        }
    }

        updateLeftCharsOption = (eTrigger) => {
            let maxChars = 60;
            let txtArea = eTrigger;
            let indexTxtAreaChanged = parseInt(eTrigger.id.replace("opcPregTxtInput", ""));
            let lblLeftChars = document.getElementById("countCharPregOpc" + indexTxtAreaChanged);
            let leftChars = maxChars - txtArea.value.length;

            if (leftChars >= 0) {
                lblLeftChars.textContent = "Restantes: " + leftChars;
                return 1;
            } else {
                let toSub = txtArea.value.length - maxChars;
                txtArea.value = txtArea.value.substring(0, txtArea.value.length - toSub);
                lblLeftChars.textContent = "Restantes: 0";
                return 0;
            }

        }

    changeDescripElem = (e) => {
        let strTxtAreaChanged = e.value;
        let indx = parseInt(e.id.replace("descripElem", "")) - 1;

        let res = updateLeftCharsDescriptElem(e);

        if (res == 1) {
            rowsInstrument[indx][2] = e.value;
            setNewHashToCookieAfterAction();
        } 
    }

        updateLeftCharsDescriptElem = (eTrigger) => {
            let maxChars = 80;
            let txtArea = eTrigger;
            let indexTxtAreaChanged = parseInt(eTrigger.id.replace("descripElem", ""));
            let lblLeftChars = document.getElementById("countCharDescripElem" + indexTxtAreaChanged);
            let leftChars = maxChars - txtArea.value.length;

            if (leftChars >= 0) {
                lblLeftChars.textContent = "Caracteres restantes: " + leftChars;
                return 1;
            } else {
                let toSub = txtArea.value.length - maxChars;
                txtArea.value = txtArea.value.substring(0, txtArea.value.length - toSub);
                lblLeftChars.textContent = "Caracteres restantes: 0";
                return 0;
            }

        }

    changeDescrpIdent = (e) => {
        let strTxtAreaChanged = e.value;
        let indexNoSplit = e.getAttribute("datadesci");
        let split = indexNoSplit.split("_");
        let indexA = parseInt(split[0]);
        let indexB = parseInt(split[1]);

        let res = updateDescripIdent(indexA + 1, indexB + 1, e);

        if (res == 1) {
            rowsInstrument[indexA][3][indexB][1] = strTxtAreaChanged;
            setNewHashToCookieAfterAction();
        } 
        
    }

        updateDescripIdent = (iA , iB, eTrigger) => {
            let maxChars = 260;    
            let countCharCriteriosEv = document.getElementById("countCharCriteriosEv" + iA + "_" + iB);
            let leftChars = maxChars - eTrigger.value.length;

            if (leftChars >= 0) {
                countCharCriteriosEv.textContent = "Caracteres Restantes: " + leftChars;
                return 1;
            } else {
                let toSub = eTrigger.value.length - maxChars;
                eTrigger.value = eTrigger.value.substring(0, eTrigger.value.length - toSub);
                countCharCriteriosEv.textContent = "Caracteres Restantes: 0";
                return 0;
            }
        }

    changeIdentCriterio = (e) => {
        let strTxtAreaChanged = e.currentTarget.value;
        let indexNoSplit = e.currentTarget.getAttribute("dataident");
        let split = indexNoSplit.split("_");
        let indexA = parseInt(split[0]);
        let indexB = parseInt(split[1]);
    
        let res = updateIdentCriterio(e.currentTarget);

        if (res == 1) {
            rowsInstrument[indexA][3][indexB][0][0] = strTxtAreaChanged;
            setNewHashToCookieAfterAction();
        }
        
    }

        updateIdentCriterio = (eTrigger) => {
            let maxChars = 15;    
            let leftChars = maxChars - eTrigger.value.length;

            if (leftChars >= 0) {
                return 1;
            } else {
                let toSub = eTrigger.value.length - maxChars;
                eTrigger.value = eTrigger.value.substring(0, eTrigger.value.length - toSub);
                return 0;
            }
        }

    changeValIdentCriterio = (e) => {
        let strTxtAreaChanged = parseInt(e.currentTarget.value);
        let indexNoSplit = e.currentTarget.getAttribute("datavalident");
        let split = indexNoSplit.split("_");
        let indexA = parseInt(split[0]);
        let indexB = parseInt(split[1]);

        if (/^([0-9])*$/.test(e.currentTarget.value)) {
            rowsInstrument[indexA][3][indexB][0][1] = strTxtAreaChanged;
        } else {
            e.currentTarget.value = e.currentTarget.value.substring(0, e.currentTarget.value.length - 1);
        }
        setNewHashToCookieAfterAction();
    }

/* -+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+- */

    updateAllLeftCharsLC = (builtRows) => {
        for (let i = 0; i < builtRows.length; ++i) {
            changeIndevTxt(document.getElementById("indicadoresEv" + (i + 1)));
        }
        updateSaveChangesCookie();
    }

    updateAllLeftCharsC = (builtRows) => {
        for (let i = 0; i < builtRows.length; ++i) {
            changePreg(document.getElementById("pregTxtArea" + (i + 1)));
            switch (parseInt(builtRows[i].TipoPregunta)) {
                case 1:
                    for (let j = 0; j < 4; ++j) {
                        changeOpcPreg(document.getElementById("opcPregTxtInput" + (i + 1) + "" + (j + 1)));
                    }
                    break;
                case 2:
                    changeResClosePreg(document.getElementById("closePregRes" + (i + 1)));                    
                    break;
            }
        }
        updateSaveChangesCookie();
    }

    updateAllLeftCharsR = (builtRows, numCriteriosR) => {
        for (let i = 0; i < builtRows.length; ++i) {
            changeDescripElem(document.getElementById("descripElem" + (i + 1)));

            for (let j = 0; j < numCriteriosR; ++j) {
                changeDescrpIdent(document.getElementById("descripIdent" + (i + 1) + "_" + (j + 1)));
                
            }
        }
        updateSaveChangesCookie();
    }


/* --------------------------------------------------------------------------------------------------------------------- */

    checkNumCriterios = (e) => {
        let numCriterios = e.currentTarget.value;
        let sendNumCriterios = document.getElementById("sendNumCriterios");
        if (/^([0-9])*$/.test(numCriterios)) {
            sendNumCriterios.disabled = false;
            sendNumCriterios.style.color = "green";
            sendNumCriterios.setAttribute("dataAvailable", "1");
            numCriterios = parseInt(e.currentTarget.value);
        } else {
            sendNumCriterios.setAttribute("dataAvailable", "0");
            e.currentTarget.value = e.currentTarget.value.substring(0, e.currentTarget.value.length - 1);
        }

        if (e.currentTarget.value.length < 1) {
            sendNumCriterios.disabled = true;
            sendNumCriterios.style.color = "gray";
        } 

    }

    sendNumCriterios = (e) => {
        let dataAvailable = parseInt(e.currentTarget.getAttribute("dataAvailable"));
        if (dataAvailable == 1) {
            let numCriterios = document.getElementById("numCriterios");
            if (numCriterios.value > 2 && numCriterios.value < 6) {
                let flag = confirm("¿Está seguro de establecer el número de criterios de evaluacíon para cada fila de este instrumento en "
                + numCriterios.value + "? \n Al confirmar este número se aplicará a cada fila del instrumento de evaluación y NUNCA más podrá ser modificado.");

                if (flag) {
                    numCriteriosR = numCriterios.value;
                    e.currentTarget.setAttribute("dataAvailable", "0");
                    e.currentTarget.style.color = "gray";
                    numCriterios.disabled = true;
                    document.getElementById("addRowBtn").style.color = "white";
                }
                
            } else {
                alert("Solo se especificar un número de criterios de evaluación con rango de 3 a 5.");
            }
        }
    } 

/* --------------------------------------------------------------------------------------------------------------------- */
    
    /** Event Triggers for All Instrumentos */
    $("#saveChangesBtn").click(function (e) { checkContentAndSaveChanges(); });
    $("#addRowBtn").click(function (e) { checkAddNewRowToInstrument(); });    
    $('body').on('change', '.aspEvInst', function (e) { changeAspEvRadio(e); });
    $('body').on('click', '.deleteRowBtn', function (e) { deleteInstrumentRow(e); })

    $('#rowsContainer').sortable({
        stop: function (e, ui) {
            updateSorted();
        }
    });
    $('#rowsContainer').disableSelection();

    $('body').on('click', '#maincontainer', function (e) {
        $("#questionTypeDropMenu").removeClass('active');
    });
    $('body').on('click', '#creatingLbl', function (e) {
        $("#questionTypeDropMenu").removeClass('active');
    });
    $('body').on('click', '#saveChanges', function (e) {
        $("#questionTypeDropMenu").removeClass('active');
    });

    /* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ Triggers for instrumento ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */

    /** Event Triggers for Lista de Cotejo && Guia de Observación */
    $('body').on('input', '.indicadoresEv', function (e) { changeIndevTxt(e.currentTarget); });

    /** Event Triggers for Rubrica */
    $('body').on('input', '#numCriterios', function (e) { checkNumCriterios(e); });
    $('body').on('click', '#sendNumCriterios', function (e) { sendNumCriterios(e); });

    $('body').on('input', '.descripElem', function (e) { changeDescripElem(e.currentTarget); });
    $('body').on('input', '.identCriterio', function (e) { changeIdentCriterio(e); });
    $('body').on('input', '.valorIdent', function (e) { changeValIdentCriterio(e); });
    $('body').on('input', '.descripIdent', function (e) { changeDescrpIdent(e.currentTarget); });
    
    /** Event Triggers for Lista de Cotejo */
    //--

    /** Event Triggers for Guia de Observación */    
    $('body').on('input', '.ponderacionElemento', function (e) { changePondElem(e.currentTarget); });

    /** Event Triggers for Cuestionario */
    $('body').on('change', '.correctOption', function (e) { changeCorrectOpc(e); });
    $('body').on('input', '.pregTxtArea', function (e) { changePreg(e.currentTarget); });
    $('body').on('input', '.opcPregTxtInput', function (e) { changeOpcPreg(e.currentTarget); });
    $('body').on('input', '.closePregRes', function (e) { changeResClosePreg(e.currentTarget); });

/* --------------------------------------------------------------------------------------------------------------------- */

    getSessionVariables(verifyToBuild);
    

});