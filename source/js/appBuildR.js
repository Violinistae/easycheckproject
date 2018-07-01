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
                    countCharDescripElem.textContent = "Caracteres restantes: 80"
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

    replaceIdsAndNamesRowsR = (parentElement, index, numCriteriosR) => {
        let descripElemCol = parentElement.childNodes[2];

        let leftCharsDescElemCont = descripElemCol.childNodes[0];
        let leftCharsDescElem = leftCharsDescElemCont.childNodes[0];
        leftCharsDescElem.id = "countCharDescripElem" + index;

        let descripElem = descripElemCol.childNodes[1];
        descripElem.id = "descripElem" + index;
        descripElem.name = "descripElem" + index;

        let criteriosEvContainer = parentElement.childNodes[3];

        for (let i = 0; i < numCriteriosR; ++i) {
            let criterioEvCont = criteriosEvContainer.childNodes[i];

            let criteriosEvInputs = criterioEvCont.childNodes[0];

                let divInput1 = criteriosEvInputs.childNodes[0];
                let identCriterio = divInput1.childNodes[0];
                identCriterio.id = "identCriterio" + index + "_" + (i + 1);
                identCriterio.name = "identCriterio" + index + "_" + (i + 1);
                identCriterio.setAttribute("dataident", (index - 1) + "_" + i);

                let divInput2 = criteriosEvInputs.childNodes[1];
                let valorIdent = divInput2.childNodes[0];
                valorIdent.id = "valorIdent" + index + "_" + (i + 1);
                valorIdent.name = "valorIdent" + index + "_" + (i + 1);
                valorIdent.setAttribute("datavalident", (index - 1) + "_" + i);

            let lblsCriteriosEv = criterioEvCont.childNodes[1];
                let countCharCriteriosEv = lblsCriteriosEv.childNodes[0];
                countCharCriteriosEv.id = "countCharCriteriosEv" + index + "_" + (i + 1);

            let descripIdent = criterioEvCont.childNodes[2];
            descripIdent.id = "descripIdent" + index + "_" + (i + 1);
            descripIdent.name = "descripIdent" + index + "_" + (i + 1);
            descripIdent.setAttribute("datadesci", (index - 1) + "_" + i);
        }
    }

    getArrayFormDataRRows = (numRows, numCriteriosR) => {
        let arr = [];
        for (let i = 0; i < numRows; ++i) {
            let n = i + 1;
            let arr2 = [];

            let numElem = document.getElementById("numElemento" + n).textContent;
            let selectedAspEv = document.querySelector('input[name="aspEvRow' + n + '"]:checked').value;
            let descripElem = document.getElementById("descripElem" + n).value;
            let arr3 = [];

            for (let j = 0; j < numCriteriosR; ++j) {
                
                let arr4 = [];
                let arr5 = [];

                let identCriterio = document.getElementById("identCriterio" + n + "_" + (j + 1)).value;
                let valorIdent = document.getElementById("valorIdent" + n + "_" + (j + 1)).value;
                let descripIdent = document.getElementById("descripIdent" + n + "_" + (j + 1)).value;

                arr5.push(identCriterio);
                arr5.push(valorIdent);

                arr4.push(arr5);
                arr4.push(descripIdent);

                arr3.push(arr4);

            }            

            arr2.push(numElem);
            arr2.push(selectedAspEv);
            arr2.push(descripElem);
            arr2.push(arr3);

            arr.push(arr2);
            
        }
        return arr;
    }

    verifyIdentValR = () => {
        let flag = true;

        let allCriteriosValues = $("input:text.valorIdent");
        $(allCriteriosValues).each(function () {
            if (!flag)
                return;
            if ($(this).val() < 0 || $(this).val() > 100) {
                flag = false;
                console.log($(this).val());
                alert("Los valores de los criterios de cada fila de la rubrica deben encontrarse dentro del rango 0 a 100.");
            }
        });

        return flag;
    }

    insertBuiltRRows = (bulitRows, nC) => {
        //console.log(bulitRows);
        for (let i = 0; i < bulitRows.length; ++i) {
            addRRow(nC, i + 1);
            fillBuildRRows(nC, i + 1, bulitRows[i]);
        }

        return getArrayFormDataRRows(bulitRows.length, numCriteriosR);
    }

    fillBuildRRows = (nC, index, builtRow) => {
            let aspEvRadios = document.getElementsByName("aspEvRow" + index);
            let sAspectoEv = builtRow.AspectoEv;
            for (let i = 0; i < aspEvRadios.length; ++i) {
                if (aspEvRadios[i].value == sAspectoEv) {
                    aspEvRadios[i].checked = true;
                }
            }

            let descripElem = document.getElementById("descripElem" + index);
            descripElem.value = builtRow.Descripcion;
            
            for (let j = 0; j < nC; ++j) {
                let identCriterio = document.getElementById("identCriterio" + index + "_" + (j + 1));
                identCriterio.value = builtRow.Criterios[j].headIdentificador.Identificador;

                let valorIdent = document.getElementById("valorIdent" + index + "_" + (j + 1));
                valorIdent.value = builtRow.Criterios[j].headIdentificador.ValorIdent;

                let descripIdent = document.getElementById("descripIdent" + index + "_" + (j + 1));
                descripIdent.value = builtRow.Criterios[j].DescripcionIdent;
            }
        }

/* ---------------------------------------------------------------------------------------------------- */

});