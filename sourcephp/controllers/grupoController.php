<?php
    class grupoController extends BaseController {
        public function readGrupos() {
            $stmt = $this->pdo->prepare(
                "SELECT * FROM grupo"
            );

            $stmt->execute([]);

            $gpos = array();
            while ($g = $stmt->fetch(PDO::FETCH_ASSOC)) {
                $gpo = ([
                    'Id_Grupo' => $g["Id_Grupo"],
                    'Grupo' => $g["Grupo"]
                ]);

                $gpos [] = $gpo;
            }

            echo json_encode(['error' => false, 'Grupos' => $gpos]);
        }

        public function readGrupoByIdLocal($GpoId) {
            if (isset($GpoId)) {
                $stmt = $this->pdo->prepare(
                    "SELECT * FROM grupo
                        WHERE Id_Grupo = ?"
                );

                $stmt->execute([
                    $GpoId
                ]);

                $r = $stmt->fetch(PDO::FETCH_ASSOC);

                $g = new grupoModel();
                $g->setId_Grupo(intval($r["Id_Grupo"]));
                $g->setGrupo($r["Grupo"]);

                return $g;
            }
        }
    }

?>