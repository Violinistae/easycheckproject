<?php
	/**
	 * 
	 */
	class BaseModel
	{
	    /**
	     * 
	     */
	    public $table;
	   	public $con;
	    public function __construct($con)
	    {
	        $this->con = $con;
	    }
	    public function executeSQL($query)
	    {
			$qresult = $this->con->query($query);
			return $qresult;
	    }
	}
?>