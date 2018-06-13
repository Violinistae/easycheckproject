$(document).ready(function ($) {
    							/* Funciones para Cargar Páginas */
				//Siempre establecer el valor de la cookie de lOaDeDpAgE_ajax

	gotoMainPage = (e) => {
		setCookie("lOaDeDpAgE_ajax", "gotoMainPage", 7);
		$(".subdropumen").removeClass('active');
		$(".buttonnewinst").removeClass('active');

		getSessionVariables(insertContentToMainPage);
	}

		insertContentToMainPage = (sessionVariables) => {
			if (!sessionVariables.error) {
				let ut = parseInt(sessionVariables.usertype); 
				if (ut == 1 || ut == 2) {
					$.ajax({
						url: "../../sourcephp/views/shared/CoordAndProf/principal.php",
						type: "POST"
					}).done(function (mainPage) {
						maincontentFadeAnimation(mainPage, getProfCoordInstr);
					}).fail(function () {
						AJAXrequestFailed("Fallo en petición AJAX para volver a página principal");
					});
				} else if (ut == 3) {
					insertMainPageAlumnoContent();
				} else {
					closeUserSession();
				}
			} else {
				closeUserSession();
			}
		}

		getProfCoordInstr = () => {
			let mainContainer = document.getElementById("submaincontainer");
			getAndExecuteNewInsertedScript(mainContainer);

			$.ajax({
				url: '../../index_ajax.php?controller=instrumento&action=readInstrumentoByCreador',
				type: "POST",
				dataType: 'json'
			}).done(function (resUserBuiltInstr) {
				insertBuiltUserInst(resUserBuiltInstr);
			}).fail(function () {
				AJAXrequestFailed("Fallo en petición AJAX para volver a página principal");
			});
		}

		insertBuiltUserInst = (resUserBuiltInstr) => {
			if (!resUserBuiltInstr.error) {
				if (resUserBuiltInstr.built) {				
					let userInst = resUserBuiltInstr.instrUser;
					let instrumentsContainerPpal = document.getElementsByClassName("instrumentsContainerPpal").item(0);
					//console.log(instrumentsContainerPpal);

					for (let i = 0; i < userInst.length; ++i) {
						let instrumentDivPpal = document.createElement("div");
						instrumentDivPpal.classList.add("instrumentDivPpal");

						let instrumentImg = document.createElement("span");
						instrumentImg.classList.add("instrumentImg");
						instrumentImg.setAttribute("dataidins", userInst[i].Id_Instrumento);
						instrumentImg.setAttribute("dataidmat", userInst[i].Id_Materia);

						switch (parseInt(userInst[i].Id_TipoIn)) {
							case 1:
								instrumentImg.style.backgroundImage = "url('../../source/img/instrumentos/rubrica.jpg')";
								break;
							case 2:
								instrumentImg.style.backgroundImage = "url('../../source/img/instrumentos/listacotejo.png')";
								break;
							case 3:
								instrumentImg.style.backgroundImage = "url('../../source/img/instrumentos/guiaobs.png')";
								break;
							case 4:
								instrumentImg.style.backgroundImage = "url('../../source/img/instrumentos/cuestionario.png')";
								break;
						}

						instrumentDivPpal.appendChild(instrumentImg);
						

						let instrumentTextPart = document.createElement("div");
						instrumentTextPart.classList.add("instrumentTextPart");

						let label = document.createElement("label");
						label.classList.add("nomElemInstr");
						label.textContent = userInst[i].TipoInstrumento + " ~ "
							+ userInst[i].ClaveElem + " - " + userInst[i].NombElemento;
						instrumentTextPart.appendChild(label);

						label = document.createElement("label");
						label.textContent = userInst[i].Materia;
						instrumentTextPart.appendChild(label);

						instrumentDivPpal.appendChild(instrumentTextPart);
						instrumentsContainerPpal.appendChild(instrumentDivPpal);
						
					}
				}
			}
		}
        
	gotoPersonalProfilePage = () => {
		setCookie("lOaDeDpAgE_ajax", "gotoPersonalProfilePage", 7);
		$(".subdropumen").removeClass('active'); 
		$(".buttonnewinst").removeClass('active');
		$.ajax({
			url: '../../sourcephp/views/shared/forEveryone/personalProfile.php',
			type: 'POST'
		}).done(function (personalProfilePage) {
			maincontentFadeAnimation(personalProfilePage, personalProfileForFadeIn);
		}).fail( function () {
			AJAXrequestFailed("Fallo en petición AJAX para cargar perfil personal de usuario.");
		});
	}

		personalProfileForFadeIn = () => {
			$.ajax({
				url: '../../index_ajax.php?controller=usuario&action=getUserInfo',
				type: 'POST',
				dataType: 'json'
			}).done(function (userinfoRes) {
				getUserInfo(userinfoRes);
			}).fail(function () {
				AJAXrequestFailed("Fallo en petición AJAX para obtención de información de usuario.");
			});
		}

		getUserInfo = (userinfoRes) => {
			//Se imprime en los campos adecuados la információn básica de un usuario
			document.getElementById("userregp").innerHTML = userinfoRes.userinfo.Registro_U;
			document.getElementById("emailinput").value = userinfoRes.userinfo.Email;
			document.getElementById("nombresp").innerHTML = userinfoRes.userinfo.Nombres;
			document.getElementById("apellidosp").innerHTML = userinfoRes.userinfo.Apellidos;

			//Insertar escolaridad en caso de que el usuario se de tipo Coordinador o profesor
			if (userinfoRes.userinfo.Tipo_Usuario == 2 || userinfoRes.userinfo.Tipo_Usuario == 1) {
				$.ajax({
					url: '../../sourcephp/views/shared/CoordAndProf/escolaridadDiv.php',
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

			insertEscolaridadintoProfile = (userinfoRes, escolaridadPart) => {
				document.getElementById("escolaridadDiv").insertAdjacentHTML('beforeend', escolaridadPart);
				document.getElementById("escolaridadinput").value = userinfoRes.userinfo.Escolaridad;
			}
			
			insertAcadBasicInfoToProfile = (userinfoRes, academiaPart) => {
				document.getElementById("profilesubgridvariable").insertAdjacentHTML('beforeend', academiaPart);
				document.getElementById("idacademiap").innerHTML = userinfoRes.basicacadinfo.Id_Academia;
				document.getElementById("academiainput").value = userinfoRes.basicacadinfo.Academia;

				$.ajax({
					url: "../../index_ajax.php?controller=carrera&action=getCarreras",
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
				for (i = actualyear; i > actualyear - 5; i--) {
					var newyearoption = document.createElement("option");
					newyearoption.text = i;
					newyearoption.value = i.toString();
					document.getElementById("cicloyearselect").add(newyearoption);
				}
				document.getElementById("cicloyearselect").value = ciclosplited[3];

				//Ver si no hay un bug después cuando no haya un año coherente o existente
				//por el limite de la fecha *****
			}

				insertCarrerasComboToProfile = (userinfoRes, resCarreras) => {
					if (!resCarreras.error) {

						numcarreras = resCarreras.carreras.length;
						for (i = 1; i < numcarreras + 1; ++i)
							document.getElementById("carrerainput").insertAdjacentHTML('beforeend', resCarreras.carreras[i]);

						document.getElementById("carrerainput").value = userinfoRes.basicacadinfo.Carrera;
					}
					else
						console.log(resCarreras.message);
				}

	
	gotoAcademiaOverview = () => {
		setCookie("lOaDeDpAgE_ajax", "gotoAcademiaOverview", 7);
		$(".subdropumen").removeClass('active');
		$(".buttonnewinst").removeClass('active');
		getSessionVariables(checkCoordProf);
	}

		checkCoordProf = (sessionVariables) => {
			if (!sessionVariables.error) {				
				switch (parseInt(sessionVariables.usertype)) {
					case 1:
						$.ajax({
							url: '../../sourcephp/views/Users/coordinador/acadOverview.php',
							type: 'POST'
						}).done(function (acadOverviewPage) {
							maincontentFadeAnimation(acadOverviewPage, loadAcademiaOverviewCoord);
						}).fail(function () {
							AJAXrequestFailed("Fallo en petición AJAX para reaccionar a boton de academia en groups bar.");
						});
						break;
					case 2:					
						$.ajax({
							url: '../../sourcephp/views/Users/profesor/listAcademias.php',
							type: 'POST'
						}).done(function (acadOverviewPage) {
							maincontentFadeAnimation(acadOverviewPage, loadAcademiasToTable);
						}).fail(function () {
							AJAXrequestFailed("Fallo en petición AJAX para reaccionar a boton de academia en groups bar.");
						});
						break;
					default:
						break;
				}				
			} else {
				closeUserSession();
			}
		}

			loadAcademiaOverviewCoord= () => {
				mainContainer = document.getElementById("submaincontainer");
				getAndExecuteNewInsertedScript(mainContainer);

				dataAcademiaFromJS = {
					fromJS: 1
				};
				$.ajax({
					url: '../../index_ajax.php?controller=academia&action=getAcademiaByCoordinador',
					type: 'POST',
					dataType: 'json',
					data: dataAcademiaFromJS
				}).done(function (resAcadInfo) {
					dataForSharedInst = {
						Id_Academia: resAcadInfo.academia.Id_Academia
					};
					console.log(dataForSharedInst);

					$.ajax({
						url: '../../index_ajax.php?controller=instrumentoscompartidos&action=readAcadSharedInstr',
						type: 'POST',
						dataType: 'json',
						data: dataForSharedInst
					}).done(function (resSharedInstr) { 
						if (!resSharedInstr.error) {
							if (resSharedInstr.built) {
								insertSharedInsToContainer (resSharedInstr.sharedInst);
							} else {
								//Add sticky message there are no shared instruments
							}
						}
					 }).fail(function () {
						 AJAXrequestFailed("Fallo en petición AJAX para obtener e insertar instrumentos compartidos la academia");
					 });
				}).fail(function () {
					AJAXrequestFailed("Fallo en petición AJAX para obtener información academia");
				});
			}

			loadAcademiasToTable = () => {
				mainContainer = document.getElementById("submaincontainer");
				getAndExecuteNewInsertedScript(mainContainer);

				$.ajax({
					url: "../../index_ajax.php?controller=integrantesacademia&action=getAcadMembers",
					type: 'POST',
					dataType: 'json'
				}).done(function (resAcadsMemberOf) {
					if (!resAcadsMemberOf.error) {
						if (resAcadsMemberOf.memberAcads) {
							insertAcademiasProfMember(resAcadsMemberOf.acads);
						} else {
							setNoAcadsMemberInfo();
						}
					}
				}).fail(function () {
					AJAXrequestFailed("Fallo en petición para obtener academias miembro usuario");
				})

			}


				insertSharedInsToContainer = (sharedInstr) => {
					let instrumentsContainer = document.getElementsByClassName("instrumentsContainer").item(0);

					for (let i = 0; i <  sharedInstr.length; ++i) {
						let instrumentDivPpal = document.createElement("div");
						instrumentDivPpal.classList.add("instrumentDiv");

						let instrumentImg = document.createElement("span");
						instrumentImg.classList.add("instrumentImg");
						instrumentImg.setAttribute("dataidins", sharedInstr[i].Id_Instrumento);
						instrumentImg.setAttribute("dataidmat", sharedInstr[i].Id_Materia);						

						switch (parseInt(sharedInstr[i].Id_TipoIn)) {
							case 1:
								instrumentImg.style.backgroundImage = "url('../../source/img/instrumentos/rubrica.jpg')";
								break;
							case 2:
								instrumentImg.style.backgroundImage = "url('../../source/img/instrumentos/listacotejo.png')";
								break;
							case 3:
								instrumentImg.style.backgroundImage = "url('../../source/img/instrumentos/guiaobs.png')";
								break;
							case 4:
								instrumentImg.style.backgroundImage = "url('../../source/img/instrumentos/cuestionario.png')";
								break;
						}
						instrumentDivPpal.appendChild(instrumentImg);

						let instrumentTextPart = document.createElement("div");
						instrumentTextPart.classList.add("instrumentTextPart");

						let label = document.createElement("label");
						label.classList.add("nomElemInstr");
						label.textContent = sharedInstr[i].TipoInstrumento + " ~ "
							+ sharedInstr[i].ClaveElem + " - " + sharedInstr[i].NombElemento;
						instrumentTextPart.appendChild(label);

						label = document.createElement("label");
						label.textContent = sharedInstr[i].Materia;
						instrumentTextPart.appendChild(label);

						instrumentDivPpal.appendChild(instrumentTextPart);
						instrumentsContainer.appendChild(instrumentDivPpal);
					}
				}



			setNoAcadsMemberInfo = () => {
				let noAcademiasInfo = document.getElementById("noAcademiasAvailable");
				
				let p = document.createElement("p");
				p.textContent = "No hay grupos Academia a los que pertenezca";
				noAcademiasInfo.appendChild(p);
				noAcademiasInfo.appendChild(document.createElement("BR"));

				p = document.createElement("p");
				p.textContent = "Presione el ícono de mensaje para realizar una petición a alguna";
				noAcademiasInfo.appendChild(p);
			}

			insertAcademiasProfMember = (acads) => {
				console.log(acads);
				let academiasContainer = document.getElementById("academiasContainer");

				for (i = 0; i < acads.length; ++i) {
					let academiaRow = document.createElement("div");
					academiaRow.classList.add("academiaRow");
					let Column;
					for (j = 0; j < 3; ++j) {
						Column = document.createElement("div");
						Column.classList.add("academiaRowElem");
						n = j + 1;
						let p = document.createElement("p");
						switch (n) {
							case 1:
								p.textContent = acads[i][0];
								break;
							case 2:
								p.textContent = acads[i][1];
								break;
							case 3:
								p.textContent = "Hola";
								break;
						}
						Column.appendChild(p);
						academiaRow.appendChild(Column);
					}
					academiasContainer.appendChild(academiaRow);
				}
			}

	gotoMaterias = (e) => {
        setCookie("lOaDeDpAgE_ajax", "gotoMaterias", 7);
		$(".subdropumen").removeClass('active');
		$(".buttonnewinst").removeClass('active');
        $.ajax({
            url: "../../sourcephp/views/Users/coordinador/listMaterias.php",
			type: "POST"
        }).done(function (mainPage) {
			maincontentFadeAnimation(mainPage, loadMateriasToTable);
        }).fail(function () {
            AJAXrequestFailed("Fallo en petición AJAX para cargar página de lista de materias de academia.");
        });
	}

		loadMateriasToTable = () => {
			mainContainer = document.getElementById("submaincontainer");
			getAndExecuteNewInsertedScript(mainContainer);

			readMateriasData = {
				purpose: 1
			}
			
			$.ajax({
				url: '../../index_ajax.php?controller=materia&action=readMateria',
				type: 'POST',
				dataType: 'json',
				data: readMateriasData		
			}).done(function (materiasAcademia) {
				insertMateriasToTable(materiasAcademia);
			}).fail(function () {
				AJAXrequestFailed("Fallo en petición AJAX obtener materias de una academia");
			});
		}		

			insertMateriasToTable = (materiasAcademia) => {
				//console.log(materiasAcademia.numMaterias)
				if (!materiasAcademia.error) {

					if (materiasAcademia.numMaterias > 0) {
						var tablaMaterias = document.getElementById("materiasTableContent");

						for (i = 0; i < materiasAcademia.numMaterias; ++i) {
							var materiaRow = tablaMaterias.insertRow(-1);

							var fIcon = '<i id="f-' + materiasAcademia.materias[i].Id_Materia + '" title="Cambiar/Subir archivo" class="actionsIcon fas fa-file-excel"></i>';
							var tIcon = '<i id="t-' + materiasAcademia.materias[i].Id_Materia + '" title="Eliminar" class="actionsIcon fas fa-trash"></i>';
							var eIcon = '<i id="e-' + materiasAcademia.materias[i].Id_Materia + '" title="Editar" class="actionsIcon fas fa-edit"></i>';

							var fbtn = '<button class="materiaBtn" id="f-' + materiasAcademia.materias[i].Id_Materia + '">' + fIcon + '</button>';
							var tbtn = '<button class="materiaBtn" id="t-' + materiasAcademia.materias[i].Id_Materia + '">' + tIcon + '</button>';
							var ebtn = '<button class="materiaBtn" id="e-' + materiasAcademia.materias[i].Id_Materia + '">' + eIcon + '</button>';

							var actionsDiv = '<div class="styleForIcons">' + ebtn + tbtn + '</div>'

							var cellClaveMateria = materiaRow.insertCell(0); cellClaveMateria.innerHTML = materiasAcademia.materias[i].Id_Materia;
							var cellNombreMateria = materiaRow.insertCell(1); cellNombreMateria.innerHTML = materiasAcademia.materias[i].Materia;
							var cellSemestre = materiaRow.insertCell(2); cellSemestre.innerHTML = materiasAcademia.materias[i].Semestre;
							var cellArchivo = materiaRow.insertCell(3); cellArchivo.innerHTML = fbtn;
							var cellAcciones = materiaRow.insertCell(4); cellAcciones.innerHTML = actionsDiv;

							materiaRow.classList.add("commonMateriaRow");
						}
					} else {
						setNoCreatedMaterias();
					}		
				}			
			}

				setNoCreatedMaterias = () => {
					let noMateriasInformacion = document.getElementById("noMateriasAvailable");

					let p = document.createElement("p");
					p.textContent = "No existe alguna materia creada en su Academia";
					noMateriasInformacion.appendChild(p);
					noMateriasInformacion.appendChild(document.createElement("BR"));

					p = document.createElement("p");
					p.textContent = 'Presione la opción "Crear Materia" para generarla';
					noMateriasInformacion.appendChild(p);
				}

	gotoGposPeriodo = () => {
		setCookie("lOaDeDpAgE_ajax", "gotoGposPeriodo", 7);
		$(".subdropumen").removeClass('active');
		$(".buttonnewinst").removeClass('active');
		$.ajax({
			url: "../../sourcephp/views/Users/coordinador/listMaterias.php",
			type: "POST"
		}).done(function (mainPage) {
			maincontentFadeAnimation(mainPage, loadMateriasToTable);
		}).fail(function () {
			AJAXrequestFailed("Fallo en petición AJAX para cargar página de lista de materias de academia.");
		});
	}

//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++	

	selectInstrumentCreate = () => {
        $(".buttonnewinst").removeClass('active');
        $(".subdropumen").removeClass('active');

        actionsCookieName = "aiCoTndDtoO";
        setCookie(actionsCookieName, "selectInstrument", 8);
		$("#modforactions").fadeIn("400");
		$("#modalforactionscontainer").fadeIn("400");

        $.ajax({
            url: "../../sourcephp/views/shared/CoordAndProf/selectInstrumento.php",
            type: "POST"
        }).done(function (resSelectInstrumentCreate) {
			insertSelectInstrumentoForm(resSelectInstrumentCreate);			
        }).fail(function () {
            AJAXrequestFailed("Fallo en petición AJAX para insertar formulario selección de instrumento de evaluación.");
        });
    }

        insertSelectInstrumentoForm = (resSelectInstrumentCreate) => {
            document.getElementById("modalforactionscontainer").innerHTML = resSelectInstrumentCreate;
            getAndExecuteNewInsertedScript(document.getElementById("modalforactionscontainer"));
		}
		
	//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++	
});