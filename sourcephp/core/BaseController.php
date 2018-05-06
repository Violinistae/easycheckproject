<?php
	class BaseController
	{	    
		public $result;
		public $pdo;

	    public function __construct($pdo) {
	        $this->pdo = $pdo;
	    }

		//Este método no se utiliza ??
	    public function getCon() {
	    	return $this->pdo;
		}
		
		public function executeSQL($consulta) {
            $result = $this->pdo->query($consulta);
            return $result;
		}
	}
?>