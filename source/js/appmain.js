var IdAux;
var IdMat;
var IdAcad;
var profGP;
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
				insertgroupsbar(sessionVariables.usertype);
				if (sessionVariables.usertype == 1) {
					$(".mainnavbar").css({ "background-color": "rgb(90, 144, 232)" });
					insertnewbuttondiv();
					sleep(50);
					insertMateriapart();
					insertCoordStyles();
				} else if (sessionVariables.usertype == 2) {
					$(".mainnavbar").css({ "background-color": "rgb(14, 161, 51)" });
					insertnewbuttondiv();			
					insertProfStyles();
				} else if (sessionVariables.usertype == 3) {
					$(".mainnavbar").css({ "background-color": "rgb(171, 49, 49)" });
					insertAlumnoStyles();
				}
				
				//insert username with ajax
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
							"border": "solid white 2px",
							"color": "white"
						});
					}
				}
			
			insertgroupsbar = (usertype) => {
				$.ajax({
					url: '../../sourcephp/views/shared/CoordAndProf/groupsBar.php',
					type: 'POST'
				}).done(function (gpsBarRes) {
					insgroupsbar(gpsBarRes, usertype);
					
				}).fail(function () {
					AJAXrequestFailed("Fallo en petición AJAX para insertar 'GROUPS BAR'");
				});
			}

				insgroupsbar = (gpsBarRes, usertype) => {
					groupsbar = document.getElementById('groupsbar');
					groupsbar.innerHTML = gpsBarRes;
					getAndExecuteNewInsertedScript(groupsbar);				
					let groupbarcontent = document.getElementById("groupbarcontent");				

					let aux; let gppart;

					switch (usertype) {
						case "2":
							aux = groupbarcontent.childNodes[3];
							gppart = groupbarcontent.childNodes[5];
							groupbarcontent.insertBefore(gppart, aux);									
							break;
						case "3":
							aux = groupbarcontent.childNodes[1];
							aux.innerHTML = "";
							gppart = groupbarcontent.childNodes[5];
							groupbarcontent.insertBefore(gppart, aux);	
							
							gppart.removeChild(gppart.childNodes[3]);
							break;
					}					

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

/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */

	/*  */
	outContextMenuClick = (e) => {
		if (!$(e.target).parents(".contextCostumMenu").length > 0) {
			$(".contextCostumMenu").hide(50);
			$(".contextCostumMenu").attr("dataidins", "");
			$(".contextCostumMenu").attr("dataidmat", "");
		}
	}

	showContextMenuOnInstrument = (e) => {
		e.preventDefault();

		$(".subdropumen").removeClass('active');
		$(".buttonnewinst").removeClass('active');
		$("#modforactions").fadeOut("300");

		let actionPurpose = $(".contextCostumMenu").attr("dataPurpose");
		let cntxtMenu = $(".contextCostumMenu")[0];
		cntxtMenu.innerHTML = "";

		switch (actionPurpose) {
			case "aWMp":
				for (let i = 1; i < 4; ++i) {
					let liMenuItem = document.createElement("li");
					liMenuItem.classList.add("contextMenuItem");

					switch (i) {
						case 1:
							liMenuItem.setAttribute("dataowinsaction", i);
							liMenuItem.textContent = "Compartir instrumento";
							break;
						case 2:
							liMenuItem.setAttribute("dataowinsaction", i);
							liMenuItem.textContent = "Modificar instrumento";
							break;
						case 3:
							liMenuItem.setAttribute("dataowinsaction", i);
							liMenuItem.textContent = "Eliminar instrumento";
							break;
					}					
					cntxtMenu.appendChild(liMenuItem);
				}											
				break;
			case "aSSi":
				for (let i = 4; i < 6; ++i) {
					let liMenuItem = document.createElement("li");
					liMenuItem.classList.add("contextMenuItem");

					switch (i) {
						case 4:					
							liMenuItem.setAttribute("dataowinsaction", i);
							liMenuItem.textContent = "Dejar de compartir";
							break;
						case 5:
							liMenuItem.setAttribute("dataowinsaction", i);
							liMenuItem.textContent = "Otra opción que surga";
							break;
					}
					cntxtMenu.appendChild(liMenuItem);
				}
				break;
			case "mPfGsP":
				for (let i = 6; i < 8; ++i) {
					let liMenuItem = document.createElement("li");
					liMenuItem.classList.add("contextMenuItem");

					switch (i) {
						case 6:
							liMenuItem.setAttribute("dataowinsaction", i);
							liMenuItem.textContent = "Utilizar para evaluar";
							break;
						case 7:
							liMenuItem.setAttribute("dataowinsaction", i);
							liMenuItem.textContent = "Otra opción que surga";
							break;
					}
					cntxtMenu.appendChild(liMenuItem);
				}
				break;
			case "mAlGsP":
				for (let i = 8; i < 9; ++i) {
					let liMenuItem = document.createElement("li");
					liMenuItem.classList.add("contextMenuItem");

					switch (i) {
						case 8:
							liMenuItem.setAttribute("dataowinsaction", i);
							liMenuItem.textContent = "Contestar instrumento";
							break;					
					}
					cntxtMenu.appendChild(liMenuItem);
				}
				break;
			default: return;
		}

		let instId = parseInt(e.currentTarget.getAttribute("dataidins"));
		let matId = parseInt(e.currentTarget.getAttribute("dataidmat"));
		$(".contextCostumMenu").attr("dataidins", instId);
		$(".contextCostumMenu").attr("dataidmat", matId);

		let posYMenu;
		let posXMenu;

		$(".contextCostumMenu").show(200).css({
			top: event.pageY + "px",
			left: event.pageX + "px"
		});
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
			case 4:
				IdAux = parseInt(firsttrigger.item(0).getAttribute("dataidins"));
				IdMat = parseInt(firsttrigger.item(0).getAttribute("dataidmat"));
				var mainmessage = "¿Está completamente seguro de dejar de compartir este instrumento de evaluación?";
				var secmessage = "Favor de asegurarse que ningún profesor está utilizando este instrumento de evaluación.";
				showMessage("wArNinGbTn_AcTiOn", 17, mainmessage, secmessage);
				break;
			case 6:
				verifyGPIntegToEval(firsttrigger.item(0));
				break;
		}
		$(".contextCostumMenu").hide(80);
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
	$('body').on('click', '#returnmodalbtn', function (e) { goLastModalPage($("#modalforactionscontainer")); });

		// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ Interacción con botones de modal warning/information ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
			$('body').on('click', '#cancelbtn', function () { $('#modwarning').fadeOut('400'); doCancelAction(); });
			$('body').on('click', '#confirmbtn', function () { $('#modwarning').fadeOut('400'); doConfirmAction(); });
			$('body').on('click', '#continuebtn', function () { $('#modinformation').fadeOut('400'); doConfirmAction(); });

	$('body').bind('mousedown', function (e) { outContextMenuClick(e); })
	$("body").on('contextmenu', '.instrumentImg', function (e) { showContextMenuOnInstrument(e); })
	$('body').on('dblclick', '.instrumentImg', function (e) { goToEditBuiltIntr(e.currentTarget); });
	$("body").on('contextmenu', '#principalPgContainer', function (e) { e.preventDefault(); })
	$("body").on('contextmenu', '#acadOverview', function (e) { e.preventDefault(); })
	$("body").on('contextmenu', '#GPOverview', function (e) { e.preventDefault(); })
	$('body').on('click', '.contextMenuItem', function (e) { checkClickedContextMenuItem(e); });
	$('body').on('contextmenu', '.contextCostumMenu', function (e) { e.preventDefault(); })

	// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~ Interacción con botones de acción en listas de grupos o materias ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

	//Materias
	$("body").on('click', '.actionsIcon', function (e) { switchActionOnMateria(e); });

	//Grupos periodo
	$('body').on('click', '.actionsGpoPIcon', function (e) { switchActionGpoP(e); });
	$('body').on('click', '#requestGPBtn', function (e) { insertModalRequestGpoP(e); });
	$('body').on('submit', '#requestGpoPForm', function (e) { verifyRequestGpoP(e); });
	$("body").on('change', '#inputListaAlumnos', function (e) { checkNewUploadedFile(3, "inputListaAlumnos"); });

	// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ Interacción con botones de Overview de grupos ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
	$('body').on('click', '#backToGPListBtn', function (e) { gotoGposPeriodo(e); });
	$('body').on('click', '.gpOverviewBtn', function (e) { checkActionForSwitchOnGPOverview(e); })

// ---------------------------------------------------------------------------------------------------------------------------------
// ----------------------------------------- MAIN PAGE ON LOAD/READY CALLS ---------------------------------------------------------
// ---------------------------------------------------------------------------------------------------------------------------------
	
	$('#mainnavbar').ready(insertMainNavbar);
	openLastPage();

	//Check cookie of last page and redirect to that page
	
});