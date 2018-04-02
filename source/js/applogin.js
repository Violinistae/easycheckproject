$(document).ready(function($){
	
	//Variable para controlar si hay modal de registro	

	/**
	*	Objetos para controlar cuando hay error y también el boton
	**/
	var err = $(".modalerror"),
		span = err.children("p"), 
		btn = $(".btn"),
		flag = false;

	/**
	*	Función para mostrar una barra de error cuando este exista
	**/
	showError = function (message) {
		err.css({ "background-color": " rgba(180, 0, 0, 0.6)" });
		span.html(message);		
		err.fadeIn('400', function() {});

		/**
		*	Efecto de espera para quitar mensaje de error
		**/
		setTimeout(function() {
			err.fadeOut('400', function() {});
			btn.prop("disabled", false);
			btn.val("Ingresar");
		}, 3500);
	}

	/**
	*	Función para mostrar una barra de éxito cuando suceda
	**/
	showSuccess = function (message) {
		err.css({ "background-color": "rgba(0, 175, 0, .5)" });
		span.html(message);
		err.fadeIn('400', function() {});

		/**
		*	Efecto de espera para quitar mensaje de error
		**/
		setTimeout(function() {
			err.fadeOut('400', function() {});
			btn.prop("disabled", false);
			btn.val("Ingresar");
		}, 3500);
	}

	/**
	*	Función que realiza una petición Ajax para llamar al método
	*	login del controlador Users, desde una pagina php por envió de 
	*	parámetros por GET
	**/
	ajaxLogin = function() {
		var parametros = {
			userreg: $("input[name=registrousuario]").val(),
			password: $("input[name=password]").val()
		};
		$.ajax(
		{
			url: "./index_ajax.php?controller=Users&action=Login",
			type: 'POST',
			dataType: 'json',
			data: parametros
		}).done(function(response)
		{
			if(!response.error)	{	 
				$.ajax(
				{
					url: './index_ajax.php?controller=Users&action=verifyUser',
					type: 'POST',
					dataType: 'json',
					data: {param1: 'value1'},
				})
				.done(function(res)
				{
					if(!res.error) {
						if(res.usertype == 1)
							alert("Coordinador de Academia");	
						else if (res.usertype == 2)
							alert("Profesor");
						else if (res.usertype == 3)
							alert("Alumno");
					}
					else
						showError(res.message);
				})
				.fail(function() {
					showError("No se pudo iniciar sesión, por favor inténtelo mas tarde");
				})	
			}
			else 			//Si no hubo éxito en login
				showError(response.message);
		})
		.fail(function() {
			console.log("No funciona");
		});
	}

	/**
	 * Función que verifica si existen campos del form
	 *  login que se encuentren vacios
	 */
	$('#flogin').submit(function (event) {
		flag = false;
		event.preventDefault();

		var inputs = $("#flogin input:not(input[type=submit])");

		$(inputs).each(function() {
			if(flag)
				return;
			if($(this).val().length==0)
			{
				var message = "Por favor llene todos los campos del formulario";
				$(this).addClass("error");
				showError(message);
				flag = true;
			}
		})
		if(!flag)		
			ajaxLogin();		
	})

	/**
	 * Procedimineto para mantener la etiqueta de usuario
	 * o contraseña fija si hay texto
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
	 * Función on submit de formularios de registro que llama a la función 
	 * checkreg envíandole el tipo de usuario para realizar el registro de
	 * un usuario en la BD
	 * 
	 */
	$("body").on('submit', '#freg', function (e) {				
		e.preventDefault();
		typeu = $('#freg').attr("data-user");
		checkreg(typeu);
	})
});


/**Esta función realiza una peticion AJAX para mostrar un modal
* con la inforamación necesaria para crear una cuenta en el sistema
*/
function gotoregist()
{
	if(window.XMLHttpRequest)	
		peticion_http = new XMLHttpRequest();	
	else if (window.ActiveXObject) 	
		peticion_http = new ActiveXObject("Microsoft.XMLHTTP");

	peticion_http.onreadystatechange = function () {
		if (this.readyState == 4 && this.status == 200) {	
			document.getElementById('modalregitems').innerHTML = this.responseText;
			$("#mymodalreg").fadeIn('600', function() {});
		}
	}
	$("#modalregitems").css({ "color": "black" });
	$("#modalregitems").css({ "background-color": "rgba(232, 232, 232, 1)" });
	peticion_http.open('GET', './sourcephp/views/users/selectuserregister.php', true);
	peticion_http.send();
}

/**Función para esconder el modal de registro cuando el usuario 
* dé un click fuera de la zona del modal
*/
function outsideclick(e) {
	if(e.target == document.getElementById('mymodalreg')) {
		$('#mymodalreg').fadeOut('400', function() {});
		//
	}
}
window.addEventListener('click', outsideclick);

/**Función para esconder el modal de registro cuando el usuario
* presione el boton ingresar
*/
function hidetologin() {
	$('#mymodalreg').fadeOut('400', function() {});
	//
}

/**
 * Esta función realiza una petición AJAX al servidor para insertar la
 * interfaz modal para realizar un registro en la BD.
 * @param  int type Tipo de usuario
 * @return null
 */
function checkuserregist(type) {
	$("#mymodalreg").fadeOut('300', function() {});
	setTimeout(function() { 

		if(window.XMLHttpRequest)		
			peticion_http = new XMLHttpRequest();		
		else if (window.ActiveXObject) 		
			peticion_http = new ActiveXObject("Microsoft.XMLHTTP");		

		peticion_http.onreadystatechange = function () {
			if (this.readyState == 4 && this.status == 200) {	
				document.getElementById('modalregitems').innerHTML = this.responseText;
				$("#mymodalreg").fadeIn('600', function() {});
			}
		}

		switch (type) {
			case 1:
				
				peticion_http.open('GET', './sourcephp/views/users/coordinador/formRegistroCoord.php', true);

				$.ajax({
					url: "./index_ajax.php?controller=Carrera&action=getCarreras",
					type: 'POST',
					dataType: 'json'
				}).done(function (response) {
					if (!response.error) {
						combocarreras = document.getElementById("carrerascombo");
						numcarreras = response.carreras.length;
						for (i = 0; i < numcarreras + 1; ++i)
							combocarreras.insertAdjacentHTML('beforeend', response.carreras[i]);
					}
					else
						console.log(response.message);
				}).fail(function () {
					console.log("No funciona");
				});

				break;

			case 2:
				peticion_http.open('GET', './sourcephp/views/users/profesor/formRegistroProf.php', true);
				$("#modalregitems").css({"color": "rgb(247, 218, 37)"});
				$("#modalregitems").css({"background-color": "rgb(50, 50, 50"});
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
		peticion_http.send();
	}, 350);
}

/**
 * Esta función realiza una petición AJAX al servidor para registrar una 
 * cuenta de usuario en la BD.
 * @param  int typeu Tipo de usuario
 * @return null
 */
function checkreg(typeu) {

	regflag = false;
	var inputs = $("#freg input:not(input[type=submit])");
	$(inputs).each(function() {
		if(regflag)
			return;
		if($(this).val().length==0) {
			var message = "Por favor llene todos los campos del formulario";
			$(this).addClass("error");
			showError(message);
			regflag = true;		
		}
	})

	if(!regflag)					//Todos los campos están llenas
	{		

		pass = $('#freg input[name=password]').val();
		pass2 = $('#freg input[name=password2]').val();

		if (pass.length < 8 || pass.length > 20) {
			showError("Ingrese una contraseña mayor a 7 caracteres y menor a 21");
			return;
		} if (pass != pass2) {
			showError("Las contraseñas ingresadas no coinciden");
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
					escolaridad: $("#freg input[name=escolaridad]").val(),
					nombres: $("#freg input[name=nombres]").val(),
					apellidos: $("#freg input[name=apellidos]").val(),
					tuser: typeu
				};
				
				break;
			case "2":
				
				var param = {
					userreg: $("#freg input[name=registro_usuario]").val(),
					email: $("#freg input[name=email]").val(),
					password: $("#freg input[name=password]").val(),
					escolaridad: $("#freg input[name=escolaridad]").val(),
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
			url: "./index_ajax.php?controller=Users&action=registerUser",
			type: 'POST',
			dataType: 'json',
			data: param
		}).done(function(response){
			if(!response.error)
			{	
				showSuccess(response.message);				
				hidetologin();						
			}
			else
				showError(response.message);
		});

	}

}