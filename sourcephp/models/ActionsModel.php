<?php
	/**
	 * summary
	 */
	class ActionsModel extends BaseModel
	{
	    /**
	     * Esta función verifica si de verdad existe una accion que le pertenezca
	     * al controlador para que la pueda realizar.
	     */
	    public function validation($controller, $action)
	    {
	    	$toexe = "SELECT * FROM acciones WHERE Controlador = '$controller' AND Metodo = '$action'";
	    	$qresult = $this->executeSQL($toexe);
	    	$nrows = (int)$qresult->rowCount();

	    	if($nrows == 1)
	    		return true;
	    	else
	    		return false;
	    }
	}
?>