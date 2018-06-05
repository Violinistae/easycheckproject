$(document).ready(function ($) {

    displayAddQuestion = () => {
        $("#questionTypeDropMenu").toggleClass('active').siblings().removeClass('active');
    }

    addCMultipleRow = (newIndexArray, typeC) => {
        let newRowC = [];

        let parentRowsDiv = document.getElementById("rowsContainer");
        let instumentCRow = document.createElement("div");
        instumentCRow.classList.add("instrumentRow");
        instumentCRow.classList.add("rowCMultiple");
        let indexForArray = newIndexArray - 1;
        instumentCRow.id = "rowC" + (indexForArray);

        for (let i = 0; i < 5; ++i) {
            var auxCol;
            let rowCElem = document.createElement("div");
            rowCElem.classList.add("rowCElement");

            switch (i) {
                case 0:
                    rowCElem.id = "numElem" + newIndexArray;

                    auxCol = document.createElement("p");
                    auxCol.classList.add("rowCElement");
                    auxCol.id = "numElemento" + newIndexArray;
                    auxCol.textContent = newIndexArray;

                    rowCElem.appendChild(auxCol);
                    newRowC.push(newIndexArray);
                    break;
                case 1:
                    let indexForAspEv = newIndexArray;
                    rowCElem.classList.add("aspEv");
                    createAspEv(rowCElem, indexForAspEv);
                    newRowC.push(1);
                    break;
                case 2:
                    let indexForMultipleOpPreg = newIndexArray;
                    rowCElem.classList.add("rowCElement");
                    rowCElem.classList.add("pregRes");

                    newRowC.push(createMultipleOpPreg(rowCElem, indexForMultipleOpPreg, typeC));
                    break;
                case 3:
                    let indexForPondElem = newIndexArray;
                    rowCElem.id = "ponderacionRowC" + newIndexArray;
                    newRowC.push(createPonderacionElemento(rowCElem, indexForPondElem));
                    break;
                case 4:
                    newRowC.push(typeC);
                    rowCElem.id = "deleteRow" + newIndexArray;
                    rowCElem.innerHTML =
                        '<i class="fas fa-minus-square deleteRowBtn" id="deleteRowBtn' +
                        newIndexArray + '" title="Eliminar fila" aria-hidden="true" dataq="' +
                        (newIndexArray - 1) + '"></i>';
                    break;
            }

            instumentCRow.appendChild(rowCElem);
            parentRowsDiv.appendChild(instumentCRow);
        }
        return newRowC;
    }

    addCCommonRow = (newIndexArray, typeC) => {
        let newRowC = [];

        let parentRowsDiv = document.getElementById("rowsContainer");
        let instumentCRow = document.createElement("div");
        instumentCRow.classList.add("instrumentRow");
        instumentCRow.classList.add("rowC");
        let indexForArray = newIndexArray - 1;
        instumentCRow.id = "rowC" + (indexForArray);

        for (let i = 0; i < 5; ++i) {
            var auxCol;
            let rowCElem = document.createElement("div");
            rowCElem.classList.add("rowCElement");

            switch (i) {
                case 0:
                    rowCElem.id = "numElem" + newIndexArray;

                    auxCol = document.createElement("p");
                    auxCol.classList.add("rowCElement");
                    auxCol.id = "numElemento" + newIndexArray;
                    auxCol.textContent = newIndexArray;

                    rowCElem.appendChild(auxCol);
                    newRowC.push(newIndexArray);
                    break;
                case 1:
                    let indexForAspEv = newIndexArray;
                    rowCElem.classList.add("aspEv");
                    createAspEv(rowCElem, indexForAspEv);
                    newRowC.push(1);
                    break;
                case 2:
                    let indexForPregTxtArea = newIndexArray;
                    rowCElem.classList.add("rowPreg");

                    newRowC.push(createPreguntaTxtArea(rowCElem, indexForPregTxtArea, typeC));
                    break;
                case 3:
                    let indexForPondElem = newIndexArray;
                    rowCElem.id = "ponderacionRowC" + newIndexArray;
                    newRowC.push(createPonderacionElemento(rowCElem, indexForPondElem));
                    break;
                case 4:
                    newRowC.push(typeC);
                    rowCElem.id = "deleteRow" + newIndexArray;
                    rowCElem.innerHTML =
                        '<i class="fas fa-minus-square deleteRowBtn" id="deleteRowBtn' +
                        newIndexArray + '" title="Eliminar fila" aria-hidden="true" dataq="' +
                        (newIndexArray - 1) + '"></i>';
                    break;
            }

            instumentCRow.appendChild(rowCElem);
            parentRowsDiv.appendChild(instumentCRow);
        }
        return newRowC;
    }

    replaceIdsAndNamesRowsC = (parentElement, index) => {
        let pondElemContainer = parentElement.childNodes[3];
        pondElemContainer.id = "ponderacionRowC" + index;

        let pondElemInput = pondElemContainer.childNodes[0];
        pondElemInput.id = "pondElem" + index;
        pondElemInput.setAttribute("dataq", index - 1);


        let mainDiv = parentElement.childNodes[2];          //div element Row
        let pregCol = mainDiv.childNodes[0];                //div preg

        let divLblsTxtArea = pregCol.childNodes[0];
        let lblTypeC = divLblsTxtArea.childNodes[0];        //tipo de pregunta
        lblTypeC.id = "lblTypeC" + index;

        let countCharPreg = divLblsTxtArea.childNodes[1];   //Carateres
        countCharPreg.id = "countCharPreg" + index;

        let pregTxtArea = pregCol.childNodes[1];
        pregTxtArea.id = "pregTxtArea" + index;
        pregTxtArea.name = "pregTxtArea" + index;
        pregTxtArea.setAttribute("dataq", index - 1);

        if (pregCol.childNodes.length == 4) {

            let lblClosePregRes = pregCol.childNodes[2];
            let countCharResClosePreg = lblClosePregRes.childNodes[1];
            countCharResClosePreg.id = "countCharResClosePreg" + index;

            let closePregRes = pregCol.childNodes[3];
            closePregRes.id = "closePregRes" + index;
            closePregRes.name = "closePregRes" + index;
            closePregRes.setAttribute("dataqcr", index - 1);
        }

        if (mainDiv.childNodes.length == 2) {
            let resCol = mainDiv.childNodes[1];
            resCol.id = "resCol" + index;
            
            let opcPregPart = resCol.childNodes[0];
            for (let j = 0; j < 2; ++j) {
                let pregOpcion = opcPregPart.childNodes[j];

                let lblsPregOpcTxtArea = pregOpcion.childNodes[0];
                    let countCharPregOpc = lblsPregOpcTxtArea.childNodes[0];
                    countCharPregOpc.id = "countCharPregOpc" + index + "" + (j + 1);   

                let optionContainer = pregOpcion.childNodes[1];                
                    let correctOption = optionContainer.childNodes[0];
                    correctOption.name = "correctOption" + index;
                    correctOption.setAttribute("dataopcc", index - 1);
                    
                    let opcPregTxtInput = optionContainer.childNodes[1];
                    opcPregTxtInput.id = "opcPregTxtInput" + index + "" + (j + 1);
                    opcPregTxtInput.name = "opcPregTxtInput" + index + "" + (j + 1);
                    opcPregTxtInput.setAttribute("dataqop", (index - 1) + "" + j);
            }

            opcPregPart = resCol.childNodes[1];
            for (let j = 0; j < 2; ++j) {
                let pregOpcion = opcPregPart.childNodes[j];

                let lblsPregOpcTxtArea = pregOpcion.childNodes[0];
                let countCharPregOpc = lblsPregOpcTxtArea.childNodes[0];
                countCharPregOpc.id = "countCharPregOpc" + index + "" + (j + 3);

                let optionContainer = pregOpcion.childNodes[1];
                    let correctOption = optionContainer.childNodes[0];
                    correctOption.name = "correctOption" + index;
                    correctOption.setAttribute("dataopcc", index - 1);

                    let opcPregTxtInput = optionContainer.childNodes[1];
                    opcPregTxtInput.id = "opcPregTxtInput" + index + "" + (j + 3);
                    opcPregTxtInput.name = "opcPregTxtInput" + index + "" + (j + 3);
                    opcPregTxtInput.setAttribute("dataqop", (index - 1) + "" + (j + 2));
            }
        }

    }

    getArrayFormDataCRows = (numRows) => {
        let arr = [];
        for (let i = 0; i < numRows; ++i) {
            let n = i + 1;
            let arr2 = [];
            let arr3 = [];
            let arr4 = [];

            let numElem = document.getElementById("numElemento" + n).textContent;
            let selectedAspEv = document.querySelector('input[name="aspEvRow' + n + '"]:checked').value;
            let pondElem = document.getElementById("pondElem" + n).value;
            let ctype = parseInt(document.getElementById("lblTypeC" + n).getAttribute("datacty"));

            let pregTxtArea = document.getElementById("pregTxtArea" + n).value;            
            arr2.push(parseInt(numElem));
            arr2.push(parseInt(selectedAspEv));

            let resCol = document.getElementById("resCol" + n)

            

            if (resCol) {
                arr3.push(pregTxtArea);
                for (let j = 1; j < 5; ++j) {
                    let arr5 = [];
                                    
                    switch (j) {
                        case 1: arr5.push("A"); break;
                        case 2: arr5.push("B"); break;
                        case 3: arr5.push("C"); break;
                        case 4: arr5.push("D"); break;
                    }
                    let opXValue = document.getElementById("opcPregTxtInput" + n + "" + j).value;
                    arr5.push(opXValue);

                    arr4.push(arr5);
                }
                arr3.push(arr4);

                if (ctype == 1) {
                    let correctOption = parseInt(document.querySelector('input[name="correctOption' + n + '"]:checked').value);
                    arr3.push(correctOption);
                }

                arr2.push(arr3);
            } else {
                if (ctype == 2) {
                    let p = [];
                    let resClose = document.getElementById("closePregRes" + n).value;

                    p.push(pregTxtArea);
                    p.push(resClose);
                    arr2.push(p);
                } else {
                    arr2.push(pregTxtArea);
                }
                
            }

            if (pondElem == "")
                arr2.push(0);
            else
                arr2.push(parseInt(pondElem));

            arr2.push(ctype);

            arr.push(arr2);
        }
        return arr;
    }


    $(".typeC").click(function (e) { checkTypeCToCreateRow(e); });

});