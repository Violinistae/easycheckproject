<html>
<head>
	<title>Easy Check - Página Principal</title>
	<meta charset="utf-8">
	<meta name="viewport" content="width=device-width, initial-scale=1">
		
	<link rel="stylesheet" type="text/css" href="../../source/css/styleMain.css">
	<link rel="stylesheet" type="text/css" href="../../source/css/styleModals.css">
	<link rel="stylesheet" type="text/css" href="../../source/css/styleInstrumentsContainer.css">
	<link rel="shortcut icon" href="../../source/img/easycheckico.png" type="image/x-icon">	

	<script type="text/javascript" src="../../source/resources/jquery-3.2.1.min.js"></script>
	<script type="text/javascript" src="../../source/resources/xlsx.full.min.js"></script>
	<script type="text/javascript" src="../../source/js/appExcelToJSON.js"></script>

	<script type="text/javascript" src="../../source/js/appLoadPageAJAX.js"></script>
	<script type="text/javascript" src="../../source/js/appGeneral.js"></script>	
	<script type="text/javascript" src="../../source/js/appMain.js"></script>
	<script type="text/javascript" src="../../source/js/appOnlyStyles.js"></script>	
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
		<div class="mainnavbar" id="mainnavbar">
		</div>
		<div class="groupsbar" id="groupsbar">
		</div>
		<div class="maincontainer" id="maincontainer">
			<div id="submaincontainer"></div>
		</div>
	</div>

	<div id="hiddenContent">
	</div>

	<ul class="contextCostumMenu">
	</ul>

</body>
</html>