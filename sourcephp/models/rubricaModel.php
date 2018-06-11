<?php
    class rubricaModel {
        private $Id_FilaRubrica;
        private $Instrumento;
        private $AspectoEv;
        private $NumElemento;
        private $Descripcion;
        private $NumCriterios;
        
        public function __construct() {}

        public function setId_FilaRubrica ($Id_FilaRubrica) {
            $this->Id_FilaRubrica = $Id_FilaRubrica;
        }
        public function setInstrumento ($Instrumento) {
            $this->Instrumento = $Instrumento;
        }
        public function setAspectoEv ($AspectoEv) {
            $this->AspectoEv = $AspectoEv;
        }
        public function setNumElemento ($NumElemento) {
            $this->NumElemento = $NumElemento;
        }
        public function setDescripcion ($Descripcion) {
            $this->Descripcion = $Descripcion;
        }
        public function setNumCriterios ($NumCriterios) {
            $this->NumCriterios = $NumCriterios;
        }

        public function getId_FilaRubrica () {
            return $this->Id_FilaRubrica;
        }
        public function getInstrumento () {
            return $this->Instrumento;
        }
        public function getFilaRubrica () {
            return $this->FilaRubrica;
        }
        public function getAspectoEv () {
            return $this->AspectoEv;
        }
        public function getNumElemento () {
            return $this->NumElemento;
        }
        public function getDescripcion () {
            return $this->Descripcion;
        }
        public function getNumCriterios () {
            return $this->NumCriterios;
        }
    }
    
?>