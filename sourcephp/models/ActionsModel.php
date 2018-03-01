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
	    	$toexe = "SELECT * FROM acciones WHERE acciones.controlador = '$controller' AND acciones.metodo = '$action'";
	    	$qresult = $this->executeSQL($toexe);
	    	$nrows = mysqli_num_rows($qresult);

	    	if($nrows == 1)
	    		return true;
	    	else
	    		return false;
	    }
	}
?>