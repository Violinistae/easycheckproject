$(document).ready(function ($) {

    loadFormCreateInstr = (e) => {
        
        setCookie('lStMoDlAsTaD', 'selectInstrumentCreate', 1);

        var Instrumento = e.currentTarget.id;
        var formURL = "../../sourcephp/views/shared/CoordAndProf/createInstrumento.php";

        switch (Instrumento) {
            case "cRubrica": instument = 1;
                break;
            case "cListaC": instument = 2;
                break;
            case "cGuiaObs": instument = 3;
                break;
            case "cCuestionario": instument = 4;
                break;
            default:
                return;   
        }   

        $.ajax({
            url: formURL,
            type: "POST"        
        }).done(function (resCreateInstrumentoForm) {
            insertCreateInstrumentoForm(resCreateInstrumentoForm);
        }).fail(function () {
            AJAXrequestFailed("Fallo en petición AJAX para insertar formulario para crear instrumento de evaluación");
        });
    }

        insertCreateInstrumentoForm = (resCreateInstrumentoForm) => {      

            $("#modalforactionscontainer").fadeOut(300, function () { 
                document.getElementById("modalforactionscontainer").innerHTML = resCreateInstrumentoForm;
                getAndExecuteNewInsertedScript(document.getElementById("modalforactionscontainer"));
                $("#modalforactionscontainer").fadeIn(300);
             });
        }
        
//----------------------------------------------------------------------------------------------------

    $(".typeInstrumento").click(function (e) { loadFormCreateInstr(e); });
});