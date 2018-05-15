$("#groupbarcontent").ready(function ($) {

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

    $('#showacadbtn').click(function (e) { gotoAcademiaOverview(); });    
    $('#showmaterias').click(function (e) { gotoMaterias(e) });
    
    // --------------------------------- Cargar algún modal -----------------------------------------------
    $('#createmateria').click(function (e) { createMateria(e) });

});