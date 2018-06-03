<html>
<head>
	<title>Easy Check - Crear Instrumento</title>
	<meta charset="utf-8">
	<meta name="viewport" content="width=device-width, initial-scale=1">
		
	<link rel="stylesheet" type="text/css" href="../../source/css/styleModals.css">
	<link rel="stylesheet" type="text/css" href="../../source/css/styleBuildInstrument.css">

	<link rel="shortcut icon" href="../../source/img/easycheckico.png" type="image/x-icon">	

	<link rel="stylesheet" type="text/css" href="../../source/css/styleBuildLC.css">
	<link rel="stylesheet" type="text/css" href="../../source/css/styleBuildGO.css">
	<link rel="stylesheet" type="text/css" href="../../source/css/styleBuildC.css">
	
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
				<label id="typeInstrumento">Instrumento de Evaluación - </label>
				<label id="claveNombreInstr"></label>
			</div>
			<div id="addElementsBtns">
				<i id="addRowBtn" class="fas fa-plus-square" title="Agregar fila a instrumento"></i>
				<div class="dropableMenu" id="questionTypeDropMenu">
					<ul class="dropMenuContent">
						<li class="dropMenuElem typeC" dataCT="1">
							<label class="lblDropM">Opción múltiple</label>
						</li>
						<li class="dropMenuElem typeC" dataCT="2">
							<label class="lblDropM">Completar campo</label>
						</li>
						<li class="dropMenuElem typeC" dataCT="3">
							<label class="lblDropM">Pregunta cerrada</label>
						</li>
						<li class="dropMenuElem typeC" dataCT="4">
							<label class="lblDropM">Pregunta abierta</label>
						</li>	
					</ul>
				</div>
			</div>
			<div id="saveChanges">
				<button id="saveChangesBtn">Guardar Cambios</button>
			</div>
		</div>
		<div class="maincontainer" id="maincontainer">

			<div id="tableInstrumentHead">
			</div>

			<div id="submaincontainer">
				<div id="rowsContainer">
								
					<!--  For Options
						countCharPregOpc -> 11 (numpreg, numopc)
						opcPregTxtArea -> 11 (numpreg, numopc)
					-->

				</div>
			</div>

		</div>
	</div>
</body>

<script type="text/javascript" src="../../source/resources/jquery-3.2.1.min.js"></script>
<script type="text/javascript" src="../../source/resources/jquery-ui-1.12.1/jquery-ui.min.js"></script>	

<script type="text/javascript" src="../../source/js/appGeneral.js"></script>
<script type="text/javascript" src="../../source/js/appBuildInstrumento.js"></script>

<script type="text/javascript" src="../../source/js/appBuildLC.js"></script>
<script type="text/javascript" src="../../source/js/appBuildGO.js"></script>
<script type="text/javascript" src="../../source/js/appBuildC.js"></script>

<script type="text/javascript" src="../../source/resources/font-awesome/js/fontawesome-all.min.js"></script>
</html>