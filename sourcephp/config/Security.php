<?php 
    class Security {
        public $controller;
        public $action;
        public $pdo;

        public function __construct($pdo)
        {
            $this->pdo = $pdo;

            if(isset($_GET["controller"]))
                $this->controller = $this->pdo->quote($_GET["controller"]);
            else
                $this->controller = false;

            if(isset($_GET["action"]))
                $this->action = $this->pdo->quote($_GET["action"]);
            else
                $this->action = false;    
        }
    }
?>