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

                    break;
            }
        } else if (!flagCForAction) {
            switch (actionGPOverview) {
                case "gpShowIntegCalf":

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
                // mostrar las calificaciones en una lista pero en el main container en vez de un modal
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
});