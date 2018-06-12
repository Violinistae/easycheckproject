var IdAux;
$(document).ready(function ($) {

    showContextMenuOnInstrument = (e) => {
        e.preventDefault();

        $(".subdropumen").removeClass('active');
        $(".buttonnewinst").removeClass('active');
        $("#modforactions").fadeOut("300");

        let instId = parseInt(e.currentTarget.getAttribute("dataidins"));
 
        $(".contextCostumMenu").show(200).
        css({
            top: event.pageY + "px",
            left: event.pageX + "px"
        });
        $(".contextCostumMenu").attr("dataidins", instId);
        
    }

    outContextMenuClick = (e) => {
        if (!$(e.target).parents(".contextCostumMenu").length>0) {
            $(".contextCostumMenu").hide(80);
            $(".contextCostumMenu").attr("dataidins", "");
        }
    }

    checkClickedContextMenuItem = (e) => {
        let action = parseInt(e.currentTarget.getAttribute("dataowinsaction"));
        let firsttrigger = document.getElementsByClassName("contextCostumMenu");
        switch (action) {
            case 1:

                break;
            case 2:
                goToEditBuiltIntr(firsttrigger.item(0));
                break;
            case 3:
                IdAux = parseInt(firsttrigger.item(0).getAttribute("dataidins"));                 
                var mainmessage = "¿Está completamente seguro de eliminar este instrumento de evaluación?";
                var secmessage = "Todas las evaluaciones y demás información relacionadas serán eliminadas.";
                showMessage("wArNinGbTn_AcTiOn", 14, mainmessage, secmessage);
                break;
        }
        $(".contextCostumMenu").hide(80);
        $(".contextCostumMenu").attr("dataidins", "");
    }

        goToEditBuiltIntr = (eTrigger) => {
            let o = {
                Id_Instrumento: parseInt(eTrigger.getAttribute("dataidins"))
            };

            let str = JSON.stringify(o);

            $(".subdropumen").removeClass('active');
            $(".buttonnewinst").removeClass('active');
            $("#modforactions").fadeOut("300");

            let buildInstrURL = "../../sourcephp/views/buildInstrumento.php";
            sessionStorage.setItem("createdInst", str);
            window.open(buildInstrURL, "_blank");
        }

        deleteInstrumentConfirmed = () => {

            dataArray = {
                Id_Instrumento: IdAux
            };

            $.ajax({
                url: '../../index_ajax.php?controller=instrumento&action=deleteInstrumento',
                type: "POST",
                dataType: 'json',
                data: dataArray
            }).done(function (resRequestDeleteInstr) {
                var mainmessage = resRequestDeleteInstr.message;
                var secmessage = "Presione el botón para continuar.";
                showMessage("wArNinGbTn_AcTiOn", 15, mainmessage, secmessage);
            }).fail(function () {
                AJAXrequestFailed("Fallo en petición AJAX para volver a página principal");
            });

        }


    $('body').bind('mousedown', function (e) { outContextMenuClick(e); })
    $("body").on('contextmenu', '.instrumentImg', function (e) { showContextMenuOnInstrument(e); })
    $('body').on('dblclick vclick', '.instrumentImg', function (e) { goToEditBuiltIntr(e.currentTarget); });
    $("body").on('contextmenu', '#submaincontainer', function (e) { e.preventDefault(); })
    $('body').on('click', '.contextMenuItem', function (e) { checkClickedContextMenuItem(e); });
});