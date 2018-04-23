<?php
    class evaluacionfilaguiaobsModel {
        private $Id_EvFilaGuiaObs;
        private $Evaluador;
        private $Evaluado;
        private $FilaGuiaObs;
        private $Cumplimiento;
        private $Puntaje;
        
        public function __construct () {}

        public function setId_EvFilaguiaObs ($Id_EvFilaGuiaObs) {
            $this->Id_EvFilaGuiaObs = $Id_EvFilaGuiaObs;
        }
        public function setEvaluador ($Evaluador) {
            $this->Evaluador = $Evaluador;
        }
        public function setEvaluado ($Evaluado) {
            $this->Evaluado = $Evaluado;
        }
        public function setFilaGuiaObs ($FilaGuiaObs) {
            $this->FilaGuiaObs = $FilaGuiaObs;
        }
        public function setCumplimiento ($Cumplimiento) {
            $this->Cumplimiento = $Cumplimiento;
        }
        public function setPuntaje ($Puntaje) {
            $this->Puntaje = $Puntaje;
        }

        public function getId_EvFilaguiaObs () {
            return $this->Id_EvFilaGuiaObs;
        }
        public function getEvaluador () {
            return $this->Evaluador;
        }
        public function getEvaluado () {
            return $this->Evaluado;
        }
        public function getFilaGuiaObs () {
            return $this->FilaGuiaObs;
        }
        public function getCumplimiento () {
            return $this->Cumplimiento;
        }
        public function getPuntaje () {
            return $this->Puntaje;
        }

    }
    
?>