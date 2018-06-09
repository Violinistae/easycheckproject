$("#groupbarcontent").ready(function ($) {

    createMateria = (e) => {

        $(".buttonnewinst").removeClass('active');
        $(".subdropumen").removeClass('active');
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
            getAndExecuteNewInsertedScript(document.getElementById("modalforactionscontainer"));
        }

    createGpoPeriodo = (e) => {
        $(".buttonnewinst").removeClass('active');
        $(".subdropumen").removeClass('active');
        //Cookie name Action to do
        actionsCookieName = "aiCoTndDtoO";
        setCookie(actionsCookieName, "createMateria", 7);
        $("#modforactions").fadeIn("400");

        $.ajax({
            url: "../../sourcephp/views/shared/CoordAndProf/createGpoPeriodo.php",
            type: "POST"
        }).done(function (resCreateGpoPeriodoForm) {
            insertCreateGpoPeriodoForm(resCreateGpoPeriodoForm);
        }).fail(function () {
            AJAXrequestFailed("Fallo en petición AJAX para insertar formulario de creación de grupo periodo");
        });
    }
        
// ---------------------------------------------------------------------------------------------------------------------------------
// ------------------------------------------- USER INTERACTION TRIGGERS -----------------------------------------------------------
// ---------------------------------------------------------------------------------------------------------------------------------

    // ------------------------------- Redirección a páginas ----------------------------------------------

    $('#showacadbtn').click(function (e) { gotoAcademiaOverview(); });
    $('#showmaterias').click(function (e) { gotoMaterias(e) });
    
    // --------------------------------- Cargar algún modal -----------------------------------------------
    $('#createmateria').click(function (e) { createMateria(e) });
    $('body').on('click', '#creategpoperiodobtn', function (e) { createGpoPeriodo(e); });

});