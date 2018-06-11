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
                $numRowsI = $_POST["numRowsI"];
                $Id_Instrumento = $_POST["Id_Instrumento"];
                $rowsI = $_POST["rowsI"];
                $numCriterios = $_POST["numCriterios"];

                $rubricaCotejoRow;
                $cont = 0;

                //echo json_encode (["x" => $rowsI, "length" => $numRowsI]);
                
                for ($i = 0; $i < $numRowsI; ++$i) {
                    $a = $rowsI[$i];
                    $rubricaCotejoRow = new rubricaModel();
                    $rubricaCotejoRow->setInstrumento(intval($Id_Instrumento));
                    $rubricaCotejoRow->setAspectoEv(intval($a[1]));
                    $rubricaCotejoRow->setNumElemento(intval($a[0]));
                    $rubricaCotejoRow->setDescripcion($a[2]);
                    $rubricaCotejoRow->setNumCriterios($numCriterios);

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
                        $rubricaCotejoRow->getInstrumento(),
                        $rubricaCotejoRow->getAspectoEv(),
                        $rubricaCotejoRow->getNumElemento(),
                        $rubricaCotejoRow->getDescripcion(),
                        $rubricaCotejoRow->getNumCriterios()
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
                
            } else {
                echo json_encode (['error' => true]);
            }
        }

    }
    
?>