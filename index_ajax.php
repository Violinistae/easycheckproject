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