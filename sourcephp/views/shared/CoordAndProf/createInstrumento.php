<link rel="stylesheet" type="text/css" href="../../source/css/styleCreateInsturmento.css">
<div>
	<label id="titleFormCreateInst">Crear Instrumento de Evaluación</label>
</div>
<div id="fromCreateInst">
	<div id="formCreateInstPart1">
		<div>
			<label class="subtitleLblField">Tipo de Instrumento</label>
			<p id="tipoInstrumentoTxt">Tipo de Instrumento</p>
		</div>
		<div>
			<label class="subtitleLblField">Carrera de la Materia Evaluada</label>
			<p id="carreraMateriaTxt">Carrera Materia</p>
		</div>
		<div>
			<label class="subtitleLblField">Materia Evaluada</label>
			<select id="materiaSelect" name="materiaEvaluada" autocomplete="off">
			</select>
		</div>
		<div>
			<label class="subtitleLblField">Parcial Evaluado</label>
			<select id="selectParcial" name="selectParcialEvaluado" autocomplete="off">
				<option value="null" selected>- Seleccione un Parcial -</option>
				<option value="1">1</option>
				<option value="2">2</option>
				<option value="3">3</option>
				<option value="123">Todos</option>
			</select>
		</div>
		<div>
			<label class="subtitleLblField">Clave Elemento Evaluado</label>
			<input type="text" name="claveElemento" autocomplete="off">
		</div>
	</div>
	<div id="formCreateInstPart2">
		<div>
			<label class="subtitleLblField">Nombre Elemento Evaluado</label>
			<input type="text" name="nombreElemento" autocomplete="off">
		</div>
		<div>
			<label class="subtitleLblField">Tipo de Evaluación</label>
			<select name="tipoEvaluacion" autocomplete="off">					
			</select>
		</div>
		<div id="instruccionesLlenado">
			<label class="subtitleLblField">Instrucciones de Llenado</label>
			<textarea name="insrtuccLlenado" autocomplete="off"></textarea>
		</div>
		<div>
			<button name="createInstrumento">Crear Instrumento</button>
		</div>
	</div>
</div>
<script type="text/javascript" src="../../source/js/appCreateInstrumento.js"></script>