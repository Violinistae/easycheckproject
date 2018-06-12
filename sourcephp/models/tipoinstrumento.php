<?php
    class tipoinstrumentoModel {
        private $Id_TipoInstr;
        private $TipoInstrumento;

        function setId_TipoInstr ($Id_TipoInstr) {
            $this->Id_TipoInstr = $Id_TipoInstr;
        }
        function setTipoInstrumento ($TipoInstrumento) {
            $this->TipoInstrumento = $TipoInstrumento;
        }

        function getId_TipoInstr () {
            return $this->Id_TipoInstr;
        }
        function getInstrumento () {
            return $this->TipoInstrumento;
        }

    }
    
?>