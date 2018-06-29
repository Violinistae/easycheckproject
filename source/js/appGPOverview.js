$(document).ready(function ($) {

    checkActionForSwitchOnGPOverview = (e) => {
        console.log(profGP);
        let triggerElement = e.currentTarget;
        let actionGPOverview = triggerElement.id;

        switch (actionGPOverview) {
            case "gpShowIntegCalf":
                
                break;
            case "gpShowInteg":

                break;
            case "gpLeave":

                break;

            // Only for creator
            case "gpRespaldo":

                break;
            case "gpConfigBtn":
                
                break;
            case "gpAdminIntegBtn":

                break;
            case "gpShowCreatorCalf":

                break;
        }

    }

});