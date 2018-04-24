$("#groupbarcontent").ready(function ($) {
   
    checkCoordProf = (sessionVariables) => {
        alert("sessionVariables");
        if (!sessionVariables.error) {
            switch (parseInt(sessionVariables.usertype)) {
                case 1:
                    $.ajax({
                        url: '../../sourcephp/views/Users/Coordinador/acadOverview.php',
                        type: 'POST'
                    }).done(function (acadOverviewPage) {
                        maincontentFadeAnimation(acadOverviewPage);
                    }).fail(function () {
                        AJAXrequestFailed("Fallo en petición AJAX para insertar ir a Academia Overview");
                    });
                    break;
                case 2: 
                    alert("Nada");
                    break;
                default:
                    break;
            }
        } else {
            closeUserSession();
        }
    }

    $('body').on('click', '#showacadbtn', function (e) { getSessionVariables(checkCoordProf); });
});