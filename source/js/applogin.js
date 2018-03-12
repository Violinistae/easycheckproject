$(document).ready(function($){
	
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
		span.html(message);
		err.fadeIn('400', function() {
		});

		/**
		*	Efecto de espera para quitar mensaje de error
		**/
		setTimeout(function(){
			err.fadeOut('400', function() {
			});
			btn.prop("disabled", false);
			btn.val("Ingresar");
		}, 3500);
	}

	/**
	*	Función que realiza una petición Ajax para llamar al método
	*	login del controlador Users, desde una pagina php por envió de 
	*	parámetros por GET
	**/
	ajaxLogin = function()
	{
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
			if(!response.error)
			{	 
				$:$.ajax({
					url: './index_ajax.php?controller=Users&action=verifyUser',
					type: 'POST',
					dataType: 'json',
					data: {param1: 'value1'},
				})
				.done(function(res) {
					if(!res.error)
					{
						
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
		});
	}

	/**
	 * Función que verifica si existen campos del form
	 *  login que se encuentren vacios
	 */
	$('form').submit(function (event)
	{
		flag = false;
		event.preventDefault();

		var inputs = $("form input:not(input[type=submit])");

		$(inputs).each(function()
		{
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
		{
			ajaxLogin();
		}
	})

	/**Procedimineto para mantener la etiqueta de usuario
	* o contraseña fija si hay texto
	*/
	var inputs = document.getElementsByClassName('textinput');
	for (var i = 0; i < inputs.length; ++i)
	{
		inputs[i].addEventListener("keyup", function()
			{
				if (this.value.length > 0)
					this.nextElementSibling.classList.add('moveinfo');
				else
					this.nextElementSibling.classList.remove('moveinfo');
			}
		);
	}


});

/**Esta función realiza una peticion AJAX para mostrar un modal
* con la inforamación necesaria para crear una cuenta en el sistema
*/
function gotoregist()
{
	if(window.XMLHttpRequest)
	{			
		peticion_http = new XMLHttpRequest();
	}
	else if (window.ActiveXObject) 
	{
		peticion_http = new ActiveXObject("Microsoft.XMLHTTP");
	}

	peticion_http.onreadystatechange = function ()
	{
		if (this.readyState == 4 && this.status == 200)
		{	
			document.getElementById('modalregitems').innerHTML = this.responseText;
			$("#mymodalreg").fadeIn('600', function() {
			});
		}
	}
	peticion_http.open('GET', './sourcephp/views/users/selectuserregister.php', true);
	peticion_http.send();
}

/**Función para esconder el modal de registro cuando el usuario 
* dé un click fuera de la zona del modal
*/
function outsideclick(e)
{
	if(e.target == document.getElementById('mymodalreg'))
	{
		$('#mymodalreg').fadeOut('600', function() {});
	}
}
window.addEventListener('click', outsideclick);

/**Función para esconder el modal de registro cuando el usuario
* presione el boton ingresar
*/
function hidetologin()
{
	$('#mymodalreg').fadeOut('600', function() {});
	//
}

/**
 * Esta función realiza una petición AJAX al servidor para insertar la
 * interfaz modal para realizar un registro en la BD.
 * @param  {[type]} type [description]
 * @return {[type]}      [description]
 */
function checkuserregist(type)
{
	$("#mymodalreg").fadeOut('300', function() {});
	setTimeout(function(){ 
		if(window.XMLHttpRequest)
		{			
			peticion_http = new XMLHttpRequest();
		}
		else if (window.ActiveXObject) 
		{
			peticion_http = new ActiveXObject("Microsoft.XMLHTTP");
		}

		peticion_http.onreadystatechange = function ()
		{
			if (this.readyState == 4 && this.status == 200)
			{	
				document.getElementById('modalregitems').innerHTML = this.responseText;
				$("#mymodalreg").fadeIn('600', function() {
				});
			}
		}
		if(type == 1)	//Coordinador de academia
			peticion_http.open('GET', './sourcephp/views/users/coordinador/formRegistroCoord.php', true);
		else if (type == 2)			//Profesor
			peticion_http.open('GET', './sourcephp/views/users/profesor/formRegistroProf.php', true);
		else if(type > 2)			//Alumno
			peticion_http.open('GET', './sourcephp/views/users/alumno/formRegistroAlumno.php', true);
		peticion_http.send();
	}, 300);
}