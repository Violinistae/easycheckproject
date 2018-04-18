$(document).ready(function ($) { 
    /**
	 * Método para mostrar en consola (para comodidad del desarrollador) un mensaje en caso de que una petición
	 * $.ajax falle.
	 * 
	 * @param str => Mensaje a mostrar en consola
	 * @returns null
	 */
    AJAXrequestFailed = function (str) {
        console.log(str);
    }
});