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
                    getIntegGPPageModal(grupoPeriodo.Id_GrupoPeriodo, true);
                    break;
                case "gpShowCreatorCalf":

                    break;
            }
        } else if (!flagCForAction) {
            switch (actionGPOverview) {
                case "gpShowIntegCalf":

                    break;
                case "gpShowInteg":

                    break;
                case "gpLeave":

                    break;
            }
        }
    }
    

        getIntegGPPageModal = (Id_GrupoPeriodo, profF) => {
            $("#modforactions").fadeIn("400");
            $.ajax({
                url: "../../sourcephp/views/shared/forEveryone/GPIntegList.php",
                type: "POST"
            }).done(function (IntegGPModal) {
                insertIntetgGPModalAndContent(IntegGPModal, Id_GrupoPeriodo, profF);
            }).fail(function () {
                AJAXrequestFailed("Petición AJAX insertar modal de integrantes de GP");
            });

        }

            insertIntetgGPModalAndContent = (IntegGPModal, Id_GrupoPeriodo, profF) => {
                document.getElementById("modalforactionscontainer").innerHTML = IntegGPModal;
                getAndExecuteNewInsertedScript(document.getElementById("modalforactionscontainer"));

                let mat = grupoPeriodo.Materia.Materia;
                let semestre = grupoPeriodo.Materia.Semestre;
                let grupo = grupoPeriodo.Grupo.Grupo;
                let period = grupoPeriodo.Periodo;

                let integMainLbl = document.getElementById("integMainLbl");
                integMainLbl.textContent += mat + " ~~ " + semestre + "°" + grupo + " ~~ " + period;
                
                //seguir en este método y se puede utilizar para insertar a los alumnos para
                // mostrar las calificaciones en una lista pero en el main container en vez de un modal
            }

});