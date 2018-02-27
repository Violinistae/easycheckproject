<?php
	/**
	 * 
	 */
	class BaseModel
	{
	    /**
	     * 
	     */
	    private $table;
	   	private $con;
	    public function __construct($con)
	    {
	        $this->con = $con;
	    }
	    public function executeSQL($query)
	    {
			$qresult = $this->con->query($query);
			return $result;
	    }
	}
?>