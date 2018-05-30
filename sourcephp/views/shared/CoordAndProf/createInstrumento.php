<link rel="stylesheet" type="text/css" href="../../source/css/styleCreateInsturmento.css">
<div id="instruccCreateInstrumento">
	<label id="titleFormCreateInst">Crear Instrumento de Evaluación: </label>
</div>
<div id="fromCreateInst">
	<div id="formCreateInstPart1">
		<div>
			<label class="subtitleLblField">Clave Elemento Evaluado</label>
			<input class="createFormInput" id="claveElemInput" type="text" name="claveElemento" autocomplete="off">
		</div>
		<div>
			<label class="subtitleLblField">Nombre Elemento Evaluado</label>
			<input class="createFormInput" id="nombreElemInput" type="text" name="nombreElemento" autocomplete="off">
		</div>
		<div>
			<label class="subtitleLblField">Tipo de Evaluación</label>
			<select class="createFormInput" id="tipoEvSelect" name="tipoEvaluacion" autocomplete="off">	
				<option value="null" selected>- Seleccione un tipo de Evaluación -</option>
			</select>
		</div>
		<div>
			<label class="subtitleLblField">Parcial Evaluado</label>
			<select class="createFormInput" id="selectParcial" name="selectParcialEvaluado" autocomplete="off">
				<option value="null" selected>- Seleccione un Parcial -</option>
				<option value="1">1</option>
				<option value="2">2</option>
				<option value="3">3</option>
				<option value="123">Todos</option>
			</select>
		</div>
	</div>
	<div id="formCreateInstPart2">
		<div>
			<label class="subtitleLblField">Academia de la Materia Evaluada</label>
			<select class="createFormInput" id="academiaMateriaSelect" name="academiaMateriaEvaluada" autocomplete="off">
			</select>
		</div>
		<div>
			<label class="subtitleLblField">Materia Evaluada</label>
			<select class="createFormInput" class="createFormInput" id="materiasSelect" name="materiaEvaluada" autocomplete="off">
				<option value="null" selected>- Seleccione una carrera -</option>
			</select>
		</div>	
		<div id="instruccionesLlenado">
			<label class="subtitleLblField">Instrucciones de llenado para el instrumento</label>
			<textarea class="createFormInput" id="instruccLlenado" name="instruccLlenado" autocomplete="off"></textarea>
		</div>
		<div>
			<button id="createInstrumento">Crear Instrumento</button>
		</div>
	</div>
</div>
<script type="text/javascript" src="../../source/js/appCreateInstrumento.js"></script>