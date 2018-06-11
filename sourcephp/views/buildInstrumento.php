<html>
<head>
	<title>Easy Check - Crear Instrumento</title>
	<meta charset="utf-8">
	<meta name="viewport" content="width=device-width, initial-scale=1">
		
	<link rel="stylesheet" type="text/css" href="../../source/css/styleModals.css">
	<link rel="stylesheet" type="text/css" href="../../source/css/styleBuildInstrument.css">

	<link rel="shortcut icon" href="../../source/img/easycheckico.png" type="image/x-icon">	

	<link rel="stylesheet" type="text/css" href="../../source/css/styleBuildR.css">
	<link rel="stylesheet" type="text/css" href="../../source/css/styleBuildLC.css">
	<link rel="stylesheet" type="text/css" href="../../source/css/styleBuildGO.css">
	<link rel="stylesheet" type="text/css" href="../../source/css/styleBuildC.css">
	
</head>
<body>

	<div class="allcontainer">
		<div class="toolsBar" id="toolsBar">
			<div id="creatingLbl">
				<label id="typeInstrumento">Instrumento de Evaluación - </label>
				<label id="claveNombreInstr"></label>
			</div>
			<div id="addElementsBtns">
				<i id="addRowBtn" class="fas fa-plus-square" title="Agregar fila a instrumento"></i>
				<div class="dropableMenu" id="questionTypeDropMenu">
					
				</div>
			</div>
			<div id="saveChanges">
				<button id="saveChangesBtn">Guardar Cambios</button>
			</div>
		</div>
		<div class="maincontainer" id="maincontainer">

			<div id="tableInstrumentHead">
				<div id="headRRow">
				</div>
			</div>

			<div id="submaincontainer">
				<div id="rowsContainer">
					
				</div>
			</div>

		</div>
	</div>

</body>

<script type="text/javascript" src="../../source/resources/jquery-3.2.1.min.js"></script>
<script type="text/javascript" src="../../source/resources/jquery-ui-1.12.1/jquery-ui.min.js"></script>	

<script type="text/javascript" src="../../source/js/appGeneral.js"></script>
<script type="text/javascript" src="../../source/js/appBuildInstAJAX.js"></script>
<script type="text/javascript" src="../../source/js/appBuildInstrumento.js"></script>

<script type="text/javascript" src="../../source/js/appBuildR.js"></script>
<script type="text/javascript" src="../../source/js/appBuildLC.js"></script>
<script type="text/javascript" src="../../source/js/appBuildGO.js"></script>
<script type="text/javascript" src="../../source/js/appBuildC.js"></script>

<script type="text/javascript" src="../../source/resources/font-awesome/js/fontawesome-all.min.js"></script>
</html>