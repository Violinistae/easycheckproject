var clickedGpoP;

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
            case "e":
                //Edit
                break;
            case "t":
                //Delete
                checkDeleteIdP(gpoPId);
                break;
            default:
                break;
        }
    }
    
    checkDeleteIdP = (gpoPId) => {
        console.log(gpoPId);
    }
    
    /* ----------------------------------------------------------------------- */
});