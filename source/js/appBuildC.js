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

    $(".typeC").click(function (e) { checkTypeCToCreateRow(e); });

});