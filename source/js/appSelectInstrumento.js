var clickedSelectInst = false;
$(document).ready(function ($) {false
    

    loadFormCreateInstr = (e) => {
        if (clickedSelectInst) {
            return;
        }

        clickedSelectInst = true;
        setCookie('lStMoDlAsTaD', 'selectInstrumentCreate', 1);

        var Instrumento = e.currentTarget.id;
        var formURL = "../../sourcephp/views/shared/CoordAndProf/createInstrumento.php";
        var instrument;

        switch (Instrumento) {
            case "cRubrica": instrument = 1;
                break;
            case "cListaC": instrument = 2;
                break;
            case "cGuiaObs": instrument = 3;
                break;
            case "cCuestionario": instrument = 4;
                break;
            default:
                return;   
        }   

        $.ajax({
            url: formURL,
            type: "POST"        
        }).done(function (resCreateInstrumentoForm) {
            insertCreateInstrumentoForm(resCreateInstrumentoForm, instrument); 
        }).fail(function () {
            AJAXrequestFailed("Fallo en petición AJAX para insertar formulario para crear instrumento de evaluación");
        });
    }

        insertCreateInstrumentoForm = (resCreateInstrumentoForm, instrument) => {      

            $("#modalforactionscontainer").fadeOut(300, function () { 
                document.getElementById("modalforactionscontainer").innerHTML = resCreateInstrumentoForm;
                getAndExecuteNewInsertedScript(document.getElementById("modalforactionscontainer"));
                $("#modalforactionscontainer").fadeIn(300);
                insertContentCreateInstrumentoForm(instrument);
            });
        }

        insertContentCreateInstrumentoForm = (instrument) => {
            var typeInstTxt = document.getElementById("titleFormCreateInst");
            var carreraMateriaTxt = document.getElementById("carreraMateriaTxt");
            let tipoInstrumento = document.getElementById("instTypeHidden");

            switch (instrument) {
                case 1:         //Rubrica
                    typeInstTxt.textContent += "Rubrica";
                    tipoInstrumento.value = 1;
                    break;
                case 2:         //Lista C
                    typeInstTxt.textContent += "Lista de Cotejo";
                    tipoInstrumento.value = 2;
                    break;
                case 3:         //Guia Obs
                    typeInstTxt.textContent += "Guia de Observación";
                    tipoInstrumento.value = 3;
                    break;
                case 4:         //Cuestionario
                    typeInstTxt.textContent += "Cuestionario";
                    tipoInstrumento.value = 4;
                    break;    
                default:
                    break;
            }
            
            getEvTypes();
            getSessionVariables(checkAcademiaCount); //Verificar tipo de cuenta para habilitar o desabilitar campo de academia

        }

            getEvTypes = () => {
                $.ajax({
                    url: '../../index_ajax.php?controller=tipoevaluacion&action=readTipoEvaluacion',
                    type: 'POST',
                    dataType: 'json'                    
                }).done(function (resTiposEvaluacion) {
                    insertEvaluationsTypesOnSelect(resTiposEvaluacion);
                }).fail(function () {
                    AJAXrequestFailed("Fallo en petición AJAX para insertar Tipos de Evaluación");
                })
            }

                insertEvaluationsTypesOnSelect = (resTiposEvaluacion) => {
                    let tiposEvSelect = document.getElementById("tipoEvSelect");
                    let tiposEvaluacion = resTiposEvaluacion.tiposEvaluacion;
                    tiposEvaluacion.forEach(tEv => {
                        let optionTipoEv = document.createElement("option");
                        optionTipoEv.value = tEv.Id_TipoEv;
                        optionTipoEv.text = tEv.TipoEvaluacion;
                        tiposEvSelect.add(optionTipoEv);
                    });
                }

            checkAcademiaCount = (sessionVariables) => {                
                if (sessionVariables.usertype == 1) {   //Coordinador deshabilitado select y asignada materia
                    dataAcademiaFromJS = {
                        fromJS : 1
                    };
                    $.ajax({
                        url: '../../index_ajax.php?controller=academia&action=getAcademiaByCoordinador',
                        type: 'POST',
                        dataType: 'json',
                        data: dataAcademiaFromJS          
                    }).done(function (resAcademia) {
                        setAcademiaOnSelectForCoord(resAcademia);
                    }).fail(function () {
                        AJAXrequestFailed("Fallo en petición AJAX para obtener materias de cuenta de coordinador de academia.");
                    })
                } else if (sessionVariables.usertype == 2){                //Profesor, habilitar select academias a las que pertenece y selecionar materias de esa academia
                    $.ajax({
                        url: "../../index_ajax.php?controller=integrantesacademia&action=getAcadMembers",
                        type: 'POST',
                        dataType: 'json'
                    }).done(function (resAcadsMemberOf) {
                        if (!resAcadsMemberOf.error) {
                            if (resAcadsMemberOf.memberAcads) {
                                insertAcademiasProfMemberToSelect(resAcadsMemberOf.acads);
                            } else {
                                
                            }
                        }
                    }).fail(function () {
                        AJAXrequestFailed("Fallo en petición para obtener academias miembro usuario");
                    })
                }
            }

                setAcademiaOnSelectForCoord = (resAcademia) => {

                    let idAcad = parseInt(resAcademia.academia.Id_Academia);
                    let acad = resAcademia.academia.Academia;

                    let academiaSelect = document.getElementById("academiaMateriaSelect");
                    let academiaCoordinada = document.createElement("option");

                    var materiaSelect = document.getElementById("materiasSelect");
                    let toSelectMateria = document.createElement("option");

                    let claveElemInput = document.getElementById("claveElemInput");
                    let toclaveElemInput = document.createElement("option");

                    let nombreElemInput = document.getElementById("nombreElemInput");
                    let tonombreElemInput = document.createElement("option");

                    academiaSelect.disabled = true;
                    academiaSelect.remove(0);
                    academiaCoordinada.text = acad;
                    academiaCoordinada.value = idAcad;
                    academiaSelect.add(academiaCoordinada);

                    materiaSelect.remove(0);
                    materiaSelect.disabled = false;
                    toSelectMateria.value = "null";
                    toSelectMateria.text = "- Seleccione una materia -";
                    materiaSelect.add(toSelectMateria);

                    claveElemInput.remove(0);
                    toclaveElemInput.value = "null";
                    toclaveElemInput.text = "- Seleccione una materia -";
                    claveElemInput.add(toclaveElemInput);

                    nombreElemInput.remove(0);
                    tonombreElemInput.value = "null";
                    tonombreElemInput.text = "- Seleccione una materia -";
                    nombreElemInput.add(tonombreElemInput);

                    readMateriasData = {
                        purpose: 2,
                        idAcademia: idAcad
                    }
                    $.ajax({
                        url: '../../index_ajax.php?controller=materia&action=readMateria',
                        type: 'POST',
                        dataType: 'json',
                        data: readMateriasData
                    }).done(function (materiasAcademia) {
                        insertMateriasIntoSelect(materiasAcademia);
                    }).fail(function () {
                        AJAXrequestFailed("Fallo en petición AJAX obtener materias de una academia");
                    });                    
                }

                insertAcademiasProfMemberToSelect = (acads) => {                    
                    let academiaMateriaSelect = document.getElementById("academiaMateriaSelect");
                    academiaMateriaSelect.remove(0);
                    academiaMateriaSelect.disabled = false;

                    let opc = document.createElement("option");
                    opc.value = "null";
                    opc.textContent = "- Seleccione una academia -";
                    opc.selected = true;

                    academiaMateriaSelect.add(opc);

                    for (let i = 0; i < acads.length; ++i) {
                        let op = document.createElement("option");
                        op.value = acads[i][0];
                        op.textContent = acads[i][1];
                        academiaMateriaSelect.add(op);                        
                    }
                }
                    
                    insertMateriasIntoSelect = (materiasAcademia) => {
                        if (!materiasAcademia.error) {
                            let materiasSelect = document.getElementById("materiasSelect");
                            let materiasForSelect = materiasAcademia.materias;
                                                                        
                            materiasForSelect.forEach(materia => {
                                let optionMateria = document.createElement("option");
                                optionMateria.value = materia.Id_Materia;
                                optionMateria.text = materia.Materia;
                                materiasSelect.add(optionMateria);
                            });
                        } else {
                            let mainmessage = "Favor de recargar la página. Sentimos las molestias.";
                            let secmessage = "Presione el botón para continuar";
                            showMessage("wArNinGbTn_AcTiOn", 0, mainmessage, secmessage);
                        }
                    }
                    
//----------------------------------------------------------------------------------------------------

    $(".typeInstrumento").click(function (e) { loadFormCreateInstr(e); });  
});