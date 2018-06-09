<link rel="stylesheet" type="text/css" href="../../source/css/styleCreateInsturmento.css">
<div id="instruccCreateInstrumento">
	<label id="titleFormCreateInst">Crear Instrumento de Evaluación: </label>
</div>
<div id="fromCreateInst">
	<input id="instTypeHidden" class="createFormInput" type="hidden">
	<div id="formCreateInstPart2">
		<div>
			<label class="subtitleLblField">Academia de la Materia Evaluada</label>
			<select class="createFormInput" id="academiaMateriaSelect" name="academiaMateriaEvaluada" autocomplete="off" disabled>
				<option value="null" selected>- Academias no disponibles -</option>
			</select>
		</div>
		<div>
			<label class="subtitleLblField">Materia Evaluada</label>
			<select class="createFormInput" id="materiasSelect" name="materiaEvaluada" autocomplete="off" disabled>
				<option value="null" selected>- Seleccione primero una academia -</option>
			</select>
		</div>	
		<div id="instruccionesLlenado">
			<div id="lblsInstruccLlenado">
				<label class="subtitleLblField">Instrucciones de llenado para el instrumento</label>	
				<label id="countCharInstrucciones">260</label>
			</div>
			<textarea class="createFormInput" id="instruccLlenado" name="instruccLlenado" autocomplete="off"></textarea>
		</div>
	</div>
	<div id="formCreateInstPart1">
		<div>
			<label class="subtitleLblField" >Clave Elemento Evaluado</label>
			<select class="createFormInput" id="claveElemInput" type="text" name="claveElemento" autocomplete="off" disabled>
				<option value="null" selected>- Seleccione primero una academia -</option>
			</select>
		</div>
		<div id="nombElemContainer">
			<label class="subtitleLblField">Nombre Elemento Evaluado</label>
			<select class="createFormInput" id="nombreElemInput" type="text" name="nombreElemento" autocomplete="off" disabled>
				<option value="null" selected>- Seleccione primero una acadmeia -</option>
			</select>
		</div>
		<div>
			<label class="subtitleLblField">Tipo de Evaluación</label>
			<select class="createFormInput" id="tipoEvSelect" name="tipoEvaluacion" autocomplete="off">	
				<option value="null" selected>- Seleccione un tipo de Evaluación -</option>
			</select>
		</div>
		<div>
			<button id="createInstrumento">Crear Instrumento</button>
		</div>
	</div>
</div>
<script type="text/javascript" src="../../source/js/appCreateInstrumento.js"></script>