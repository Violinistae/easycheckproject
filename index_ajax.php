<?php 
	require_once('sourcephp/config/Security.php');
	require_once('sourcephp/requires.php');


	$connection = new Connection();
	$connection->select_db();
	$con = $connection->con;

	$security = new Security($con);
	$controller = $security->controller;
	$action = $security->action;

	$masterController = false;

	if($con){
		$validate = new ActionsModel($con);

		//Validación de que la acción a realizar si es válida
		//Valida con tabla de BD
		$continue = $validate->validation($controller, $action);
		if($continue){
			$name_controller = $controller.'Controller';
			$masterController = new $name_controller($con);
			$masterController->$action();
			//$masterController->view = './views/'.$controller.'/'.$action.'.php';
		}
	}
?>