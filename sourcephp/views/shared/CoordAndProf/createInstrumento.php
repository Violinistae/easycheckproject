<div>
	<label>Crear Instrumento de Evaluación</label>
	<div>
		<div>
			<div>
				<label>Tipo de Instrumento</label>
				<label><?php echo "Tipo de Instrumento"; ?></label>
			</div>
			<div>
				<label>Carrera de la Materia Evaluada</label>
				<input type="text" name="carreraMateria">
			</div>
			<div>
				<label>Materia Evaluada</label>
				<input type="text" name="materia">
			</div>
			<div>
				<label>Parcial Evaluado</label>
				<select name="" multiple>
					<option value="1">1</option>
					<option value="2">2</option>
					<option value="3">3</option>
				</select>
			</div>
			<div>
				<label>Clave Elemento Evaluado</label>
				<input type="text" name="claveElemento">
			</div>
		</div>
		<div>
			<div>
				<label>Nombre Elemento Evaluado</label>
				<input type="text" name="nombreElemento">
			</div>
			<div>
				<label>Tipo de Evaluación</label>
			</div>
			<div>
				<label>Instrucciones de Llenado</label>
				<textarea name="insrtuccLlenado"></textarea>
			</div>
			<div>
				<button name="createInstrumento">Crear</button>
			</div>
		</div>
	</div>
</div>