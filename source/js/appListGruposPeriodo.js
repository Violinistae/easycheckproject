var clickedGpoP;
var grupoPeriodo;
var realFileName;
var creatorFlag;
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
            let profGP = resGpSelected.gpoperiodo.Profesor.Registro_U;
            grupoPeriodo = resGpSelected.gpoperiodo;
            creatorFlag = false;
            //console.log(grupoPeriodo);

            if (sessionVariables.userreg == profGP) {
                creatorFlag = true;
                console.log("Soy el creador");
            }

            $.ajax({
                url: '../../sourcephp/views/shared/CoordAndProf/gpoPeriodoOverview.php',
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
            let groupActionsBar = document.getElementById("groupActionsBar");    
            if (creatorFlag) {
                for (let i = 0; i < 4; ++i) {
                    let btnAction = document.createElement("button");
                    btnAction.classList.add("gpOverviewBtn");

                    switch (i) {
                        case 0:
                            btnAction.id = "gpRespaldo"; btnAction.textContent = "Crear respaldo";
                            break;
                        case 1:
                            btnAction.id = "gpConfigBtn"; btnAction.textContent = "Configuración de grupo";
                            break;
                        case 2:
                            btnAction.id = "gpAdminIntegBtn"; btnAction.textContent = "Administrar integrantes";
                            break;           
                        case 3:
                            btnAction.id = "gpShowCreatorCalf"; btnAction.textContent = "Mostrar calificaciones";
                            break;                                                                             
                    }
                    groupActionsBar.appendChild(btnAction);
                }

                //Insertar instrumentos para realizar evaluación

            } else {
                for (let i = 0; i < 3; ++i) {
                    let btnAction = document.createElement("button");
                    btnAction.classList.add("gpOverviewBtn");

                    switch (i) {
                        case 0:
                            btnAction.id = "gpShowIntegCalf"; btnAction.textContent = "Mostrar calificaciones";
                            break;
                        case 1:
                            btnAction.id = "gpShowInteg"; btnAction.textContent = "Mostrar compañeros";
                            break;
                        case 2:
                            btnAction.id = "gpLeave"; btnAction.textContent = "Abandonar Grupo Periodo";
                            break;   
                    }
                    groupActionsBar.appendChild(btnAction);

                    let mainGPLbl = document.getElementById("mainGPLbl");
                    mainGPLbl.textContent = "Instrumentos por contestar"
                }

                //Insertar instrumentos que se pueden contestar
            }

            let mat = grupoPeriodo.Materia.Materia;
            let semestre = grupoPeriodo.Materia.Semestre;
            let grupo = grupoPeriodo.Grupo.Grupo;
            let period = grupoPeriodo.Periodo;

            let gplblName = document.getElementById("gplblName");
            gplblName.textContent = mat + " ~~ " + semestre + "°" + grupo + " ~~ " + period;
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
            console.log(grupoPeriodo);
            //volver a confirmar en el switch maestro
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
});