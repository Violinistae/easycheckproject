<?php 
	require_once('sourcephp/config/Security.php');
	require_once('sourcephp/requires.php');


	$connection = new Connection();
	$connection->select_db();
	$con = $connection->getCon();

	$security = new Security($con);
	$controller = $security->getController();
	$action = $security->getAction();

	$masterController = false;

	if($con)
	{
		$validate = new ActionsModel($con);

		//Validación de que la acción a realizar si es válida
		//Valida con tabla acciones de BD
		$continue = $validate->validation($controller, $action);
		
		if($continue)
		{

			$name_controller = $controller.'Controller';
			$masterController = new $name_controller($con);
			$masterController->$action();			//Se realiza el método que contenga la variable $action
			$masterController->view = './views/'.$controller.'/'.$action.'.php';
		}
	}
?>