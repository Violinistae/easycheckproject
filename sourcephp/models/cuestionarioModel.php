<?php
    class cuestionarioModel {
        private $Id_FilaCues;
        private $Instrumento;
        private $TipoPregunta;
        private $AspectoEv;

        public function __construct () {}

        public function setId_FilaCues ($Id_FilaCues) {
            $this->$Id_FilaCues = $Id_FilaCues;
        }
        public function setInstrumento ($Instrumento) {
            $this->$Instrumento = $Instrumento;
        }
        public function setTipoPregunta ($TipoPregunta) {
            $this->$TipoPregunta = $TipoPregunta;
        }
        public function setAspectoEv ($AspectoEv) {
            $this->$AspectoEv = $AspectoEv;
        }

        public function getId_FilaCues () {
            return $this->$Id_FilaCues;
        }
        public function getInstrumento () {
            return $this->$Instrumento;
        }
        public function getTipoPregunta () {
            return $this->$TipoPregunta;
        }
        public function getAspectoEv () {
            return $this->$AspectoEv;
        }

    }
    
?>