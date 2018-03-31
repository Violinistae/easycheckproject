<?php

class BaseModel {

	private $table;
	private $pdo;

	public function __construct($pdo){

		$this->pdo = $pdo;

	}

	public function executeSQL($consulta){
		$result = $this->pdo->prepare($consulta);
		$result->execute();
		return $result;
	}
	
}
?>