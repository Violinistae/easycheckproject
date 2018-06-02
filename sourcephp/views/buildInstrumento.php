<html>
<head>
	<title>Easy Check - Crear Instrumento</title>
	<meta charset="utf-8">
	<meta name="viewport" content="width=device-width, initial-scale=1">
		
	<link rel="stylesheet" type="text/css" href="../../source/css/styleModals.css">
	<link rel="stylesheet" type="text/css" href="../../source/css/styleBuildInstrument.css">

	<link rel="stylesheet" type="text/css" href="../../source/css/styleBuildLC.css">


	<link rel="shortcut icon" href="../../source/img/easycheckico.png" type="image/x-icon">	

	<script type="text/javascript" src="../../source/resources/jquery-3.2.1.min.js"></script>		

	<script type="text/javascript" src="../../source/js/appGeneral.js"></script>
	<script type="text/javascript" src="../../source/js/appGeneral.js"></script>
	<script type="text/javascript" src="../../source/js/appBuildInstrumento.js"></script>
	<script type="text/javascript" src="../../source/resources/font-awesome/js/fontawesome-all.min.js"></script>
</head>
<body>
	<div class="modalwarning" id="modwarning">
		<div id="modalwarningcontent">
			<div id="warningtitle">
				<p>Favor de confirmar la acción</p>
			</div>
			<div id="warningtexts">
				<p id="warningprincipaltext"></p>
				<p id="warningsecondarytext"></p>
			</div>
			<div id="confirmbtns">
				<button id="confirmbtn">Aceptar</button>
				<button id="cancelbtn">Cancelar</button>
			</div>
		</div>
	</div>

	<div class="modalinformation" id="modinformation">
		<div id="modalinformationcontent">
			<div id="informationtitle">
				<p></p>
			</div>
			<div id="informationtexts">
				<p id="informationprincipaltext"></p>
				<p id="informationsecondarytext"></p>
			</div>
			<div id="continuebtns">
				<button id="continuebtn">Continuar</button>
			</div>
		</div>
	</div>
	
	<div class="modalforactions" id="modforactions">
		<div id="modalforactionscontent">
			<div id="modalforactionsmainbtns">
				<i class="fas fa-chevron-circle-left" id="returnmodalbtn"></i>
				<i class="fa fa-times-circle" id="exitmodalbtn"></i>
			</div>
			<div id="modalforactionscontainer">

			</div>
		</div>
	</div>

	<div class="allcontainer">
		<div class="toolsBar" id="toolsBar">
			<div id="creatingLbl">
				<label id="typeInstrumento">Instrumento de Evaluación - Lista de Cotejo</label>
				<label id="claveNombreInstr">P1.1 - Tareas</label>
			</div>
			<div id="addElementsBtns">
				<i id="addRowBtn" class="fas fa-plus-square" title="Agregar fila a instrumento"></i>
			</div>
			<div id="saveChanges">
				<button id="saveChangesBtn">Guardar Cambios</button>
			</div>
		</div>
		<div class="maincontainer" id="maincontainer">
			<div id="tableInstrumentHead">
				<div id="numElemHead">
					<label class="LCHeadLbl">No. de Elemento</label>
				</div>
				<div id="aspEvHead">
					<label class="LCHeadLbl">Aspecto de Evaluación</label>
				</div>
				<div id="indicadoresEvHead">
					<label class="LCHeadLbl">Indicadores de Evaluación</label>
				</div>
				<div id="deleteRowHead">
					<label class="LCHeadLbl">Eliminar fila</label>
				</div>
			</div>
			<div id="submaincontainer">
				<div id="rowsContainer">

					<div class="instrumentRow rowLC">
						<div class="rowLCElement">
							<p class="rowLCContent" id="numElemento">1</p>
						</div>
						<div class="rowLCElement" id="aspEv">						
								<input type="radio" name="aspEv" value="1" checked>Saber
								<input type="radio" name="aspEv" value="2">Hacer
								<input type="radio" name="aspEv" value="3">Ser
						</div>
						<div class="rowLCElement" id="indicadoresEvContainer">
							<div id="lblsindicadoresEv">
								<label id="countCharIndicadoresEv">260</label>
							</div>
							<textarea id="indicadoresEv" name="indicadoresEv" autocomplete="off"></textarea>
						</div>
						<div class="rowLCElement">
							<i class="fas fa-minus-square deleteRowBtn" title="Eliminar fila"></i>
						</div>
					</div>
					
				</div>		
			</div>
		</div>
	</div>
</body>
</html>