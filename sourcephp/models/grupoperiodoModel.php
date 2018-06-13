<?php
    class grupoperiodoModel {
        private $Id_GpoPeriodo;
        private $Materia;
        private $Grupo;
        private $Periodo;
        private $Profesor;
        private $Lista_Alumnos;
        private $Clave_Acceso;


        /**
         * Get the value of Id_GpoPeriodo
         */ 
        public function getId_GpoPeriodo()
        {
                return $this->Id_GpoPeriodo;
        }

        /**
         * Set the value of Id_GpoPeriodo
         *
         * @return  self
         */ 
        public function setId_GpoPeriodo($Id_GpoPeriodo)
        {
                $this->Id_GpoPeriodo = $Id_GpoPeriodo;                
        }

        /**
         * Get the value of Materia
         */ 
        public function getMateria()
        {
                return $this->Materia;
        }

        /**
         * Set the value of Materia
         *
         * @return  self
         */ 
        public function setMateria($Materia)
        {
                $this->Materia = $Materia;
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

        }

        /**
         * Get the value of Periodo
         */ 
        public function getPeriodo()
        {
                return $this->Periodo;
        }

        /**
         * Set the value of Periodo
         *
         * @return  self
         */ 
        public function setPeriodo($Periodo)
        {
                $this->Periodo = $Periodo;

        }

        /**
         * Get the value of Profesor
         */ 
        public function getProfesor()
        {
                return $this->Profesor;
        }

        /**
         * Set the value of Profesor
         *
         * @return  self
         */ 
        public function setProfesor($Profesor)
        {
                $this->Profesor = $Profesor;                
        }

        /**
         * Get the value of Lista_Alumnos
         */ 
        public function getLista_Alumnos()
        {
                return $this->Lista_Alumnos;
        }

        /**
         * Set the value of Lista_Alumnos
         *
         * @return  self
         */ 
        public function setLista_Alumnos($Lista_Alumnos)
        {
                $this->Lista_Alumnos = $Lista_Alumnos;

        }

        /**
         * Get the value of Clave_Acceso
         */ 
        public function getClave_Acceso()
        {
                return $this->Clave_Acceso;
        }

        /**
         * Set the value of Clave_Acceso
         *
         * @return  self
         */ 
        public function setClave_Acceso($Clave_Acceso)
        {
                $this->Clave_Acceso = $Clave_Acceso;                
        }
    }

?>