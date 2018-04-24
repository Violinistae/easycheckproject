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

	dropMenuInOut = (e) => {
		//console.log($(".subdropumen").children());
		$(".subdropumen").toggleClass('active').siblings().removeClass('active');
	}

	maincontentFadeAnimation = (responsePage) => {
		$("#submaincontainer").fadeOut("300");
		sleep(370);
		$("#submaincontainer").html(responsePage);
		$("#submaincontainer").fadeIn("300");
	}

	getAndExecuteNewInsertedScript = (loadedPageByAJAX) => {
		scpts = loadedPageByAJAX.getElementsByTagName('script');
		$.getScript(scpts[0].src, function () {
			console.log("New Button Script loaded but not necessarily executed.");
		});
	}

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

	showMessage = (cookieName, cookieValue, mainMessage, secondMessage) => {
		if (cookieValue == 0) {
			$("#modinformation").fadeIn("400");
			$("#informationprincipaltext").html(mainMessage);
			$("#informationsecondarytext").html(secondMessage);
		}
		else {
			$("#modwarning").fadeIn("400");
			$("#warningprincipaltext").html(mainMessage);
			$("#warningsecondarytext").html(secondMessage);
		}
		setCookie(cookieName, cookieValue, 10);												//Ver cuántos días se debe de almacenar
	}


	doConfirmAction = () => {
		cookieName = "wArNinGbTn_AcTiOn";
		var warningCookieValue = getCookie(cookieName);

		//Switch for function calling
		switch (warningCookieValue) {
			case "0":							//Solo mostrar información
				break;
			case "1":							//Modificar información de usuario
				updateUserInfo();
				break;
			default:
				console.log("Acción inválida. Logout?");
				//closeUserSession();
				break;
		}

		deleteCookie(cookieName);
	}

	setCookie = (cookieName, cookieValue, exDays) => {
		var d = new Date();
		d.setTime(d.getTime() + (exDays * 24 * 60 * 60 * 1000));
		var expires = "expires=" + d.toGMTString();
		document.cookie = cookieName + "=" + cookieValue + ";" + "expires" + ";path=/"
	}

	deleteCookie = (cookieName) => {
		document.cookie = cookieName + "=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/";
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

	sleep = (miliseconds) => {
		var start = new Date().getTime();
		for (var i = 0; i < 1e7; i++) {
			if ((new Date().getTime() - start) > miliseconds)
				break;
		}
	}

	openLastPage = () => {
		var lastURL = getCookie("lOaDeDpAgE_ajax");
		if(lastURL == null) {
			lastURL = "gotoMainPage";
			setCookie("lOaDeDpAgE_ajax", "gotoMainPage", 7);
		}
		window[lastURL]();
	}

});