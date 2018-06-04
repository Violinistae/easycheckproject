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
    }
    
?>