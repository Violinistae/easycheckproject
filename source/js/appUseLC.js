$(document).ready(function ($) {
    addLCRowsForEval = (instContent) => {
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
                        div.innerHTML = '<input type="radio" checked class="resLCInput" name="resLC-' + instContent[j].Id_ListaC + '" value="1">' +
                            '<p>Cumplido</p>';
                        rowLCElem.appendChild(div);

                        div = document.createElement("div");
                        div.innerHTML = '<input type="radio" class="resLCInput" name="resLC-' + instContent[j].Id_ListaC + '" value="0">' +
                            '<p>No Cumplido</p>';
                        rowLCElem.appendChild(div);
                        break;
                }

                instumentLCRow.appendChild(rowLCElem);
                parentRowsDiv.appendChild(instumentLCRow);
            }
        }
    }
});