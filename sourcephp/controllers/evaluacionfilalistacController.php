<?php
    class evaluacionfilalistacController extends BaseController {
        public function cleanAlumnoEvLCByFilaLC () {
            if (isset($_POST["Eval_FilasLC"]) && isset($_POST["Alumno"])) {
                for ($i = 0; $i < $_POST["numEvalFilasLC"]; ++$i) {
                    $stmt = $this->pdo->prepare(
                        "DELETE FROM evaluacionfilalistac
                            WHERE Evaluado = ? AND FilaListaCotejo = ?"
                    );
                    $stmt->execute([
                        $_POST["Alumno"],
                        $_POST["Eval_FilasLC"][$i][0]
                    ]);                    
                }
                echo json_encode(['error' => false]);
            } else {
                echo json_encode(['error' => true]);
            }
        }

        public function saveAlumnoEvLC () {
            if (isset($_POST["Eval_FilasLC"]) && isset($_POST["Alumno"]) && isset($_SESSION["userreg"])) {

                $cont = 0;
                for ($i = 0; $i < $_POST["numEvalFilasLC"]; ++$i) {
                    $stmt = $this->pdo->prepare(
                        "INSERT INTO evaluacionfilalistac (
                            FilaListaCotejo,
                            Evaluado,
                            Evaluador,
                            Cumplimiento
                        ) values (
                            ?, ?, ?, ?
                        )"
                    );
                    $stmt->execute([
                        $_POST["Eval_FilasLC"][$i][0],
                        $_POST["Alumno"],
                        $_SESSION["userreg"],
                        $_POST["Eval_FilasLC"][$i][1]
                    ]);
                    if ($stmt->rowCount() == 1) {
                        $cont++;
                    }
                }

                if ($cont == $_POST["numEvalFilasLC"]) {
                    echo json_encode (["error" => false]);
                } else {
                    echo json_encode (["error" => true]);
                }
            } else {
                echo json_encode (["error" => true]);
            }
        }

        public function getEvalLCByAlumno () {
            if (isset($_POST["Alumno"]) && isset($_POST["Id_Instrumento"])) {
                $stmt = $this->pdo->prepare(
                    "SELECT evaluacionfilalistac.* FROM evaluacionfilalistac JOIN listacotejo ON
                    evaluacionfilalistac.FilaListaCotejo = listacotejo.Id_FilaListaC 
                        WHERE Evaluado = ? AND listacotejo.Instrumento = ?"
                );

                $stmt->execute([
                    $_POST["Alumno"],
                    $_POST["Id_Instrumento"]
                ]);

                if ($stmt->rowCount() > 0) {
                    
                    $data = [];
                    while ($evRowsLC = $stmt->fetch(PDO::FETCH_ASSOC)) {
                        $d = [
                            $evRowsLC["FilaListaCotejo"],
                            $evRowsLC["Cumplimiento"]
                        ];
                        $data [] = $d;
                    }
                    echo json_encode(['error' => false, 'data' => $data]);
                } else {
                    echo json_encode(['error' => false, 'data' => null]);
                }
            } else {
                echo json_encode(['error' => true]);
            }
        }

        public function getEvalLCByAlumnoLocal ($AlumnoReg, $Id_Inst) {
            $stmt = $this->pdo->prepare(
                "SELECT evaluacionfilalistac.* FROM evaluacionfilalistac JOIN listacotejo ON
                evaluacionfilalistac.FilaListaCotejo = listacotejo.Id_FilaListaC 
                    WHERE Evaluado = ? AND listacotejo.Instrumento = ?"
            );

            $stmt->execute([
                $AlumnoReg,
                $Id_Inst
            ]);

            if ($stmt->rowCount() > 0) {
                $data = [];
                while ($evRowsLC = $stmt->fetch(PDO::FETCH_ASSOC)) {
                    $d = [
                        $evRowsLC["FilaListaCotejo"],
                        $evRowsLC["Cumplimiento"]
                    ];
                    $data [] = $d;
                }

                $sum = 0;
                for ($i = 0; $i < $stmt->rowCount(); ++$i) {
                    $sum += intval($data[$i][1]) * 100; 
                }
                $prom = $sum/$stmt->rowCount();
                $punt = 0;

                $arr = [
                    $prom,
                    $punt
                ];
                return $arr;
                
            } else {
                $arr = [
                    "000",
                    "00"
                ];
            }
        }
    }
?>