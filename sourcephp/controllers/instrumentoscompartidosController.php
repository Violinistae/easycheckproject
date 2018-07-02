<?php
    class instrumentoscompartidosController extends BaseController {
        public function insertSharedInstr () {
            if (isset($_POST["Id_Instrumento"]) && isset($_POST["Id_Academia"]) && isset($_POST["Id_Materia"])) {
                $stmt = $this->pdo->prepare(
                    "INSERT INTO instrumentoscompartidos (
                        Materia, Instrumento, Academia
                    ) values (
                        ?, ?, ?
                    )"
                );

                $stmt->execute([
                    $_POST["Id_Materia"], 
                    $_POST["Id_Instrumento"],
                    $_POST["Id_Academia"]
                ]);

                if ($stmt->rowCount() > 0) {
                    echo json_encode (['error' => false, 'message' => "Instrumento de evaluación compartido exitosamente."]);
                } else {
                    echo json_encode (['error' => true, 'message' => "No se pudo compartir el instrumento de evalaución, inténtelo más tarde."]);
                }
            } else {
                echo json_encode (['error' => true, 'message' => "No se pudo compartir el instrumento de evalaución, inténtelo más tarde."]);
            }
        }

        public function readAcadSharedInstr() {
            if (isset($_POST["Id_Academia"])) {
                $stmt= $this->pdo->prepare(
                    "SELECT Id_SharedInstr, instrumentoscompartidos.Materia, 
                    instrumentoscompartidos.Instrumento, instrumentoscompartidos.Academia 
                        FROM instrumentoscompartidos JOIN instrumento 
                        ON instrumentoscompartidos.Instrumento = instrumento.Id_Instrumento 
                        WHERE Academia = ? 
                        ORDER BY instrumentoscompartidos.Materia, instrumento.ClaveElem"
                );
                $stmt->execute([
                    $_POST["Id_Academia"]
                ]);

                if ($stmt->rowCount() > 0) {

                    $allSharedInstr = array();

                    while($instr = $stmt->fetch(PDO::FETCH_ASSOC)) {
                        $sharedI = new instrumentoscompartidosModel();
                        $sharedI->setId_SharedInstr($instr["Id_SharedInstr"]);
                        $sharedI->setInstrumento($instr["Instrumento"]);
                        $sharedI->setMateria($instr["Materia"]);
                        $sharedI->setAcademia($instr["Academia"]);

                        $instrCtrlr = new instrumentoController($this->pdo);
                        $sInstr = $instrCtrlr->readInsturmentoByIdLocal($sharedI->getInstrumento());

                        if ($sInstr != null)
                            $allSharedInstr [] = $sInstr;
                        
                    }

                    echo json_encode(['error' => false, 'built' => true, 'sharedInst' => $allSharedInstr]);

                } else {
                    echo json_encode(['error' => false, 'built' => false]);
                }
            } else {
                echo json_encode(['error' => true]);
            }
        }

        public function readMateriaSharedInst () {
            if (isset($_POST["Id_Materia"])) {
                $stmt= $this->pdo->prepare(
                    "SELECT * FROM instrumentoscompartidos JOIN instrumento 
                        ON instrumentoscompartidos.Instrumento = instrumento.Id_Instrumento
                        WHERE instrumentoscompartidos.Materia = ? ORDER BY instrumento.ClaveElem"
                );
                
                $stmt->execute([
                    $_POST["Id_Materia"]
                ]);

                if ($stmt->rowCount() > 0) {

                    $allSharedInstr = array();

                    while($instr = $stmt->fetch(PDO::FETCH_ASSOC)) {
                        $sharedI = new instrumentoscompartidosModel();
                        $sharedI->setId_SharedInstr($instr["Id_SharedInstr"]);
                        $sharedI->setInstrumento($instr["Instrumento"]);
                        $sharedI->setMateria($instr["Materia"]);
                        $sharedI->setAcademia($instr["Academia"]);

                        $instrCtrlr = new instrumentoController($this->pdo);
                        $sInstr = $instrCtrlr->readInsturmentoByIdLocal($sharedI->getInstrumento());

                        if ($sInstr != null)
                            $allSharedInstr [] = $sInstr;
                        
                    }

                    echo json_encode(['error' => false, 'built' => true, 'sharedInst' => $allSharedInstr]);

                } else {
                    echo json_encode(['error' => false, 'built' => false]);
                }
            } else {
                echo json_encode (['error' => true]);
            }
        }

        public function readMateriaSharedInstByClave () {
            if (isset($_POST["Materia"]) && isset($_POST["ValParData"]) && isset($_POST["Alumno"])) {

                $Califiaciones = [];
                $InstrData = [];
                for ($i = 0; $i < $_POST["ValParLeng"]; ++$i) {
                    $stmt = $this->pdo->prepare(
                        "SELECT instrumentoscompartidos.Materia, instrumento.Id_Instrumento, 
                        instrumento.TipoInstrumento FROM instrumentoscompartidos JOIN instrumento 
                            ON instrumentoscompartidos.Instrumento = instrumento.Id_Instrumento
                        WHERE instrumentoscompartidos.Materia = ? AND instrumento.ClaveElem = ? "
                    );
                    $stmt->execute([
                        $_POST["Materia"],
                        $_POST["ValParData"][$i][1]
                    ]);

                    if ($stmt->rowCount() == 1) {
                        $In = [];
                        while ($res = $stmt->fetch(PDO::FETCH_ASSOC)) {
                            $In = [
                                'Id_Instrumento' => intval($res["Id_Instrumento"]),
                                'Materia' => intval($res["Materia"]),
                                'TipoInstrumento' => intval($res["TipoInstrumento"])
                            ];
                        }

                        switch ($In["TipoInstrumento"]) {
                            case 1:
                                $Califiaciones;
                                break;
                            case 2:
                                $evLCctrlr = new evaluacionfilalistacController($this->pdo);
                                $Califiaciones [] = $evLCctrlr->getEvalLCByAlumnoLocal($_POST["Alumno"], $In["Id_Instrumento"]);
                                break;
                            case 3:
                                # code...
                                $evGOCtrlr = new evaluacionfilaguiaobsController($this->pdo);
                                $Califiaciones [] = $evGOCtrlr->getEvalGOByAlumnoLocal($_POST["Alumno"], $In["Id_Instrumento"]);
                                break;
                            case 4:
                                # code...
                                break;
                        }

                    } else {
                        $Califiaciones [] = [
                            "000", "00"
                        ];
                    }
                }
                echo json_encode(['error' => false, 'Calf' => $Califiaciones]);
            } else {
                echo json_encode(['error' => true]);
            }
        }

        public function verifySharedInstr ($Id_Ins) {
            $stmt = $this->pdo->prepare(
                "SELECT * FROM instrumentoscompartidos
                    WHERE Instrumento = ?"
            );
            $stmt->execute([
                $Id_Ins
            ]);

                //Verificar si ya hay un instrumento con la misma clave y la misma materia

            if ($stmt->rowCount() > 0) {
                return true;
            } else {
                return false;
            }
        }

        public function noShareInstr () {
            if (isset($_POST["Id_Instrumento"])) {

                if ($this->verifySharedInstr($_POST["Id_Instrumento"])) {
                    
                    $stmt = $this->pdo->prepare(
                        "DELETE FROM instrumentoscompartidos
                            WHERE Instrumento = ?"
                    );
                    $stmt->execute([
                        $_POST["Id_Instrumento"]
                    ]);

                    if ($stmt->rowCount() > 0) {
                        echo json_encode (['error' => false, 'built' => true]);
                    } else {
                        echo json_encode (['error' => true, 'x' => $stmt->errorInfo()]);
                    }
                    
                } else {
                    echo json_encode (['error' => true, 'built' => false]);
                }                
            } else {
                echo json_encode (['error' => true]);
            }
        }
    }
    
?>