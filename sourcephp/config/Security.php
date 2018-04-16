<?php 
    
    class Security {

        private $userreg;
        public $controller;
        public $action;
        public $pdo;

        public function __construct($pdo)
        {

            /** 
             * Recibimos Conexión 
             */
            $this->pdo = $pdo;

            /** 
             * Verificamos si recibimos un controlador 
             */
            if(isset($_GET["controller"]))
                $this->controller = $this->pdo->quote($_GET["controller"]);
            else
                $this->controller = false;

            /**
             * Verificamos si recibimos un metodo
             */
            if(isset($_GET["action"]))
                $this->action = $this->pdo->quote($_GET["action"]);
            else
                $this->action = false;

            /** 
             * Verificamos si ya existe un usuario logeado 
             */
            if(isset($_SESSION["userreg"]))
                $this->username = $_SESSION["userreg"];
            else
                $this->username = false;        
        }
    }
?>