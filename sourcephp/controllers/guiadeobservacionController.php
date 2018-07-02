<?php
    class guiadeobservacionController extends BaseController {
        public function cleanGuiaObs() {
            if (isset($_POST["Id_Instrumento"])) {
                $stmt = $this->pdo->prepare(
                    "DELETE FROM guiadeobservacion
                    WHERE Instrumento = ?"
                );
                $stmt->execute([
                    $_POST["Id_Instrumento"]
                ]);

                echo json_encode (["infoErr" => $stmt->errorInfo()]);
            }
        }

        public function saveGuiaObs() {
            if (isset($_POST["Id_Instrumento"])) {
                $numRowsI = $_POST["numRowsI"];
                $Id_Instrumento = $_POST["Id_Instrumento"];
                $rowsI = $_POST["rowsI"];

                $guiaObsRow;
                $cont = 0;

                //echo json_encode (["x" => $rowsI, "length" => $numRowsI]);

                for ($i = 0; $i < $numRowsI; ++$i) {
                    $a = $rowsI[$i];
                    $guiaObsRow = new guiadeobservacionModel();
                    $guiaObsRow->setInstrumento(intval($Id_Instrumento));
                    $guiaObsRow->setAspectoEv(intval($a[1]));
                    $guiaObsRow->setNumElemento(intval($a[0]));
                    $guiaObsRow->setAccionesEv($a[2]);
                    $guiaObsRow->setPonderacionElem($a[3]);

                    $stmt = $this->pdo->prepare (
                        "INSERT INTO guiadeobservacion (
                            Instrumento,
                            AspectoEv,
                            NumElemento,
                            AccionesEv,
                            PonderacionElem
                        ) values (
                            ?, ?, ?, ?, ?
                        )"
                    );

                    $stmt->execute([
                        $guiaObsRow->getInstrumento(),
                        $guiaObsRow->getAspectoEv(),
                        $guiaObsRow->getNumElemento(),
                        $guiaObsRow->getAccionesEv(),
                        $guiaObsRow->getPonderacionElem()
                    ]);

                    if ($stmt->rowCount() == 1) {
                        ++$cont;
                    }

                }

                if ($cont == $numRowsI) {
                    echo json_encode (["error" => false]);
                } else {
                    echo json_encode (["error" => true]);
                }
                
            }
        }

        public function readGuiaObs () {
           if (isset($_POST["Id_Instrumento"])) {
                $stmt = $this->pdo->prepare(
                    "SELECT * FROM guiadeobservacion
                        where Instrumento = ?"
                );
                $stmt->execute([
                    $_POST["Id_Instrumento"]
                ]);

                if ($stmt->rowCount() > 0) {
                    $GORows = array();
                    while ($goRow = $stmt->fetch(PDO::FETCH_ASSOC)) {
                        $rowGO = new guiadeobservacionModel();
                        $rowGO->setId_FilaGuiadO(intval($goRow["Id_FilaGuiadO"]));
                        $rowGO->setInstrumento(intval($goRow["Instrumento"]));
                        $rowGO->setAspectoEv(intval($goRow["AspectoEv"]));
                        $rowGO->setNumElemento(intval($goRow["NumElemento"]));
                        $rowGO->setAccionesEv($goRow["AccionesEv"]);
                        $rowGO->setPonderacionElem(intval($goRow["PonderacionElem"]));
                        
                        $row = ([
                            'Id_FilaGuiadO' => $rowGO->getId_FilaGuiadO(),
                            'Instrumento' => $rowGO->getInstrumento(),
                            'AspectoEv' => $rowGO->getAspectoEv(),
                            'NumElemento' => $rowGO->getNumElemento(),
                            'AccionesEv' => $rowGO->getAccionesEv(),
                            'PonderacionElem' => $rowGO->getPonderacionElem()
                        ]);

                        $GORows[] = $row;
                    }           
                    echo json_encode(['error' => false, 'built' => true, 'builtRows' => $GORows, 'tInst' => 3]);     

                } else {
                    echo json_encode(['error' => false, 'built' => false]);
                }

            } else {
                echo json_encode(['error' => true]);
            }
        }

        public function readGuiaObsData () {
            if (isset($_POST["Id_Instrumento"])) {
                $stmt = $this->pdo->prepare(
                    "SELECT Id_FilaGuiadO, aspectoevaluacion.Descripcion, NumElemento, AccionesEv, PonderacionElem 
                    FROM guiadeobservacion JOIN aspectoevaluacion 
                        ON guiadeobservacion.AspectoEv = aspectoevaluacion.Id_Aspecto
                        WHERE instrumento = ? ORDER BY NumElemento"
                );

                $stmt->execute([
                    $_POST["Id_Instrumento"]
                ]);

                if ($stmt->rowCount() > 0) {
                    $contentGO = [];

                    while ($rowGO = $stmt->fetch(PDO::FETCH_ASSOC)) {
                        $GO = [
                            'Id_GuiadeO' => $rowGO["Id_FilaGuiadO"],
                            'AspectoEv' => $rowGO["Descripcion"],
                            'NumElemento' => $rowGO["NumElemento"],
                            'AccionesEv' => $rowGO["AccionesEv"],
                            'PonderacionElem' => $rowGO["PonderacionElem"]
                        ];
                        $contentGO [] = $GO;
                    }

                    echo json_encode (['error' => false, 'built' => true, 'contentInst' => $contentGO]);
                } else {
                    echo json_encode (['error' => false, 'built' => false]);
                }
            } else {
                echo json_encode(['error' => true]);
            }
        }
    }
    
?>