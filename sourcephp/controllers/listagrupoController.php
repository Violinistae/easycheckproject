<?php
    class listagrupoController extends BaseController {
        public function verifytoInsertNewGpoPMember () {
            if (isset($_POST["Id_GpoPeriodo"]) && isset($_POST["Registro_U"])) {
                $stmt = $this->pdo->prepare(
                    "SELECT * FROM listagrupo
                        WHERE Alumno = ? AND GpoPeriodo = ?"
                );
                $stmt->execute([
                    $_POST["Registro_U"],
                    $_POST["Id_GpoPeriodo"]
                ]);

                if ($stmt->rowCount() < 1) {
                    $stmt2 = $this->pdo->prepare(
                        "INSERT INTO listagrupo (
                            Alumno, GpoPeriodo
                        ) values (
                            ?, ?
                        )"
                    );

                    $stmt2->execute([
                        $_POST["Registro_U"],
                        $_POST["Id_GpoPeriodo"],
                    ]);

                    if ($stmt2->rowCount() > 0) {
                        echo json_encode (['already' => false, 'error' => false]);
                    } else {
                        echo json_encode (['already' => false, 'error' => true]);
                    }

                } else {
                    echo json_encode (['already' => true]);
                }
            }
        }

        public function getGposPByMember() {
            if (isset($_SESSION["userreg"])) {
                $stmt = $this->pdo->prepare(
                    "SELECT * FROM listagrupo
                        WHERE Alumno = ?"
                );
                $stmt->execute([
                    $_SESSION["userreg"]
                ]);

                if ($stmt->rowCount() > 0) {
                    $gposP = [];
                    $gpCtrlr = new grupoperiodoController($this->pdo);
                    while ($gpRow = $stmt->fetch(PDO::FETCH_ASSOC)) {
                        $aux = $gpCtrlr->readGpoPeriodoByIdLocal(intval($gpRow["GpoPeriodo"]));
                        $gposP[] = $aux[0];
                    }

                    echo json_encode(['error' => false, 'built' => true, 'gposP' => $gposP]);
                } else {
                    echo json_encode (['error' => false, 'built' => false]);
                }
            } else {
                echo json_encode(['error' => true]);
            }
        }
    }
?>