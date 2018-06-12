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
                    "SELECT * FROM instrumentoscompartidos
                        WHERE Academia = ?"
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
    }
    
?>