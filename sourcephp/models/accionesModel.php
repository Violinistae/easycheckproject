<?php
	class accionesModel {
		
		private $Id_Acciones;
		private $Controlador;
		private $Metodo;

		public function __construct () {}

		public function setId_Acciones ($Id_Acciones) {
			$this->Id_Acciones = $Id_Acciones;
		}
		public function setControlador ($Controlador) {
			$this->Controlador = $Controlador;
		}
		public function setMetodo ($Metodo) {
			$this->Metodo = $Metodo;
		}

		public function getId_Acciones () {
			return $this->Id_Acciones;
		}
		public function getControlador () {
			return $this->Controlador;
		}
		public function getMetodo () {
			return $this->Metodo;
		}
	}
?>