<?php

	require_once('./sourcephp/config/Security.php');
	require_once('./sourcephp/requires.php');

	$conexion = new Connection();
	$con = $conexion->pdo;


	$security = new Security($con);
	$controller = $security->controller;
	$action = $security->action;

	$masterController = false;

	if($con && $controller && $action)
	{
		$validate = new ActionsController($con);
		$flagtocontinue = $validate->validation($controller, $action);

		if($flagtocontinue)
		{
			$controller = str_replace("'","", $controller);
			$action = str_replace("'","", $action);

			$nameController = $controller.'Controller';
			$masterController = new $nameController($con);
			$masterController->$action();			//Se realiza el método que contenga la variable $action
			$masterController->view = './sourcephp/views/'.$controller.'/'.$action.'.php';
			//Continuar con login y verificar para usuario una vez que entre
		}
	}
?>
<html>
<head>
	<title>Easy Check - Evalúa mejor</title>
	<meta charset="utf-8">
	<link rel="stylesheet" type="text/css" href="./source/css/styleLoginResponsive.css">
	<link rel="stylesheet" type="text/css" href="./source/css/styleModalRegistroGral.css">
	<link rel="shortcut icon" href="./source/img/easycheckico.png" type="image/x-icon">
	<link href="https://fonts.googleapis.com/css?family=Noto+Sans" rel="stylesheet">
	<script type="text/javascript" src="./source/js/jquery-3.2.1.min.js"></script>
	<script type="text/javascript" src="./source/js/appgeneral.js"></script>
	<script type="text/javascript" src="./source/js/applogin.js"></script>
</head>	
<body>
	<div id="login">
		<?php 
			//Verificar que cuenta es y poner barra de navegación
			if (!$masterController)
			{
				include("sourcephp/views/Users/login.php");
			}	
		 ?>
	</div>
	<div class="modalreg" id="mymodalreg">
		<div id="modalregitems"></div>
	</div>
</body>
</html>