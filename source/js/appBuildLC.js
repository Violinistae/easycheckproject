$(document).ready(function ($) {

    addLCRow = (newIndexArray) => {
        let newRowLC = [];

        let parentRowsDiv = document.getElementById("rowsContainer");
        let instumentLCRow = document.createElement("div");
        instumentLCRow.classList.add("instrumentRow");
        instumentLCRow.classList.add("rowLC");
        let indexForArray = newIndexArray - 1;
        instumentLCRow.id = "rowLC" + (indexForArray);

        for (let i = 0; i < 4; ++i) {
            var auxCol;
            let rowLCElem = document.createElement("div");
            rowLCElem.classList.add("rowLCElement");

            switch (i) {
                case 0:      
                    rowLCElem.id = "numElem" + newIndexArray;

                    auxCol = document.createElement("p");
                    auxCol.classList.add("rowLCElement");
                    auxCol.id = "numElemento" + newIndexArray;
                    auxCol.textContent = newIndexArray;

                    rowLCElem.appendChild(auxCol);
                    newRowLC.push(newIndexArray);
                    break;
                case 1:
                    let indexForAspEv = newIndexArray;
                    rowLCElem.classList.add("aspEv");
                    createAspEv(rowLCElem, indexForAspEv);
                    newRowLC.push(1);
                    break;
                case 2:
                    let indexForIndEv = newIndexArray;
                    rowLCElem.classList.add("indicadoresEvContainer");
                    newRowLC.push(createIndicadoresEv(rowLCElem, indexForIndEv));
                    break;
                case 3:
                    rowLCElem.id = "deleteRow" + newIndexArray;
                    rowLCElem.innerHTML = 
                        '<i class="fas fa-minus-square deleteRowBtn" id="deleteRowBtn' + 
                        newIndexArray + '" title="Eliminar fila" aria-hidden="true" dataq="' +
                        (newIndexArray - 1) +'"></i>';
                    break;
            }

            instumentLCRow.appendChild(rowLCElem);
            parentRowsDiv.appendChild(instumentLCRow);
        }
        return newRowLC;
    }

    replaceIdsAndNamesRowsLC = (parentElement, index) => {
        let indicadoresEvContainer = parentElement.childNodes[2];

        let leftCharsIndEv = indicadoresEvContainer.childNodes[0].childNodes[0];
        leftCharsIndEv.id = "countCharIndicadoresEv" + index;

        let txtAreaIndEv = indicadoresEvContainer.childNodes[1];
        txtAreaIndEv.name = "indicadoresEv" + index;
        txtAreaIndEv.id = "indicadoresEv" + index;
        txtAreaIndEv.setAttribute("dataq", index - 1);
    }

    getArrayFormDataLCRows = (numRows) => {
        let arr = [];
        for (let i = 0; i < numRows; ++i) {
            let n = i + 1;
            let arr2 = [];

            let numElem = document.getElementById("numElemento" + n).textContent;
            let selectedAspEv = document.querySelector('input[name="aspEvRow' + n + '"]:checked').value;
            let indEv = document.getElementById("indicadoresEv" + n).value;

            arr2.push(parseInt(numElem));
            arr2.push(parseInt(selectedAspEv));
            arr2.push(indEv);

            arr.push(arr2);
        }
        return arr;
    }

    insertBuiltLCRows = (builtRows) => {
        for (let i = 0; i < builtRows.length; ++i) {
            addLCRow (i + 1);
            fillBuiltLCRows(i + 1, builtRows[i]);
        }
        return getArrayFormDataLCRows(builtRows.length);
    }

        fillBuiltLCRows = (index, builtRow) => {
            let aspEvRadios = document.getElementsByName("aspEvRow" + index);
            let sAspectoEv = builtRow.AspectoEv;
            for (let i = 0; i < aspEvRadios.length; ++i) {
                if (aspEvRadios[i].value == sAspectoEv) {
                    aspEvRadios[i].checked = true;
                }
            }

            let indicadoresEv = document.getElementById("indicadoresEv" + index);
            indicadoresEv.value = builtRow.IndicadoresEv;

        }

});