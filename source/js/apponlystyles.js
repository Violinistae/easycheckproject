$(document).ready(function ($) {
    insertCoordStyles = () => {
        $(".allnavcontent").css({
            "color": "white"
        });
        $(".searchinput").css({
            "background-color": "transparent",
            "border-top": "transparent",
            "border-right": "transparent",
            "border-left": "transparent",
            "border-bottom": "solid white 2px",
            "border-top": "transparent",
            "color": "white",
            "border-radius": "2px",
            "padding-bottom": ".5vh"
        });
        $(".searcher input").addClass('whiteplaceholder');
        $('#confirmbtn').css({
            "background-color": "rgb(90, 144, 232)",
            "color": "white"
        });
        $('#continuebtn').css({
            "background-color": "rgb(90, 144, 232)",
            "color": "white"
        });
    }

    insertProfStyles = () => {
        $(".allnavcontent").css({
            "color": "white"
        });
        $(".searchinput").css({
            "background-color": "transparent",
            "border-top": "transparent",
            "border-right": "transparent",
            "border-left": "transparent",
            "border-bottom": "solid (14, 161, 51) 2px",
            "border-top": "transparent",
            "color": "white",
            "border-radius": "2px",
            "padding-bottom": ".5vh"
        });
        //$(".searcher input").addClass('yellowplaceholder');
        $(".searcher input").addClass('whiteplaceholder');
        $('#modalwarningcontent').css({
            "background-color": "white",
            "color": "white"
        });
        $('#confirmbtn').css({
            "color": "white",
            "background-color": "white"
        });
        $('#continuebtn').css({
            "color": "white",
            "background-color": "white"
        });
    }

    insertAlumnoStyles = () => {
        $(".allnavcontent").css({
            "color": "white"
        });
        $(".searchinput").css({
            "background-color": "transparent",
            "border-top": "transparent",
            "border-right": "transparent",
            "border-left": "transparent",
            "border-bottom": "solid white 2px",
            "border-top": "transparent",
            "color": "white",
            "border-radius": "2px",
            "padding-bottom": ".5vh"
        });
        $(".searcher input").addClass('whiteplaceholder');
        $('#confirmbtn').css({
            "background-color": "rgb(171, 49, 49)",
            "color": "white"
        });
        $('#continuebtn').css({
            "background-color": "rgb(171, 49, 49)",
            "color": "white"
        });
    }
});