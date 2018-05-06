<link rel="stylesheet" href="./source/css/styleAlumnoRegister.css">
<div id="fromregcomm">
	<p id="easycheck">Easy Check</p>
	<div id="formcontainer">
		<label id="labelsreg">Registro de Cuenta Alumno</label>
		<label id="labelsreg">Ingrese los datos que se solicitan</label>
		<form id="freg" data-user="3">
			<div>
				<label>Registro de Usuario</label>
				<input type="text" name="registro_usuario" autocomplete="off">
			</div>
			<div>
				<label>Correo Electrónico</label>
				<input type="text" name="email">
			</div>
			<div>
				<label>Contraseña</label>
				<input type="password" name="password" autocomplete="off">
			</div>
			<div>
				<label>Confirmar Contraseña</label>
				<input type="password" name="password2" autocomplete="off">
			</div>		
			<div>
				<label>Nombre(s)</label>
				<input type="text" name="nombres" autocomplete="off">
			</div>
			<div>
				<label>Apellidos</label>
				<input type="text" name="apellidos" autocomplete="off">
			</div>
			<input id="submitreg" type="submit" name="Registrarse" value="Registrarse">
		</form>	
	</div>
</div>