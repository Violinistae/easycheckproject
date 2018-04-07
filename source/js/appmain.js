$(document).ready(function ($) {
	$('#mainnavbar').ready(insertnav);
	

	//$('#groupsbar').ready(insertgroupsbar);
	//insertnav();

	/**
	 * Para cerrar sesión cuando el usuario presione el botón de cerrar sesión
	 */
	$('body').on('click', '#closesession', function () {
		$.ajax({
			url: '../../index_ajax.php?controller=Users&action=Logout',
			type: 'POST',
			dataType: 'json'
		}).done(function (response) {
			if (!response.error) {
				window.location.replace("../../index.php");
			} else if (response.error) {
				//Pedir que cierre sesión de nuevo y preguntar a Rojas que onda
				console.log("Cerrar Sesión");
			}
		}).fail(function () {
			console.log("No Funciona petición cerrar sesión");
		});
	});

});


/**
 * Esta función inserta la vista de la barra de navegación principal de la página
 * mediante una petición XMLHttp.
 */
function insertnav() {
	if (window.XMLHttpRequest)
		peticion_http = new XMLHttpRequest();
	else if (window.ActiveXObject)
		peticion_http = new ActiveXObject("Microsoft.XMLHTTP");

	peticion_http.onreadystatechange = function () {
		if (this.readyState == 4 && this.status == 200) {
			$('.mainnavbar').html(this.responseText);
		}
	}
	peticion_http.open('GET', '../../sourcephp/views/shared/forEveryone/navbar.php', true);
	peticion_http.send();

	var ut = getSessionVariables();
	console.log(ut);
	
}

function getSessionVariables() {
	var x =	$.ajax({
		url: '../../index_ajax.php?controller=Users&action=getSessionVariables',
		type: 'POST',
		dataType: 'json'
	}).done(function (response) {
		if (!response.error) {
			ut = response.usertype;
			if (ut == 1) {
				$(".mainnavbar").css({ "background-color": "rgb(90, 144, 232)" });
				insertnewbuttondiv();
				insertgroupsbar();
				insertMateriapart();

				insertCoordStyles();
			} else if (ut == 2) {
				$(".mainnavbar").css({ "background-color": "rgb(30, 30, 30" });
				insertnewbuttondiv();
				insertgroupsbar();
				//$('#materiaspart').css({ "display": "none" });
				insertProfStyles();
			} else if (ut == 3) {
				$(".mainnavbar").css({ "background-color": "rgb(171, 49, 49)" });
				insertAlumnoStyles();
			}
		} else if (response.error) {
			//Cerrar sesión y redirigir a login
			console.log("Cerrar Sesión");
		}
	}).fail(function () {
		console.log("No Funciona petición de variables de Sesión");
	});
}

function insertnewbuttondiv() {
	if (window.XMLHttpRequest)
		peticion_http = new XMLHttpRequest();
	else if (window.ActiveXObject)
		peticion_http = new ActiveXObject("Microsoft.XMLHTTP");

	peticion_http.onreadystatechange = function () {
		if (this.readyState == 4 && this.status == 200) {
			document.getElementById('newbutton').innerHTML = this.responseText;
		}
	}
	peticion_http.open('GET', '../../sourcephp/views/shared/CoordAndProf/newbuttondiv.php', true);
	peticion_http.send();
}

function insertgroupsbar() {
	if (window.XMLHttpRequest)
		peticion_http = new XMLHttpRequest();
	else if (window.ActiveXObject)
		peticion_http = new ActiveXObject("Microsoft.XMLHTTP");

	peticion_http.onreadystatechange = function () {
		if (this.readyState == 4 && this.status == 200) {
			document.getElementById('groupsbar').innerHTML = this.responseText;
		}
	}
	peticion_http.open('GET', '../../sourcephp/views/shared/CoordAndProf/groupsBar.php', true);
	peticion_http.send();
}

function insertMateriapart() {
	if (window.XMLHttpRequest)
		peticion_http = new XMLHttpRequest();
	else if (window.ActiveXObject)
		peticion_http = new ActiveXObject("Microsoft.XMLHTTP");

	peticion_http.onreadystatechange = function () {
		if (this.readyState == 4 && this.status == 200) {
			document.getElementById('materiaspart').innerHTML = this.responseText;
		}
	}
	peticion_http.open('GET', '../../sourcephp/views/Users/coordinador/gposbarmateriapart.php', true);
	peticion_http.send();
}

function insertCoordStyles() {
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
}

function insertProfStyles() {
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
}

function insertAlumnoStyles() {
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
}