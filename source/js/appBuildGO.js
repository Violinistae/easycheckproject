$(document).ready(function ($) {

    addGORow = (newIndexArray) => {
        let newRowGO = [];

        let parentRowsDiv = document.getElementById("rowsContainer");
        let instumentGORow = document.createElement("div");
        instumentGORow.classList.add("instrumentRow");
        instumentGORow.classList.add("rowGO");
        let indexForArray = newIndexArray - 1;
        instumentGORow.id = "rowGO" + (indexForArray);

        for (let i = 0; i < 5; ++i) {
            var auxCol;
            let rowGOElem = document.createElement("div");
            rowGOElem.classList.add("rowGOElement");

            switch (i) {
                case 0:
                    rowGOElem.id = "numElem" + newIndexArray;

                    auxCol = document.createElement("p");
                    auxCol.classList.add("rowGOElement");
                    auxCol.id = "numElemento" + newIndexArray;
                    auxCol.textContent = newIndexArray;

                    rowGOElem.appendChild(auxCol);
                    newRowGO.push(newIndexArray);
                    break;
                case 1:
                    let indexForAspEv = newIndexArray;
                    rowGOElem.classList.add("aspEv");
                    createAspEv(rowGOElem, indexForAspEv);
                    newRowGO.push(1);
                    break;
                case 2:
                    let indexForIndEv = newIndexArray;
                    rowGOElem.classList.add("indicadoresEvContainer");
                    newRowGO.push(createIndicadoresEv(rowGOElem, indexForIndEv));
                    break;
                case 3:
                    let indexForPondElem = newIndexArray;
                    rowGOElem.id = "ponderacionRowGO" + newIndexArray;
                    newRowGO.push(createPonderacionElemento(rowGOElem, indexForPondElem));
                    break;
                case 4:
                    rowGOElem.id = "deleteRow" + newIndexArray;
                    rowGOElem.innerHTML =
                        '<i class="fas fa-minus-square deleteRowBtn" id="deleteRowBtn' +
                        newIndexArray + '" title="Eliminar fila" aria-hidden="true" dataq="' +
                        (newIndexArray - 1) + '"></i>';
                    break;
            }

            instumentGORow.appendChild(rowGOElem);
            parentRowsDiv.appendChild(instumentGORow);
        }
        return newRowGO;
    }

    replaceIdsAndNamesRowsGO = (parentElement, index) => {
        let pondElemContainer = parentElement.childNodes[3];
        pondElemContainer.id = "ponderacionRowGO" + index;

        let pondElemInput = pondElemContainer.childNodes[0];
        pondElemInput.id = "pondElem" + index;
        pondElemInput.setAttribute("dataq", index - 1);
    }

    getArrayFormDataGORows = (numRows) => {
        let arr = [];
        for (let i = 0; i < numRows; ++i) {
            let n = i + 1;
            let arr2 = [];

            let numElem = document.getElementById("numElemento" + n).textContent;
            let selectedAspEv = document.querySelector('input[name="aspEvRow' + n + '"]:checked').value;
            let indEv = document.getElementById("indicadoresEv" + n).value;
            let pondElem = document.getElementById("pondElem" + n).value;

            arr2.push(parseInt(numElem));
            arr2.push(parseInt(selectedAspEv));
            arr2.push(indEv);
            if (pondElem == "")
                arr2.push(0);
            else
                arr2.push(parseInt(pondElem));

            arr.push(arr2);
        }
        return arr;
    }

    insertBuiltGORows = (builtRows) => {
        for (let i = 0; i < builtRows.length; ++i) {
            addGORow(i + 1);
            fillBuiltGORows(i + 1, builtRows[i]);
        }
        return getArrayFormDataGORows(builtRows.length);
    }

        fillBuiltGORows = (index, builtRow) => {
            let aspEvRadios = document.getElementsByName("aspEvRow" + index);
            let sAspectoEv = builtRow.AspectoEv;
            for (let i = 0; i < aspEvRadios.length; ++i) {
                if (aspEvRadios[i].value == sAspectoEv) {
                    aspEvRadios[i].checked = true;
                }
            }

            console.log(builtRow);
            let indicadoresEv = document.getElementById("indicadoresEv" + index);
            indicadoresEv.value = builtRow.AccionesEv;

            let pondElem = document.getElementById("pondElem" + index);
            pondElem.value = builtRow.PonderacionElem;
        }

});