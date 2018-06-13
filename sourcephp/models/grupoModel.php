<?php
    class grupoModel {
        private $Id_Grupo;
        private $Grupo;

        /**
         * Get the value of Id_Grupo
         */ 
        public function getId_Grupo()
        {
                return $this->Id_Grupo;
        }

        /**
         * Set the value of Id_Grupo
         *
         * @return  self
         */ 
        public function setId_Grupo($Id_Grupo)
        {
                $this->Id_Grupo = $Id_Grupo;

                return $this;
        }

        /**
         * Get the value of Grupo
         */ 
        public function getGrupo()
        {
                return $this->Grupo;
        }

        /**
         * Set the value of Grupo
         *
         * @return  self
         */ 
        public function setGrupo($Grupo)
        {
                $this->Grupo = $Grupo;

                return $this;
        }
    }
?>