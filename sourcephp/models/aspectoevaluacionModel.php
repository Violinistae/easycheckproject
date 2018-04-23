<?php
    class aspectoevaluacionModel {
        
        private $Id_Aspecto;
        private $Descripcion;
        
        public function __construct() {}

        public function setId_Aspecto ($Id_Aspecto) {
            $this->Id_Aspecto = $Id_Aspecto;
        }
        public function setDescripcion ($Descripcion) {
            $this->Descripcion = $Descripcion;
        }

        public function getId_Aspecto () {
            return $this->Id_Aspecto;
        }
        public function getDescripcion () {
            return $this->Descripcion;
        }
    }
    
?>