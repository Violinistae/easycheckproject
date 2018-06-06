<?php

    class cuestionarioController extends BaseController {
        public function cleanCuestionario() {
            if (isset($_POST["Id_Instrumento"])) {
                $stmt = $this->pdo->prepare(
                    "DELETE FROM cuestionario
                    WHERE Instrumento = ?"
                );
                $stmt->execute([
                    $_POST["Id_Instrumento"]
                ]);

                echo json_encode (["infoErr" => $stmt->errorInfo()]);
            }
        }

        public function saveCuestionario() {
            if (isset($_POST["Id_Instrumento"])) {
                $numRowsI = $_POST["numRowsI"];
                $Id_Instrumento = $_POST["Id_Instrumento"];
                $rowsI = $_POST["rowsI"];

                $cuestionarioRow;
                $cont = 0;
                
                for ($i = 0; $i < $numRowsI; ++$i) {

                    $a = $rowsI[$i];
                    $cuestionarioRow = new cuestionarioModel();
                    $cuestionarioRow->setInstrumento(intval($Id_Instrumento));
                    $cuestionarioRow->setTipoPregunta(intval($a[4]));
                    $cuestionarioRow->setAspectoEv(intval($a[1]));
                    $cuestionarioRow->setNumPregunta(intval($a[0]));
                    $cuestionarioRow->setPonderacionPreg(intval($a[3]));                                    

                    if ($a[4] == 1) {
                        $cuestionarioRow->setPregunta($a[2][0]);
                        $cuestionarioRow->setResCorrecta($a[2][2]);
                    } else if ($a[4] == 2) {
                        $cuestionarioRow->setPregunta($a[2][0]);
                        $cuestionarioRow->setResCorrecta($a[2][1]);
                    } else if ($a[4] == 3) {
                        $cuestionarioRow->setPregunta($a[2]);
                        $cuestionarioRow->setResCorrecta(null);
                    }

                    $stmt = $this->pdo->prepare (
                        "INSERT INTO cuestionario (
                            Instrumento,
                            TipoPregunta,
                            AspectoEv,
                            NumPregunta,
                            Pregunta,
                            ResCorrecta,
                            PonderacionPreg
                        ) values (
                            ?, ?, ?, ?, ?, ?, ?
                        )"
                    );

                    $stmt->execute([
                        $cuestionarioRow->getInstrumento(),
                        $cuestionarioRow->getTipoPregunta(),
                        $cuestionarioRow->getAspectoEv(),
                        $cuestionarioRow->getNumPregunta(),
                        $cuestionarioRow->getPregunta(),
                        $cuestionarioRow->getResCorrecta(),
                        $cuestionarioRow->getPonderacionPreg()
                    ]);

                    if ($stmt->rowCount() == 1) {
                        ++$cont;
                    }

                    $pregId = $this->pdo->lastInsertId();

                    if ($a[4] == 1) {
                        $l = count($a[2][1]);
                        for ($j = 0; $j < $l; ++$j) {
                            $opPregController = new opcionespreguntaController($this->pdo);
                            $opPregController->insertOpcionPregunta($a[2][1][$j][0], $a[2][1][$j][1], $pregId);
                        }
                        
                    }

                }

                if ($cont == $numRowsI) {
                    echo json_encode (["error" => false]);
                } else {
                    echo json_encode (["error" => true]);
                }
                
            }
        }

        public function readCuestionario () {
            if (isset($_POST["Id_Instrumento"])) {
                $stmt = $this->pdo->prepare(
                    "SELECT * FROM cuestionario
                        where Instrumento = ?"
                );
                $stmt->execute([
                    $_POST["Id_Instrumento"]
                ]);

                if ($stmt->rowCount() > 0) {
                    $cuesRows = array();
                    while ($cRow = $stmt->fetch(PDO::FETCH_ASSOC)) {
                        $preg = new cuestionarioModel();
                        $preg->setId_FilaCues($cRow["Id_FilaCues"]);
                        $preg->setInstrumento($cRow["Instrumento"]);
                        $preg->setTipoPregunta($cRow["TipoPregunta"]);
                        $preg->setAspectoEv($cRow["AspectoEv"]);
                        $preg->setNumPregunta($cRow["NumPregunta"]);
                        $preg->setPregunta($cRow["Pregunta"]);
                        $preg->setResCorrecta($cRow["ResCorrecta"]);
                        $preg->setPonderacionPreg($cRow["PonderacionPreg"]);
                        
                        $row = ([
                            'Id_FilaCues' => $preg->getId_FilaCues(),
                            'Instrumento' => $preg->getInstrumento(),
                            'TipoPregunta' => $preg->getTipoPregunta(),
                            'AspectoEv' => $preg->getAspectoEv(),
                            'NumPregunta' => $preg->getNumPregunta(),
                            'Pregunta' => $preg->getPregunta(),
                            'ResCorrecta' => $preg->getResCorrecta(),
                            'Ponderacion' => $preg->getPonderacionPreg()
                        ]);

                        if ($preg->getTipoPregunta() == 1) {
                            $controllerOpc = new opcionespreguntaController($this->pdo);
                            $row["Opciones"] = $controllerOpc->readOpcionesP($preg->getId_FilaCues());
                        }


                        $cuesRows[] = $row;
                    }           
                    echo json_encode(['error' => false, 'built' => true, 'builtRows' => $cuesRows, 'tInst' => 4]);     

                } else {
                    echo json_encode(['error' => false, 'built' => false]);
                }

            } else {
                echo json_encode(['error' => true]);
            }
        }
    }
    
?>