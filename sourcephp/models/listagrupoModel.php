<?php
    class listagrupoModel {
        private $Id_ListaGrupo;
        private $Alumno;
        private $GpoPeriodo;

        /**
         * Get the value of Id_ListaGrupo
         */ 
        public function getId_ListaGrupo()
        {
                return $this->Id_ListaGrupo;
        }

        /**
         * Set the value of Id_ListaGrupo
         *
         * @return  self
         */ 
        public function setId_ListaGrupo($Id_ListaGrupo)
        {
                $this->Id_ListaGrupo = $Id_ListaGrupo;

                return $this;
        }

        /**
         * Get the value of Alumno
         */ 
        public function getAlumno()
        {
                return $this->Alumno;
        }

        /**
         * Set the value of Alumno
         *
         * @return  self
         */ 
        public function setAlumno($Alumno)
        {
                $this->Alumno = $Alumno;

                return $this;
        }

        /**
         * Get the value of GpoPeriodo
         */ 
        public function getGpoPeriodo()
        {
                return $this->GpoPeriodo;
        }

        /**
         * Set the value of GpoPeriodo
         *
         * @return  self
         */ 
        public function setGpoPeriodo($GpoPeriodo)
        {
                $this->GpoPeriodo = $GpoPeriodo;

                return $this;
        }
    }
    
?>