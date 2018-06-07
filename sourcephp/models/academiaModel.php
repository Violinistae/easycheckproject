<?php
    class academiaModel {
        
        private $Id_Academia;
        private $Academia;
        private $Clave_Acceso;
        private $Ciclo_Periodo;
        private $Lista_Prof;
        private $Coordinador_Acad;
        private $Carrera;
        
        public function __construct() {}

        public function setId_Academia ($Id_Academia) {
            $this->Id_Academia = $Id_Academia;
        }
        public function setAcademia ($Academia) {
            $this->Academia = $Academia;
        }
        public function setClave_Acceso ($Clave_Acceso) {
            $this->Clave_Acceso = $Clave_Acceso;
        }
        public function setCiclo_Periodo ($Ciclo_Periodo) {
            $this->Ciclo_Periodo = $Ciclo_Periodo;
        }
        public function setLista_Prof ($Lista_Prof) {
            $this->Lista_Prof = $Lista_Prof;
        }
        public function setCoordinador_Acad ($Coordinador_Acad) {
            $this->Coordinador_Acad = $Coordinador_Acad;
        }
        public function setCarrera ($Carrera) {
            $this->Carrera = $Carrera;
        }

        public function getId_Academia (){
            return $this->Id_Academia;
        }
        public function getAcademia () {
            return $this->Academia;
        }
        public function getClave_Acceso () {
            return $this->Clave_Acceso;
        }
        public function getCiclo_Periodo () {
            return $this->Ciclo_Periodo;
        }
        public function getLista_Prof () {
            return $this->Lista_Prof;
        }
        public function getCoordinador_Acad () {
            return $this->Coordinador_Acad;
        }
        public function getCarrera () {
            return $this->Carrera;
        }


    }
    
?>