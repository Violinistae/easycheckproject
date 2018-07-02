$(document).ready(function ($) {

    addGORowsForEval = (instContent) => {
        let evalForGO = [];
        let parentRowsDiv = document.getElementById("rowsContainer");
        for (let j = 0; j < instContent.length; ++j) {

            let instumentGORow = document.createElement("div");
            instumentGORow.classList.add("instrumentRow");
            instumentGORow.classList.add("rowGO");
            instumentGORow.id = "rowGO" + instContent[j].Id_GuiadeO;

            for (let i = 0; i < 5; ++i) {
                let rowGOElem = document.createElement("div");
                rowGOElem.classList.add("rowGOElement");

                switch (i) {
                    case 0:
                        createNumElem(rowGOElem, instContent[j].NumElemento);
                        break;
                    case 1:
                        rowGOElem.classList.add("aspEv");
                        createAspEv(rowGOElem, instContent[j].AspectoEv, instContent[j].Id_GuiadeO);
                        break;
                    case 2:
                        rowGOElem.classList.add("indicadoresEvContainer");
                        createIndicadoresEv(rowGOElem, instContent[j].AccionesEv, instContent[j].Id_GuiadeO);
                        break;
                    case 3:
                        createAspEv(rowGOElem, instContent[j].PonderacionElem, instContent[j].Id_GuiadeO);
                        break;
                    case 4:
                        rowGOElem.classList.add("resRowGO");
                        rowGOElem.id = "resRowGO" + instContent[j].Id_GuiadeO;

                        let div = document.createElement("div");
                        div.innerHTML = '<input type="radio" checked class="resGOInput" name="resGO-' + instContent[j].Id_GuiadeO + '" datarowInst="' + (instContent[j].NumElemento - 1) + '" value="1">' +
                            '<p>Cumplido</p>';
                        rowGOElem.appendChild(div);

                        div = document.createElement("div");
                        div.innerHTML = '<input type="radio" class="resGOInput" name="resGO-' + instContent[j].Id_GuiadeO + '" datarowInst="' + (instContent[j].NumElemento - 1) + '" value="0">' +
                            '<p>No Cumplido</p>';
                        rowGOElem.appendChild(div);
                        break;
                }

                instumentGORow.appendChild(rowGOElem);
                parentRowsDiv.appendChild(instumentGORow);
            }
        }

        for (let i = 0; i < instContent.length; ++i) {
            let arr = [];
            let evalRow = parseInt(document.querySelector('input[name="resGO-' + instContent[i].Id_GuiadeO + '"]:checked').value);

            arr.push(instContent[i].Id_GuiadeO);
            arr.push(evalRow);
            evalForGO.push(arr);
        }

        return evalForGO;
    }

    changeEvRowLC = (e) => {
        let selectedRadio = e.currentTarget;
        let inputEvalRow = selectedRadio.name.replace("resGO-", "");
        let numElemForArray = selectedRadio.getAttribute("datarowInst");

        uncommitedChanges[numElemForArray][1] = parseInt(selectedRadio.value);
        setNewHashToCookieAfterAction();
    }

});