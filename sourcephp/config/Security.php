<?php 
    
    class Security {

        public $username;
        public $controller;
        public $action;
        public $con;

        public function __construct($con)
        {

            /** 
             * Recibimos Conexión 
             */
            $this->con = $con;

            /** 
             * Verificamos si recibimos un controlador 
             */
            if(isset($_GET["controller"]))
            {
                $this->controller = mysqli_real_escape_string($this->con, $_GET["controller"]);

            }
            else
            {
                $this->controller = false;
            }

            /**
             * Verificamos si recibimos un metodo
             */
            if(isset($_GET["action"]))
            {
                $this->action = mysqli_real_escape_string($this->con, $_GET["action"]);
            }
            else
            {
                $this->action = false;
            }

            /** 
             * Verificamos si ya existe un usuario logueado 
             */
            if(isset($_SESSION["username"]))
            {
                $this->username = $_SESSION["username"];
            }
            else
            {
                $this->username = false;
            }            
        }

        public function getController()
        {
            return $this->controller;
        }

        public function getAction()
        {
            return $this->action;
        }

        /**
         * NOTAS: mysqli_real_escape_string sirve para evitar inyeccion sql en la base de datos del sistema.
         */
    }

?>