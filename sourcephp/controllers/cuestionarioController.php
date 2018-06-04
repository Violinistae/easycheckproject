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

                //echo json_encode (["x" => $rowsI, "length" => $numRowsI]);

                //return;
                
                for ($i = 0; $i < $numRowsI; ++$i) {
                    $a = $rowsI[$i];
                    $cuestionarioRow = new cuestionarioModel();
                    $cuestionarioRow->setNumPregunta(intval($a[0]));
                    $cuestionarioRow->setAspectoEv(intval($a[1]));
                    $cuestionarioRow->setPonderacionPreg(intval($a[3]));
                    $cuestionarioRow->setTipoPregunta(intval($a[4]));
                    $cuestionarioRow->setInstrumento(intval($Id_Instrumento));

                    if ($a[4] == 1) {
                        $cuestionarioRow->setPregunta($a[2][0]);
                    } else {
                        $cuestionarioRow->setPregunta($a[2]);
                    }

                    $stmt = $this->pdo->prepare (
                        "INSERT INTO cuestionario (
                            Instrumento,
                            TipoPregunta,
                            AspectoEv,
                            NumPregunta,
                            Pregunta,
                            PonderacionPreg
                        ) values (
                            ?, ?, ?, ?, ?, ?
                        )"
                    );

                    $stmt->execute([
                        $cuestionarioRow->getInstrumento(),
                        $cuestionarioRow->getTipoPregunta(),
                        $cuestionarioRow->getAspectoEv(),
                        $cuestionarioRow->getNumPregunta(),
                        $cuestionarioRow->getPregunta(),
                        $cuestionarioRow->getPonderacionPreg(),
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
    }
    
?>