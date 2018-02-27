<div>
	<h3>Easy Check</h3>
	<label>Registro Coordinador Academia</label>
	<label>Ingrese los datos que se solicitan.</label>
	<form action="" method="POST">
		<input type="text" name="registro_usuario" id="">
		<input type="text" name="email" id="">
		<input type="password" name="password" id="">
		<input type="text" name="academia_coordina" id="">
		<input type="text" name="carrera_academia" id="">
		<input type="text" name="clave_unica_acceso" id="">
		<input type="text" name="nombre_institucion" id="">
		<label>Ciclo Escolar</label>
		<select name="ciclo" multiple>
			<option value="feb_jun">Feb - Jun</option>
			<option value="ago_dic">Ago - Dic</option>
		</select>
		<select name="" multiple>
			<?php 
				for ($i = 1995; $i < 2019; ++$i):
			?>
				<option value="<?php echo $i;?>"><?php echo $i;?></option>
			<?php endfor; ?>
		</select>
		<input type="text" name="escolaridad" id="">
		<input type="text" name="nombre" id="">
		<input type="text" name="apellidos" id="">
		<input type="submit" name="Registrarse" value="">
	</form>	
</div>