$(document).ready(function ($) {

    addRRow = (numCriteriosR, newIndexArray) => {
        let newRowR = [];

        let parentRowsDiv = document.getElementById("rowsContainer");
        let instumentRRow = document.createElement("div");
        instumentRRow.classList.add("instrumentRow");
        instumentRRow.classList.add("rowR");
        let indexForArray = newIndexArray - 1;
        instumentRRow.id = "rowR" + (indexForArray);

        for (let i = 0; i < 5; ++i) {
            var auxCol;
            let rowRElem = document.createElement("div");
            rowRElem.classList.add("rowRElement");

            switch (i) {
                case 0:
                    rowRElem.id = "numElem" + newIndexArray;

                    auxCol = document.createElement("p");
                    auxCol.classList.add("rowRElement");
                    auxCol.id = "numElemento" + newIndexArray;
                    auxCol.textContent = newIndexArray;

                    rowRElem.appendChild(auxCol);
                    newRowR.push(newIndexArray);
                    break;
                case 1:
                    let indexForAspEv = newIndexArray;
                    rowRElem.classList.add("aspEv");
                    createAspEv(rowRElem, indexForAspEv);
                    newRowR.push(1);
                    break;
                case 2:
                    rowRElem.classList.add("descripElemCol");
                    let lblsDescripElem = document.createElement("div");
                    lblsDescripElem.classList.add("lblsDescripElem");
                    let countCharDescripElem = document.createElement("label");
                    countCharDescripElem.id = "countCharDescripElem" + newIndexArray;
                    countCharDescripElem.textContent = "Caracteres restantes: 40"
                    lblsDescripElem.appendChild(countCharDescripElem);

                    let descripElem = document.createElement("textarea");
                    descripElem.classList.add("descripElem");
                    descripElem.id = "descripElem" + newIndexArray;
                    descripElem.name = "descripElem" + newIndexArray;
                    descripElem.setAttribute("autocomplete", "off");

                    rowRElem.appendChild(lblsDescripElem);
                    rowRElem.appendChild(descripElem);
                    
                    newRowR.push(descripElem.value);

                    break;
                case 3:
                    rowRElem.classList.add("criteriosEvContainer");
                    let criteriosValues = [];
                    for (let j = 0; j < numCriteriosR; ++j) {
                        let k = j + 1;
                        criteriosValues.push(addCriterioEv(rowRElem, newIndexArray, k));
                    }
                    newRowR.push(criteriosValues);

                    break;
                case 4:
                    rowRElem.id = "deleteRow" + newIndexArray;
                    rowRElem.innerHTML =
                        '<i class="fas fa-minus-square deleteRowBtn" id="deleteRowBtn' +
                        newIndexArray + '" title="Eliminar fila" aria-hidden="true" dataq="' +
                        (newIndexArray - 1) + '"></i>';
                    break;
            }

            instumentRRow.appendChild(rowRElem);
            parentRowsDiv.appendChild(instumentRRow);
        }
        return newRowR;
    }

    addCriterioEv = (parentElement, rowIndex, criterioIndex) => {
        let allOneCriterioData = [];

        let criterioEv = document.createElement("div");
        criterioEv.classList.add("criterioEv");

        let criteriosEvInputs = document.createElement("div");
        criteriosEvInputs.classList.add("criteriosEvInputs");

        let cEvInputs = [];

        for (let i = 0; i < 2; ++i) {
            let auxDiv = document.createElement("div");
            let identInput = document.createElement("input");
            identInput.classList.add("identInput");
            identInput.setAttribute("type", "text");

            if (i == 0) {
                identInput.classList.add("identCriterio");
                identInput.setAttribute("placeholder", "Identificador");
                identInput.setAttribute("autocomplete", "off");
                identInput.setAttribute("dataIdent", (rowIndex - 1) + "_" + (criterioIndex - 1));
                identInput.id = "identCriterio" + rowIndex + "_" + criterioIndex;
                identInput.name = "identCriterio" + rowIndex + "_" + criterioIndex;
            } else if (i == 1) {
                identInput.classList.add("valorIdent");           
                identInput.setAttribute("placeholder", "Puntaje");
                identInput.setAttribute("autocomplete", "off");
                identInput.setAttribute("dataValIdent", (rowIndex - 1) + "_" + (criterioIndex - 1));
                identInput.id = "valorIdent" + rowIndex + "_" + criterioIndex;
                identInput.name = "valorIdent" + rowIndex + "_" + criterioIndex;
            }

            cEvInputs.push(identInput.value);

            auxDiv.appendChild(identInput);
            criteriosEvInputs.appendChild(auxDiv);
        }

        let lblsCriteriosEv = document.createElement("div");
        lblsCriteriosEv.classList.add("lblsCriteriosEv");
        let countCharCriteriosEv = document.createElement("label");
        countCharCriteriosEv.id = "countCharCriteriosEv" + rowIndex + "_" + criterioIndex;
        countCharCriteriosEv.textContent = "Caracteres restantes: 260"
        lblsCriteriosEv.appendChild(countCharCriteriosEv);

        let descripIdent = document.createElement("textarea");
        descripIdent.classList.add("descripIdent");
        descripIdent.setAttribute("placeholder", "Descripcion identificador");
        descripIdent.setAttribute("autocomplete", "off");
        descripIdent.setAttribute("datadesci", (rowIndex - 1) + "_" + (criterioIndex - 1));
        descripIdent.id = "descripIdent" + rowIndex + "_" + criterioIndex;
        descripIdent.name = "descripIdent" + rowIndex + "_" + criterioIndex;

        criterioEv.appendChild(criteriosEvInputs);
        criterioEv.appendChild(lblsCriteriosEv);
        criterioEv.appendChild(descripIdent);

        allOneCriterioData.push(cEvInputs);
        allOneCriterioData.push(descripIdent.value);

        parentElement.appendChild(criterioEv);

        return allOneCriterioData;

    }


/* ---------------------------------------------------------------------------------------------------- */

});