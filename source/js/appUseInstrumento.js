var claveElemento;
var creador;
var Id_Instrumento;
var InstruccLlenado;
var Id_Materia;
var Materia;
var nombreElemento
var TipoEv;
var tipoInstrumento;
var userreg;

var userreg;
var alumnosGP;
var actualAlumnoEval;

var uncommitedChanges;
var instContent;
$(document).ready(function ($) {

    verifyToUseEval = (sessionVariables) => {
        if (!sessionVariables.error) {
            switch (parseInt(sessionVariables.usertype)) {
                case 1:
                    userreg = parseInt(sessionVariables.userreg);
                    getInstrumentData();
                    break;
                case 2:
                    userreg = parseInt(sessionVariables.userreg);
                    getInstrumentData();
                    break;
                default:
                    console.log("Cerrar Sesión");
                    window.location.replace("../../index.php");
                    break;
            }
        } else if (sessionVariables.error) {
            console.log("Cerrar Sesión");
            window.location.replace("../../index.php");
        }
    }

    getInstrumentData = () => {
        var JSON_CreatedInstrData = JSON.parse(sessionStorage.getItem("usedInstrForEval"));

        if (JSON_CreatedInstrData == null) {
            console.log("Cerrar Sesión");
            window.location.replace("../../index.php");
            return;
        }

        Id_Instrumento = parseInt(JSON_CreatedInstrData.Id_Instrumento);
        if (JSON_CreatedInstrData == null) {
            console.log("Cerrar Sesión");
            window.location.replace("../../index.php");
            return;
        }

        dataArray = {
            purpose: 1,
            Id_Instrumento: Id_Instrumento
        };
        $.ajax({
            url: '../../index_ajax.php?controller=instrumento&action=readInstrumento',
            type: 'POST',
            dataType: 'json',
            data: dataArray
        }).done(function (resInstrData) {
            if (resInstrData.built) {
                let iRows = resInstrData.iRows[0];

                claveElemento = iRows.ClaveElem;
                creador = parseInt(iRows.Creador);
                InstruccLlenado = iRows.InstruccLlenado;
                Id_Materia = parseInt(iRows.Materia);
                Materia = JSON_CreatedInstrData.MateriaN;
                nombreElemento = iRows.NombElemento;
                TipoEv = parseInt(iRows.TipoEvaluacion);
                tipoInstrumento = parseInt(iRows.TipoInstrumento);
                alumnosGP = JSON_CreatedInstrData.alumnosGP;

                if (creador != userreg) {
                    console.log("Cerrar y no dar permiso");
                }

                setInstrumentTypeNameKey(tipoInstrumento, claveElemento, nombreElemento);
            }
        }).fail(function () {
            AJAXrequestFailed("Fallo en petición AJAX para obtener información de insturmento ");
        })
    }

    setInstrumentTypeNameKey = (tipoInstrumento, claveElemento, nombreElemento) => {
        let typeInstrumentoLbl = document.getElementById("typeInstrumento");
        let claveNombreInstrumento = document.getElementById("claveNombreInstr");
        let headTable = document.getElementById("tableInstrumentHead");
        claveNombreInstrumento.textContent = Materia + " ~ " + claveElemento + " - " + nombreElemento;

        let selectAlumnEval = document.getElementById("selectAlumnEval");
        for (let i = 0; i < alumnosGP.length; ++i) {
            let opc = document.createElement("option");
            opc.textContent = alumnosGP[i].Registro_U;
            opc.setAttribute("dataaleval", alumnosGP[i].Registro_U);
            opc.setAttribute("dataselectal", i);
            opc.id = alumnosGP[i].Registro_U;
            opc.value = alumnosGP[i].Registro_U;
            selectAlumnEval.appendChild(opc);
        }

        actualAlumnoEval = null;
        uncommitedChanges = null;

        let URLHeadTable;
        let readInstrumentRowsURL;

        switch (tipoInstrumento) {
            case 1:
                typeInstrumentoLbl.textContent += "Rúbrica";
                URLHeadTable = '../../sourcephp/views/buildInst/R/headRowR.php';
                readInstrumentRowsURL = '../../index_ajax.php?controller=rubrica&action=readRubrica';
                break;
            case 2:
                typeInstrumentoLbl.textContent += "Lista de Cotejo";
                URLHeadTable = '../../sourcephp/views/buildInst/LC/headRowLC.php';
                readInstrumentRowsURL = '../../index_ajax.php?controller=listacotejo&action=readListaCotejoData';
                break;
            case 3:
                typeInstrumentoLbl.textContent += "Guía de Observación";
                URLHeadTable = '../../sourcephp/views/buildInst/GO/headRowGO.php';
                readInstrumentRowsURL = '../../index_ajax.php?controller=guiadeobservacion&action=readGuiaObsData';
                break;
            case 4:
                typeInstrumentoLbl.textContent += "Cuestionario";
                URLHeadTable = '../../sourcephp/views/buildInst/C/headRowC.php';
                readInstrumentRowsURL = '../../index_ajax.php?controller=cuestionario&action=readCuestionario';
                break;
        }

        insertCommonTableHead(URLHeadTable, headTable);
        getInstrDataForEval(readInstrumentRowsURL);
        setNewHashToCookieAfterAction();
        updateSaveChangesCookie();

    }

        insertCommonTableHead = (URLHeadTable, headTable) => {
            $.ajax({
                url: URLHeadTable,
                type: 'POST'
            }).done(function (resHeadTable) {
                headTable.innerHTML = resHeadTable;
            }).fail(function () {
                AJAXrequestFailed("Fallo en petición AJAX para cargar head table build instrumento");
            });
        }

        getInstrDataForEval = (readInstrumentRowsURL) => {
            dataArray = {
                Id_Instrumento: Id_Instrumento
            };

            $.ajax({
                url: readInstrumentRowsURL,
                type: 'POST',
                dataType: 'json',
                data: dataArray
            }).done(function (resInstrInfo) {
                if (!resInstrInfo.error) {
                    if (resInstrInfo.built) {
                        instContent = resInstrInfo.contentInst;
                        console.log(resInstrInfo);
                    } else {
                        //No hay contenido en el instrumento para realizar evaluaciones
                    }
                } else {
                    //Error, recargar la página
                }
            }).fail(function () {
                AJAXrequestFailed("Fallo en petición AJAX para cargar contenido de instrumento");
            });
        }


    setSelectedAlToEval = (e) => {
        if (getCookie('s&b!pd?_#d') != getCookie("&lxaAdCs3_¡#dl")) {
            if (confirm("Se han detectado algunos cambios. Para cambiar de alumno por evaluar es necesario almacenar los cambios realizados. ¿Desea guardar los cambios?")) {
                //guardar cambios
                checkContentAndSaveChanges();
                setInfoSelectedAlToEval(e);
            } else {
                e.currentTarget.value = actualAlumnoEval;
            }
        } else {
            setInfoSelectedAlToEval(e);
        }

    }

    setInfoSelectedAlToEval = (e) => {
        let selectAlumnos = e.currentTarget;
        let selectedOp = selectAlumnos.options[selectAlumnos.selectedIndex];
        actualAlumnoEval = parseInt(selectedOp.getAttribute("dataaleval"));
        let indexGPAlumnos = selectedOp.getAttribute("dataselectal");

        let appsAlumForEval = document.getElementById("appsAlumForEval");
        let nombsAlumForEval = document.getElementById("nombsAlumForEval");

        let parentRowsDiv = document.getElementById("rowsContainer");
        parentRowsDiv.innerHTML = "";
        uncommitedChanges = null;

        if (!/^([0-9])*$/.test(indexGPAlumnos)) {
            appsAlumForEval.textContent = "APELLIDOS: Seleccione un alumno";
            nombsAlumForEval.textContent = "NOMBRES: Seleecione un alumno";

            //clean maincontent 
        } else {
            let actualName = alumnosGP[indexGPAlumnos].Nombres;
            let actualApps = alumnosGP[indexGPAlumnos].Apellidos;

            appsAlumForEval.textContent = "APELLIDOS: " + actualApps;
            nombsAlumForEval.textContent = "NOMBRES: " + actualName;

            switch (tipoInstrumento) {
                case 1:
                    
                    break;
                case 2:
                    uncommitedChanges = addLCRowsForEval(instContent);
                    getAndSetLCEvalRows(actualAlumnoEval, Id_Instrumento);
                    break;
                case 3:
                    uncommitedChanges = addGORowsForEval(instContent);
                    getAndSetGOEvalRows(actualAlumnoEval, Id_Instrumento);
                    break;
                case 4:

                    break;
            }
        }   
    }


    checkContentAndSaveChanges = () => {
        switch (tipoInstrumento) {
            case 1:
                
                break;
            case 2:
                cleanAndSaveEvalLC(uncommitedChanges, actualAlumnoEval, Id_Instrumento);
                updateSaveChangesCookie();
                break;
            case 3:
                updateSaveChangesCookie();
                cleanAndSaveEvalGO(uncommitedChanges, actualAlumnoEval, Id_Instrumento);
                break;
            case 4:

                break;
        }
    }

// ++++++++ Funciones comunes (Agregar No Elemento, Aspecto de Evaluacion, Indicadores de Ev) ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

    createNumElem = (rowLCElem, NumElemento) => {
        rowLCElem.id = "numElem" + NumElemento;
        auxCol = document.createElement("p");
        auxCol.classList.add("rowLCElement");
        auxCol.id = "numElemento" + NumElemento;
        auxCol.textContent = NumElemento;
        rowLCElem.appendChild(auxCol);
    }

    createAspEv = (rowLCElem, AspectoEv, Id_ListaC) => {
        rowLCElem.id = "aspEv" + Id_ListaC;
        auxCol = document.createElement("p");
        auxCol.classList.add("rowLCElement");
        auxCol.id = "aspectoEv" + Id_ListaC;
        auxCol.textContent = AspectoEv;
        rowLCElem.appendChild(auxCol);
    }

    createIndicadoresEv = (rowElem, IndicadoresEv, Id_ListaC) => {
        auxCol = document.createElement("p");
        auxCol.classList.add("rowLCElement");
        auxCol.id = "indicadoresEv" + Id_ListaC;
        auxCol.textContent = IndicadoresEv;
        
        rowElem.appendChild(auxCol);
    }
    
    createIndicadoresEv = (rowElem, PonderacionElem, Id_GuiadeO) => {
        auxCol = document.createElement("p");
        auxCol.classList.add("rowLCElement");
        auxCol.id = "pondElem" + Id_GuiadeO;
        auxCol.textContent = PonderacionElem;

        rowElem.appendChild(auxCol);
    }

// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

    window.onbeforeunload = function (e) {

        if (getCookie('s&b!pd?_#d') == getCookie("&lxaAdCs3_¡#dl")) {
            //destroy variable sessionstorage usedInstrForEval
        } else {
            return "Han sido detectados algunos cambios, ¿está seguro de abandonar la página? Los cambios no almacenados serán descartados.";
        }

    }

    setNewHashToCookieAfterAction = () => {
        let newEditID = generateUUID();
        setCookie('&lxaAdCs3_¡#dl', newEditID, 1);

        let saveBtn = document.getElementById("saveChangesBtn");
        saveBtn.disabled = false;
        saveBtn.style.color = "white";
        saveBtn.style.borderColor = "white";
    }

        /**
         * Function to produce UUID.
         * See: http://stackoverflow.com/a/8809472
         */
        generateUUID = () => {
            var d = new Date().getTime();

            if (window.performance && typeof window.performance.now === "function") {
                d += performance.now();
            }

            var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
                var r = (d + Math.random() * 16) % 16 | 0;
                d = Math.floor(d / 16);
                return (c == 'x' ? r : (r & 0x3 | 0x8)).toString(16);
            });

            return uuid;
        }

    updateSaveChangesCookie = () => {
        let lastChangeDetected = getCookie("&lxaAdCs3_¡#dl");
        setCookie('s&b!pd?_#d', lastChangeDetected, 1);

        let saveBtn = document.getElementById("saveChangesBtn");
        saveBtn.disabled = true;
        saveBtn.style.color = "rgb(220, 220, 220)";
        saveBtn.style.borderColor = "rgb(220, 220, 220)";
    }

/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */

    $("#saveChangesBtn").click(function (e) { checkContentAndSaveChanges(); });
    $('body').on('change', '#selectAlumnEval', function (e) { setSelectedAlToEval(e); });

    // Event triggers for Lista de Cotejo
    $('body').on('change', '.resLCInput', function (e) { changeEvRowLC(e); });
    $('body').on('change', '.resGOInput', function (e) { changeEvRowLC(e); });
    


/* --------------------------------------------------------------------------------------------------------------------- */

    getSessionVariables(verifyToUseEval);

});