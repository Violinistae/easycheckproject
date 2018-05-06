<?php 
	require_once('sourcephp/config/Security.php');
	require_once('sourcephp/requires.php');
	
	$connection = new Connection();
	$con = $connection->pdo;

	$security = new Security($con);
	$controller = $security->controller;
	$action = $security->action;

	$masterController = false;

	if($con && $controller && $action)
	{
		
		$validate = new accionesController($con);
		$flagtocontinue = $validate->validation($controller, $action);
		
		if($flagtocontinue)
		{		
			
			$controller = str_replace("'","", $controller);
			$action = str_replace("'","", $action);

			//echo json_encode(array('action' => $action, 'controller' => $controller));

			$nameController = $controller.'Controller';	
			$masterController = new $nameController($con);
			$masterController->$action();					//Se realiza el método que contenga la variable $action
			
			$masterController->view = './sourcephp/views/'.$controller.'/'.$action.'.php';
			//Continuar con login y verificar para usuario una vez que entre
		}
	}
?>