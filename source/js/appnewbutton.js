$(".buttonnewinst").ready(newbuttonfunc);

function newbuttonfunc() {
    setnewButtonStyle();
    alert("s");
    $("body").on('click', ".buttonnewinst", function () {
        //alert("S2");
        $(".buttonnewinst").toggleClass('active').siblings().removeClass('active');
    });
}

function setnewButtonStyle() {
    $.ajax({
        url: '../../index_ajax.php?controller=Users&action=getSessionVariables',
        type: 'POST',
        dataType: 'json'
    }).done(function (res) {
        alert("x");
        if (!res.error) {
            if (res.usertype == 1) {
                $(".buttonnewinst").css({
                    "border": "solid white 2px",
                    "color": "white"
                });
            } else if (res.usertype == 2) {
                $(".buttonnewinst").css({
                    "border": "solid rgb(247, 218, 37) 2px",
                    "color": "rgb(247, 218, 37)"
                });
            }
        } else if (res.error) {
            //Cerrar sesión y redirigir a login
            console.log("Cerrar Sesión");
        }
    }).fail(function () {
        console.log("No Funciona petición de variables de Sesión");
    });
}