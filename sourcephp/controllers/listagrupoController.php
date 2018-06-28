<?php
    class listagrupoController extends BaseController {
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
                        $aux = $gpCtrlr->readGpoPeriodoByIdLocal($gpRow["Id_ListaGrupo"]);
                        $gposP[] = $aux[0];
                    }

                    echo json_encode(['error' => false, 'bulit' => true, 'gposP' => $gposP]);
                } else {
                    echo json_encode (['error' => false, 'bulit' => false]);
                }
            } else {
                echo json_encode(['error' => true]);
            }
        }
    }
?>