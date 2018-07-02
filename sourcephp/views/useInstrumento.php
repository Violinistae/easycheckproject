<?php
	if (session_status() == PHP_SESSION_NONE) {
		session_start();
	}
	 
	if (isset($_SESSION["userreg"]) && isset($_SESSION["usertype"])) {
		
	} else {
		header("location: ../../sourcephp/views/main.php");
	}
?>
<html>
<head>
	<title>Easy Check - Utilizar Instrumento</title>
	<meta charset="utf-8">
	<meta name="viewport" content="width=device-width, initial-scale=1">

	<link rel="shortcut icon" href="../../source/img/easycheckico.png" type="image/x-icon">	

    <link rel="stylesheet" type="text/css" href="../../source/css/styleUseInstrument.css">
	<link rel="stylesheet" type="text/css" href="../../source/css/styleUseR.css">
	<link rel="stylesheet" type="text/css" href="../../source/css/styleUseLC.css">
	<link rel="stylesheet" type="text/css" href="../../source/css/styleUseGO.css">
	<link rel="stylesheet" type="text/css" href="../../source/css/styleUseC.css">
	
</head>
<body>

	<div class="allcontainer">
		<div class="toolsBar" id="toolsBar">
			<div id="creatingLbl">
				<label id="typeInstrumento">Instrumento de Evaluación - </label>
				<label id="claveNombreInstr"></label>
			</div>
			<div id="selectAlumnoForEval">
				<select name="selectAlumnEval" id="selectAlumnEval">
                    <option value="null" selected>- Seleccione un alumno -</option>
                </select>
			</div>
            <div id="infoAlumnoEval">
				<div id="appsAlumDiv">
                    <p id="appsAlumForEval">APELLIDOS: Seleccione un alumno</p>
                </div>
                <div id="nombsAlumDiv">
                    <p id="nombsAlumForEval">NOMBRE(S): Seleccione un alumno</p>
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
					
				</div>
			</div>

		</div>
	</div>

</body>

<script type="text/javascript" src="../../source/resources/jquery-3.2.1.min.js"></script>
<script type="text/javascript" src="../../source/resources/jquery-ui-1.12.1/jquery-ui.min.js"></script>	

<script type="text/javascript" src="../../source/js/appGeneral.js"></script>
<script type="text/javascript" src="../../source/js/appUseInstAJAX.js"></script>
<script type="text/javascript" src="../../source/js/appUseInstrumento.js"></script>

<script type="text/javascript" src="../../source/js/appUseR.js"></script>
<script type="text/javascript" src="../../source/js/appUseLC.js"></script>
<script type="text/javascript" src="../../source/js/appUseGO.js"></script>
<script type="text/javascript" src="../../source/js/appUseC.js"></script>

<script type="text/javascript" src="../../source/resources/font-awesome/js/fontawesome-all.min.js"></script>
</html>