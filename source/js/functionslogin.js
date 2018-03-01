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