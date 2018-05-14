$(document).ready(function ($) {

    switchActionOnMateria = (e) => {        
        var attr = e.originalEvent.path[1].getAttribute("id");

        if (attr == null) {
            return;
        }

        var splitedAttr = attr.split("-")

        var action = splitedAttr[0];
        var materiaId = splitedAttr[1];

        switch (action) {
            case "f":
                $("#inputValoresParciales").trigger("click");
                break;
            case "t":
                //Delete
                break;
            case "e":
                //edit
                break;
            default:
                break;
        }
    } 


    $(".materiaBtn").click(function (e) {
        switchActionOnMateria(e);

        

    });
});