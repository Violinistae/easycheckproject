<?php
    class grupoperiodoController extends BaseController {
        public function insertGrupoPeriodo() {
            if (isset($_POST["Materia"])) {
                $mctrlr = new materiaController($this->pdo);
                $m = $mctrlr->getMateriaByIdLocal($_POST["Materia"]);

                //SELECT de grupoperiodo con esas características

                if ($m != null) {
                    $stmt = $this->pdo->prepare(
                        "INSERT INTO grupoperiodo (
                            Materia,
                            Grupo,
                            Periodo,
                            Profesor,
                            Lista_Alumnos,
                            Clave_Acceso                            
                        ) values (
                            ?, ?, ?, ?, ?, ?
                        )"
                    );

                    $stmt->execute([
                        $_POST["Materia"],
                        $_POST["Grupo"],
                        $_POST["Periodo"],
                        $_SESSION["userreg"],
                        $_POST["Lista_Alumnos"],
                        $_POST["Clave_Acceso"]
                    ]);

                    if ($stmt->rowCount() ) {
                        echo json_encode (['error' => false]);
                    } else {
                        echo json_encode (['error' => true]);
                    }

                } else {
                    echo json_encode(['error' => false, 'builtMat' => false]);
                }
            } else {
                echo json_encode(['error' => true]);
            }

        }
    }
?>