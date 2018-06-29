<link rel="stylesheet" type="text/css" href="../../source/css/stylePersonalProfile.css">
<div class="personalprofile">
	<nav>
		<ul id="personalProfileNav">
			<li id="pathPage">
				<label>Perfil personal</label>
			</li>
			<li id="userTypeNavPart">
				<label id="usertypelbl">Tipo de usuario: </label>
			</li>
		</ul>		
	</nav>
	<form id="profileform" action="" method="post">
		<div class="profilegrid">
			<div id="profilesubgridconfig">
				<span id="fotoperfil"></span>
				<button>Cambiar Foto Perfil</button>
				<button id="editprofile">Editar Perfil</button>
				<button>Eliminar Cuenta</button>
			</div>
			<div id="profilesubgridforall">
				<div>
					<label>Registro de Usuario</label>
					<p id="userregp" type="text"></p>
				</div>				
				<div>
					<label>Nombre(s)</label>
					<p id="nombresp" type="text"></p>
				</div>
				<div>
					<label>Apellidos</label>
					<p id="apellidosp" type="text"></p>
				</div>
				<div>
					<label>Correo Electrónico</label>
					<input id="emailinput" type="text" name="email" autocomplete="email">
				</div>
				<div id="escolaridadDiv"></div>				
			</div>
			<div id="profilesubgridvariable">
			</div>
		</div>
	</form>
</div>