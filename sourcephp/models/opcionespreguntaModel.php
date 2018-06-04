<?php
    class opcionespreguntaModel {
        private $Id_OpcionesP;
        private $NumOpcion;
        private $Opcion;
        private $Pregunta;

        public function __construct () {}

        public function setId_OpcionesP ($Id_OpcionesP) {
            $this->Id_OpcionesP = $Id_OpcionesP;
        }
        public function setNumOpcion ($NumOpcion) {
            $this->NumOpcion = $NumOpcion;
        }
        public function setOpcion ($Opcion) {
            $this->Opcion = $Opcion;
        }
        public function setPregunta ($Pregunta) {
            $this->Pregunta = $Pregunta;
        }

        public function getId_OpcionesP () {
            return $this->Id_OpcionesP;
        }
        public function getNumOpcion () {
            return $this->NumOpcion;
        }
        public function getOpcion () {
            return $this->Opcion;
        }
        public function getPregunta () {
            return $this->Pregunta;
        }
        
    }
    
?>