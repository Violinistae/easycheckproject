<?php
	class accionesController extends BaseController {
	    public function validation($controller, $action) {
	    	$toexe = "SELECT * FROM acciones WHERE Controlador = $controller AND Metodo = $action";
			$result = $this->executeSQL($toexe);
	    	$nrows = (int)$result->rowCount();

	    	if($nrows == 1)
	    		return true;
	    	else
	    		return false;
	    }
	}
?>