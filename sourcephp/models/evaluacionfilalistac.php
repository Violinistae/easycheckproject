<?php
    class evaluacionfilalistac {
        private $Id_EvFilaListaCot;
        private $FilaListaCot;
        private $Evaluado;
        private $Evaluador;
        private $Cumplimiento;
        
        public function __construct () {}

        public function setId_EvFilaListaCot ($Id_EvFilaListaCot) {
            $this->Id_EvFilaListaCot = $Id_EvFilaListaCot;
        }
        public function setFilaListaCot ($FilaListaCot) {
            $this->FilaListaCot = $FilaListaCot;
        }
        public function setEvaluado ($Evaluado) {
            $this->Evaluado = $Evaluado;
        }
        public function setEvaluador ($Evaluador) {
            $this->Evaluador = $Evaluador;
        }
        public function setCumplimiento ($Cumplimiento) {
            $this->Cumplimiento = $Cumplimiento;
        }

        public function getId_EvFilaListaCot () {
            return $this->Id_EvFilaListaCot;
        }
        public function getFilaListaCot () {
            return $this->FilaListaCot;
        }
        public function getEvaluado () {
            return $this->Evaluado;
        }
        public function getEvaluador () {
            return $this->Evaluador;
        }
        public function getCumplimiento () {
            return $this->Cumplimiento;
        }

    }
?>