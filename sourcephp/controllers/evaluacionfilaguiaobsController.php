<?php
    class evaluacionfilaguiaobsController extends BaseController {
        public function cleanAlumnoEvLCByFilaGO () {
            if (isset($_POST["Eval_FilasGO"]) && isset($_POST["Alumno"])) {
                for ($i = 0; $i < $_POST["numEvalFilasGO"]; ++$i) {
                    $stmt = $this->pdo->prepare(
                        "DELETE FROM evaluacionfilaguiaobs
                            WHERE Evaluado = ? AND FilaGuiaObs = ?"
                    );
                    $stmt->execute([
                        $_POST["Alumno"],
                        $_POST["Eval_FilasGO"][$i][0]
                    ]);                    
                }
                echo json_encode(['error' => false]);
            } else {
                echo json_encode(['error' => true]);
            }
        }

        public function saveAlumnoEvGO () {
            if (isset($_POST["Eval_FilasGO"]) && isset($_POST["Alumno"]) && isset($_SESSION["userreg"])) {
                $cont = 0;
                for ($i = 0; $i < $_POST["numEvalFilasGO"]; ++$i) {
                    $stmt = $this->pdo->prepare(
                        "INSERT INTO evaluacionfilaguiaobs (
                            FilaGuiaObs,
                            Evaluado,
                            Evaluador,
                            Cumplimiento
                        ) values (
                            ?, ?, ?, ?
                        )"
                    );
                    $stmt->execute([
                        $_POST["Eval_FilasGO"][$i][0],
                        $_POST["Alumno"],
                        $_SESSION["userreg"],
                        $_POST["Eval_FilasGO"][$i][1]
                    ]);
                    if ($stmt->rowCount() == 1) {
                        $cont++;
                    }
                }

                if ($cont == $_POST["numEvalFilasGO"]) {
                    echo json_encode (["error" => false]);
                } else {
                    echo json_encode (["error" => true, 'x' => $stmt->rowCount()]);
                }
            } else {
                echo json_encode (["error" => true]);
            }
        }

        public function getEvalGOByAlumno () {
            if (isset($_POST["Alumno"]) && isset($_POST["Id_Instrumento"])) {
                $stmt = $this->pdo->prepare(
                    "SELECT evaluacionfilaguiaobs.* FROM evaluacionfilaguiaobs JOIN guiadeobservacion ON
                    evaluacionfilaguiaobs.FilaGuiaObs = guiadeobservacion.Id_FilaGuiadO 
                        WHERE Evaluado = ? AND guiadeobservacion.Instrumento = ?"
                );

                $stmt->execute([
                    $_POST["Alumno"],
                    $_POST["Id_Instrumento"]
                ]);

                if ($stmt->rowCount() > 0) {
                    
                    $data = [];
                    while ($evRowsLC = $stmt->fetch(PDO::FETCH_ASSOC)) {
                        $d = [
                            $evRowsLC["FilaGuiaObs"],
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

        public function getEvalGOByAlumnoLocal ($AlumnoReg, $Id_Inst) {
            $stmt = $this->pdo->prepare(
                "SELECT evaluacionfilaguiaobs.*, guiadeobservacion.PonderacionElem FROM evaluacionfilaguiaobs JOIN guiadeobservacion ON
                evaluacionfilaguiaobs.FilaGuiaObs = guiadeobservacion.Id_FilaGuiadO 
                    WHERE Evaluado = ? AND guiadeobservacion.Instrumento = ?"
            );

            $stmt->execute([
                $AlumnoReg,
                $Id_Inst
            ]);

            if ($stmt->rowCount() > 0) {
                $data = [];
                while ($evRowsGO = $stmt->fetch(PDO::FETCH_ASSOC)) {
                    $d = [
                        $evRowsGO["FilaGuiaObs"],
                        $evRowsGO["Cumplimiento"],
                        $evRowsGO["PonderacionElem"]
                    ];
                    $data [] = $d;
                }

                $sum = 0;
                for ($i = 0; $i < $stmt->rowCount(); ++$i) {
                    if (intval($data[$i][1]) == 1)
                        $sum += intval($data[$i][2]);
                }
                $punt = 0;

                $arr = [
                    $sum,
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