<?php
	/**
	 * summary
	 */
	class BaseController
	{
	    /**
	     * summary
	     */
	    private $table;
	    private $db;
	    public $con;
	    public $result;
	    public $view;

	    public function __construct($con)
	    {
	        $this->con = $con;
	    }

	    public function getCon()
	    {
	    	return $this->con;
	    }

	    public function getDB()
	    {
	    	return $this->db;
	    }

	    /**
	    *	@param $column   Columna que se filtrará en la BD 
	    *	@param $value    Valor que se buscará en la BD
	    * 	@return $dataset   Retorna un arreglo con todos los registros coincidientes
	    */
	   	public function readBy($column, $value)
	    {
	    	$query = $this->db->query("SELECT * FROM $this->table WHERE $column = '$value'");
	    	while($row = $query->fetch_object())
	    		$dataSet[] = $row;

	    	return $dataSet;
	    }

	    /**
	     * @param $column    Columna que se filtrará en la BD
	     * @param $value     Valor que se buscará en la BD
	     * @return   $query    La consilta fue exitosa --> true; No exitosa --> false;
	     */
	    public function deleteBy($column, $value)
	    {
	    	$query = $this->db->query("DELETE FROM $this->table WHERE $column=''$value");
	    	return $query;
	    }
	}
?>