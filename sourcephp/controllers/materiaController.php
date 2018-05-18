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
                    echo json_encode(array('error' => true, 'message' => "No se pudo crear la materia, inténtelo más tarde"));
                }
            } else {
                echo json_encode(array('error' => true, 'message' => "No se pudo crear la materia, inténtelo más tarde"));                
            }            
        }

        public function readMateria () {

            $academiaController = new academiaController($this->pdo);

            $acad = new academiaModel();
            $acad =  $academiaController->getAcademiaByCoordinador();

            if ($acad != null) {

                $selectAcadStr = $this->pdo->prepare(
                    "SELECT * FROM materia where materia.academia = ? ORDER by materia.Id_Materia"
                );

                $selectAcadStr->execute(array(                    
                    $acad->getId_Academia()     
                ));

                $selectMatRows = $selectAcadStr->rowCount();
                
                if ($selectMatRows > 0) {

                    $i = 0;
                    $m = array();
                    while($Materia = $selectAcadStr->fetch(PDO::FETCH_ASSOC)):
                        

                        $mat = new materiaModel();
                        $mat->setId_Materia($Materia["Id_Materia"]);
                        $mat->setMateria($Materia["Materia"]);
                        $mat->setSemestre($Materia["Semestre"]);
                        $mat->setAcademia($Materia["Academia"]);

                        $matx = array(
                            'Id_Materia' => $mat->getId_Materia(), 
                            'Materia' => $mat->getMateria(), 
                            'Semestre' => $mat->getSemestre(), 
                            'Academia' => $mat->getAcademia() 
                        );

                        $m[] = $matx;
                        $i++;
                    endwhile;

                    echo json_encode(array('error' => false, 'materias' => $m, 'numMaterias' => $selectMatRows));
                } else {
                    echo json_encode(array('error' => true, 'message' => "No se pudo mostrar las materias creadas"));
                }
            } else {
                echo json_encode(array('error' => true, 'message' => "No se pudo mostrar las materias creadas"));
            }
        }

        public function getMateriaById () {
            if (isset($_POST["materiaID"])) {
                $materiaID = $_POST["materiaID"];
				$stmt = $this->pdo->prepare(
					"SELECT Valores_Parciales FROM materia WHERE Id_Materia = ?"
				);
				$stmt->execute([$materiaID]);

                $materia = $stmt->fetchAll();
                
                if (isset($materia[0])) {
                    $mat = new materiaModel();
                    $mat->setId_Materia($materia[0]->idMateria);
                    $mat->setMateria($materia[0]->Materia);                
                    $mat->setSemestre($materia[0]->Semestre);
                    $mat->setSemestre($materia[0]->Valores_Parciales);
                    $mat->setAcademia($materia[0]->Academia);

                    $matx = array(
                        'Id_Materia' => $mat->getId_Materia(), 
                        'Materia' => $mat->getMateria(), 
                        'Semestre' => $mat->getSemestre(), 
                        'Valores_Parciales' => $mat->getValores_Parciales(), 
                        'Academia' => $mat->getAcademia() 
                    );

                    echo json_encode (array('error' => false, 'materia' => $matx));
                } else {
                    echo json_encode (array('error' => false));
                }
            }
        }

        public function updateFileValoresParciales () {

			if (isset($_POST["materiaID"])) {
		    	$materiaID = $_POST["materiaID"];
				$oldFileNameValParOnDB = $this->pdo->prepare(
					"SELECT Valores_Parciales FROM materia WHERE Id_Materia = ?"
				);
				$oldFileNameValParOnDB->execute([$materiaID]);

				$materia = $oldFileNameValParOnDB->fetchAll();
				if (isset($materia[0])) {						
                    
                    $newValParName = $_POST["fileName"];
                                        
					$updateNameValPar = $this->pdo(
						"UPDATE materia 
						SET Valores_Parciales = ?
						WHERE Id_Materia = ?"
					);
					$updateNameValPar->execute([ $newValParName, $materiaID]);
					$countUpdate = $updateNameValPar->rowCount();	

                    if ($countUpdate > 0) {
                        $targetPath = $_POST["targetPath"];
                        $oldValParName = $materia[0]->Valores_Parciales;

                        $fileController = new fileController();                                                
                        $fileController->replaceFile($oldValParName, $targetPath, ".xlsx");
                    } else {
                        echo json_encode(array('error' => true, 'message' => "No se pudo actualizar el nombre del archivo en la base de datos"));
                    }                    
                }		
			} 		
		}
	}
?>