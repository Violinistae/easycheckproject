<?php
    class academiaController extends BaseController {
        public function getAcademiaByCoordinador () {
            
            $queryAcadByCoord = $this->pdo->prepare(
                "SELECT * from academia                    
                where Coordinador_Acad = ?"
            );

            $queryAcadByCoord->execute(array(
                $_SESSION["userreg"]
            ));

            if ($queryAcadByCoord->rowCount() > 0) {
                $academia = new academiaModel();

                $resAcadByCoord = $queryAcadByCoord->fetch(PDO::FETCH_ASSOC);

                $academia->setId_Academia($resAcadByCoord["Id_Academia"]);
                $academia->setAcademia($resAcadByCoord["Academia"]);
                $academia->setClave_Acceso($resAcadByCoord["Clave_Acceso"]);
                $academia->setCiclo_Periodo($resAcadByCoord["Ciclo_Periodo"]);
                $academia->setLista_Prof($resAcadByCoord["Lista_Prof"]);
                $academia->setCoordinador_Acad($_SESSION["userreg"]);
                $academia->setCarrera($resAcadByCoord["Carrera"]);

                if (isset($_POST["fromJS"])) {
                    $forJS = array(
                        'Id_Academia' => $academia->getId_Academia(), 
                        'Academia' => $academia->getAcademia(),
                        'Lista_Prof' => $academia->getLista_Prof(),
                        'Clave_Acceso' => $academia->getClave_Acceso(),
                        "Ciclo_Periodo" => $academia->getCiclo_Periodo(),
                        'Carrera' => $academia->getCarrera(),
                        'Coordinador_Acad' => $academia->getCoordinador_Acad()
                    );

                    echo json_encode(array('academia' => $forJS));
                    return;
                }
                
                return $academia;
            } else {
                return null;
            }
            
        }

        public function updateAcademia () {
            
            if (isset($_POST["Id_Academia"])) {
            
                $academia = new academiaModel();
                $academia->setId_Academia(intval($_POST["Id_Academia"]));
                $academia->setAcademia($_POST["Academia"]);
                $academia->setLista_Prof($_POST["Lista_Prof"]);
                $academia->setClave_Acceso($_POST["Clave_Acceso"]);
                $academia->setCiclo_Periodo($_POST["Ciclo_Periodo"]);
                $academia->setCarrera($_POST["Carrera"]);
                $academia->setCoordinador_Acad($_POST["Coordinador_Acad"]);
                                
                $stmt = $this->pdo->prepare(
					"UPDATE  academia
                    SET Academia = ?,
                    Lista_Prof = ?,
                    Clave_Acceso = ?,
                    Ciclo_Periodo = ?,
                    Carrera = ?,
                    Coordinador_Acad = ?
                    WHERE Id_Academia = ?"
                );
                
				$stmt->execute([
                    $academia->getAcademia(),
                    $academia->getLista_Prof(),
                    $academia->getClave_Acceso(),
                    $academia->getCiclo_Periodo(),
                    $academia->getCarrera(),
                    $academia->getCoordinador_Acad(),
                    $academia->getId_Academia()
                ]);
                
                $updatedMaterias = $stmt->rowCount();

                if ($updatedMaterias == 1) {
                    echo json_encode(array('error' => false));
                } else {
                    echo json_encode(array('error' => true));
                }            
            } else {
                echo json_encode(array('error' => true));
            }
        }
    }
    
?>