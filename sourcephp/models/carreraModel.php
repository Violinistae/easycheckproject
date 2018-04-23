<?php
    class carreraModel {
        
        private $Id_Carrera;
        private $Carrera;

        public function __construct() {}

        public function setId_Carrera ($Id_Carrera) {
            $this->Id_Carrera = $Id_Carrera;
        }
        public function setCarrera ($Carrera) {
            $this->Carrera = $Carrera;
        }

        public function getId_Carrera () {
            return $this->Id_Carrera;
        }
        public function getCarrera () {
            return $this->Carrera;
        }
    }
    
?>