$(".buttonnewinst").ready(newbuttonfunc);

function newbuttonfunc() {
    $("body").on('click', ".buttonnewinst", function () {
        $(".buttonnewinst").toggleClass('active').siblings().removeClass('active');
        $(".subdropumen").removeClass('active');
    });
}