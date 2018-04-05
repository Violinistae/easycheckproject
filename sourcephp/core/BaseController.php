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
	    public $pdo;
	    public $result;
	    public $view;

	    public function __construct($pdo)
	    {
	        $this->pdo = $pdo;
	    }

	    public function getCon()
	    {
	    	return $this->pdo;
		}
		
		public function executeSQL($consulta){
            $result = $this->pdo->query($consulta);
            return $result;
		}
	}
?>