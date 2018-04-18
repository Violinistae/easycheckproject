$(document).ready(function ($) {
// ---------------------------------------------------------------------------------------------------------------------------------
// ------------------------------------------------ FUNCTIONS TO CALL --------------------------------------------------------------
// ---------------------------------------------------------------------------------------------------------------------------------

	maincontentFadeAnimation = function (responsePage) {  
		$("#submaincontainer").fadeOut("300", function () {
			$("#submaincontainer").html(responsePage);
		});
		$("#submaincontainer").fadeIn("300");
	}

	insertMainNavbar = function () {
		$.ajax({
			url: '../../sourcephp/views/shared/forEveryone/navbar.php',
			type: 'POST'
		}).done(function setNavbar(mainNavbar) {
			document.getElementById('mainnavbar').insertAdjacentHTML('beforeend', mainNavbar);
			getSessionVariables(setStyleAndInfoToNavbar);
		}).fail( function () {
			AJAXrequestFailed("Fallo en petición AJAX para insertar navbar principal");
		});
	}

		setStyleAndInfoToNavbar = function (sessionVariables) {
			if (!sessionVariables.error) {
				if (sessionVariables.usertype == 1) {
					$(".mainnavbar").css({ "background-color": "rgb(90, 144, 232)" });
					insertnewbuttondiv();
					insertgroupsbar();
					insertMateriapart();
					insertCoordStyles();
				} else if (sessionVariables.usertype == 2) {
					$(".mainnavbar").css({ "background-color": "rgb(30, 30, 30" });
					insertnewbuttondiv();
					insertgroupsbar();
					insertProfStyles();
				} else if (sessionVariables.usertype == 3) {
					$(".mainnavbar").css({ "background-color": "rgb(171, 49, 49)" });
					insertAlumnoStyles();
				}
			} else if (sessionVariables.error) {
				console.log("Cerrar Sesión");
				window.location.replace("../../index.php");
			}
		}

			insertnewbuttondiv = function () {
				$.ajax({
					url: '../../sourcephp/views/shared/CoordAndProf/newbuttondiv.php',
					type: 'POST'
				}).done(function (btnres) {
					insertNewInstrumentoBtn(btnres);
					getSessionVariables(setnewButtonStyle);
				}).fail(function () {
					AJAXrequestFailed("Fallo en petición AJAX para insertar botón de nuevo instrmento");
				});
			}

				insertNewInstrumentoBtn = function (btnres) {
					newbtn = document.getElementById('newbutton');
					newbtn.innerHTML = btnres;
					getAndExecuteNewInsertedScript(newbtn);
				}

				setnewButtonStyle = function(sessionVariables) {
					if (sessionVariables.usertype == 1) {
						$(".buttonnewinst").css({
							"border": "solid white 2px",
							"color": "white"
						});
					} else if (sessionVariables.usertype == 2) {
						$(".buttonnewinst").css({
							"border": "solid rgb(247, 218, 37) 2px",
							"color": "rgb(247, 218, 37)"
						});
					}
				}
			
			insertgroupsbar = function () {
				$.ajax({
					url: '../../sourcephp/views/shared/CoordAndProf/groupsBar.php',
					type: 'POST'
				}).done(function (gpsBarRes) {
					insgroupsbar(gpsBarRes);
				}).fail(function () {
					AJAXrequestFailed("Fallo en petición AJAX para insertar 'GROUPS BAR'");
				});
			}

				insgroupsbar = function (gpsBarRes) {
					groupsbar = document.getElementById('groupsbar');
					groupsbar.innerHTML = gpsBarRes;
				}

			insertMateriapart = function () {
				$.ajax({
					url: '../../sourcephp/views/Users/coordinador/gposbarmateriapart.php',
					type: 'POST'
				}).done(function (gpsBarMateriaPartRes) {
					insMateriaPartOnGroupsBar(gpsBarMateriaPartRes);
				}).fail(function () {
					AJAXrequestFailed("Fallo en petición AJAX para insertar parte de materia en 'GROUPS BAR'");
				});
			}
				insMateriaPartOnGroupsBar = function (gpsBarMateriaPartRes) {
					materiaspart = document.getElementById('materiaspart');
					materiaspart.innerHTML = gpsBarMateriaPartRes;
				}
				

			insertCoordStyles = function() {
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
			}

			insertProfStyles = function() {
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
			}

			insertAlumnoStyles = function () {
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
			}


	gotoMainPage = function (e) {
		$.ajax({
			url: "../../sourcephp/views/shared/forEveryone/principal.php",
			type: "POST"
		}).done(function (mainPage) {
			maincontentFadeAnimation(mainPage);
		}).fail( function () {
			AJAXrequestFailed("Fallo en petición AJAX para volver a página principal");
		});
	}

	gotoPersonalProfilePage = function () {
		$.ajax({
			url: '../../sourcephp/views/shared/forEveryone/personalProfile.php',
			type: 'POST'
		}).done(function (personalProfilePage) {
			maincontentFadeAnimation(personalProfilePage);
			$.ajax({
				url: '../../index_ajax.php?controller=Users&action=getUserInfo',
				type: 'POST',
				dataType: 'json'
			}).done(function (userinfoRes) {
				getUserInfo(userinfoRes);			
			}).fail( function () {
				AJAXrequestFailed("Fallo en petición AJAX para obtención de información de usuario.");		 
			});
		}).fail( function () {
			AJAXrequestFailed("Fallo en petición AJAX para cargar perfil personal de usuario.");
		});
	}

		getUserInfo = function (userinfoRes) {
			//Se imprime en los campos adecuados la információn básica de un usuario
			document.getElementById("userreginput").value = userinfoRes.userinfo.Registro_U;
			document.getElementById("emailinput").value = userinfoRes.userinfo.Email;
			document.getElementById("nombresinput").value = userinfoRes.userinfo.Nombres;
			document.getElementById("apellidosinput").value = userinfoRes.userinfo.Apellidos;

			//Insertar escolaridad en caso de que el usuario se de tipo Coordinador o profesor
			if (userinfoRes.userinfo.Tipo_Usuario == 2 || userinfoRes.userinfo.Tipo_Usuario == 1) {
				$.ajax({
					url: '../../sourcephp/views/shared/CoordAndProf/escolaridaddiv.php',
					type: 'POST'
				}).done(function (escolaridadPart) {
					insertEscolaridadintoProfile(userinfoRes, escolaridadPart);
				}).fail(function () {
					AJAXrequestFailed("Fallo en Petición AJAX para insertar información escolaridad de usuario.");
				});
			}
			//Si el usuario es de tipo Coordinador insertar la información básica de academia
			if (userinfoRes.userinfo.Tipo_Usuario == 1) {
				$.ajax({
					url: '../../sourcephp/views/Users/coordinador/perprofilebasicacadinfo.php',
					type: 'POST'
				}).done(function (academiaPart) {
					insertAcadBasicInfoToProfile(userinfoRes, academiaPart);
				}).fail(function () {
					AJAXrequestFailed("Fallo petición AJAX para inserción de información básica de academia.")
				});
			}
		}

			insertEscolaridadintoProfile = function (userinfoRes, escolaridadPart) {
				document.getElementById("escolaridaddiv").insertAdjacentHTML('beforeend', escolaridadPart);
				document.getElementById("escolaridadinput").value = userinfoRes.userinfo.Escolaridad;
			}
			
			insertAcadBasicInfoToProfile = function (userinfoRes, academiaPart) {
				document.getElementById("profilesubgridvariable").insertAdjacentHTML('beforeend', academiaPart);
				document.getElementById("idacademialbl").innerHTML = userinfoRes.basicacadinfo.Id_Academia;
				document.getElementById("academiainput").value = userinfoRes.basicacadinfo.Academia;

				$.ajax({
					url: "../../index_ajax.php?controller=Carrera&action=getCarreras",
					type: 'POST',
					dataType: 'json'
				}).done(function (resCarreras) {
					insertCarrerasComboToProfile(userinfoRes, resCarreras);
				}).fail(function () {
					AJAXrequestFailed("Fallo en petición AJAX para obtener carreras de la base de datos.");
				});

				var ciclosplited = userinfoRes.basicacadinfo.Ciclo_Periodo.split(" ");

				//String Periodo de un ciclo escolar
				var cicloperiodo = ciclosplited[0] + " " + ciclosplited[1] + " " + ciclosplited[2];
				document.getElementById("cicloperiodoselect").value = cicloperiodo;

				//Año de un Ciclo escolar
				var actualyear = 2018;
				for (i = actualyear; i > actualyear - 10; i--) {
					var newyearoption = document.createElement("option");
					newyearoption.text = i;
					newyearoption.value = i.toString();
					document.getElementById("cicloyearselect").add(newyearoption);
				}
				document.getElementById("cicloyearselect").value = ciclosplited[3];

				//Ver si no hay un bug después cuando no haya un año coherente o existente
				//por el limite de la fecha *****
			}

				insertCarrerasComboToProfile = function (userinfoRes, resCarreras) {
					if (!resCarreras.error) {

						numcarreras = resCarreras.carreras.length;
						for (i = 1; i < numcarreras + 1; ++i)
							document.getElementById("carrerainput").insertAdjacentHTML('beforeend', resCarreras.carreras[i]);

						document.getElementById("carrerainput").value = userinfoRes.basicacadinfo.Carrera;
					}
					else
						console.log(resCarreras.message);
				}



	editProfileInfo = function () {
		console.log($("#profileform input[name=userreg]").val());
	}


	getAndExecuteNewInsertedScript = function (loadedPageByAJAX) {
		scpts = loadedPageByAJAX.getElementsByTagName('script');
		$.getScript(scpts[0].src, function () {
			console.log("New Button Script loaded but not necessarily executed.");
		});
	}

	getSessionVariables = function (methodToDo) {
		$.ajax({
			url: '../../index_ajax.php?controller=Users&action=getSessionVariables',
			type: 'POST',
			dataType: 'json'
		}).done(function (sessionVariables) {
			methodToDo(sessionVariables);
		}).fail(function () {
			AJAXrequestFailed("Fallo en Petición AJAX para obtener variables de sesión");
		});
	}
	
	closeUserSession = function () {
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
		}).fail( function () {
			AJAXrequestFailed("No funciona petición AJAX para cerrar sesión");
		});
	}

	dropMenuInOut = function (e) {
		$("#dropusermen").toggleClass('actives').siblings().removeClass('actives');
	}


	


// ---------------------------------------------------------------------------------------------------------------------------------
// ------------------------------------------- USER INTERACTION TRIGGERS -----------------------------------------------------------
// ---------------------------------------------------------------------------------------------------------------------------------
	
		

	$('body').on('click', '#userprofile', function (e) { gotoPersonalProfilePage(); });
	$('body').on('click', '#editprofile', function (e) { e.preventDefault(); editProfileInfo();	});

	// --------------------------------- Interaction Elements on ALL SUBPAGES  --------------------------------------------------
	$('body').on('click', '#homebtn', function (e) { gotoMainPage(e); });
	$('body').on('click', '#dropusermen', function (e) { dropMenuInOut(e); });
	$('body').on('click', '#closesession', function () { closeUserSession(); });
	$('body').on('click', '#modwarning', function () { $('#modwarning').fadeOut('400'); })

// ---------------------------------------------------------------------------------------------------------------------------------
// ----------------------------------------- MAIN PAGE ON LOAD/READY CALLS ---------------------------------------------------------
// ---------------------------------------------------------------------------------------------------------------------------------

	$('#mainnavbar').ready(insertMainNavbar);

});