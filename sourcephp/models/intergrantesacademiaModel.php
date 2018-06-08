<?php
    class integrantesacademiaModel {
        private $Id_IntegAcad;
        private $Academia;
        private $Integrante;

        public function setId_IntegAcad ($Id_IntegAcad) {
            $this->Id_IntegAcad = $Id_IntegAcad;
        }
        public function setAcademia ($Academia) {
            $this->Academia = $Academia;
        }
        public function setIntegrante ($Integrante) {
            $this->Integrante = $Integrante;
        }

        public function getId_IntegAcad () {
            return $this->Id_IntegAcad;
        }
        public function getAcademia () {
            return $this->Academia;
        }
        public function getIntegrante () {
            return $this->Integrante;
        }

    }
?>