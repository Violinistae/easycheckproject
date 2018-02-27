//Función para esconder el modal de registro cuando el usuario dé un click fuera de la zona del modal
function outsideclick(e)
{
	if(e.target == document.getElementById('mymodalreg'))
	{
		$('#mymodalreg').hide(600);
	}
}
window.addEventListener('click', outsideclick);

//Función para esconder el modal de registro cuando el usuario presione el boton ingresar
function hidetologin()
{
	$('#mymodalreg').hide(600);
}

//Funcion para mantener la etiqueta de usuario o contraseña fija si hay texto
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

/**
*	Función Ajax para login de los usuarios
**/
$(document).ready(function($){
	
	/**
	*	Objetos para controlar cuando hay error y también el boton
	**/
	var err = $(".error"),
		span = err.children("span"), 
		btn = $(".btn"),
		flag = false;

	/**
	*	Mostrar error del login
	**/
	showError = function (message) {
		span.html(message);
		err.addClass('active');

		/**
		*	Efecto de espera para quitar mensaje de error
		**/
		setTimeout(function(){
			err.removeClass('active');
			btn.removeClass("disabled").prop("disabled", false);
			btn.val("Iniciar Sesión");
		}, 2500);
	}


	var parametros = {
		userreg: $("input[name=registrousiario]").val(),
		password: $("input[name=password]").val()
	};

	$.ajax{
		url: ".index_ajax.php?controller=Users&action=Login",
		type: 'POST',
		dataType: 'json',
		data: parametros,
		//Tiempo cuando se está enviando y cuando se envía?
		}
	};
	$('form').submit(function (event) {
		flag = false;
		event.preventDefault();

		var inputs = $("form input:not(input[type=submit]");

		$(inputs).each(function(){
			if(flag){
				return;
			}
			if($(this).val().length==0){
				var message = $(this).attr("data-error-message-empty");
				$(this).addClass("error");
				showError(message);
				flag = true;
			}
		})

		if(!flag){
			ajaxLogin();
		}

	})

});