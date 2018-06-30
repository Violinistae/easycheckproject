var flagCForAction = false;
$(document).ready(function ($) {

    verifyCreatorAndUserId = (sessionVariables) => {
        if (profGP == sessionVariables.userreg) flagCForAction = true;
        else flagCForAction = false;
        return;
    }

    checkActionForSwitchOnGPOverview = (e) => {
        console.log(profGP);
        let triggerElement = e.currentTarget;
        let actionGPOverview = triggerElement.getAttribute("dataActGP");

        getSessionVariables(verifyCreatorAndUserId);
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
            $.ajax({
                url: "../../sourcephp/views/shared/CoordAndProf/createGpoPeriodo.php",
                type: "POST"
            }).done(function (IntegGPModal) {
                insertIntetgGPModalAndContent(IntegGPModal, Id_GrupoPeriodo, profF);
            }).fail(function () {
                AJAXrequestFailed("Petición AJAX insertar modal de integrantes de GP");
            });

            let integMainLbl;
        }

            insertIntetgGPModalAndContent = (IntegGPModal, Id_GrupoPeriodo, profF) => {
                document.getElementById("modalforactionscontainer").innerHTML = resCreateGpoPeriodoForm;
                getAndExecuteNewInsertedScript(document.getElementById("modalforactionscontainer"));

                //seguir en este método y se puede utilizar para insertar a los alumnos para
                // mostrar las calificaciones en una lista pero en el main container en vez de un modal
            }

});