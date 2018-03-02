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
	    private $user, $host, $password, $database, $charset;
	    private $con;

	    public function __construct()
	    {
	    	$db_conf = dbdata();
	    	$this->driver = $db_conf["driver"];
            $this->host = $db_conf["host"];
            $this->user = $db_conf["user"];
            $this->password = $db_conf["password"];
            $this->database = $db_conf["database"];
            //$this->charset = $db_conf["charset"];
            $this->con = mysqli_connect($this->host, $this->user, $this->password);
            mysqli_set_charset($this->con, $this->charset);
	    }

	    public function select_db()
	    {
	    	$sql = "use ".$this->database;
	    	$this->con->query($sql);
	    	if($this->con->error)
	    	{
	    		echo $this->con->error;
	    		return false;
	    	}
	    	else
	    		return true;
	    }

		public function getCon()
		{
			return $this->con;
		}	  
		public function setCon()
		{
			return $this->con;
		}	  
	}
?>