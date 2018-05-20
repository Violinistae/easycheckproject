<?php
    class materiaModel {
        
        private $Id_Materia;
        private $Materia;
        private $Semestre;
        private $Valores_Parciales;
        private $Academia;

        public function __construct () {}
        
        public function setId_Materia ($Id_Materia) {
            $this->Id_Materia = $Id_Materia;
        }
        public function setMateria ($Materia) {
            $this->Materia = $Materia;
        }
        public function setSemestre ($Semestre) {
            $this->Semestre = $Semestre;
        }
        public function setValores_Parciales ($Valores_Parciales) {
            $this->Valores_Parciales = $Valores_Parciales;
        }
        public function setAcademia ($Academia) {
            $this->Academia = $Academia;
        }

        public function getId_Materia () {
            return $this->Id_Materia;
        }
        public function getMateria () {
            return $this->Materia;
        }
        public function getSemestre () {
            return $this->Semestre;
        }
        public function getValores_Parciales () {
            return $this->Valores_Parciales;
        }
        public function getAcademia () {
            return $this->Academia;
        }
    }
    
?>