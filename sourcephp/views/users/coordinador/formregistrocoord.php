<script type="text/javascript" src="./source/js/appreg.js"></script>
<div id="fromregcomm">
	<h3>Easy Check</h3>
	<label>Registro Coordinador Academia</label>
	<label>Ingrese los datos que se solicitan.</label>
	<form id="freg">
		<div>
			<label>Registro de Usuario</label>
			<input type="text" name="registro_usuario">
		</div>
		<div>
			<label>Correo Electrónico</label>
			<input type="text" name="email">
		</div>
		<div>
			<label>Contraseña</label>
			<input type="password" name="password">
		</div>
		<div>
			<label>Academia</label>
			<input type="text" name="academia_coordina">
		</div>
		<div>
			<label>Carrera</label>
		</div>
		<div>
			<label>Clave Unica de Acceso a Academia</label>
			<input type="text" name="clave_unica_acceso">
		</div>
		<div>
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
		</div>			
		<div>
			<label>Escolaridad</label>
			<input type="text" name="escolaridad">
		</div>
		<div>
			<label>Nombre(s)</label>
			<input type="text" name="nombres">
		</div>
		<div>
			<label>Apellidos</label>
			<input type="text" name="apellidos">
		</div>		
		<input id="submitreg" type="button" name="Registrarse" value="Registrarse">
	</form>	
</div>
