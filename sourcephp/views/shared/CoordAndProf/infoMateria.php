<div>
	<div>
		<button><span></span></button>
	</div>
	<form>	
		<label>Información <?php echo 'Gupo Materia'; ?></label>
		<div>
			<div>
				<label>Nombre Materia</label>
				<input type="text" name="nombMateria" value='<?php echo "NombreMateria";?>'>
			</div>
			<div>
				<label>Semestre</label>
				<select name="semestre" multiple>
					<?php echo "#Semestre" ?>
					<?php for ($i = 1; $i < 9; $i++):?>
						<option value="<?php echo $i ?>"><?php echo $i; ?></option>
						<?php endfor; ?>
				</select>
				<label>Grupo</label>
				<input name="grupo" type="text" value='<?php echo "GRupo"; ?>'>
			</div>
			<div>
				<label>Clave Única de Acceso</label>
				<input type="text" name="claveAcceso" value='<?php echo "CLavEAcceso"; ?>'>
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
				<input type="text" name="numMaxInteg" value='<?php echo "#MaxInteG"; ?>'>
			</div>
			<label>Fechas Fin de Parcial</label>
			<div>
				<label>Parcial 1</label>
				<input type="date" name="parcial1" value='<?php echo "FechaParcial1";?>'>
			</div>
			<div>
				<label>Parcial 2</label>
				<input type="date" name="parcial2" value='<?php echo "FechaParcial2";?>'>
			</div>
			<div>
				<label>Parcial 3</label>
				<input type="date" name="parcial3" value='<?php echo "FechaParcial3";?>'>
			</div>
			<div>
				<input type="submit" name="updateMateria" value="Modificar Información">
				<<input type="button" name="deleteMateria" value="Eliminar Grupo">
			</div>
		</div>
	</form>
</div>