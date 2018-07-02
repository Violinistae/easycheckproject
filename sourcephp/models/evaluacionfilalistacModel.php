<?php
    class evaluacionfilalistacModel {
        private $Id_EvFilaListaCot;
        private $FilaListaCotejo;
        private $Evaluado;
        private $Evaluador;
        private $Cumplimiento;

        /**
         * Get the value of Id_EvFilaListaCot
         */ 
        public function getId_EvFilaListaCot()
        {
                return $this->Id_EvFilaListaCot;
        }

        /**
         * Set the value of Id_EvFilaListaCot
         *
         * @return  self
         */ 
        public function setId_EvFilaListaCot($Id_EvFilaListaCot)
        {
                $this->Id_EvFilaListaCot = $Id_EvFilaListaCot;

                return $this;
        }

        /**
         * Get the value of FilaListaCotejo
         */ 
        public function getFilaListaCotejo()
        {
                return $this->FilaListaCotejo;
        }

        /**
         * Set the value of FilaListaCotejo
         *
         * @return  self
         */ 
        public function setFilaListaCotejo($FilaListaCotejo)
        {
                $this->FilaListaCotejo = $FilaListaCotejo;

                return $this;
        }

        /**
         * Get the value of Evaluado
         */ 
        public function getEvaluado()
        {
                return $this->Evaluado;
        }

        /**
         * Set the value of Evaluado
         *
         * @return  self
         */ 
        public function setEvaluado($Evaluado)
        {
                $this->Evaluado = $Evaluado;

                return $this;
        }

        /**
         * Get the value of Evaluador
         */ 
        public function getEvaluador()
        {
                return $this->Evaluador;
        }

        /**
         * Set the value of Evaluador
         *
         * @return  self
         */ 
        public function setEvaluador($Evaluador)
        {
                $this->Evaluador = $Evaluador;

                return $this;
        }

        /**
         * Get the value of Cumplimiento
         */ 
        public function getCumplimiento()
        {
                return $this->Cumplimiento;
        }

        /**
         * Set the value of Cumplimiento
         *
         * @return  self
         */ 
        public function setCumplimiento($Cumplimiento)
        {
                $this->Cumplimiento = $Cumplimiento;

                return $this;
        }
    }
?>