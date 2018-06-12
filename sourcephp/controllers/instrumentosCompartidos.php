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
    }
    
?>