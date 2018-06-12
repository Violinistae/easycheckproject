<?php
    class instrumentoscompartidosModel {
        private $Id_SharedInstr;
        private $Materia;
        private $Instrumento;
        private $Academia;

        public function setId_SharedInstr ($Id_SharedInstr) {
            $this->Id_SharedInstr = $Id_SharedInstr;
        }
        public function setMateria ($Materia) {
            $this->Materia = $Materia;
        }
        public function setInstrumento ($Instrumento) {
            $this->Instrumento = $Instrumento;
        }
        public function setAcademia ($Academia) {
            $this->Academia = $Academia;
        }

        public function getId_SharedInstr () {
            return $this->Id_SharedInstr;
        }
        public function getMateria () {
            return $this->Materia;
        }
        public function getInstrumento () {
            return $this->Instrumento;
        }
        public function getAcademia () {
            return $this->Academia;
        }
    }

?>