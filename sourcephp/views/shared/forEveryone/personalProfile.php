<link rel="stylesheet" type="text/css" href="../../source/css/stylepersonalprofile.css">
<div class="personalprofile">
	<nav>
		<p>Perfil</p>
	</nav>
	<form id="profileform" action="" method="post">
		<div class="profilegrid">
			<div id="profilesubgridconfig">
				<span id="fotoperfil"></span>
				<button>Cambiar Foto Perfil</button>
				<button>Editar Perfil</button>
				<button>Eliminar Cuenta</button>
			</div>
			<div id="profilesubgridforall">
				<div>
					<label>Registro de Usuario</label>
					<input id="userreginput" type="text" name="userreg" autocomplete="off">
				</div>
				<div>
					<label>Correo Electrónico</label>
					<input id="emailinput" type="text" name="email" autocomplete="off">
				</div>
				<div>
					<label>Nombre(s)</label>
					<input id="nombresinput" type="text" name="nombres" autocomplete="off">
				</div>
				<div>
					<label>Apellidos</label>
					<input id="apellidosinput" type="text" name="apellidos" autocomplete="off">
				</div>
				<div id="escolaridaddiv">
					<label>Escolaridad</label>
					<input id="escolaridadinput" type="text" name="escolaridad" autocomplete="off">
				</div>	
			</div>

			<div id="profilesubgridvariable">
				<div id="idacademiadiv">
					<label>Clave de Academia</label>
					<label id="idacademialbl" type="text" name="idacademia"></label>
				</div>
				<div id="academiadiv">
					<label>Academia</label>
					<input id="academiainput" type="text" name="academia" autocomplete="off">
				</div>
				<div id="carreradiv">
					<label>Carrera</label>
					<input id="carrerainput" type="text" name="carrera" autocomplete="off">
				</div>
				<div id="cicloescolardiv">
					<label>Ciclo Escolar</label>
					<input id="cicloescolarinput" type="text" name="cicloescolar" autocomplete="off">
				</div>
			</div>
		</div>
	</form>
</div>