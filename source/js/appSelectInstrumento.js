$(document).ready(function ($) {

    loadFormCreateInstr = (e) => {
        
        setCookie('lStMoDlAsTaD', 'selectInstrumentCreate', 1);

        var Instrumento = e.currentTarget.id;
        var formURL = "../../sourcephp/views/shared/CoordAndProf/createInstrumento.php";
        var instrument;

        switch (Instrumento) {
            case "cRubrica": instrument = 1;
                break;
            case "cListaC": instrument = 2;
                break;
            case "cGuiaObs": instrument = 3;
                break;
            case "cCuestionario": instrument = 4;
                break;
            default:
                return;   
        }   

        $.ajax({
            url: formURL,
            type: "POST"        
        }).done(function (resCreateInstrumentoForm) {
            insertCreateInstrumentoForm(resCreateInstrumentoForm, instrument); 
        }).fail(function () {
            AJAXrequestFailed("Fallo en petición AJAX para insertar formulario para crear instrumento de evaluación");
        });
    }

        insertCreateInstrumentoForm = (resCreateInstrumentoForm, instrument) => {      

            $("#modalforactionscontainer").fadeOut(300, function () { 
                document.getElementById("modalforactionscontainer").innerHTML = resCreateInstrumentoForm;
                getAndExecuteNewInsertedScript(document.getElementById("modalforactionscontainer"));
                $("#modalforactionscontainer").fadeIn(300);
                insertContentCreateInstrumentoForm(instrument);
            });
        }

        insertContentCreateInstrumentoForm = (instrument) => {
            var typeInstTxt = document.getElementById("tipoInstrumentoTxt");
            var carreraMateriaTxt = document.getElementById("carreraMateriaTxt");

            switch (instrument) {
                case 1:         //Rubrica
                    typeInstTxt.innerHTML = "Rubrica";
                    break;
                case 2:         //Lista C
                    typeInstTxt.innerHTML = "Lista de Cotejo";
                    break;
                case 3:         //Guia Obs
                    typeInstTxt.innerHTML = "Guia de Observación";
                    break;
                case 4:         //Cuestionario
                    typeInstTxt.innerHTML = "Cuestionario";
                    break;    
                default:
                    break;
            }

        }
        
//----------------------------------------------------------------------------------------------------

    $(".typeInstrumento").click(function (e) { loadFormCreateInstr(e); });
});