<?php
    class instrumentoModel {
        private $Id_Instrumento;
        private $Creador;
        private $TipoInstrumento;
        private $TipoEvaluacion;
        private $ClaveElem;
        private $NombElemento;
        private $InstruccLlenado;
        private $Materia;

        public function __construct() {}

        public function setId_Instrumento ($Id_Instrumento) {
            $this->Id_Instrumento = $Id_Instrumento;
        }
        public function setCreador ($Creador) {
            $this->Creador = $Creador;
        }
        public function setTipoInstrumento ($TipoInstrumento) {
            $this->TipoInstrumento = $TipoInstrumento;
        }
        public function setTipoEvaluacion ($TipoEvaluacion) {
            $this->TipoEvaluacion = $TipoEvaluacion;
        }
        public function setClaveElem($ClaveElem) {
            $this->ClaveElem = $ClaveElem;
        }
        public function setNombElemento ($NombElemento) {
            $this->NombElemento = $NombElemento;
        }
        public function setInstruccLlenado ($InstruccLlenado) {
            $this->InstruccLlenado = $InstruccLlenado;
        }
        public function setMateria ($Materia) {
            $this->Materia = $Materia;
        }

        public function getId_Instrumento () {
            return $this->Id_Instrumento;
        }
        public function getCreador () {
            return $this->Creador;
        }
        public function getTipoInstrumento () {
            return $this->TipoInstrumento;
        }
        public function getTipoEvaluacion () {
            return $this->TipoEvaluacion;
        }
        public function getClaveElem() {
            return $this->ClaveElem;
        }
        public function getNombElemento () {
            return $this->NombElemento;
        }
        public function getInstruccLlenado () {
            return $this->InstruccLlenado;
        }
        public function getMateria () {
            return $this->Materia;
        }


    }
?>