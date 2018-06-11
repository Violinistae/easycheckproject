<?php
    class rubricaController extends BaseController {
        public function cleanRubrica () {
            if (isset($_POST["Id_Instrumento"])) {
                $stmt = $this->pdo->prepare(
                    "DELETE FROM rubrica
                    WHERE Instrumento = ?"
                );
                $stmt->execute([
                    $_POST["Id_Instrumento"]
                ]);

                echo json_encode (["infoErr" => $stmt->errorInfo()]);
            }
        }

        public function saveRubrica () {
            if (isset($_POST["Id_Instrumento"])) {

                if (!isset($_POST["rowsI"])) {
                    echo json_encode (["error" => false]);
                    return;
                }

                $numRowsI = $_POST["numRowsI"];
                $Id_Instrumento = $_POST["Id_Instrumento"];
                $rowsI = $_POST["rowsI"];
                $numCriterios = $_POST["numCriterios"];

                $rubricaRow;
                $cont = 0;

                //echo json_encode (["x" => $rowsI, "length" => $numRowsI]);
                
                for ($i = 0; $i < $numRowsI; ++$i) {
                    $a = $rowsI[$i];
                    $rubricaRow = new rubricaModel();
                    $rubricaRow->setInstrumento(intval($Id_Instrumento));
                    $rubricaRow->setAspectoEv(intval($a[1]));
                    $rubricaRow->setNumElemento(intval($a[0]));
                    $rubricaRow->setDescripcion($a[2]);
                    $rubricaRow->setNumCriterios($numCriterios);

                    $stmt = $this->pdo->prepare (
                        "INSERT INTO rubrica (
                            Instrumento,
                            AspectoEv,
                            NumElemento,
                            Descripcion, 
                            NumCriterios
                        ) values (
                            ?, ?, ?, ?, ?
                        )"
                    );

                    $stmt->execute([
                        $rubricaRow->getInstrumento(),
                        $rubricaRow->getAspectoEv(),
                        $rubricaRow->getNumElemento(),
                        $rubricaRow->getDescripcion(),
                        $rubricaRow->getNumCriterios()
                    ]);

                    if ($stmt->rowCount() == 1) {
                        ++$cont;
                    }

                    $filaRId = $this->pdo->lastInsertId();

                    for ($j = 0; $j < $numCriterios; $j++) {
                        $criteriosCtlr = new criteriosfilarubricaController($this->pdo);
                        $criteriosCtlr->insertCriterioFilaR($a[3][$j], $filaRId);
                    }

                }

                if ($cont == $numRowsI) {
                    echo json_encode (["error" => false]);
                } else {
                    echo json_encode (["error" => true]);
                }                

            }
        }

        public function readRubrica () {
            if (isset($_POST["Id_Instrumento"])) {
                $stmt = $this->pdo->prepare(
                    "SELECT * FROM rubrica
                        WHERE Instrumento = ?"
                );
                $stmt->execute([
                    $_POST["Id_Instrumento"]
                ]);

                if ($stmt->rowCount() > 0) {
                    $rRows = array();
                    while ($rRow = $stmt->fetch(PDO::FETCH_ASSOC)) {
                        $r = new rubricaModel();
                        $r->setId_FilaRubrica(intval($rRow["Id_FilaRubrica"]));
                        $r->setInstrumento(intval($_POST["Id_Instrumento"]));
                        $r->setAspectoEv(intval($rRow["AspectoEv"]));
                        $r->setNumElemento(intval($rRow["NumElemento"]));
                        $r->setDescripcion($rRow["Descripcion"]);
                        $r->setNumCriterios(intval($rRow["NumCriterios"]));

                        $criteriosCtlr = new criteriosfilarubricaController($this->pdo);
                        $crit = $criteriosCtlr->readCriteriosFilaR(intval($rRow["Id_FilaRubrica"]));

                        $row = ([
                            'Id_FilaRubrica' => $r->getId_FilaRubrica(),
                            'Instrumento' => $r->getInstrumento(),
                            'AspectoEv' => $r->getAspectoEv(),
                            'NumElemento' => $r->getNumElemento(),
                            'Descripcion' => $r->getDescripcion(),
                            'NumCriterios' => $r->getNumCriterios(),
                            'Criterios' => $crit
                        ]);

                        $rRows[] = $row;
                    }
                    echo json_encode(['error' => false, 'built' => true, 'builtRows' => $rRows, 'tInst' => 1]);
                } else {
                    echo json_encode(['error' => false, 'built' => false]);
                }            
            } else {
                echo json_encode (['error' => true]);
            }
        }

    }
    
?>