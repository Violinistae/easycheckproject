<?php
    class cuestionarioModel {
        private $Id_FilaCues;
        private $Instrumento;
        private $TipoPregunta;
        private $AspectoEv;
        private $NumPregunta;
        private $Pregunta;
        private $ResCorrecta;
        private $PonderacionPreg;

        public function __construct () {}

        public function setId_FilaCues ($Id_FilaCues) {
            $this->Id_FilaCues = $Id_FilaCues;
        }
        public function setInstrumento ($Instrumento) {
            $this->Instrumento = $Instrumento;
        }
        public function setTipoPregunta ($TipoPregunta) {
            $this->TipoPregunta = $TipoPregunta;
        }
        public function setAspectoEv ($AspectoEv) {
            $this->AspectoEv = $AspectoEv;
        }
        public function setNumPregunta ($NumPregunta) {
            $this->NumPregunta = $NumPregunta;
        }
        public function setPregunta($Pregunta) {
            $this->Pregunta = $Pregunta;
        }
        public function setResCorrecta($ResCorrecta) {
            $this->ResCorrecta = $ResCorrecta;
        }
        public function setPonderacionPreg($PonderacionPreg) {
            $this->PonderacionPreg = $PonderacionPreg;
        }

        public function getId_FilaCues () {
            return $this->Id_FilaCues;
        }
        public function getInstrumento () {
            return $this->Instrumento;
        }
        public function getTipoPregunta () {
            return $this->TipoPregunta;
        }
        public function getAspectoEv () {
            return $this->AspectoEv;
        }
        public function getNumPregunta () {
            return $this->NumPregunta;
        }
        public function getPregunta() {
            return $this->Pregunta;
        }
        public function getResCorrecta() {
            return $this->ResCorrecta;
        }
        public function getPonderacionPreg() {
            return $this->PonderacionPreg;
        }

    }
    
?>