$(document).ready(function ($) {

    getInstrumentData = () => {
        $.ajax({
            url: '../../index_ajax.php?controller=instrumento&action=getCreatedInstrumentData',
            type: 'POST',
            dataType: 'json',
            data: dataMateria
        }).done(function () {
            
        }).fail(function () {
            AJAXrequestFailed("No funciona petición AJAX para obtener datos de instrumento creado");
        });
    }

    getInstrumentData();
});