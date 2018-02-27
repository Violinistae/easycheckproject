function destroy_sess()
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
			alert(this.responseText);
		}
	}
	peticion_http.open('GET', '../php/logout.php', true);
	peticion_http.send();
	window.location.href = "login.php";
}
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
			$("#mymodalreg").show(600);
		}
	}
	peticion_http.open('GET', './sourcephp/views/users/selectuserregister.php', true);
	peticion_http.send();
}