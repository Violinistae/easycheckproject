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
            "color": "rgb(247, 218, 37)"
        });
        $(".searchinput").css({
            "background-color": "transparent",
            "border-top": "transparent",
            "border-right": "transparent",
            "border-left": "transparent",
            "border-bottom": "solid rgb(247, 218, 37) 2px",
            "border-top": "transparent",
            "color": "rgb(247, 218, 37)",
            "border-radius": "2px",
            "padding-bottom": ".5vh"
        });
        $(".searcher input").addClass('yellowplaceholder');
        $(".searcher input").addClass('whiteplaceholder');
        $('#modalwarningcontent').css({
            "background-color": "rgb(30, 30, 30)",
            "color": "rgb(247, 218, 37)"
        });
        $('#confirmbtn').css({
            "color": "rgb(30, 30, 30)",
            "background-color": "rgb(247, 218, 37)"
        });
        $('#continuebtn').css({
            "color": "rgb(30, 30, 30)",
            "background-color": "rgb(247, 218, 37)"
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