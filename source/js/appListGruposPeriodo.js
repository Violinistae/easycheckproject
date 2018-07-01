var clickedGpoP;
var grupoPeriodo;
var realFileName;
var creatorFlag;
profGP = 0;
$(document).ready(function ($) {
    switchActionGpoP = (e) => {
        var attr = e.originalEvent.path[1].getAttribute("id");
    
        if (attr == null) {
            return;
        }
    
        var splitedAttr = attr.split("-")
    
        var action = splitedAttr[0];
        var gpoPId = parseInt(splitedAttr[1]);
    
        switch (action) {
            case "f":
                $("#inputListaAlumnos").trigger("click");
                clickedGpoP = gpoPId;
                break;
            case "t":
                //Delete
                checkDeleteGP(gpoPId);
                break;
            case "s":
                clickedGpoP = gpoPId;
                goToShowGPInfo(clickedGpoP);
                break;
            default:
                break;
        }
    }

    getGpoPtoUpdateFile = () => {
        let dataGP = {
            Id_GpoPeriodo: clickedGpoP
        };

        $.ajax({
            url: '../../index_ajax.php?controller=grupoperiodo&action=getGpoPById',
            type: 'POST',
            dataType: 'json',
            data: dataGP
        }).done(function (resOldGP) {
            if (!resOldGP.error) {
                if (resOldGP.built) {
                    updateXlsxListaAlumnos(resOldGP.gpoperiodo);
                } else {
                    alert("Favor de recargar la página");
                }
            }
        }).fail(function () {
            AJAXrequestFailed("Fallo en petición AJAX para obtener Gpo Periodo anterior");
        })
    }

        updateXlsxListaAlumnos = (oldGP) => {

            let num = Math.random() * 10000;
            let numForFile = Math.round(num);
            newRealFileName = "listaAlum" + numForFile.toString() + realFileName;

            var oldListaAlFileName = oldGP.Lista_Alumnos;
            oldGP.Lista_Alumnos = newRealFileName;

            let dataUpdateFile = new FormData;
            dataUpdateFile.append('fileType', fileType);
            dataUpdateFile.append('file', fileInput.files[0]);
            dataUpdateFile.append('fileName', newRealFileName);
            dataUpdateFile.append('targetPath', "./source/files/temp/");
            dataUpdateFile.append('targetPathTxt', "./source/files/listasGruposPeriodos/");

            $.ajax({
                url: '../../index_ajax.php?controller=file&action=saveFile_getPathForJS',
                type: 'POST',
                contentType: false,
                processData: false,
                data: dataUpdateFile
            }).done(function (resUpdateExcelFile) {
                try {
                    var JSONres = JSON.parse(resUpdateExcelFile);
                    if (!JSONres.error) {
                        var saveTxtPath = "source/files/listasGruposPeriodos/";
                        getXlsxFileCreateJSON(JSONres.filePath, JSONres.fileName, 3, saveTxtPath, true, oldListaAlFileName, sendDataForUpdateGP, oldGP);
                    } else {
                        var mainmessage = JSONres.message;
                        var secmessage = "Presione el botón para continuar";
                        showMessage("wArNinGbTn_AcTiOn", 410, mainmessage, secmessage);
                    }
                } catch (Exception) {
                    var mainmessage = "Error JSON inesperado. Inténtelo más tarde.";
                    var secmessage = "Presione el botón para continuar";
                    showMessage("wArNinGbTn_AcTiOn", 410, mainmessage, secmessage);
                }
            }).fail(function () {
                AJAXrequestFailed("No funciona petición AJAX para actualizar archivo Lista Alumnos.");
            });

        }

        sendDataForUpdateGP = (fileName, NewGP) => {
            NewGP.Valores_Parciales = fileName;

            $.ajax({
                url: '../../index_ajax.php?controller=grupoperiodo&action=updateGpoP',
                type: 'POST',
                data: NewGP
            }).done(function (resUpdateListaAlumnos) {
                if (!resUpdateListaAlumnos.error) {
                    var mainmessage = "Archivo actualizado exitosamente.";
                    var secmessage = "Presione el botón para continuar";
                    showMessage("wArNinGbTn_AcTiOn", 410, mainmessage, secmessage);
                }
            }).fail(function () {
                AJAXrequestFailed("No funciona petición AJAX para actualizar nombre ListaAlumnos en BD.");
            });
        }

    //Usar variable global --> clickedGpoP
    goToShowGPInfo = (gpoPId) => {
        getSessionVariables(showGPInfo);
        clickedGpoP = gpoPId;

        //Save var for return to gpo periodo
    }

    showGPInfo = (sessionVariables) => {
        
        dataGP = {
            Id_GpoPeriodo: clickedGpoP
        };

        $.ajax({
            url: '../../index_ajax.php?controller=grupoperiodo&action=getGpoPById',
            type: 'POST',
            dataType: 'json',
            data: dataGP
        }).done(function (resGpSelected) {            
            profGP = resGpSelected.gpoperiodo.Profesor.Registro_U;
            grupoPeriodo = resGpSelected.gpoperiodo;
            creatorFlag = false;
            //console.log(grupoPeriodo);

            if (sessionVariables.userreg == profGP) {
                $(".contextCostumMenu").attr("dataPurpose", "mPfGsP");
                creatorFlag = true;
                console.log("Soy el creador");
            } else {
                $(".contextCostumMenu").attr("dataPurpose", "mAlGsP");
            }

            $.ajax({
                url: '../../sourcephp/views/shared/forEveryone/gpoPeriodoOverview.php',
                type: 'POST',
            }).done(function (gpoPeriodoOverview) { 
                maincontentFadeAnimation(gpoPeriodoOverview, checkUserForGPOverviewContent);
            }).fail(function () {
                AJAXrequestFailed("Fallo en AJAX para ir a Overview de GrupoPeriodo");
            });           

        }).fail(function () {
            AJAXrequestFailed("Fallo en petición AJAX para obtener info de grupoacademia");
        });
    }

        checkUserForGPOverviewContent = () => {
            let mainContainer = document.getElementById("submaincontainer");
            getAndExecuteNewInsertedScript(mainContainer);

            let mat = grupoPeriodo.Materia.Materia;
            let semestre = grupoPeriodo.Materia.Semestre;
            let grupo = grupoPeriodo.Grupo.Grupo;
            let period = grupoPeriodo.Periodo;

            let gplblName = document.getElementById("gplblName");
            gplblName.textContent = mat + " ~~ " + semestre + "°" + grupo + " ~~ " + period;

            let groupActionsBar = document.getElementById("groupActionsBar");    
            if (creatorFlag) {
                for (let i = 0; i < 4; ++i) {
                    let btnAction = document.createElement("button");
                    btnAction.classList.add("gpOverviewBtn");

                    switch (i) {
                        case 0:
                            btnAction.id = "gpRespaldo"; btnAction.textContent = "Crear respaldo";
                            btnAction.setAttribute("dataActGP", "gpRespaldo");
                            break;
                        case 1:
                            btnAction.id = "gpConfigBtn"; btnAction.textContent = "Configuración de grupo";
                            btnAction.setAttribute("dataActGP", "gpConfigBtn");
                            break;
                        case 2:
                            btnAction.id = "gpAdminIntegBtn"; btnAction.textContent = "Mostrar integrantes/alumnos";
                            btnAction.setAttribute("dataActGP", "gpAdminIntegBtn");
                            break;           
                        case 3:
                            btnAction.id = "gpShowCreatorCalf"; btnAction.textContent = "Mostrar calificaciones";
                            btnAction.setAttribute("dataActGP", "gpShowCreatorCalf");
                            break;                                                                             
                    }
                    groupActionsBar.appendChild(btnAction);
                }

                let dataArray = {
                    Id_Materia: grupoPeriodo.Materia.Id_Materia
                };

                $.ajax({
                    url: '../../index_ajax.php?controller=instrumentoscompartidos&action=readMateriaSharedInst',
                    type: 'POST',
                    dataType: 'json',
                    data: dataArray
                }).done(function (InstrumentsToInsert) {
                    if (!InstrumentsToInsert.error) {
                        if (InstrumentsToInsert.built) {
                            insertInstrumentsIntoGPOverview(InstrumentsToInsert.sharedInst);
                        } else {
                            let noCompInstr = document.getElementById("noInstrCompAvailable");

                            let p = document.createElement("p");
                            p.textContent = "No existe algún instrumento compartido para la materia de este Grupo Periodo";
                            noCompInstr.appendChild(p);
                            noCompInstr.appendChild(document.createElement("BR"));

                            p = document.createElement("p");
                            p.textContent = 'Para compartir uno en su academia correspondiente, elija la opción "Compartir Instrumento" en su pagina principal';
                            noCompInstr.appendChild(p);
                        }
                    }                
                }).fail(function () {
                    AJAXrequestFailed("Fallo en petición AJAX para obtener instrumentos compartidos para una materia");
                });

            } else {
                for (let i = 0; i < 3; ++i) {
                    let btnAction = document.createElement("button");
                    btnAction.classList.add("gpOverviewBtn");

                    switch (i) {
                        case 0:
                            btnAction.id = "gpShowIntegCalf"; btnAction.textContent = "Mostrar calificaciones";
                            btnAction.setAttribute("dataActGP", "gpShowIntegCalf");
                            break;
                        case 1:
                            btnAction.id = "gpShowInteg"; btnAction.textContent = "Mostrar compañeros";
                            btnAction.setAttribute("dataActGP", "gpShowInteg");
                            break;
                        case 2:
                            btnAction.id = "gpLeave"; btnAction.textContent = "Abandonar Grupo Periodo";
                            btnAction.setAttribute("dataActGP", "gpLeave");
                            break;   
                    }
                    groupActionsBar.appendChild(btnAction);

                    let mainGPLbl = document.getElementById("mainGPLbl");
                    mainGPLbl.textContent = "Instrumentos por contestar"
                }

                //Insertar instrumentos que se pueden contestar
            }
        }

            insertInstrumentsIntoGPOverview = (InstrumentsToInsert) => {
                let instrumentsContainerGPOverview = document.getElementsByClassName("instrumentsContainer").item(0);

                for (let i = 0; i < InstrumentsToInsert.length; ++i) {
                    let instrumentDivGP = document.createElement("div");
                    instrumentDivGP.classList.add("instrumentDiv");

                    let instrumentImg = document.createElement("span");
                    instrumentImg.classList.add("instrumentImg");
                    instrumentImg.setAttribute("dataidins", InstrumentsToInsert[i].Id_Instrumento);
                    instrumentImg.setAttribute("dataidmat", InstrumentsToInsert[i].Id_Materia);

                    switch (parseInt(InstrumentsToInsert[i].Id_TipoIn)) {
                        case 1:
                            instrumentImg.style.backgroundImage = "url('../../source/img/instrumentos/rubrica.jpg')";
                            break;
                        case 2:
                            instrumentImg.style.backgroundImage = "url('../../source/img/instrumentos/listacotejo.png')";
                            break;
                        case 3:
                            instrumentImg.style.backgroundImage = "url('../../source/img/instrumentos/guiaobs.png')";
                            break;
                        case 4:
                            instrumentImg.style.backgroundImage = "url('../../source/img/instrumentos/cuestionario.png')";
                            break;
                    }

                    instrumentDivGP.appendChild(instrumentImg);

                    let instrumentTextPart = document.createElement("div");
                    instrumentTextPart.classList.add("instrumentTextPart");

                    let label = document.createElement("label");
                    label.classList.add("nomElemInstr");
                    label.textContent = InstrumentsToInsert[i].TipoInstrumento + " ~ "
                        + InstrumentsToInsert[i].ClaveElem + " - " + InstrumentsToInsert[i].NombElemento;
                    instrumentTextPart.appendChild(label);

                    label = document.createElement("label");
                    label.textContent = InstrumentsToInsert[i].Materia;
                    instrumentTextPart.appendChild(label);

                    instrumentDivGP.appendChild(instrumentTextPart);
                    instrumentsContainerGPOverview.appendChild(instrumentDivGP);
                    
                }

            }

    
    checkDeleteGP = (gpoPId) => {        
        dataGp = {
            Id_GpoPeriodo: gpoPId
        };

        $.ajax({
            url: '../../index_ajax.php?controller=grupoperiodo&action=getGpoPById',
            type: 'POST',
            dataType: 'json',
            data: dataGp
        }).done(function (resGpSelected) {
            if (!resGpSelected.error) {
                if (resGpSelected.built) {
                    grupoPeriodo = resGpSelected.gpoperiodo;
                    let period = resGpSelected.gpoperiodo.Periodo;
                    let mat = resGpSelected.gpoperiodo.Materia.Materia;

                    var mainmessage = '¿Está seguro de eliminar el grupo periodo "' + mat + " " + period + '" ?';
                    var secmessage = "Recomendamos realice un respaldo, ya que al confirmar esta acción no se podrá recuperar la información de este.";
                    showMessage("wArNinGbTn_AcTiOn", 22, mainmessage, secmessage);
                }
            }
        }).fail(function () {
            AJAXrequestFailed("Petición AJAX para borrar materia ha fallado");
        });
    }

        deleteSelectedGP = () => {
            dataGpP = {
                Id_GpoPeriodo: grupoPeriodo.Id_GrupoPeriodo
            };

            $.ajax({
                url: '../../index_ajax.php?controller=grupoperiodo&action=deletegpop',
                type: 'POST',
                dataType: 'json',
                data: dataGpP
            }).done(function (resDeletedGP) {
                $("#modwarning").fadeOut("300", function () { 
                    if (!resDeletedGP.error) {
                        deleteFile('./source/files/listasGruposPeriodos/' + grupoPeriodo.Lista_Alumnos + '.txt');

                        var mainmessage = "Grupo Periodo eliminado exitosamente.";
                        var secmessage = "Presione el botón para continuar";
                        showMessage("wArNinGbTn_AcTiOn", 20, mainmessage, secmessage);
                    } else {
                        var mainmessage = "No se pudo eliminar el Grupo Periodo, favor de intentarlo más tarde.";
                        var secmessage = "Presione el botón para continuar";
                        showMessage("wArNinGbTn_AcTiOn", 20, mainmessage, secmessage);
                    }
                });
            }).fail(function () {
                AJAXrequestFailed("Petición AJAX para eliminar grupo periodo ha fallado");
            });
        }
    
    /* ---------------------------------------------------------------------------------------------------------------- */

    insertModalRequestGpoP = (e) => {
        $(".buttonnewinst").removeClass('active');
        $(".subdropumen").removeClass('active');

        actionsCookieName = "aiCoTndDtoO";
        setCookie(actionsCookieName, "insertModalRequestGpoP", 20);
        $("#modforactions").fadeIn("400");
        $("#modalforactionscontainer").fadeIn("400");

        $.ajax({
            url: '../../sourcephp/views/Users/alumno/requestGpoP.php',
            type: 'POST'
        }).done(function (resRequestGpoPForm) {
            insertRequestGpoPForm(resRequestGpoPForm);
        }).fail(function () {
            AJAXrequestFailed("Fallo en petición AJAX para reaccionar boton para realizar pertición a grupo periodo.");
        });
    }

        insertRequestGpoPForm = (resRequestGpoPForm) => {
            document.getElementById("modalforactionscontainer").innerHTML = resRequestGpoPForm;
            getAndExecuteNewInsertedScript(document.getElementById("modalforactionscontainer"));

            insertGrpsOnSelect();
        }

    //*****************************************************************************************************************  */

    
});