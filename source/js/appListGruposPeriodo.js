var clickedGpoP;
var grupoPeriodo;
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
                showGPInfo();
                break;
            default:
                break;
        }
    }


    showGPInfo = () => {

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
                    var secmessage = "Ya no se podrá recuperar la información de este al confirmar la acción.";
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

            //Realizar respaldo?

        }
    
    /* ----------------------------------------------------------------------- */
});