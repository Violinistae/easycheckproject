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

        public function getAcademiaById () {
            if (isset($_POST["Id_Academia"])) {
                $stmt = $this->pdo->prepare(
                    "SELECT * FROM academia
                        WHERE Id_Academia = ?"
                );
                $stmt->execute([
                    $_POST["Id_Academia"]
                ]);

                if ($stmt->rowCount() > 0) {
                    $acad = [];

                    while ($a = $stmt->fetch(PDO::FETCH_ASSOC)) {

                        $academia = new academiaModel();
                        $academia->setId_Academia($_POST["Id_Academia"]);
                        $academia->setAcademia($a["Academia"]);
                        $academia->setLista_Prof($a["Lista_Prof"]);
                        $academia->setClave_Acceso($a["Clave_Acceso"]);
                        $academia->setCiclo_Periodo($a["Ciclo_Periodo"]);
                        $academia->setCarrera($a["Carrera"]);
                        $academia->setCoordinador_Acad($a["Coordinador_Acad"]);
                        
                            $ac = [
                                'Id_Academia' => $academia->getId_Academia(),
                                'Academia' => $academia->getAcademia(),
                                'Lista_Prof' => $academia->getLista_Prof(),
                                'Clave_Acceso' => $academia->getClave_Acceso(),
                                'Ciclo_Periodo' => $academia->getCiclo_Periodo(),
                                'Carrera' => $academia->getCarrera(),
                                'Coordinador_Acad' => $academia->getCoordinador_Acad()
                            ];
                        
                        $acad[] = $ac;
                    }                    
                    
                    echo json_encode(['error' => false, 'built' => true, 'acad' => $acad]);
                } else {
                    echo json_encode (['error' => false, 'built' => false, 'x' => $stmt->rowCount()]);
                }
            } else {
                echo json_encode(['error' => true]);
            }
        }

        public function getAcademiaByIdLocal ($Id_Acad) {
            if (isset($Id_Acad)) {
                $stmt = $this->pdo->prepare(
                    "SELECT * FROM academia
                        WHERE Id_Academia = ?"
                );
                $stmt->execute([
                    $Id_Acad
                ]);

                if ($stmt->rowCount() > 0) {

                    while ($a = $stmt->fetch(PDO::FETCH_ASSOC)) {

                        $academia = new academiaModel();
                        $academia->setId_Academia($a["Id_Academia"]);
                        $academia->setAcademia($a["Academia"]);
                        $academia->setLista_Prof($a["Lista_Prof"]);
                        $academia->setClave_Acceso($a["Clave_Acceso"]);
                        $academia->setCiclo_Periodo($a["Ciclo_Periodo"]);
                        $academia->setCarrera($a["Carrera"]);
                        $academia->setCoordinador_Acad($a["Coordinador_Acad"]);
                    }                    
                    
                    return $academia;
                } else {
                    return null;
                }

            } else {
               return null;
            }
        }


        public function verifyRequestToAcad () {
            if (isset($_POST["Id_Academia"])) {
                $stmt = $this->pdo->prepare(
                    "SELECT * FROM academia
                        WHERE Id_Academia = ?"
                );
                $stmt->execute([
                    $_POST["Id_Academia"]
                ]);

                if ($stmt->rowCount() > 0) {
                    $acad = [];

                    while ($a = $stmt->fetch(PDO::FETCH_ASSOC)) {

                        $academia = new academiaModel();
                        $academia->setId_Academia($_POST["Id_Academia"]);
                        $academia->setAcademia($a["Academia"]);
                        $academia->setLista_Prof($a["Lista_Prof"]);
                        $academia->setClave_Acceso($a["Clave_Acceso"]);
                        $academia->setCiclo_Periodo($a["Ciclo_Periodo"]);
                        $academia->setCarrera($a["Carrera"]);
                        $academia->setCoordinador_Acad($a["Coordinador_Acad"]);
                        
                    }                                                        

                    if ($_POST["Academia"] == $academia->getAcademia()) {
                        if (password_verify($_POST["Clave_Acceso"], $academia->getClave_Acceso())) {
                            $userC = new usuarioController($this->pdo);
                            $user = new usuarioModel();
                            $user = $userC->getUserForSimple();
                            
                            $us = [
                                $user->getRegistro_U(),
                                $user->getNombres(),
                                $user->getApellidos(),
                                $user->getEmail()
                            ];

                            $ac = [
                                'Id_Academia' => $academia->getId_Academia(),
                                'Academia' => $academia->getAcademia(),
                                'Lista_Prof' => $academia->getLista_Prof()
                            ];

                            echo json_encode([
                                'error' => false, 'built' => true,
                                'nameV' => true, 'keyAccess' => true,
                                'userData' => $us, 'Acad' => $ac
                            ]);
                        } else {
                            echo json_encode([
                                'error' => false, 'built' => true, 
                                'nameV' => true, 'keyAccess' => false
                            ]);
                        }
                    } else {
                        echo json_encode(['error' => false, 'built' => true, 'nameV' => false]);
                    }                    
                } else {
                    echo json_encode (['error' => false, 'built' => false, 'x' => $stmt->rowCount()]);
                }

            } else {
                echo json_encode(['error' => true]);
            }
        }


    }
    
?>