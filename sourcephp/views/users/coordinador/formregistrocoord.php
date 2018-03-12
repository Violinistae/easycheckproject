<div>
	<h3>Easy Check</h3>
	<label>Registro Coordinador Academia</label>
	<label>Ingrese los datos que se solicitan.</label>
	<form action="" method="POST">
		<input type="text" name="registro_usuario">
		<input type="text" name="email">
		<input type="password" name="password">
		<input type="text" name="academia_coordina">
		<input type="text" name="carrera_academia">
		<input type="text" name="clave_unica_acceso">
		<input type="text" name="nombre_institucion">
		<label>Ciclo Escolar</label>
		<select name="ciclo" multiple>
			<option value="Feb_Jun">Feb - Jun</option>
			<option value="Ago_Dic">Ago - Dic</option>
		</select>
		<select name="year" multiple>
			<?php 
				for ($i = 1995; $i < 2019; ++$i):
			?>
				<option value="<?php echo $i;?>"><?php echo $i;?></option>
			<?php endfor; ?>
		</select>
		<input type="text" name="escolaridad">
		<input type="text" name="nombre">
		<input type="text" name="apellidos">
		<input type="submit" name="Registrarse" value="Registrarse">
	</form>	
</div>