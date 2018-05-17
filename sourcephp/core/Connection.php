<?php
	/**
	 * summary
	 */
	class Connection
	{
	    /**
	     * summary
	     */
		private $driver;
		private $user;
		private $host; 
		private $password; 
		private $database;
		private $charset;
	    public $pdo;

	    public function __construct()
	    {
	    	$db_conf = dbdata();
	    	$this->driver = $db_conf["driver"];
            $this->host = $db_conf["host"];
            $this->user = $db_conf["user"];
            $this->password = $db_conf["password"];
            $this->database = $db_conf["database"];
            $this->charset = $db_conf["charset"];           

            $dsn = 'mysql:host='.$this->host.';dbname='.$this->database.';charset='.$this->charset;            			 
			$this->pdo = new PDO($dsn, $this->user, $this->password);
            $this->pdo->setAttribute(PDO::ATTR_DEFAULT_FETCH_MODE, PDO::FETCH_OBJ);
	    }
	}
?>