<?php
    class academiaController extends BaseController {
        public function getAcademiaByCoordinador () {
            
            $queryAcadByCoord = $this->pdo->prepare(
                "SELECT * from academia                    
                where Coordinador_Acad = ?"
            );

            $queryAcadByCoord->execute(array(
                $_SESSION["userreg"]
            ));

            if ($queryAcadByCoord->rowCount() > 0) {
                $academia = new academiaModel();

                $resAcadByCoord = $queryAcadByCoord->fetch(PDO::FETCH_ASSOC);

                $academia->setId_Academia($resAcadByCoord["Id_Academia"]);
                $academia->setAcademia($resAcadByCoord["Academia"]);
                $academia->setClave_Acceso($resAcadByCoord["Clave_Acceso"]);
                $academia->setCiclo_Periodo($resAcadByCoord["Ciclo_Periodo"]);
                $academia->setLista_Prof($resAcadByCoord["Lista_Prof"]);
                $academia->setCoordinador_Acad($_SESSION["userreg"]);
                $academia->setCarrera($resAcadByCoord["Carrera"]);

                return $academia;
            } else {
                return null;
            }
            
        }
    }
    
?>