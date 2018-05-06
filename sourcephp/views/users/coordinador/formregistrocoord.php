<link rel="stylesheet" href="./source/css/styleCoordRegister.css">
<div id="fromregcomm">
	<p id="easycheck">Easy Check</p>
	<div id="formcontainer">
		<label id="labelsreg">Registro Coordinador Academia</label>
		<label id="labelsreg">Ingrese los datos que se solicitan.</label>
		<form id="freg" data-user="1">
			<div>
				<label>Registro de Usuario</label>
				<input type="text" name="registro_usuario" autocomplete="off">
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
				<label>Correo Electrónico</label>
				<input type="text" name="email" autocomplete="off">
			</div>
			<div>
				<label>Academia</label>
				<input type="text" name="academia_coordina" autocomplete="off">
			</div>
			<div>
				<label>Carrera</label>
				<select id="carrerascombo" name="carrera_acad">
				</select>
			</div>
			<div>
				<label>Clave Unica de Acceso a Academia (CUAA)</label>
				<input type="password" name="clave_unica_acceso" autocomplete="off">
			</div>
			<div>
				<label>Confirmar CUAA</label>
				<input type="password" name="clave_unica_acceso2" autocomplete="off">
			</div>
			<div>
				<label>Ciclo Escolar</label>
				<div id="cicloinputs">
					<select name="ciclo">
						<option value="Feb - Jun">Feb - Jun</option>
						<option value="Ago - Dic">Ago - Dic</option>
					</select>
					<select name="year">
						<?php 
							$year = 2018;
							for ($i = $year; $i > $year-10; $i--):
						?>
							<option value="<?php echo $i;?>"><?php echo $i;?></option>
						<?php endfor; ?>
					</select>					
				</div>
			</div>			
			<div>
				<label>Escolaridad</label>
				<select name="escolaridad">
					<option value="null"> - Seleccione Escolaridad -</option>
					<option value="Bachillerato">Bachillerato</option>
					<option value="Licenciatura">Licenciatura</option>
					<option value="Ingeniería">Ingeniería</option>
					<option value="Maestría">Maestría</option>
					<option value="Doctorado">Doctorado</option>
				</select>
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
