<?php
    class usuarioModel {
        
        private $Registro_U;
        private $Nombres;
        private $Apellidos;
        private $Email;
        private $Password;
        private $Escolaridad;
        private $Tipo_Usuario;
        private $Foto;
        private $Hash;

        public function __Construct() {}

        public function setRegistro_U($Registro_U) {
            $this->Registro_U = $Registro_U;
        }
        public function setNombres($Nombres){
            $this->Nombres = $Nombres;
        }
        public function setApellidos($Apellidos) {
            $this->Apellidos = $Apellidos;
        }
        public function setEmail($Email) {
            $this->Email = $Email;
        }
        public function setPassword($Password) {
            $this->Password = $Password;
        }
        public function setEscolaridad($Escolaridad) {
            $this->Escolaridad -> $Escolaridad;
        }
        public function setTipo_Usuario($Tipo_Usuario) {
            $this->Tipo_Usuario = $Tipo_Usuario;
        }
        public function setFoto($Foto) {
            $this->Foto = $Foto;
        }
        public function setHash($Hash) {
            $this->Hash = $Hash;
        }

        public function getRegistro_U() {
            return $this->Registro_U;
        }
        public function getNombres() {
            return $this->Nombres;
        }
        public function getApellidos() {
            return $this->Apellidos;
        }
        public function getEmail() {
            return $this->Email;
        }
        public function getPassword() {
            return $this->Password;
        }
        public function getEscolaridad() {
            return $this->Escolaridad;
        }
        public function getTipo_Usuario() {
            return $this->Tipo_Usuario;
        }
        public function getFoto() {
            return $this->Foto;
        }
        public function getHash() {
            return $this->Hash;
        }

    }
?>