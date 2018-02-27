<!DOCTYPE html>
<html>
<head>
	<title>Easy Check - Evalúa mejor</title>
	<meta charset="utf-8">
	<link rel="stylesheet" type="text/css" href="./source/css/styleloginresponsive.css">
	<link rel="stylesheet" type="text/css" href="./source/css/stylemodalregistrogral.css">
	<script type="text/javascript" src="./source/js/jquery-3.2.1.min.js"></script>
	<script type="text/javascript" src="./source/js/ajaxpagesfunctions.js"></script>
	<script type="text/javascript" src="./source/js/functionslogin.js"></script>
</head>

<?php
	require_once('sourcephp/config/Security.php');
	require_once('sourcephp/requires.php');

	$conexion = new Connection();
	$conexion->select_db();
	$con = $conexion->getCon();

	$security = new Security($con);
	$controller = $security->getController();
	$action = $security->getAction();


	/*
	if($con)
	{
		$validate = new ActionsModel($con);
		$flagtocontinue = $validate->validation($controller, $action);
		if($flagtocontinue)
		{
			$nameController = $controller.'Controller';
			$masterController = new $nameController($con);
			//Continuar con login y verificar para usuario una vez que entre
		}
	}
	*/
?>

<body>
	<div id="login">
		<?php 
			//Verificar que cuenta es y poner barra de navegación
			include("sourcephp/views/users/login.php");
		 ?>
	</div>
	<div class="modalreg" id="mymodalreg">
		<div id="modalregitems"></div>
	</div>
</body>
</html>