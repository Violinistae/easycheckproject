<?php
    class listacotejoController extends BaseController {
        public function cleanListaCotejo() {
            if (isset($_POST["Id_Instrumento"])) {
                $stmt = $this->pdo->prepare(
                    "DELETE FROM listacotejo
                    WHERE Instrumento = ?"
                );
                $stmt->execute([
                    $_POST["Id_Instrumento"]
                ]);

                echo json_encode (["infoErr" => $stmt->errorInfo()]);
            }
        }

        public function saveListaCotejo() {
            if (isset($_POST["Id_Instrumento"])) {
                $numRowsI = $_POST["numRowsI"];
                $Id_Instrumento = $_POST["Id_Instrumento"];
                $rowsI = $_POST["rowsI"];

                $listaCotejoRow;
                $cont = 0;

                //echo json_encode (["x" => $rowsI, "length" => $numRowsI]);

                
                for ($i = 0; $i < $numRowsI; ++$i) {
                    $a = $rowsI[$i];
                    $listaCotejoRow = new listacotejoModel();
                    $listaCotejoRow->setInstrumento(intval($Id_Instrumento));
                    $listaCotejoRow->setAspectoEv(intval($a[1]));
                    $listaCotejoRow->setNumElemento(intval($a[0]));
                    $listaCotejoRow->setIndicadoresEv($a[2]);

                    $stmt = $this->pdo->prepare (
                        "INSERT INTO listacotejo (
                            Instrumento,
                            AspectoEv,
                            NumElemento,
                            IndicadoresEv
                        ) values (
                            ?, ?, ?, ?
                        )"
                    );

                    $stmt->execute([
                        $listaCotejoRow->getInstrumento(),
                        $listaCotejoRow->getAspectoEv(),
                        $listaCotejoRow->getNumElemento(),
                        $listaCotejoRow->getIndicadoresEv()
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

        public function readListaCotejo () {
            if (isset($_POST["Id_Instrumento"])) {
                $stmt = $this->pdo->prepare(
                    "SELECT * FROM listacotejo
                        where Instrumento = ?"
                );
                $stmt->execute([
                    $_POST["Id_Instrumento"]
                ]);

                if ($stmt->rowCount() > 0) {
                    $LCRows = array();
                    while ($lcRow = $stmt->fetch(PDO::FETCH_ASSOC)) {
                        $rowLisC = new listacotejoModel();
                        $rowLisC->setId_FilaListaC(intval($lcRow["Id_FilaListaC"]));
                        $rowLisC->setInstrumento(intval($lcRow["Instrumento"]));
                        $rowLisC->setAspectoEv(intval($lcRow["AspectoEv"]));
                        $rowLisC->setNumElemento(intval($lcRow["NumElemento"]));
                        $rowLisC->setIndicadoresEv($lcRow["IndicadoresEv"]);
                        
                        $row = ([
                            'Id_FilaListaC' => $rowLisC->getId_FilaListaC(),
                            'Instrumento' => $rowLisC->getInstrumento(),
                            'AspectoEv' => $rowLisC->getAspectoEv(),
                            'NumElemento' => $rowLisC->getNumElemento(),
                            'IndicadoresEv' => $rowLisC->getIndicadoresEv()
                        ]);

                        $LCRows[] = $row;
                    }           
                    echo json_encode(['error' => false, 'built' => true, 'builtRows' => $LCRows, 'tInst' => 2]);     

                } else {
                    echo json_encode(['error' => false, 'built' => false]);
                }

            } else {
                echo json_encode(['error' => true]);
            }
        }

        public function readListaCotejoData() {
            if (isset($_POST["Id_Instrumento"])) {
                $stmt = $this->pdo->prepare(
                    "SELECT Id_FilaListaC, aspectoevaluacion.Descripcion, NumElemento, IndicadoresEv 
                    FROM listacotejo JOIN aspectoevaluacion 
                        ON listacotejo.AspectoEv = aspectoevaluacion.Id_Aspecto
                        WHERE instrumento = ? ORDER BY NumElemento;"
                );

                $stmt->execute([
                    $_POST["Id_Instrumento"]
                ]);

                if ($stmt->rowCount() > 0) {
                    $contentLC = [];

                    while ($rowLC = $stmt->fetch(PDO::FETCH_ASSOC)) {
                        $LC = [
                            'Id_ListaC' => $rowLC["Id_FilaListaC"],
                            'AspectoEv' => $rowLC["Descripcion"],
                            'NumElemento' => $rowLC["NumElemento"],
                            'IndicadoresEv' => $rowLC["IndicadoresEv"]
                        ];
                        $contentLC [] = $LC;
                    }

                    echo json_encode (['error' => false, 'built' => true, 'contentInst' => $contentLC]);
                } else {
                    echo json_encode (['error' => false, 'built' => false]);
                }
            } else {
                echo json_encode(['error' => true]);
            }
        }
    }
    
?>