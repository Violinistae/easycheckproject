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

            if ($_POST["purpose"] == 1) {
                $acad = new academiaModel();
                $acad =  $academiaController->getAcademiaByCoordinador();
            } else {
                $acad = new academiaModel();
                $acad->setId_Academia($_POST["idAcademia"]);
            }            

            if ($acad != null) {

                $selectAcadStr = $this->pdo->prepare(
                    "SELECT * FROM materia where materia.academia = ? ORDER by materia.Id_Materia"
                );

                $selectAcadStr->execute(array(                    
                    $acad->getId_Academia()     
                ));

                $selectMatRows = $selectAcadStr->rowCount();
                
                if ($selectMatRows > 0) {
                    
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

                    endwhile;

                    echo json_encode(array('error' => false, 'materias' => $m, 'numMaterias' => $selectMatRows));
                } else {
                    echo json_encode(array('error' => false, 'message' => "No se hay materias creadas en la academia", 'numMaterias' => $selectMatRows));
                }
            } else {
                echo json_encode(array('error' => true, 'message' => "No se pudo mostrar las materias creadas"));
            }
        }

        public function getMateriaById () {
            if (isset($_POST["materiaID"])) {
                $materiaID = $_POST["materiaID"];
				$stmt = $this->pdo->prepare(
					"SELECT * FROM materia WHERE Id_Materia = ?"
				);
				$stmt->execute([$materiaID]);

                $materia = $stmt->fetchAll();
                
                if (isset($materia[0])) {
                    $mat = new materiaModel();
                    $mat->setId_Materia($materia[0]->Id_Materia);
                    $mat->setMateria($materia[0]->Materia);                
                    $mat->setSemestre($materia[0]->Semestre);
                    $mat->setValores_Parciales($materia[0]->Valores_Parciales);
                    $mat->setAcademia($materia[0]->Academia);


                    $acadCtrlr = new academiaController($this->pdo);
                    $acad = $acadCtrlr->getAcademiaByIdLocal($mat->getAcademia());


                    $matx = array(
                        'Id_Materia' => $mat->getId_Materia(), 
                        'Materia' => $mat->getMateria(), 
                        'Semestre' => $mat->getSemestre(), 
                        'Valores_Parciales' => $mat->getValores_Parciales(), 
                        'Academia' => $mat->getAcademia(),
                        'Acad' => $acad->getAcademia()
                    );

                    echo json_encode (array('error' => false, 'materia' => $matx));
                } else {
                    echo json_encode (array('error' => true));
                }
            }
        }

        public function getMateriaByIdLocal ($idMat) {
            if (isset($idMat)) {
				$stmt = $this->pdo->prepare(
					"SELECT * FROM materia WHERE Id_Materia = ?"
				);
				$stmt->execute([$idMat]);

                $materia = $stmt->fetchAll();
                
                if (isset($materia[0])) {
                    $mat = new materiaModel();
                    $mat->setId_Materia($materia[0]->Id_Materia);
                    $mat->setMateria($materia[0]->Materia);                
                    $mat->setSemestre($materia[0]->Semestre);
                    $mat->setValores_Parciales($materia[0]->Valores_Parciales);
                    $mat->setAcademia($materia[0]->Academia);

                    return $mat;
                } else {
                    return null;
                }
            } else {
                return null;
            }
        }

        public function getMateriaByNameLocal($nameMateria) {
            if (isset($nameMateria)) {
				$stmt = $this->pdo->prepare(
					"SELECT * FROM materia WHERE Materia = ?"
				);
				$stmt->execute([$nameMateria]);

                $materia = $stmt->fetchAll();
                
                if (isset($materia[0])) {
                    $mat = new materiaModel();
                    $mat->setId_Materia($materia[0]->Id_Materia);
                    $mat->setMateria($materia[0]->Materia);                
                    $mat->setSemestre($materia[0]->Semestre);
                    $mat->setValores_Parciales($materia[0]->Valores_Parciales);
                    $mat->setAcademia($materia[0]->Academia);

                    return $mat;
                } else {
                    return null;
                }
            } else {
                return null;
            }
        }

        public function updateMateria () {

            if (isset($_POST["Id_Materia"])) {

                $materia = new materiaModel();
                $materia->setId_Materia($_POST["Id_Materia"]);
                $materia->setMateria($_POST["Materia"]);
                $materia->setSemestre($_POST["Semestre"]);
                $materia->setValores_Parciales($_POST["Valores_Parciales"]);
                $materia->setAcademia($_POST["Academia"]);

                
                $stmt = $this->pdo->prepare(
					"UPDATE  materia 
                    SET Materia = ?,
                    Semestre = ?,
                    Valores_Parciales = ?,
                    Academia = ?
                    WHERE Id_Materia = ?"
				);
				$stmt->execute([
                    $materia->getMateria(),
                    $materia->getSemestre(),
                    $materia->getValores_Parciales(),
                    $materia->getAcademia(),
                    $materia->getId_Materia()
                ]);

                $updatedMaterias = $stmt->rowCount();

                if ($updatedMaterias == 1) {
                    echo json_encode(array('error' => false));
                } else {
                    echo json_encode(array('error' => true));
                }            
            }
        }
        
        public function deleteMateria () {
            if (isset($_POST["Id_Materia"])) {

                $IdMateria = $_POST["Id_Materia"];

                 $stmt = $this->pdo->prepare(
					"DELETE FROM  materia                 
                    WHERE Id_Materia = ?"
				);
				$stmt->execute([
                    $IdMateria
                ]);                

                if ($stmt->rowCount() == 1) {
                    echo json_encode (array('error' => false));
                } else {
                    echo json_encode (array('error' => true));
                }   
            }
        } 
	}
?>