var IdAux;
var IdMat;
var IdAcad;
$(document).ready(function ($) {

    showContextMenuOnInstrument = (e) => {
        e.preventDefault();

        $(".subdropumen").removeClass('active');
        $(".buttonnewinst").removeClass('active');
        $("#modforactions").fadeOut("300");

        let instId = parseInt(e.currentTarget.getAttribute("dataidins"));
        let matId = parseInt(e.currentTarget.getAttribute("dataidmat"));
 
        $(".contextCostumMenu").show(200).
        css({
            top: event.pageY + "px",
            left: event.pageX + "px"
        });
        $(".contextCostumMenu").attr("dataidins", instId);
        $(".contextCostumMenu").attr("dataidmat", matId);
        
    }

    outContextMenuClick = (e) => {
        if (!$(e.target).parents(".contextCostumMenu").length>0) {
            $(".contextCostumMenu").hide(50);
            $(".contextCostumMenu").attr("dataidins", "");
            $(".contextCostumMenu").attr("dataidmat", "");
        }
    }

    checkClickedContextMenuItem = (e) => {
        let action = parseInt(e.currentTarget.getAttribute("dataowinsaction"));
        let firsttrigger = document.getElementsByClassName("contextCostumMenu");
        switch (action) {
            case 1:
                IdAux = parseInt(firsttrigger.item(0).getAttribute("dataidins"));
                IdMat = parseInt(firsttrigger.item(0).getAttribute("dataidmat"));
                let arrdata = {
                    materiaID: firsttrigger.item(0).getAttribute("dataidmat")
                };

                console.log(firsttrigger.item(0).getAttribute("dataidmat"));
                $.ajax({
                    url: '../../index_ajax.php?controller=materia&action=getMateriaById',
                    type: "POST",
                    dataType: 'json',
                    data: arrdata
                }).done(function (resInstrumAcad) {

                    if (!resInstrumAcad.error) {
                        let matData = resInstrumAcad.materia;
                        IdAcad = matData.Academia;
                        var mainmessage = '¿Está seguro que desea compartir el instrumento con toda la academia "' + matData.Acad + '"?';
                        var secmessage = "Todos los integrantes podrán utilizarlo pero no modificarlo.";
                        showMessage("wArNinGbTn_AcTiOn", 16, mainmessage, secmessage);
                    }
                   
                }).fail(function () {
                    AJAXrequestFailed("Fallo en petición AJAX para volver a página principal");
                });
                
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
            //console.log(eTrigger);
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

        shareInstrInAcad = () => {
            dataArray = {
                Id_Instrumento: IdAux,
                Id_Academia: IdAcad,
                Id_Materia: IdMat
            }

            $.ajax({
                url: '../../index_ajax.php?controller=instrumentoscompartidos&action=insertSharedInstr',
                type: "POST",
                dataType: 'json',
                data: dataArray
            }).done(function (resShareInstrToAcad) {
                var mainmessage = resShareInstrToAcad.message;
                var secmessage = "Presione el botón para continuar.";
                showMessage("wArNinGbTn_AcTiOn", 15, mainmessage, secmessage);
            }).fail(function () {
                AJAXrequestFailed("Fallo en petición AJAX para volver a página principal");
            });
        }


    $('body').bind('mousedown', function (e) { outContextMenuClick(e); })
    $("body").on('contextmenu', '.instrumentImg', function (e) { console.log(e); showContextMenuOnInstrument(e); })
    $('body').on('dblclick', '.instrumentImg', function (e) { console.log(e); goToEditBuiltIntr(e.currentTarget); });
    $("body").on('contextmenu', '#submaincontainer', function (e) { e.preventDefault(); })
    $('body').on('click', '.contextMenuItem', function (e) { checkClickedContextMenuItem(e); });
});