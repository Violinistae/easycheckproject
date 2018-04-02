<div>
	<div>
		<button><span></span></button>
	</div>
	<form>	
		<label>Crear grupo: Materia</label>
		<div>
			<div>
				<label>Nombre Materia</label>
				<input type="text" name="nombMateria">
			</div>
			<div>
				<label>Semestre</label>
				<select name="semestre" multiple>
					<?php for ($i = 1; $i < 9; $i++):?>
						<option value="<?php echo $i ?>"><?php echo $i; ?></option>
						<?php endfor; ?>
				</select>
				<label>Grupo</label>
				<input type="text">
			</div>
			<div>
				<label>Clave Única de Acceso</label>
				<input type="text" name="claveAcceso">
			</div>
			<div>
				<label>Tabla de Valores Parciales</label>
				<input type="file" name="tablaValPar">
			</div>
			<div>
				<label>Lista de Alumnos</label>
				<input type="file" name="ListaAlum">
			</div>
		</div>
		<div>
			<div>
				<label>Número máximo de Integrantes</label>
			</div>
			<label>Fechas Fin de Parcial</label>
			<div>
				<label>Parcial 1</label>
				<input type="date" name="parcial1">
			</div>
			<div>
				<label>Parcial 2</label>
				<input type="date" name="parcial2">
			</div>
			<div>
				<label>Parcial 3</label>
				<input type="date" name="parcial3">
			</div>
			<div>
				<input type="submit" name="createInstrumento" value="Crear">
			</div>
		</div>
	</form>
</div>