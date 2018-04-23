<?php
    class criteriosfilarubricaModel {
        
        private $Id_CriterioFilaR;
        private $FilaRubrica;
        private $Identificador;
        private $DescripcionIdent;
        private $ValorIdent;
        
        public function __construct() {}

        public function setId_CriterioFilaR ($Id_CriterioFilaR) {
            $this->Id_CriterioFilaR = $Id_CriterioFilaR;
        }
        public function setFilaRubrica ($FilaRubrica) {
            $this->FilaRubrica = $FilaRubrica;
        }
        public function setIdentificador ($Identificador) {
            $this->Identificador = $Identificador;
        }
        public function setDescripcionIdent ($DescripcionIdent) {
            $this->DescripcionIdent = $DescripcionIdent;
        }
        public function setValorIdent ($ValorIdent) {
            $this->ValorIdent = $ValorIdent;
        }

        public function getId_CriterioFilaR () {
            return $this->Id_CriterioFilaR;
        }
        public function getFilaRubrica () {
            return $this->FilaRubrica;
        }
        public function getIdentificador () {
            return $this->Identificador;
        }
        public function getDescripcionIdent () {
            return $this->DescripcionIdent;
        }
        public function getValorIdent () {
            return $this->ValorIdent;
        }
    }
    
?>