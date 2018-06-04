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
    }
    
?>