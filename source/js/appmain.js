$(document).ready(function ($) {
	$('#mainnavbar').ready(insertnav);
	
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
				window.location.replace("../../index.php");
				console.log("Cerrar Sesión");
			}
		}).fail(function () {
			console.log("No Funciona petición cerrar sesión");
		});
	});

	$("body").on("click", "#homebtn", function(e) {
		$.ajax({
		url: "../../sourcephp/views/shared/forEveryone/principal.php",
		type: "POST"
		}).done(function(response) {
			$(".personalprofile").fadeOut("400", function() {
				$("#maincontainer").html(response);
			}); 
		})
		.fail(function() {
			console.log("No funciona cargar perfil");
		});
	});

	$("body").on("click", "#dropusermen", function (e) {
		//console.log($("#dropusermen").val());
		$("#dropusermen").toggleClass('actives').siblings().removeClass('actives');
	});

	$("body").on("click", "#userprofile", function (e) {
		$.ajax({
			url: '../../sourcephp/views/shared/forEveryone/personalProfile.php',
			type: 'POST'
		}).done(function (response) {
			$('#submaincontainer').html(response);
			
			setTimeout(function () {		
				$(".personalprofile").fadeIn("400", function () { });
				$(".personalprofile").css({
					'display' : 'grid',
					'grid-template-columns' : '1fr',
					'grid-template-rows': '1fr 9fr',
				});
			}, 280);
			$.ajax({
				url: '../../index_ajax.php?controller=Users&action=getUserInfo',
				type: 'POST',
				dataType: 'json'
			}).done(function getUserInfo(response) {
				console.log(response);
				document.getElementById("userreginput").value = response.userinfo.Registro_U;
				document.getElementById("emailinput").value = response.userinfo.Email;
				document.getElementById("nombresinput").value = response.userinfo.Nombres;
				document.getElementById("apellidosinput").value = response.userinfo.Apellidos;
				if (response.userinfo.Tipo_Usuario == 2 || response.userinfo.Tipo_Usuario == 1) {
					$.ajax({
						url: '../../sourcephp/views/shared/CoordAndProf/escolaridaddiv.php',
						type: 'POST'
					}).done(function insertEscolaridad(respuesta) {
						var escdiv = document.getElementById("escolaridaddiv");
						escdiv.insertAdjacentHTML('beforeend', respuesta);

						var escselect = document.getElementById("escolaridadinput");
						escselect.value = response.userinfo.Escolaridad;

					}).fail(function () {  
						console.log("Error al insertar escolaridad");
					});
				}
				if (response.userinfo.Tipo_Usuario == 1) {
					$.ajax({
						url: '../../sourcephp/views/Users/coordinador/perprofilebasicacadinfo.php',
						type: 'POST'
					}).done(function insertacadbasicinfo(res) {
						var subgridvariable = document.getElementById("profilesubgridvariable");
						subgridvariable.insertAdjacentHTML('beforeend', res);

						document.getElementById("idacademialbl").innerHTML = response.basicacadinfo.Id_Academia;
						document.getElementById("academiainput").value = response.basicacadinfo.Academia;

						//Get todas las carreras y poner en un for para insertar
						var carrinput = document.getElementById("carrerainput");
						var carroption = document.createElement("option");
						carroption.text = response.basicacadinfo.Carrera;
						carrinput.add(carroption);

						var ciclosplited = response.basicacadinfo.Ciclo_Periodo.split(" ");
						var cicloperiodo = ciclosplited[0] + " " + ciclosplited[1] + " " + ciclosplited[2];
						
						var cicloperselect = document.getElementById("cicloperiodoselect");
						cicloperselect.value = cicloperiodo;

						var cicloyselect = document.getElementById("cicloyearselect");
						var year = document.createElement("option");
						year.text = ciclosplited[3];
						cicloyselect.add(year);
						cicloyselect.value = ciclosplited[3];

					}).fail(function () {  
						console.log("Fallo en inserción de div academia");
					});			
				}	
			}).fail(function () {
				console.log("Fallo en obtención de info de usuario");
			});
		}).fail(function () {
			console.log("No funciona cargar perfil");
		})
	});

	$("body").on("click", "#editprofile", function (e) {
		e.preventDefault();
		console.log($("#profileform input[name=userreg]").val());
		
	});
	
});

/**
 * Esta función inserta la vista de la barra de navegación principal de la página
 * mediante una petición XMLHttp.
 */
function insertnav() {
	$.ajax({
		url: '../../sourcephp/views/shared/forEveryone/navbar.php',
		type: 'POST'
	}).done(function (response) {
		//console.log(response);
		mainnavbar = document.getElementById('mainnavbar');
		mainnavbar.insertAdjacentHTML('beforeend', response);
	}).fail(function () {
		console.log("Fallo en AJAX");
	});
	
	getSessionVariables();	
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
				setTimeout(insertnewbuttondiv, 1);
				insertgroupsbar();
				setTimeout(insertMateriapart, 15);
				//insertMateriapart();

				insertCoordStyles();
			} else if (ut == 2) {
				$(".mainnavbar").css({ "background-color": "rgb(30, 30, 30" });
				setTimeout(insertnewbuttondiv, 1);
				insertgroupsbar();
				insertProfStyles();
			} else if (ut == 3) {
				$(".mainnavbar").css({ "background-color": "rgb(171, 49, 49)" });
				insertAlumnoStyles();
			}
		} else if (response.error) {
			//Cerrar sesión y redirigir a login
			console.log("Cerrar Sesión");
			window.location.replace("../../index.php");
	
		}
	}).fail(function () {
		console.log("No Funciona petición de variables de Sesión");
	});
}

function insertnewbuttondiv() {
	$.ajax({
		url: '../../sourcephp/views/shared/CoordAndProf/newbuttondiv.php',
		type: 'POST'
	}).done(function (btnres) {
		newbutton = document.getElementById('newbutton');
		//newbutton.insertAdjacentHTML('beforeend', btnres);
		newbutton.innerHTML = btnres;

		scpt = newbutton.getElementsByTagName('script');

		$.getScript(scpt[0].src, function () {
			//alert("Script loaded but not necessarily executed.");
		});		
	}).fail(function () {
		console.log("Fallo en AJAX para insertar boton NUEVO");
	});
}

function insertgroupsbar() {
	$.ajax({
		url: '../../sourcephp/views/shared/CoordAndProf/groupsBar.php',
		type: 'POST'
	}).done(function (gpsbarres) {
		groupsbar = document.getElementById('groupsbar');
		groupsbar.innerHTML = gpsbarres;
		//groupsbar.insertAdjacentHTML('beforeend', gpsbarres);
	}).fail(function () {
		console.log("Fallo en AJAX para insertar 'GROUPS BAR'");
	});
}

function insertMateriapart() {
	$.ajax({
		url: '../../sourcephp/views/Users/coordinador/gposbarmateriapart.php',
		type: 'POST'
	}).done(function (gpsbarmateriapartres) {
		materiaspart = document.getElementById('materiaspart');
		materiaspart.innerHTML = gpsbarmateriapartres;
		//materiaspart.insertAdjacentHTML('beforeend', gpsbarmateriapartres);
	}).fail(function () {
		console.log("Fallo en AJAX para insertar 'GROUPS BAR'");
	});
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
