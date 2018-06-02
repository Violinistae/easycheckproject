$(document).ready(function ($) {

    addLCRow = (newIndexArray) => {
        let newRowLC = [];

        let parentRowsDiv = document.getElementById("rowsContainer");
        let instumentLCRow = document.createElement("div");
        instumentLCRow.classList.add("instrumentRow");
        instumentLCRow.classList.add("rowLC");

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
                        '<i class="fas fa-minus-square deleteRowBtn" id="deleteRow' + 
                        newIndexArray + '" title="Eliminar fila" aria-hidden="true"></i>';

                    break;
            }

            instumentLCRow.appendChild(rowLCElem);
            parentRowsDiv.appendChild(instumentLCRow);
        }

        console.log(newRowLC);
        return newRowLC;
    }

});