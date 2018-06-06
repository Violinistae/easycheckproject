<?php
    class guiadeobservacionModel {
        
        private $Id_FilaGuiadO;
        private $Instrumento;
        private $AspectoEv;
        private $NumElemento;
        private $AccionesEv;
        private $PonderacionElem;

        public function __construct() {}

        public function setId_FilaGuiadO ($Id_FilaGuiadO) {
            $this->Id_FilaGuiadO = $Id_FilaGuiadO;
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
        public function setAccionesEv ($AccionesEv) {
            $this->AccionesEv = $AccionesEv;
        }
        public function setPonderacionElem ($PonderacionElem) {
            $this->PonderacionElem = $PonderacionElem;
        }


        public function getId_FilaGuiadO () {
            return $this->Id_FilaGuiadO;
        }
        public function getInstrumento () {
            return $this->Instrumento;
        }
        public function getAspectoEv () {
            return $this->AspectoEv;
        }
        public function getNumElemento () {
            return $this->NumElemento;
        }
        public function getAccionesEv () {
            return $this->AccionesEv;
        }
        public function getPonderacionElem () {
            return $this->PonderacionElem;
        }
    }
    
?>