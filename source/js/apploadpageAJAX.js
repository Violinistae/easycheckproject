$(document).ready(function ($) {
    							/* Funciones para Cargar Páginas */
				//Siempre establecer el valor de la cookie de lOaDeDpAgE_ajax

	gotoMainPage = (e) => {
		setCookie("lOaDeDpAgE_ajax", "gotoMainPage", 7);
		$(".subdropumen").removeClass('active');
		$(".buttonnewinst").removeClass('active');
		$.ajax({
			url: "../../sourcephp/views/shared/forEveryone/principal.php",
			type: "POST"
		}).done(function (mainPage) {
			maincontentFadeAnimation(mainPage, "null");
		}).fail( function () {
			AJAXrequestFailed("Fallo en petición AJAX para volver a página principal");
		});
	}	

	//Function to insert content on main page ?
        
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
							url: '../../sourcephp/views/shared/CoordAndProf/acadOverview.php',
							type: 'POST'
						}).done(function (acadOverviewPage) {
							maincontentFadeAnimation(acadOverviewPage, "null");
						}).fail(function () {
							AJAXrequestFailed("Fallo en petición AJAX para insertar ir a Academia Overview");
						});
						break;
					case 2:
						alert("Nada");
						break;
					default:
						break;
				}
			} else {
				closeUserSession();
			}
		}

		//Function to insert content on academia page ?

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
			$.ajax({
				url: '../../index_ajax.php?controller=materia&action=readMateria',
				type: 'POST',
				dataType: 'json'				
			}).done(function (materiasAcademia) {
				insertMateriasToTable(materiasAcademia);
			}).fail(function () {
				AJAXrequestFailed("Fallo en petición AJAX obtener materias de una academia");
			});
		}		

			insertMateriasToTable = (materiasAcademia) => {

				if (!materiasAcademia.error) {					

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
				} else if (materiasAcademia.error) {
				}				
			}

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
            insertCreateMateriaForm(resSelectInstrumentCreate);
        }).fail(function () {
            AJAXrequestFailed("Fallo en petición AJAX para insertar formulario selección de instrumento de evaluación.");
        });
    }

        insertCreateMateriaForm = (resSelectInstrumentCreate) => {
            document.getElementById("modalforactionscontainer").innerHTML = resSelectInstrumentCreate;
            getAndExecuteNewInsertedScript(document.getElementById("modalforactionscontainer"));
        }
		
	//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++	
});