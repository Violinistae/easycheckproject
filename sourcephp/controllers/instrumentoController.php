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
                    $sharedInstrctrlr = new instrumentoscompartidosController($this->pdo);
                    $flag = $sharedInstrctrlr->verifySharedInstr($_POST["Id_Instrumento"]);
                    if ($flag) {

                        if ($_SESSION["usertype"] == 1) {
                            echo json_encode([
                                'error' => false, 
                                'permition' => true,
                                'shared' => true,
                                'message' => "Detectamos que el instrumento que desea eliminar se encuentra compartido, por lo cuál aún no puede ser eliminado. \n Favor de eliminarlo de instrumentos compartidos en su academia para poder realizar esta acción."
                            ]); 
                        } else if ($_SESSION["usertype"] == 2) {
                            echo json_encode([
                                'error' => false, 
                                'permition' => true,
                                'shared' => true,
                                'message' => "Detectamos que el instrumento que desea eliminar se encuentra compartido, por lo cuál aún no puede ser eliminado. Favor de notificar al coordinador de academia para manejar la situación."
                            ]);                        
                        }
                    } else {
                        $stmt3 = $this->pdo->prepare(
                            "DELETE FROM instrumento
                                WHERE Id_Instrumento = ?"
                        );
                        
                        $stmt3->execute([
                            $_POST["Id_Instrumento"]
                        ]);
    
                        if ($stmt3->rowCount() > 0) {
                            echo json_encode(["error" => false, "message" => "Se eliminado el instrumento de evaluación."]);
                        } else {
                            echo json_encode(["error" => true, "message" => "No se ha podido eliminar el instrumento de evalaución que seleccionó, inténtelo más tarde."]);
                        }
                    }

                } else {
                    echo json_encode(["error" => false, 'permition' => false, "message" => "Usted no tiene permiso para eliminar este instrumento de evaluación."]);
                }

            } else {
                echo json_encode(["error" => true, "message" => "No se ha podido eliminar el instrumento de evalaución, inténtelo más tarde"]);
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

        public function readInstrumento () {
            if (isset($_POST["purpose"]) && isset($_POST["Id_Instrumento"])) {

                if ($_POST["purpose"] == 1) {       //Only 1

                    $stmt = $this->pdo->prepare(
                        "SELECT * FROM instrumento
                            where Id_Instrumento = ?"
                    );
                    $stmt->execute([
                        $_POST["Id_Instrumento"]
                    ]);

                } else if ($_POST["purpose"] == 2) {

                    $stmt = $this->pdo->prepare(
                        "SELECT * FROM instrumento"
                    );
                    $stmt->execute([]);
                }

                if ($stmt->rowCount() > 0) {
                    $iRows = array();
                    while ($iRow = $stmt->fetch(PDO::FETCH_ASSOC)) {
                        $instr = new instrumentoModel();
                        $instr->setId_Instrumento($iRow["Id_Instrumento"]);
                        $instr->setCreador($iRow["Creador"]);
                        $instr->setTipoInstrumento($iRow["TipoInstrumento"]);
                        $instr->setTipoEvaluacion($iRow["TipoEvaluacion"]);
                        $instr->setClaveElem($iRow["ClaveElem"]);
                        $instr->setNombElemento($iRow["NombElemento"]);
                        $instr->setInstruccLlenado($iRow["InstruccLlenado"]);
                        $instr->setMateria($iRow["Materia"]);


                        $row = ([
                           'Id_Instrumento' => $instr->getId_Instrumento(),
                            'Creador' => $instr->getCreador(),
                            'TipoInstrumento' => $instr->getTipoInstrumento(),
                            'TipoEvaluacion' => $instr->getTipoEvaluacion(),
                            'ClaveElem' => $instr->getClaveElem(),
                            'NombElemento' => $instr->getNombElemento(),
                            'InstruccLlenado' => $instr->getInstruccLlenado(),
                            'Materia' => $instr->getMateria()
                        ]);
                        $iRows[] = $row;
                    }

                    echo json_encode(["built" => true, "iRows" => $iRows]);
                } else {
                    echo json_encode(["built" => false]);
                }
            }
        }

        public function readInsturmentoByIdLocal($Id_I) {
            if(isset($Id_I)) {
                $stmt = $this->pdo->prepare(
                    "SELECT * FROM instrumento
                        where Id_Instrumento = ?"
                );
                $stmt->execute([
                    $Id_I
                ]);

                if ($stmt->rowCount() > 0) {                    
                    while ($i = $stmt->fetch(PDO::FETCH_ASSOC)) {
                        $in = new instrumentoModel();
                        $in->setId_Instrumento(intval($i["Id_Instrumento"]));
                        $in->setCreador(intval($i["Creador"]));
                        $in->setTipoInstrumento(intval($i["TipoInstrumento"]));
                        $in->setTipoEvaluacion(intval($i["TipoEvaluacion"]));
                        $in->setClaveElem($i["ClaveElem"]);
                        $in->setNombElemento($i["NombElemento"]);
                        $in->setInstruccLlenado($i["InstruccLlenado"]);
                        $in->setMateria($i["Materia"]);

                        $matCtrlr = new materiaController($this->pdo);
                        $m = $matCtrlr->getMateriaByIdLocal($in->getMateria());

                        $typeInCtrlr = new tipoinstrumentoController($this->pdo);
                        $tInstr = $typeInCtrlr->readTipoInstrumentoById($in->getTipoInstrumento());
                        
                        $ins = ([
                            'Id_Instrumento' => $in->getId_Instrumento(),
                            'Creador' => $in->getCreador(),
                            'TipoInstrumento' => $tInstr,
                            'Id_TipoIn' => $in->getTipoInstrumento(),
                            'TipoEvaluacion' => $in->getTipoEvaluacion(),
                            'ClaveElem' => $in->getClaveElem(),
                            'NombElemento' => $in->getNombElemento(),
                            'InstruccLlenado' => $in->getInstruccLlenado(),
                            'Materia' => $m->getMateria(),
                            'Id_Materia' => $in->getMateria()
                        ]);                        
                    }
                    return $ins;                    
                } else {
                    return null;
                }                
            } else {
                return null;
            }
        }

        public function readInstrumentoByCreador() {
            if (isset($_SESSION["userreg"])) {
                $stmt = $this->pdo->prepare(
                    "SELECT * FROM instrumento
                        WHERE Creador = ?"
                );
                $stmt->execute([
                    $_SESSION["userreg"]
                ]);

                if ($stmt->rowCount() > 0) {

                    $instR = array();
                    while ($i = $stmt->fetch(PDO::FETCH_ASSOC)) {
                        $in = new instrumentoModel();
                        $in->setId_Instrumento(intval($i["Id_Instrumento"]));
                        $in->setCreador(intval($i["Creador"]));
                        $in->setTipoInstrumento(intval($i["TipoInstrumento"]));
                        $in->setTipoEvaluacion(intval($i["TipoEvaluacion"]));
                        $in->setClaveElem($i["ClaveElem"]);
                        $in->setNombElemento($i["NombElemento"]);
                        $in->setInstruccLlenado($i["InstruccLlenado"]);
                        $in->setMateria($i["Materia"]);

                        $matCtrlr = new materiaController($this->pdo);
                        $m = $matCtrlr->getMateriaByIdLocal($in->getMateria());

                        $typeInCtrlr = new tipoinstrumentoController($this->pdo);
                        $tInstr = $typeInCtrlr->readTipoInstrumentoById($in->getTipoInstrumento());
                        
                        $ins = ([
                            'Id_Instrumento' => $in->getId_Instrumento(),
                            'Creador' => $in->getCreador(),
                            'TipoInstrumento' => $tInstr,
                            'Id_TipoIn' => $in->getTipoInstrumento(),
                            'TipoEvaluacion' => $in->getTipoEvaluacion(),
                            'ClaveElem' => $in->getClaveElem(),
                            'NombElemento' => $in->getNombElemento(),
                            'InstruccLlenado' => $in->getInstruccLlenado(),
                            'Materia' => $m->getMateria(),
                            'Id_Materia' => $in->getMateria()
                        ]);

                        $instR[] = $ins;
                    }
                    echo json_encode (['error' => false, 'built' => true, 'instrUser' => $instR]);
                } else {
                    echo json_encode(['error' => false, 'built' => false]);
                }
            } else {
                echo json_encode(['error' => true]);
            }
        }

    }
?>