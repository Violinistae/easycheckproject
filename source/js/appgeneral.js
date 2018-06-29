$(document).ready(function ($) { 
	getSessionVariables = (methodToDo) => {
		$.ajax({
			url: '../../index_ajax.php?controller=usuario&action=getSessionVariables',
			type: 'POST',
			dataType: 'json'
		}).done(function (sessionVariables) {
			methodToDo(sessionVariables);
		}).fail(function () {
			AJAXrequestFailed("Fallo en Petición AJAX para obtener variables de sesión");
		});
	}
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

	dropMenuInOut = () => {	
		$(".subdropumen").toggleClass('active').siblings().removeClass('active');
		$(".buttonnewinst").removeClass('active');
	}

	sleep = (miliseconds) => {
		var start = new Date().getTime();
		for (var i = 0; i < 1e7; i++) {
			if ((new Date().getTime() - start) > miliseconds)
				break;
		}
	}	

	openLastPage = () => {
		var lastURL = getCookie("lOaDeDpAgE_ajax");
		if (lastURL == null) {
			lastURL = "gotoMainPage";
			setCookie("lOaDeDpAgE_ajax", "gotoMainPage", 7);
		}
		window[lastURL]();
	}

	maincontentFadeAnimation = (responsePage, functionToDo) => {
		$(".subdropumen").removeClass('active');
		$(".buttonnewinst").removeClass('active');
		$("#submaincontainer").fadeOut(180, function () { 
			document.getElementById("submaincontainer").innerHTML = "";
			document.getElementById("submaincontainer").innerHTML = responsePage;
			$("#submaincontainer").fadeIn(180);
			if (functionToDo != "null")
				functionToDo();
		 });
	}

	getAndExecuteNewInsertedScript = (loadedPageByAJAX) => {
		scpts = loadedPageByAJAX.getElementsByTagName('script');
		if (scpts.length > 0) {
			$.getScript(scpts[0].src, function () {
				console.log("New Script loaded but not necessarily executed.");
			});
		}	
	}

	setCookie = (cookieName, cookieValue, exDays) => {
		var d = new Date();
		d.setTime(d.getTime() + (exDays * 24 * 60 * 60 * 1000));
		var expires = "expires=" + d.toGMTString();
		document.cookie = cookieName + "=" + cookieValue + ";" + "expires" + ";path=/"
	}

	getCookie = (cookieName) => {
		var cname = cookieName + "=";
		var decodedCookie = decodeURIComponent(document.cookie);
		var ca = decodedCookie.split(';');
		for (var i = 0; i < ca.length; i++) {
			var c = ca[i];
			while (c.charAt(0) == ' ') {
				c = c.substring(1);
			}
			if (c.indexOf(cname) == 0)
				return c.substring(cname.length, c.length);
		}
		return null;
	}

	deleteCookie = (cookieName) => {
		document.cookie = cookieName + "=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/";
	}	

	showMessage = (cookieName, cookieValue, mainMessage, secondMessage) => {
		var choose;

		switch (cookieValue) {
			case 0: choose = false;	break;
			case 10: choose = false; break;
			case 11: choose = false; break;
			case 13: choose = false; break;
			case 15: choose = false; break;
			case 20: choose = false; break;
			case 30: choose = false; break;

			case 410: choose = false; break;
			case 420: choose = false; break;

			default: choose = true; break;
		}

		if (!choose) {
			$("#modinformation").fadeIn("400");
			$("#informationprincipaltext").html(mainMessage);
			$("#informationsecondarytext").html(secondMessage);
		} else if (choose) {
			$("#modwarning").fadeIn("400");
			$("#warningprincipaltext").html(mainMessage);
			$("#warningsecondarytext").html(secondMessage);
		}
		setCookie(cookieName, cookieValue, 10);												//Ver cuántos días se debe de almacenar
	}

	closeUserSession = () => {
		deleteCookie("lOaDeDpAgE_ajax");
		$(".subdropumen").removeClass('active');
		$.ajax({
			url: '../../index_ajax.php?controller=usuario&action=Logout',
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
			AJAXrequestFailed("No funciona petición AJAX para cerrar sesión");
		});
	}

	verifyModalActionChanges = (e) => {
		if (true) {
			$("#modforactions").fadeOut("400");
			document.getElementById("modalforactionscontainer").innerHTML = "";
			//deleteCookie(cookieName);
		} else {

		}
	}

	goLastModalPage = (modal) => {
		var lastModal = getCookie("lStMoDlAsTaD");
		modal.fadeOut('600', function () {
			if (lastModal != "null") {
				window[lastModal]();
			}
		});	
	}

	deleteFile = (targetFile) => {
		dataFile = {
			targetFile: targetFile
		};

		$.ajax({
			url: '../../index_ajax.php?controller=file&action=deleteFile',
			type: 'POST',
			dataType: 'json',
			data: dataFile
		}).done(function () {
			//
		}).fail(function () {
			AJAXrequestFailed("No sirve petición AJAX para eliminar archivo");
		});
	}

	doCancelAction = () => {
		cookieName = "wArNinGbTn_AcTiOn";
		var warningCookieValue = getCookie(cookieName);

		switch (warningCookieValue) {
			case "410":
				$("#createmateriabtn").prop("disabled", false);
				break;
			case "420":
				$("#creategpoperbtn").prop("disabled", false);
				break;
			case "501":
				$("#createmateriabtn").prop("disabled", false);
				break;
			case "502":
				$("#createmateriabtn").prop("disabled", false);
				break;
			case "503":
				$("#createmateriabtn").prop("disabled", false);
				break;
			case "521":
				$("#creategpoperbtn").prop("disabled", false);
				break;
			default:
				break;
		}
		deleteCookie(cookieName);
	}

	doConfirmAction = () => {
		cookieName = "wArNinGbTn_AcTiOn";
		var warningCookieValue = getCookie(cookieName);
		//console.log(warningCookieValue);

		//Switch for function calling
		switch (warningCookieValue) {
			case "0":							//Solo mostrar información
				break;
			case "1":							//Modificar información de usuario
				updateUserInfo();
				break;
			case "2":							//Actualizar archivo Valores Parciales
				getMateriatoUpdateFile();
				break;
			case "3":							//Confirmar para eliminar materia
				deleteMateriaSelected();
				break;
			case "10":							//Crear materia
				$("#modforactions").fadeOut("400");
				document.getElementById("modalforactionscontainer").innerHTML = "";
				actionsCookieName = "aiCoTndDtoO";
				deleteCookie(actionsCookieName);
				$("#createmateriabtn").prop("disabled", false);
				gotoMaterias();
				break;
			case "11":
				gotoMaterias();
				break;
			case "12":
				getAcademiaToUpdateFile();
				break;
			case "13":
				$("#modforactions").fadeOut("400");
				document.getElementById("modalforactionscontainer").innerHTML = "";
				actionsCookieName = "aiCoTndDtoO";
				deleteCookie(actionsCookieName);
				gotoAcademiaOverview();
				break;
			case "14":
				deleteInstrumentConfirmed();
				break;
			case "15":
				gotoMainPage();
				break;
			case "16":
				shareInstrInAcad();
				break;
			case "17":
				$("#modforactions").fadeOut("400");
				document.getElementById("modalforactionscontainer").innerHTML = "";
				actionsCookieName = "aiCoTndDtoO";
				deleteCookie(actionsCookieName);
				noMoreShareInstr();
				break;
			case "20":
				$("#modforactions").fadeOut("400");
				document.getElementById("modalforactionscontainer").innerHTML = "";
				actionsCookieName = "aiCoTndDtoO";
				deleteCookie(actionsCookieName);
				gotoGposPeriodo(); 
				break;
			case "21": 
				
				break;
			case "22":
				$("#modwarning").fadeOut("400", function () {
					var mainmessage = '¿Está realmente seguro de realizar esta acción?';
					var secmessage = "Recomendamos realice un respaldo, ya que al confirmar esta acción no se podrá recuperar la información de este.";
					showMessage("wArNinGbTn_AcTiOn", 23, mainmessage, secmessage);
				});
				break;
			case "23":
				deleteSelectedGP();
			case "30":
				$("#modforactions").fadeOut("400");
				document.getElementById("modalforactionscontainer").innerHTML = "";
				actionsCookieName = "aiCoTndDtoO";
				deleteCookie(actionsCookieName);
				gotoGposPeriodo();
				break;
			case "31":
				getGpoPtoUpdateFile();
				break;
			case "410":
				$("#createmateriabtn").prop("disabled", false);
				break;
			case "420":
				$("#creategpoperbtn").prop("disabled", false);
				break;
			case "430":
				break; 
			case "501":
				$("#createmateriabtn").prop("disabled", false);
				window.location.href ="../../source/files/ejemplos/EjValoresParcialesMateria_easycheck.xlsx";
				break;
			case "502":
				$("#createmateriabtn").prop("disabled", false);
				break;
			case "503":
				$("#createmateriabtn").prop("disabled", false);
				break;
			case "511":
				window.location.href = "../../source/files/ejemplos/EjListaProfesoresAcademia_easycheck.xlsx";
				break;
			case "521":
				$("#creategpoperbtn").prop("disabled", false);
				window.location.href = "../../source/files/ejemplos/EjListaAlumnosGpoPeriodo_easycheck.xlsx";

			default:
				console.log("Acción inválida. Logout?");
			//closeUserSession();
		}
		deleteCookie(cookieName);
	}
		
});