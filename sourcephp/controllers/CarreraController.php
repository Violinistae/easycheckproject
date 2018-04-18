<?php
    class CarreraController extends BaseController
    {
        public function getCarreras()
        {
            $query = $this->pdo->prepare("SELECT * FROM carrera");
            $query->execute();
            $numcarreras = $query->rowCount();

            $i = 1;
            $c = array();
            $c[0] = '<option value="null"> - Seleccione una Carrera - </option>';
            while($carrera = $query->fetch()):
                $c[$i] = '<option value="'.$carrera->Id_Carrera.'">'.$carrera->Carrera.'</option>';
                $i++;
            endwhile;
            if($numcarreras > 0)
                echo json_encode(array('error' => false, 'carreras' => $c));
            else
                echo json_encode(array('error' => true, 'message' => "No hay carreras que mostrar"));
        }
    }    
?>