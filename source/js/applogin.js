$(document).ready(function($){
	
	//Variable para controlar si hay modal de registro	

	/**
	 * Variables y Objetos para controlar los mensajes de error y el llenado de campos del formulario de Login
	 */
	var err = $(".modalerror"),
		span = err.children("p"),
		flag = false;

	/**
	 * Método para agregar al elemento de clase 'modalerror' un mensaje de error y cambiar el color del elemento
	 * a rojo, mostrarlo por 3.5 segundos para después desaparecer.
	 * 
	 * @param message => Mensaje a mostrar en el elemento '.modalerror'
	 * @returns null
	 */
	showError = function (message) {
		err.css({ "background-color": " rgba(180, 0, 0, 0.9)" });
		span.html(message);		
		err.fadeIn('400', function() {});

		setTimeout(function() {
			err.fadeOut('400', function() {});
		}, 3500);
	}

	/**
	 * Método para agregar al elemento de clase 'modalerror' un mensaje de éxito y cambiar el color del elemento 
	 * a verde, mostrarlo por 3.5 segundos para después desaparecer.
	 * 
	 * @param message => Mensaje a mostrar en el elemento '.modalerror'
	 * @returns null
	 */
	showSuccess = function (message) {
		err.css({ "background-color": "rgba(0, 175, 0, .9)" });
		span.html(message);
		err.fadeIn('400', function() {});

		setTimeout(function() {
			err.fadeOut('400', function() {});
		}, 3500);
	}

	/**
	 * Método para redirigir a la página principal de un usuario del sistema  una vez de haber llenado el 
	 * formulario de Login y haber realizado la verificación de tipo de usuario del sistema.
	 * 
	 * @param res => Respuesta de petición AJAX con encode JSON desde método PHP.
	 * @returns null
	 */
	//verifyUserActionResponse()

	/**
	 * Método para realizar una petición AJAX a un archivo PHP para realizar la verificación del tipo de usuario que
	 * envió el formulario de inicio de sesión en el sistema. Si no exisitó un error en la petición de Login (petición
	 * que invoca este método) se realiza la siguiente petición AJAX para verificación de tipo de usuario; si hubo un 
	 * error, se invoca el método showError enviando un mensaje de error.
	 * 
	 * @param response => Respuesta de petición AJAX con encode JSON desde método PHP.
	 * @returns null
	 */
	//loginActionResponse()

	/**
	 * Función que realiza una petición Ajax para llamar al método login del controlador Users, desde una pagina PHP 
	 * por envío de parametros por GET.
	 * 
	 * @param null
	 * @returns null
	 */
	ajaxLogin = function() {
		var parametros = {
			userreg: $("input[name=registrousuario]").val(),
			password: $("input[name=password]").val()
		};

		$.ajax({
			url: "./index_ajax.php?controller=usuario&action=Login",
			type: 'POST',
			dataType: 'json',
			data: parametros
		}).done(function loginActionResponse (response) {
			if (!response.error) {
				$.ajax({
					url: './index_ajax.php?controller=usuario&action=verifyUser',
					type: 'POST',
					dataType: 'json',
					data: { param1: 'value1' },
				}).done(function verifyUserActionResponse (res) {
					if (!res.error) {
						window.location.replace("./sourcephp/views/main.php");
					} else
						showError(res.message);
				}).fail(function () {  
					AJAXrequestFailed("No se pudo iniciar sesión, por favor inténtelo mas tarde");
				});
			}
			else 								//Si no hubo éxito en login
				showError(response.message);
		}).fail(function () {  
			AJAXrequestFailed("La petición de 'Login AJAX' no ha funcionado");
		});
	}

	
	/**
	 * Método que se invoca al momento de enviar el formulario de login. Verifica si existen campos del form login 
	 * que se encuentren vacios para invocar showError en caso de que el usuario no haya completado todos los campos.
	 * Si se completaron todos los campos se invoca al método ajaxLogin.
	 * 
	 * @param event => Evento predeterminado del elemento input submit
	 * @returns null
	 */
	//verifyLoginForm()

	$('#flogin').submit(function verifyLoginForm(event) {
		flag = false;
		event.preventDefault();

		var inputs = $("#flogin input:not(input[type=submit])");

		$(inputs).each(function verifyLoginInputs() {
			if (flag)
				return;
			if ($(this).val().length == 0) {
				var message = "Por favor llene todos los campos del formulario";
				//$(this).addClass("error");
				showError(message);
				flag = true;
			}
		})
		if (!flag)
			ajaxLogin();
	});

	/**
	 * Procedimineto para mantener la etiqueta de usuario o contraseña fija si hay texto
	*/
	var inputs = document.getElementsByClassName('textinput');
	for (var i = 0; i < inputs.length; ++i)	{
		inputs[i].addEventListener("keyup", function() {
				if (this.value.length > 0)
					this.nextElementSibling.classList.add('moveinfo');
				else
					this.nextElementSibling.classList.remove('moveinfo');
		});
	}

	/**
	 * Función on submit de formularios de registro que llama a la función checkreg envíandole el tipo de usuario para 
	 * realizar el registro de un usuario en la BD.
	 * 
	 */
	//toCreatenewUser()


	loadFormSendMailResetPswd = () => {

		$.ajax({
			url: "./sourcephp/views/shared/forEveryone/sendMailResetPswd.php",
			type: "POST",
			data: "data"
		}).done(function (resSendMailResetPswdForm) {
			loadSendMailResetPswdForm(resSendMailResetPswdForm);
		}).fail(function () {
			AJAXrequestFailed("Error en petición AJAX para insertar formulario para enviar correo reset password.");
		});

	}

		loadSendMailResetPswdForm = (resSendMailResetPswdForm) => {
			document.getElementById('modalregmaincontent').innerHTML = resSendMailResetPswdForm;
			$("#mymodalreg").fadeIn('600', function () { });
			$("#modalregitems").css({ "background-color": "rgb(30, 30, 30"});
		}

	checkEmailToSendMail = () => {
		var emailInput = document.getElementById("emailResetPswd");
		var exp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

		if (!exp.test(emailInput.value)) {
			showError("Ingrese una direccion de correo electrónico válida.");
			return;
		}

		var dataEmailCheck = {
			email: emailInput.value
		};

		return;

		$.ajax({
			url: "./index_ajax.php?controller=usuario&action=checkEmailUser",
			type: 'POST',
			dataType: 'json',
			data: param
		}).done(function (resCheckEmail) {
			if (!resCheckEmail.error) {
				//AJAX send mail
			} else {
				showError("No existe alguna cuenta registrada con ese correo electronico.");
				return;
			}
		}).fail(function () {
			AJAXrequestFailed();
		});

	}

/*------------------------------------------------------------------------------------------*/

	$("body").on('submit', '#freg', function toCreatenewUser(e) {				
		e.preventDefault();
		typeu = $('#freg').attr("data-user");
		checkreg(typeu);
	});

	$("body").keydown(function (e) {
		if (e.which == 27)
			hidetologin();
		else
			return;
	});

	$("#resetPassword").click(function (e) { loadFormSendMailResetPswd(); });
	$("body").on('click', "#sendMailResetPswd", function (e) { checkEmailToSendMail(); })
	$("body").on('click', "#exitmodalbtn", function (e) { hidetologin(); })
	$("body").on('click', '#returnmodalbtn', function (e) { goLastModalPage($("#mymodalreg")); });
});


/**
 * Esta función realiza una peticion AJAX para mostrar un modal con la inforamación necesaria para crear una cuenta 
 * en el sistema.
*/
function gotoregist()
{
	setCookie("lStMoDlAsTaD", "null", 1);
	if(window.XMLHttpRequest)	
		peticion_http = new XMLHttpRequest();	
	else if (window.ActiveXObject) 	
		peticion_http = new ActiveXObject("Microsoft.XMLHTTP");

	peticion_http.onreadystatechange = function () {
		if (this.readyState == 4 && this.status == 200) {	
			document.getElementById('modalregmaincontent').innerHTML = this.responseText;
			$("#mymodalreg").fadeIn('600', function() {});
		}
	}
	$("#modalregitems").css({ "color": "white" });
	$("#modalregitems").css({ "background-color": "rgb(30, 30, 30" });
	peticion_http.open('GET', './sourcephp/views/users/selectuserregister.php', true);
	peticion_http.send();
}



/**
 * Función para esconder el modal de registro cuando el usuario dé un click fuera de la zona del modal.
*/
function outsideclick(e) {
	if(e.target == document.getElementById('mymodalreg')) {
		$('#mymodalreg').fadeOut('400', function() {});
		//
	}
}
window.addEventListener('click', outsideclick);

/**Función para esconder el modal de registro cuando el usuario presione el boton ingresar.
*/
function hidetologin() {
	$('#mymodalreg').fadeOut('400', function() {});
	//
}

/**
 * Esta función realiza una petición AJAX al servidor para insertar la
 * interfaz modal para realizar un registro en la BD.
 * @param type Tipo de usuario
 * @return null
 */
function checkuserregist(type) {
	setCookie("lStMoDlAsTaD", "gotoregist", 1);
	$("#mymodalreg").fadeOut('300', function() {});
	setTimeout(function() { 

		if(window.XMLHttpRequest)
			peticion_http = new XMLHttpRequest();		
		else if (window.ActiveXObject) 		
			peticion_http = new ActiveXObject("Microsoft.XMLHTTP");		

		peticion_http.onreadystatechange = function () {
			if (this.readyState == 4 && this.status == 200) {	
				document.getElementById('modalregmaincontent').innerHTML = this.responseText;
				$("#mymodalreg").fadeIn('600', function() {});
				if (type == 1) {
					$.ajax({
						url: "./index_ajax.php?controller=carrera&action=getCarreras",
						type: 'POST',
						dataType: 'json'
					}).done(function insertCarrerasCombo(response) {
						if (!response.error) {
							combocarreras = document.getElementById("carrerascombo");
							numcarreras = response.carreras.length;
							for (i = 0; i < numcarreras + 1; ++i)
								combocarreras.insertAdjacentHTML('beforeend', response.carreras[i]);
						}
						else
							console.log(response.message);
					}).fail(function () {
						AJAXrequestFailed("Error al insertar carreras en combo registro de coordinador");
					});
				}
			}
		}

		switch (type) {
			case 1:
				peticion_http.open('GET', './sourcephp/views/users/coordinador/formRegistroCoord.php', true);
				$("#modalregitems").css({"color": "white"});
				$("#modalregitems").css({"background-color": "rgb(90, 144, 232)"});
				break;
			case 2:
				peticion_http.open('GET', './sourcephp/views/users/profesor/formRegistroProf.php', true);
				$("#modalregitems").css({"color": "white"});
				$("#modalregitems").css({"background-color": "rgb(14, 161, 51)"});
				break;
			case 3:
				peticion_http.open('GET', './sourcephp/views/users/alumno/formRegistroAlumno.php', true);
				$("#modalregitems").css({"color": "rgb(240, 240, 240)"});
				$("#modalregitems").css({"background-color": "rgb(171, 49, 49)"});
				break;
			default:
				return;
				break;
		}			
		peticion_http.send(type);
	}, 350);
}

/**
 * Esta función realiza una petición AJAX al servidor para registrar una cuenta de usuario en la BD.
 * @param  typeu Tipo de usuario
 * @return null
 */
function checkreg(typeu) {

	regflag = false;
	var inputs = $("#freg input:not(input[type=submit])");
	$(inputs).each(function verifyRegistFormInputs() {
		if(regflag)
			return;
		if($(this).val().length==0) {
			var message = "Por favor llene todos los campos del formulario";
			$(this).addClass("error");
			showError(message);
			regflag = true;		
		}
	});

	if(!regflag)					//Todos los campos están llenas
	{		
		var exp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

		pass = $('#freg input[name=password]').val();
		pass2 = $('#freg input[name=password2]').val();

		if (pass.length < 8 || pass.length > 20) {
			showError("Ingrese una contraseña mayor a 7 caracteres y menor a 21");
			return;
		} if (pass != pass2) {
			showError("Las contraseñas ingresadas no coinciden");
			return;
		} if (!/^([0-9])*$/.test($("#freg input[name=registro_usuario]").val())) {
     		showError("El registro de usuario debe ser un número");
      	 	return;
		} if (!exp.test($("#freg input[name=email]").val())) {
			showError("Ingrese una direccion de correo electrónico válida.");
			return;
		}

		switch (typeu) {
			case "1":
				claveacad = $('#freg input[name=clave_unica_acceso]').val();
				claveacad2 = $('#freg input[name=clave_unica_acceso2]').val();

				if (claveacad.length < 8 || claveacad.length > 20) {
					showError("Ingrese una clave única de acceso mayor a 7 caracteres y menor que 21 caracteres");
					return;
				} if (claveacad != claveacad2) {
					showError("Las claves únicas de acceso no coinciden");
					return;
				} if ($("#freg input[name=carrera_acad]").val() == "null") {
					showError("Seleccione una carrera");
					return;
				} if ($("#freg select[name=escolaridad]").val() == "null") {
					showError("Seleccione Escolaridad");
					return;
				}

				var param = {
					userreg: $("#freg input[name=registro_usuario]").val(),
					email: $("#freg input[name=email]").val(),
					password: $("#freg input[name=password]").val(),
					academia: $("#freg input[name=academia_coordina]").val(),
					carrera: $("#freg select[name=carrera_acad]").val(),
					claveaccess: $("#freg input[name=clave_unica_acceso]").val(),
					ciclomeses: $("#freg select[name=ciclo]").val(),
					cicloy: $("#freg select[name=year]").val(),
					escolaridad: $("#freg select[name=escolaridad]").val(),
					nombres: $("#freg input[name=nombres]").val(),
					apellidos: $("#freg input[name=apellidos]").val(),
					tuser: typeu
				};
				break;
			case "2":
				if ($("#freg select[name=escolaridad]").val() == "null") {
					showError("Seleccione Escolaridad");
					return;	
				}
				var param = {
					userreg: $("#freg input[name=registro_usuario]").val(),
					email: $("#freg input[name=email]").val(),
					password: $("#freg input[name=password]").val(),
					escolaridad: $("#freg select[name=escolaridad]").val(),
					nombres: $("#freg input[name=nombres]").val(),
					apellidos: $("#freg input[name=apellidos]").val(),
					tuser: typeu
				};
				break;
			case "3":			
				var param = {
					userreg: $("#freg input[name=registro_usuario]").val(),
					email: $("#freg input[name=email]").val(),
					password: $("#freg input[name=password]").val(),
					nombres: $("#freg input[name=nombres]").val(),
					apellidos: $("#freg input[name=apellidos]").val(),
					tuser: typeu
				};
				break;
			default:
				alert("OPERACION NO PERMITIDA");
				return;
				break;
		}

		$.ajax({
			url: "./index_ajax.php?controller=usuario&action=registerUser",
			type: 'POST',
			dataType: 'json',
			data: param
		}).done(function successonRegist(response){
			if(!response.error)
			{	
				showSuccess(response.message);				
				hidetologin();			
			}
			else
				showError(response.message);
		}).fail(function () {  
			AJAXrequestFailed("No se pudo registrar al usuario");
		});
	}
}