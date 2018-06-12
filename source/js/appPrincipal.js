$(document).ready(function ($) {

    showContextMenuOnInstrument = (e) => {
        e.preventDefault();
        $(".contextCostumMenu").show(200).
        css({
            top:event.pageY+"px",
            left:event.pageX+"px"
        });
    }

    $("body").on('contextmenu', '.instrumentImg', function (e) { showContextMenuOnInstrument(e); })
    $("body").on('contextmenu', '#submaincontainer', function (e) { e.preventDefault(); })
});