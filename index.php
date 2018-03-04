<!DOCTYPE html>
<html>
<head>
	<title>Easy Check - Evalúa mejor</title>
	<meta charset="utf-8">
	<link rel="stylesheet" type="text/css" href="./source/css/styleloginresponsive.css">
	<link rel="stylesheet" type="text/css" href="./source/css/stylemodalregistrogral.css">
	<script type="text/javascript" src="./source/js/jquery-3.2.1.min.js"></script>
	<script type="text/javascript" src="./source/js/ajaxpagesfunctions.js"></script>
</head>

<?php

	require_once('./sourcephp/config/Security.php');
	require_once('./sourcephp/requires.php');

	$conexion = new Connection();
	$conexion->select_db();
	$con = $conexion->getCon();


	$security = new Security($con);
	$controller = $security->getController();
	$action = $security->getAction();

	$masterController = false;

	if($con)
	{
		$validate = new ActionsModel($con);
		$flagtocontinue = $validate->validation($controller, $action);

		if($flagtocontinue)
		{
			$nameController = $controller.'Controller';
			$masterController = new $nameController($con);
			$masterController->$action();			//Se realiza el método que contenga la variable $action
			$masterController->view = './sourcephp/views/'.$controller.'/'.$action.'.php';
			//Continuar con login y verificar para usuario una vez que entre
		}
	}
?>

<body>
	<div id="login">
		<?php 
			//Verificar que cuenta es y poner barra de navegación
			if (!$masterController)
			{
				include("sourcephp/views/users/login.php");
			}
			else
			{
				//header("Location: ./sourcephp/views/Users/CheckUserType.php");
				echo "Cambiar";
			}		
		 ?>
	</div>
	<div class="modalreg" id="mymodalreg">
		<div id="modalregitems"></div>
	</div>
</body>
</html>