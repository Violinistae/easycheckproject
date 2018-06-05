<?php
    class instrumentoController extends BaseController {
        public function deleteInstrumento () {                  //Very, ...VERY, VERY, VERY dangerous functions
            if (isset($_POST["Id_Instrumento"])) {
                $userReg_DeleteRequest = $_SESSION["userreg"];
                $stmt = $this->pdo->prepare (
                    "SELECT * FROM instrumento
                        WHERE Creador = ? AND Id_Instrumento = ?"
                );

                $stmt->execute([
                    $userReg_DeleteRequest,
                    $_POST["Id_Instrumento"]
                ]);

                if ($stmt->rowCount() > 0) {
                    
                    $stmt2 = $this->pdo->prepare(
                        "DELETE FROM instrumento
                            WHERE Id_Instrumento = ?"
                    );
                    
                    $stmt2->execute([
                        $_POST["Id_Instrumento"]
                    ]);

                    if ($stmt2->rowCount() > 0) {
                        echo json_encode(["error" => false, "message" => "Se elminiado el instrumento de evaluación."]);
                    } else {
                        echo json_encode(["error" => true, "message" => "No se ha podido eliminar el instrumento de evaluación."]);
                    }

                } else {
                    echo json_encode(["error" => true, "message" => "Usted no tiene permiso para eliminar este instrumento de evaluación."]);
                }

            } else {
                echo json_encode(["error" => true, "message" => "Inténtelo más tarde"]);
            }
        }

        public function insertInstrumento() {

            $newInstrumento = new instrumentoModel();
            $newInstrumento->setCreador($_SESSION["userreg"]);
            $newInstrumento->setTipoInstrumento($_POST["tipoInstrumento"]);
            $newInstrumento->setTipoEvaluacion($_POST["tipoEv"]);
            $newInstrumento->setClaveElem($_POST["claveElemento"]);
            $newInstrumento->setNombElemento($_POST["nombreElemento"]);
            $newInstrumento->setInstruccLlenado($_POST["instruccionesLlenado"]);
            $newInstrumento->setMateria($_POST["materiaId"]);

            $stmt = $this->pdo->prepare(
                "INSERT INTO instrumento (
                    Creador,
                    TipoInstrumento,
                    TipoEvaluacion,
                    ClaveElem,
                    NombElemento,
                    InstruccLlenado,
                    Materia
                ) values (
                    ?, ?, ?, ?, ?, ?, ?
                )"
            );
            $stmt->execute([
                $newInstrumento->getCreador(),
                $newInstrumento->getTipoInstrumento(),
                $newInstrumento->getTipoEvaluacion(),
                $newInstrumento->getClaveElem(),
                $newInstrumento->getNombElemento(),
                $newInstrumento->getInstruccLlenado(),
                $newInstrumento->getMateria()
            ]);

            //Verify error ?

            $newInstrumento->setId_Instrumento($this->pdo->lastinsertId());

            $inst = array(
                'Id_Instrumento' =>$newInstrumento->getId_Instrumento(),
                'Creador' =>$newInstrumento->getCreador(),
                'TipoInstrumento' =>$newInstrumento->getTipoInstrumento(),
                'TipoEvaluacion' =>$newInstrumento->getTipoEvaluacion(),
                'ClaveElem' =>$newInstrumento->getClaveElem(),
                'NombElem' =>$newInstrumento->getNombElemento(),
                'InstruccLlenado' =>$newInstrumento->getInstruccLlenado(),
                'Materia' =>$newInstrumento->getMateria()
            );

            echo json_encode(array('instrumento' => $inst));
            return;
        }

        public function checkInstrumento () {
            
        }

    }
?>