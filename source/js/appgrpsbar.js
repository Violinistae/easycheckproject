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

    createMateria = (e) => {
        //Cookie name Action to do
        actionsCookieName = "aiCoTndDtoO";        
        setCookie(actionsCookieName, "createMateria", 7);
        $("#modforactions").fadeIn("400");

        $.ajax({
            url: "../../sourcephp/views/Users/coordinador/createMateria.php",
            type: "POST"
        }).done(function (resCreateMateriaForm) { 
            insertCreateMateriaForm(resCreateMateriaForm);
            
        }).fail(function () {
            AJAXrequestFailed("Fallo en petición AJAX para insertar formulario de creación de materia");
        });
    }

        insertCreateMateriaForm = (resCreateMateriaForm) => {            
            document.getElementById("modalforactionscontainer").innerHTML = resCreateMateriaForm;            
            formCreateMateria = document.getElementById("modalforactionscontainer");
            getAndExecuteNewInsertedScript(formCreateMateria);
        }
    

        
// ---------------------------------------------------------------------------------------------------------------------------------
// ------------------------------------------- USER INTERACTION TRIGGERS -----------------------------------------------------------
// ---------------------------------------------------------------------------------------------------------------------------------

    // ------------------------------- Redirección a páginas ----------------------------------------------

    $('#showacadbtn').click(function (e) { getSessionVariables(checkCoordProf); });    
    $('#showmaterias').click(function (e) { gotoMaterias(e) });
    
    // --------------------------------- Cargar algún modal -----------------------------------------------
    $('#createmateria').click(function (e) { createMateria(e) });

});