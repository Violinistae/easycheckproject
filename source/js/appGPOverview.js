var actionGPOverview; 
$(document).ready(function ($) {

    checkActionForSwitchOnGPOverview = (e) => {
        let triggerElement = e.currentTarget;
        actionGPOverview = triggerElement.getAttribute("dataActGP");

        getSessionVariables(verifyCreatorAndUserId);
    }

    verifyCreatorAndUserId = (sessionVariables) => {
        let flagCForAction = false;
        if (profGP == parseInt(sessionVariables.userreg)) { flagCForAction = true; }
        else { flagCForAction = false; }

        if (flagCForAction) {
            switch (actionGPOverview) {
                case "gpRespaldo":

                    break;
                case "gpConfigBtn":
                    
                    break;
                case "gpAdminIntegBtn":
                    getIntegGPPageModal(grupoPeriodo.Id_GrupoPeriodo, true, false);
                    break;
                case "gpShowCreatorCalf":
                    getIntegGPForCalf(grupoPeriodo.Id_GrupoPeriodo, true, true, grupoPeriodo.Materia.Id_Materia);
                    break;
            }
        } else if (!flagCForAction) {
            switch (actionGPOverview) {
                case "gpShowIntegCalf":
                    getIntegGPForCalf(grupoPeriodo.Id_GrupoPeriodo, true, true, grupoPeriodo.Materia.Id_Materia);
                    break;
                case "gpShowInteg":
                    getIntegGPPageModal(grupoPeriodo.Id_GrupoPeriodo, false, false);
                    break;
                case "gpLeave":
                    
                    break;
            }
        }
    }
    

        getIntegGPPageModal = (Id_GrupoPeriodo, profF, calf) => {
            $("#modforactions").fadeIn("400");
            $.ajax({
                url: "../../sourcephp/views/shared/forEveryone/GPIntegList.php",
                type: "POST"
            }).done(function (IntegGPModal) {
                insertIntetgGPModalAndContent(IntegGPModal, Id_GrupoPeriodo, profF, calf);
            }).fail(function () {
                AJAXrequestFailed("Petición AJAX insertar modal de integrantes de GP");
            });

        }

            insertIntetgGPModalAndContent = (IntegGPModal, Id_GrupoPeriodo, profF, calf) => {
                document.getElementById("modalforactionscontainer").innerHTML = IntegGPModal;
                getAndExecuteNewInsertedScript(document.getElementById("modalforactionscontainer"));

                let mat = grupoPeriodo.Materia.Materia;
                let semestre = grupoPeriodo.Materia.Semestre;
                let grupo = grupoPeriodo.Grupo.Grupo;
                let period = grupoPeriodo.Periodo;

                let integMainLbl = document.getElementById("integMainLbl");

                if (calf) {
                    integMainLbl.textContent = "Calificaciones alumnos";
                }
                integMainLbl.textContent += mat + " ~~ " + semestre + "°" + grupo + " ~~ " + period;

                let dataArrayGP = {
                    Id_GpoPeriodo: Id_GrupoPeriodo
                };
                
                $.ajax({
                    url: '../../index_ajax.php?controller=listagrupo&action=getMembersByGP',
                    type: 'POST',
                    dataType: 'json',
                    data: dataArrayGP
                }).done(function (resAlumnosGP) {
                     if (!resAlumnosGP.error) {   
                        if (resAlumnosGP.built) {
                            insertAlumnosGPIntoInteg(resAlumnosGP.alumnosGP, profF, calf);
                        } else {
                            //No hay alumnos en el grupo periodo --> hacer al final esto
                        }
                     }
                }).fail(function () {
                    AJAXrequestFailed("Peticion AJAX obtener alumnos de un GP");
                });

                //seguir en este método y se puede utilizar para insertar a los alumnos para
            }

            insertAlumnosGPIntoInteg = (alumnosGP, profF, calf) => {
                let numCols;
                let headRowIntegrantes = document.getElementsByClassName("headRowIntegrantes").item(0);

                for (let i = 0; i < 3; ++i) {
                    let div = document.createElement("div");
                    let p = document.createElement("p");
                    switch (i) {
                        case 0:
                            div.classList.add("regCol");
                            p.textContent = "Registro";                            
                            break;
                        case 1:
                            div.classList.add("apellidosCol");
                            p.textContent = "Apellidos";
                            break;
                        case 2:
                            div.classList.add("nombresCol");
                            p.textContent = "Nombres";                     
                            break;
                    }
                    div.appendChild(p);
                    headRowIntegrantes.appendChild(div);
                }

                if (profF) {
                    if (calf) {
                        headRowIntegrantes.classList.add("IntegRowAdmin");
                        numCols = 4;

                        let div = document.createElement("div");
                        let p = document.createElement("p");
                        div.classList.add("actionsAdminCol");
                        p.textContent = "Acciones";
                        div.appendChild(p);
                        headRowIntegrantes.appendChild(div);
                    } else {
                        headRowIntegrantes.classList.add("IntegRowAdmin");
                        numCols = 4;

                        let div = document.createElement("div");
                        let p = document.createElement("p");
                        div.classList.add("actionsAdminCol");
                        p.textContent = "Acciones";
                        div.appendChild(p);
                        headRowIntegrantes.appendChild(div);
                    }
                } else {
                    headRowIntegrantes.classList.add("IntegRowAlumno");
                    numCols = 3;
                }

                let IntegContainer = document.getElementsByClassName("IntegContainer").item(0);
                for (let i = 0; i < alumnosGP.length; ++i) {
                    let integDiv = document.createElement("div");
                    integDiv.classList.add("commonGPIntegRow");

                    if (profF)  integDiv.classList.add("IntegRowAdmin");
                    else integDiv.classList.add("IntegRowAlumno");

                    //if calf agregar otro para layout para calificaciones
                    
                    for (let j = 0; j < numCols; ++j) {
                        let div = document.createElement("div");
                        let p = document.createElement("p");

                        let regU = alumnosGP[i].Registro_U; let nombs = alumnosGP[i].Nombres;
                        let apps = alumnosGP[i].Apellidos;

                        switch (j) {
                            case 0:
                                div.classList.add("regCol");
                                div.classList.add("normalGPIntegCol");
                                p.textContent = regU;
                                div.appendChild(p);
                                break;
                            case 1:
                                div.classList.add("apellidosCol");
                                div.classList.add("normalGPIntegCol");
                                p.textContent = apps;
                                div.appendChild(p);
                                break;
                            case 2:
                                div.classList.add("nombresCol");
                                div.classList.add("normalGPIntegCol");
                                p.textContent = nombs;
                                div.appendChild(p);
                                break;
                            case 3:
                                if (calf) {
                                    
                                } else {
                                    div.classList.add("actionsAdminCol");
                                    div.classList.add("actionsAdmin");
                                    let deleteAlIco = '<i class="actiongpInteg fas fa-trash" dataactioninteggp="del-' + regU + '" title="Eliminar integrante"></i>';

                                    div.innerHTML = deleteAlIco;
                                }
                                break;
                                
                        }                        
                        integDiv.appendChild(div);
                    }
                    IntegContainer.appendChild(integDiv);
                }
            }


// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

    getIntegGPForCalf = (Id_GrupoPeriodo, profF, calf, Materia) => {
        $("#modforactions").fadeIn("400");
        $.ajax({
            url: "../../sourcephp/views/shared/forEveryone/GPIntegListCalf.php",
            type: "POST"
        }).done(function (IntegGPModal) {
            insertIntegGPCalfModalContent(IntegGPModal, Id_GrupoPeriodo, profF, calf, Materia);
        }).fail(function () {
            AJAXrequestFailed("Petición AJAX insertar modal de integrantes de GP");
        });
    }

        insertIntegGPCalfModalContent = (IntegGPModal, Id_GrupoPeriodo, profF, calf, Materia) => {
            document.getElementById("modalforactionscontainer").innerHTML = IntegGPModal;
            getAndExecuteNewInsertedScript(document.getElementById("modalforactionscontainer"));

            let mat = grupoPeriodo.Materia.Materia;
            let semestre = grupoPeriodo.Materia.Semestre;
            let grupo = grupoPeriodo.Grupo.Grupo;
            let period = grupoPeriodo.Periodo;

            let integMainLbl = document.getElementById("integMainLbl");

            if (calf) {
                integMainLbl.textContent = "Calificaciones ";
            }
            integMainLbl.textContent += mat + " ~~ " + semestre + "°" + grupo + " ~~ " + period;

            let dataArrayGP = {
                Id_GpoPeriodo: Id_GrupoPeriodo
            };

            $.ajax({
                url: '../../index_ajax.php?controller=listagrupo&action=getMembersByGP',
                type: 'POST',
                dataType: 'json',
                data: dataArrayGP
            }).done(function (resAlumnosGP) {
                if (!resAlumnosGP.error) {
                    if (resAlumnosGP.built) {
                        getMateriaForValParForCalf(resAlumnosGP.alumnosGP, profF, calf, Materia);
                    } else {
                        //No hay alumnos en el grupo periodo --> hacer al final esto
                    }
                }
            }).fail(function () {
                AJAXrequestFailed("Peticion AJAX obtener alumnos de un GP");
            });
        }

        getMateriaForValParForCalf = (alumnosGP, profF, calf, Materia) => {
            dataMateria = {
                materiaID: parseInt(Materia)
            };

            $.ajax({
                url: '../../index_ajax.php?controller=materia&action=getMateriaById',
                type: 'POST',
                dataType: 'json',
                data: dataMateria
            }).done(function (resMateria) {
                if (!resMateria.error) {
                    let mat = resMateria.materia;
                    let purpuseTxtFile = 0;
                    let dataForCalfTable = {
                        alumnosGP: alumnosGP,
                        profF: profF,
                        calf: calf
                    };
                    
                    getGeneratedTxt(mat, purpuseTxtFile, null, insertDataIntoCalfsTable, dataForCalfTable);
                }
            }).fail(function () {
                AJAXrequestFailed("Fallo en peticion AJAX para obtener materia");
            });
            //get materia -> get txt file para Valores Parciales -> obtener calificaciones de instrumentos
        }

//********************************************************************* */


insertDataIntoCalfsTable = (valParData, dataForCalfTable) => {
    console.log(valParData);
    console.log(dataForCalfTable);

    let alumnosGP = dataForCalfTable.alumnosGP;

    let calfSubcontainer = document.getElementsByClassName("calfSubcontainer").item(0);
    let divHeadCalf = document.createElement("div")
    divHeadCalf.classList.add("calfCommonRow"); divHeadCalf.classList.add("headCalfRow");
    for (let i = 0; i < valParData.length; ++i) {
        let div = document.createElement("div");
        div.classList.add("CalfSubHead");
        div.textContent = valParData[i][1];
        divHeadCalf.appendChild(div);
    }
    calfSubcontainer.appendChild(divHeadCalf);


    let integSubcontainer = document.getElementsByClassName("integSubcontainer").item(0);
    for (let i = 0; i < alumnosGP.length; ++i) {
        let divInteg = document.createElement("div");
        divInteg.classList.add("alumnoCalfCommonRow");

        for (let j = 0; j < 3; ++j) {
            let auxDiv = document.createElement("div");
            let p = document.createElement("p");

            switch (j) {
                case 0: p.textContent = alumnosGP[i].Registro_U; break;
                case 1: p.textContent = alumnosGP[i].Apellidos; break;
                case 2: p.textContent = alumnosGP[i].Nombres; break;
            }
            auxDiv.appendChild(p);
            divInteg.appendChild(auxDiv);
        }
        integSubcontainer.appendChild(divInteg);


        let dataArray = {
            Materia: grupoPeriodo.Materia.Id_Materia,
            ValParData: valParData,
            ValParLeng: valParData.length,
            Alumno: alumnosGP[i].Registro_U
        };

        $.ajax({
            url: '../../index_ajax.php?controller=instrumentoscompartidos&action=readMateriaSharedInstByClave',
            type: 'POST',
            dataType: 'json',
            data: dataArray
        }).done(function (resCalf) {
            let calf = resCalf.Calf;
            console.log(calf);
            for (let j = 0; j < calf.length; ++j) {
                if (calf[j][0] != "000") {
                    let promedioA = parseInt(calf[j][0]);
                    let puntaje = promedioA / 100 * parseInt(valParData[i][2]);
                    calf[j][1] = puntaje;
                } else {

                }
            }
            let calfSubcontainer = document.getElementsByClassName("calfSubcontainer").item(0);
            insertCalf(calf, calfSubcontainer);
        }).fail(function () {
            AJAXrequestFailed("No sirve");
        });

    }
    
}

    insertCalf = (calf, calfSubcontainer) => {
        let div = document.createElement("div");
        div.classList.add("calfCommonRow");
        for (let k = 0; k < calf.length; ++k) {
            let diva = document.createElement("div");
            let p = document.createElement("p");

            if (calf[k][0] == "000") {
                p.textContent = calf[k][0];
            } else if (calf[k][0] < 100) {
                p.textContent = "_" + calf[k][0];
            } else if (calf[k][0] < 10) {
                p.textContent = "__" + calf[k][0];
            } else {
                p.textContent = calf[k][0];
            }
            diva.appendChild(p);

            p = document.createElement("p");

            if (calf[k][1] == "00") {
                p.textContent = calf[k][1];
            } else if (calf[k][1] < 10) {
                p.textContent = "_" + calf[k][1];
            } else {
                p.textContent = calf[k][1];
            }
            diva.appendChild(p);

            div.appendChild(diva);
        }
        calfSubcontainer.appendChild(div);
    }
    

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

    verifyGPIntegToEval = (eTrigger) => {
        let dataArrayGP = {
            Id_GpoPeriodo: parseInt(grupoPeriodo.Id_GrupoPeriodo)
        };

        $.ajax({
            url: '../../index_ajax.php?controller=listagrupo&action=getMembersByGP',
            type: 'POST',
            dataType: 'json',
            data: dataArrayGP
        }).done(function (resAlumnosGP) {
            if (!resAlumnosGP.error) {
                if (resAlumnosGP.built) {
                    useInstrToEval(eTrigger, resAlumnosGP.alumnosGP);
                } else {
                    var mainmessage = "Lo sentimos pero no hay alumnos que evaluar en su Grupo Periodo, favor de ponerse en contacto con los estudiantes.";
                    var secmessage = "Presione el botón para continuar.";
                    showMessage("wArNinGbTn_AcTiOn", 0, mainmessage, secmessage);
                }
            }
        }).fail(function () {
            AJAXrequestFailed("Peticion AJAX obtener alumnos de un GP");
        });

    }

        useInstrToEval = (eTrigger, alumnosGP) => {
            let o = {
                Id_Instrumento: parseInt(eTrigger.getAttribute("dataidins")),
                alumnosGP: alumnosGP,
                MateriaN: grupoPeriodo.Materia.Materia
            };

            console.log(o);
            let str = JSON.stringify(o);

            $(".subdropumen").removeClass('active');
            $(".buttonnewinst").removeClass('active');
            $("#modforactions").fadeOut("300");

            let useInstrToEvalURL = "../../sourcephp/views/useInstrumento.php";
            sessionStorage.setItem("usedInstrForEval", str);
            window.open(useInstrToEvalURL, "_blank");

        }

});