$(document).ready(function ($) {
// ---------------------------------------------------------------------------------------------------------------------------------
// ------------------------------------------------ FUNCTIONS TO CALL --------------------------------------------------------------
// ---------------------------------------------------------------------------------------------------------------------------------

								/* Funciones de "uso único" */

	//Insertar Navbar
	insertMainNavbar = () => {
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

		setStyleAndInfoToNavbar = (sessionVariables) => {
			if (!sessionVariables.error) {
				if (sessionVariables.usertype == 1) {
					$(".mainnavbar").css({ "background-color": "rgb(90, 144, 232)" });
					insertnewbuttondiv();
					insertgroupsbar();
					sleep(50);
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

			insertnewbuttondiv = () => {
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

				insertNewInstrumentoBtn = (btnres) => {
					newbtn = document.getElementById('newbutton');
					newbtn.innerHTML = btnres;
					getAndExecuteNewInsertedScript(newbtn);
				}

				setnewButtonStyle =(sessionVariables) => {
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
			
			insertgroupsbar = () => {
				$.ajax({
					url: '../../sourcephp/views/shared/CoordAndProf/groupsBar.php',
					type: 'POST'
				}).done(function (gpsBarRes) {
					insgroupsbar(gpsBarRes);
					
				}).fail(function () {
					AJAXrequestFailed("Fallo en petición AJAX para insertar 'GROUPS BAR'");
				});
			}

				insgroupsbar = (gpsBarRes) => {
					groupsbar = document.getElementById('groupsbar');
					groupsbar.innerHTML = gpsBarRes;
					getAndExecuteNewInsertedScript(groupsbar);
				}

			insertMateriapart = () => {
				$.ajax({
					url: '../../sourcephp/views/Users/coordinador/gposbarmateriapart.php',
					type: 'POST'
				}).done(function (gpsBarMateriaPartRes) {
					insMateriaPartOnGroupsBar(gpsBarMateriaPartRes);
				}).fail(function () {
					AJAXrequestFailed("Fallo en petición AJAX para insertar parte de materia en 'GROUPS BAR'");
				});
			}
				insMateriaPartOnGroupsBar = (gpsBarMateriaPartRes) => {
					materiaspart = document.getElementById('materiaspart');
					materiaspart.innerHTML = gpsBarMateriaPartRes;
				}
			
//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

					/* Funciones de interacción con la página */

	clickEditProfile = () => {
		$(".subdropumen").removeClass('active');
		mainStr = "¿Seguro que desea modificar la información de su perfil?";
		secStr = "Al aceptar la acción, la información anterior no podrá ser recuperada."

		//Set 1 to wArNinGbTn_AcTiOn Cookie
		var flag = false;
		var inputsToUpdateUserInfo = $("#profileform input");

		$(inputsToUpdateUserInfo).each(function verifyUpdateUserInputs(params) {
			if(flag)
				return;
			if($(this).val().length == 0) {
				var mainmessage = "Por favor llene todos los campos del formulario para actualizar su perfil.";
				var secmessage = "Presione el botón para continuar";
				showMessage("wArNinGbTn_AcTiOn", 0, mainmessage, secmessage);
				flag = true;
			}
		});

		if(!flag) {
			showMessage("wArNinGbTn_AcTiOn", 1, mainStr, secStr);
		}
		
	}

//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

					/* Funciones para modificar o insertar registros en la base de datos */

	updateUserInfo = () => {
		newUserreg = $("#profileform input[name=userreg]").val();
		newEmail = $("#profileform input[name=email]").val();
		newNombres = $("#profileform input[name=nombres]").val();
		newApellidos = $("#profileform input[name=apellidos]").val();
		
		getSessionVariables(updateUserInfoSecondFase);
	}

		updateUserInfoSecondFase = (sessionVariables) => {
			if (!sessionVariables.error) {

				var exp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

				if (!/^([0-9])*$/.test(newUserreg)) {
					var mainmessage = "Por favor ingrese solo números en el campo de registro de usuario.";
					var secmessage = "Presione el botón para continuar";
					showMessage("wArNinGbTn_AcTiOn", 0, mainmessage, secmessage);
					return;
				} if (!exp.test(newEmail)) {
					var mainmessage = "Por favor ingrese un correo electrónico válido.";
					var secmessage = "Presione el botón para continuar";
					showMessage("wArNinGbTn_AcTiOn", 0, mainmessage, secmessage);
					return;
				}

				var dataToUpdateUserInfo = null;

				switch (parseInt(sessionVariables.usertype)) {
					case 1:
						switch ($("#profileform select[name=escolaridadselect]").val()) {
							case "Bachillerato": break;
							case "Licenciatura": break;
							case "Ingeniería": break;
							case "Maestría": break;
							case "Doctorado": break;
							default:
								var mainmessage = "Por favor seleccione una escolaridad válida.";
								var secmessage = "Presione el botón para continuar";
								showMessage("wArNinGbTn_AcTiOn", 0, mainmessage, secmessage);
								return;							
						}

						if (parseInt($("#profileform select[name=carrera]").val()) == null) {
							showError("Seleccione una carrera");
							var mainmessage = "Por favor seleccione una carrera válida para la academia.";
							var secmessage = "Presione el botón para continuar";
							showMessage("wArNinGbTn_AcTiOn", 0, mainmessage, secmessage);
							return;		
						}

						dataToUpdateUserInfo = {
							newuserreg: newUserreg,
							email: newEmail,
							nombres: newNombres,
							apellidos: newApellidos,
							escolaridad: $("#profileform select[name=escolaridadselect]").val(),
							idacad: parseInt($("#idacademialbl").html()),
							academia: $("#profileform input[name=academia]").val(),
							carrera: parseInt($("#profileform select[name=carrera]").val()),
							ciclomeses: $("#profileform select[name=cicloperiodo]").val(),
							cicloy: $("#profileform select[name=cicloyear]").val(),
							utype: parseInt(sessionVariables.usertype)
						}
						break;
					case 2:
						switch ($("#profileform select[name=escolaridadselect]").val()) {
							case "Bachillerato": break;
							case "Licenciatura": break;
							case "Ingeniería": break;
							case "Maestría": break;
							case "Doctorado": break;
							default:
								var mainmessage = "Por favor ingrese seleccione una escolaridad válida.";
								var secmessage = "Presione el botón para continuar";
								showMessage("wArNinGbTn_AcTiOn", 0, mainmessage, secmessage);
								return;
						}

						dataToUpdateUserInfo = {
							newuserreg: newUserreg,
							email: newEmail,
							nombres: newNombres,
							apellidos: newApellidos,
							escolaridad: $("#profileform select[name=escolaridadselect]").val(),
							utype: parseInt(sessionVariables.usertype)
						}
						break;
					case 3:
						dataToUpdateUserInfo = {
							newuserreg: newUserreg,
							email: newEmail,
							nombres: newNombres,
							apellidos: newApellidos,
							utype: parseInt(sessionVariables.usertype)
						}
						break;				
					default:
						alert("OPERACION NO PERMITIDA");
						//closeUserSession();
						break;
				}			
				
				$.ajax ({
					url: "../../index_ajax.php?controller=usuario&action=updateUserInfo",
					type: 'POST',
					dataType: 'json',
					data: dataToUpdateUserInfo
				}).done(function (responseUpdateUserInfo) {
					//Verificar que onda
					if(!responseUpdateUserInfo.logout) {
						if (!responseUpdateUserInfo.error) {
							var mainmessage = responseUpdateUserInfo.message;
							var secmessage = "Presione el botón para continuar";
							showMessage("wArNinGbTn_AcTiOn", 0, mainmessage, secmessage);
						} else {
							var mainmessage = responseUpdateUserInfo.message;
							var secmessage = "Presione el botón para continuar";
							showMessage("wArNinGbTn_AcTiOn", 0, mainmessage, secmessage);
							console.log(responseUpdateUserInfo.x);
							return;
						}
					} else {
						//closeUserSession();
						console.log("Cerrar Sesión User");
					}
					}).fail(function () {
					AJAXrequestFailed("Fallo en Petición AJAX para actualizar información de usuario");
				});
				//Call AJAX function to update

			} else if (sessionVariables.error) {
				closeUserSession();
			}
		}


//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

// ---------------------------------------------------------------------------------------------------------------------------------
// ------------------------------------------- USER INTERACTION TRIGGERS -----------------------------------------------------------
// ---------------------------------------------------------------------------------------------------------------------------------
		
	$("body").keydown(function (e) {
		if (e.which == 27) {
			$(".subdropumen").removeClass('active');
			$(".buttonnewinst").removeClass('active');
			$("#modforactions").fadeOut("300");
		}			
		else
			return;
	});

	$('body').on('click', '#userprofile', function (e) { gotoPersonalProfilePage(); });
	$('body').on('click', '#editprofile', function (e) { e.preventDefault(); clickEditProfile(); });

	// --------------------------------- Interaction Elements on ALL SUBPAGES  ------------------------------------------------------

	$('body').on('click', '#homebtn', function (e) { gotoMainPage(e); });
	$('body').on('click', '#dropusermen', function (e) { dropMenuInOut(); });
	$('body').on('click', '#closesession', function () { closeUserSession(); });
	$('body').on('click', '#exitmodalbtn', function (e) { verifyModalActionChanges(e); });

		// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ Interacción con botones de modal warning/information ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
			$('body').on('click', '#cancelbtn', function () { $('#modwarning').fadeOut('400'); deleteCookie("wArNinGbTn_AcTiOn"); });
			$('body').on('click', '#confirmbtn', function () { $('#modwarning').fadeOut('400'); doConfirmAction(); });
			$('body').on('click', '#continuebtn', function () { $('#modinformation').fadeOut('400'); doConfirmAction(); });


// ---------------------------------------------------------------------------------------------------------------------------------
// ----------------------------------------- MAIN PAGE ON LOAD/READY CALLS ---------------------------------------------------------
// ---------------------------------------------------------------------------------------------------------------------------------
	
	$('#mainnavbar').ready(insertMainNavbar);
	openLastPage();

	//Check cookie of last page and redirect to that page
});