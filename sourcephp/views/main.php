<html>
<head>
	<title>Easy Check - Página Principal</title>
	<meta charset="utf-8">
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<link rel="shortcut icon" href="../../source/img/easycheckico.png" type="image/x-icon">
	<link rel="stylesheet" type="text/css" href="../../source/css/stylemain.css">
	<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
	<script type="text/javascript" src="../../source/js/jquery-3.2.1.min.js"></script>
	<script type="text/javascript" src="../../source/js/appgeneral.js"></script>
	<script type="text/javascript" src="../../source/js/apponlystyles.js"></script>
	<script type="text/javascript" src="../../source/js/appmain.js"></script>
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
</body>
</html>