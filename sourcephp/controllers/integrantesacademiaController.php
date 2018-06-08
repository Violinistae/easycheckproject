<?php
    class integrantesacademiaController extends BaseController {
        public function verifyToInsertNewMember () {
            if (isset($_POST["Id_Academia"]) && isset($_POST["Registro_U"])) {
                $stmt = $this->pdo->prepare(
                    "SELECT * FROM integrantesacademia
                        WHERE Academia = ? AND Integrante = ?"
                );
                $stmt->execute([
                    $_POST["Id_Academia"],
                    $_POST["Registro_U"]
                ]);

                if ($stmt->rowCount() < 1) {
                    $stmt2 = $this->pdo->prepare(
                        "INSERT INTO integrantesacademia (
                            Academia, Integrante
                        ) values (
                            ?, ?
                        )"
                    );

                    $stmt2->execute([
                        $_POST["Id_Academia"],
                        $_POST["Registro_U"]
                    ]);

                    if ($stmt2->rowCount() > 0) {
                        echo json_encode (['already' => false, 'error' => false, 'nameAcad' => $_POST["Academia"]]);
                    } else {
                        echo json_encode (['already' => false, 'error' => true]);
                    }

                } else {
                    echo json_encode (['already' => true]);
                }
            }
        }

        public function getAcadMembers () {
        if (isset($_SESSION["userreg"])) {
            $stmt = $this->pdo->prepare(
                "SELECT academia.Id_Academia, academia.Academia FROM usuario, integrantesacademia
                Join academia ON integrantesacademia.academia = academia.Id_Academia 
                where integrantesacademia.Integrante = usuario.Registro_U 
                and usuario.Registro_U = ?"
            );

            $stmt->execute([
                $_SESSION["userreg"]
            ]);

            if ($stmt->rowCount() > 0) {
                $memberAcad = [];
                while ($ac = $stmt->fetch(PDO::FETCH_ASSOC)) {
                    $acadM = [
                        $ac["Id_Academia"],
                        $ac["Academia"]
                    ];
                    $memberAcad [] = $acadM;
                }
                echo json_encode (['error' => false, 'memberAcads' => true, 'acads' => $memberAcad]);
            } else {
                echo json_encode (['error' => false, 'memberAcads' => false]);
            }
        } else {
            echo json_encode (['error' => true]);
        }
    }

    }
?>