var clickedGpoP;
var grupoPeriodo;
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
                getSessionVariables(showGPInfo);
                break;
            default:
                break;
        }
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
            console.log(grupoPeriodo);


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
                
                let mat = grupoPeriodo.Materia.Materia;
                let semestre = grupoPeriodo.Materia.Semestre;
                let grupo = grupoPeriodo.Grupo.Grupo;
                let period = grupoPeriodo.Periodo;

                let gplblName = document.getElementById("gplblName");
                gplblName.textContent = mat + " ~~ " + semestre + "°" + grupo + " ~~ " + period;

                //Insertar instrumentos para realizar evaluación
            } else {
                for (let i = 0; i < 2; ++i) {
                    let btnAction = document.createElement("button");
                    btnAction.classList.add("gpOverviewBtn");

                    switch (i) {
                        case 0:
                            btnAction.id = "gpShowIntegCalf"; btnAction.textContent = "Mostrar calificaciones";
                            break;
                        case 1:
                            btnAction.id = "gpShowInteg"; btnAction.textContent = "Mostrar compañeros";
                            break;         
                    }
                    groupActionsBar.appendChild(btnAction);
                }

                //Insertar instrnumentos que se pueden contestar
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
                    var secmessage = "Recomendamos realice un respaldo, ya que al confirmar la acción no se podrá recuperar la información de este.";
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

        }
    
    /* ----------------------------------------------------------------------- */
});