<?php
    class tiposusuariosModel {
        
        private $Id_TipoUsuario;
        private $Tipo_Usuario;

        public function __construct() {}

        public function setId_TipoUsuario ($Id_TipoUsuario) {
            $this->Id_TipoUsuario = $Id_TipoUsuario;
        }
        public function setTipoUsuario ($TipoUsuario) {
            $this->TipoUsuario = $TipoUsuario;
        }

        public function getId_TipoUsuario () {
            return $this->Id_TipoUsuario;
        }
        public function getTipoUsuario () {
            return $this->TipoUsuario;
        }

    }
    
?>