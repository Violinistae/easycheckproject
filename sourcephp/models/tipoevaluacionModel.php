<?php
    class tipoevaluacionModel {
        private $Id_TipoEv;
        private $TipoEvaluacion;

        public function __construct() {}

        public function setId_TipoEv($Id_TipoEv) {
            $this->Id_TipoEv = $Id_TipoEv;
        }
        public function setTipoEvaluacion($TipoEvaluacion) {
            $this->TipoEvaluacion = $TipoEvaluacion;
        }

        public function getId_TipoEv() {
            return $this->Id_TipoEv;
        }
        public function getTipoEvaluacion() {
            return $this->TipoEvaluacion;
        }
    }
?>