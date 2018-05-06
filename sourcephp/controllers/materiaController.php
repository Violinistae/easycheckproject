<?php
    class materiaController extends BaseController {
	    public function insertMateria () {

            $academiaController = new academiaController($this->pdo);

            $acad = new academiaModel();
            $acad =  $academiaController->getAcademiaByCoordinador();

            if ($acad != null) {
                $nombMateria = $_POST["nombreMateria"];
                $semestre = $_POST["semestre"];
                $valoresparcialesname = $_POST["valoresparciales"];

                $insertAcadStr = $this->pdo->prepare(
                    "INSERT INTO materia (
                            Materia,
                            Semestre,
                            Valores_Parciales,
                            Academia                  
                        ) values (
                            ?, 
                            ?,
                            ?,
                            ?
                        )"
                );

                $insertAcadStr->execute(array(
                    $nombMateria, 
                    $semestre,
                    $valoresparcialesname, 
                    $acad->getId_Academia()     
                ));

                $insertMatRows = $insertAcadStr->rowCount();
                
                if ($insertMatRows == 1) {
                    echo json_encode(array('error' => false, 'message' => "Materia creada exitosamente"));
                } else {
                    echo json_encode(array('error' => true, 'message' => $insertAcadStr->errorInfo()));//"No se pudo crear la materia, inténtelo más tarde"));
                }
            } else {
                echo json_encode(array('error' => true, 'message' => "No se pudo crear la materia, inténtelo más tarde"));
            }            
        }
	}
?>