$(document).ready(function ($) {
    addLCRowsForEval = (instContent) => {
        let evalForLC = [];
        let parentRowsDiv = document.getElementById("rowsContainer");
        for (let j = 0; j < instContent.length; ++j) {

            let instumentLCRow = document.createElement("div");
            instumentLCRow.classList.add("instrumentRow");
            instumentLCRow.classList.add("rowLC");
            instumentLCRow.id = "rowLC" + instContent[j].Id_ListaC;

            for (let i = 0; i < 4; ++i) {
                let rowLCElem = document.createElement("div");
                rowLCElem.classList.add("rowLCElement");

                switch (i) {
                    case 0:
                        createNumElem(rowLCElem, instContent[j].NumElemento);
                        break;                    
                    case 1:
                        rowLCElem.classList.add("aspEv");
                        createAspEv(rowLCElem, instContent[j].AspectoEv, instContent[j].Id_ListaC);
                        break;                        
                    case 2:
                        rowLCElem.classList.add("indicadoresEvContainer");
                        createIndicadoresEv(rowLCElem, instContent[j].IndicadoresEv, instContent[j].Id_ListaC);
                        break;
                    case 3:
                        rowLCElem.classList.add("resRowLC");
                        rowLCElem.id = "resRowLC" + instContent[j].Id_ListaC;

                        let div = document.createElement("div");
                        div.innerHTML = '<input type="radio" checked class="resLCInput" name="resLC-' + instContent[j].Id_ListaC + '" datarowInst="' + (instContent[j].NumElemento - 1) +'" value="1">' +
                            '<p>Cumplido</p>';
                        rowLCElem.appendChild(div);

                        div = document.createElement("div");
                        div.innerHTML = '<input type="radio" class="resLCInput" name="resLC-' + instContent[j].Id_ListaC + '" datarowInst="' + (instContent[j].NumElemento - 1) +'" value="0">' +
                            '<p>No Cumplido</p>';
                        rowLCElem.appendChild(div);
                        //La evaluación no es necesaria guardarla por todos los alumnos, solo el que se esta evaluando
                        //Al momento de cambiar de men se reasigna a la variable global los nuevos datos
                        break;
                }

                instumentLCRow.appendChild(rowLCElem);
                parentRowsDiv.appendChild(instumentLCRow);
            }
        }

        for (let i = 0; i < instContent.length; ++i) {
            let arr = [];
            let evalRow = parseInt(document.querySelector('input[name="resLC-' + instContent[i].Id_ListaC + '"]:checked').value);

            arr.push(instContent[i].Id_ListaC);
            arr.push(evalRow);            
            evalForLC.push(arr);
        }

        return evalForLC;
    }

    changeEvRowLC = (e) => {
        let selectedRadio = e.currentTarget;
        let inputEvalRow = selectedRadio.name.replace("resLC-", "");
        let numElemForArray = selectedRadio.getAttribute("datarowInst");

        uncommitedChanges[numElemForArray][1] = parseInt(selectedRadio.value);
        setNewHashToCookieAfterAction();
    }
});