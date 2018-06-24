<?php
    class grupoperiodoController extends BaseController {
        public function insertGrupoPeriodo() {
            if (isset($_POST["Materia"])) {
                $mctrlr = new materiaController($this->pdo);
                $m = $mctrlr->getMateriaByIdLocal($_POST["Materia"]);                                

                if ($m != null) {
                    
                    $gpoPData = ([
                        'Materia' => $_POST["Materia"],                    
                        'Grupo' => $_POST["Grupo"],
                        'Periodo' => $_POST["Periodo"],
                        'Profesor' => $_SESSION["userreg"],
                        'Lista_Alumnos' => $_POST["Lista_Alumnos"],
                        'Clave_Acceso' => $_POST["Clave_Acceso"]
                    ]);

                    if (verifyGpoPeriodo($gpoPData)) {
                        echo json_encode(['error' => false, 'alreadyExists' => true]);
                        return;
                    }

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
    
        private function verifyGpoPeriodo($gpoPData) {
            $stmt = $this->pdo->prepare(
                "SELECT * FROM grupoperiodo
                    WHERE
                Materia = ? AND
                Grupo = ? AND
                Periodo = ? AND
                Profesor = ? AND
                Lista_Alumnos = ? AND
                Clave_Acceso = ? "
            );

            $stmt->execute([
                $gpoPData["Materia"],
                $gpoPData["Grupo"],
                $gpoPData["Periodo"],
                $gpoPData["Lista_Alumnos"],
                $gpoPData["Clave_Acceso"]
            ]);

            if ($stmt->rowCount() > 0) {
                return true;
            } else {
                return false;
            }

        }        

        public function readGposPeriodoByProf() {
            if (isset($_SESSION["userreg"])) {
                $stmt = $this->pdo->prepare(
                    "SELECT * FROM grupoperiodo
                        WHERE Profesor = ?"
                );

                $stmt->execute([
                    $_SESSION["userreg"]
                ]);

                if ($stmt->rowCount() > 0) {
                    $gposP = array();
                    while ($gpRow = $stmt->fetch(PDO::FETCH_ASSOC)) {
                        $gpOj = new grupoperiodoModel($this->pdo);
                        $gpOj->setId_GpoPeriodo(intval($gpRow["Id_GpoPeriodo"]));
                        $gpOj->setMateria(intval($gpRow["Materia"]));
                        $gpOj->setGrupo(intval($gpRow["Grupo"]));
                        $gpOj->setPeriodo($gpRow["Periodo"]);
                        $gpOj->setProfesor(intval($gpRow["Profesor"]));
                        $gpOj->setLista_Alumnos($gpRow["Lista_Alumnos"]);
                        $gpOj->setClave_Acceso($gpRow["Clave_Acceso"]);

                        $matctrlr = new materiaController($this->pdo);
                        $mat = $matctrlr->getMateriaByIdLocal($gpRow["Materia"]);
                        $gpoCtrlr = new grupoController($this->pdo);
                        $gpo = $gpoCtrlr->readGrupoByIdLocal($gpRow["Grupo"]);                        
                        
                        $gpA = ([
                            'Id_GpoPeriodo' => $gpOj->getId_GpoPeriodo(),
                            'Materia' => $mat->getMateria(),
                            'Grupo' => $gpo->getGrupo(),
                            'Periodo' => $gpOj->getPeriodo(),
                            'Profesor' => $gpOj->getProfesor(),
                            'Lista_Alumnos' => $gpOj->getLista_Alumnos(),
                            'Clave_Acceso' => $gpOj->getClave_Acceso()
                        ]);

                        $gposP [] = $gpA;
                    }

                    echo json_encode (['error' => false, 'built' => true, 'gposP' => $gposP]);

                } else {
                    echo json_encode (['error' => false, 'built' => false]);
                }
            } else {
                echo json_encode (['error' => true]);
            }
        }

        public function getGpoPById () {
            if (isset($_POST["Id_GpoPeriodo"])) {
                $stmt = $this->pdo->prepare(
                    "SELECT * FROM grupoperiodo
                        WHERE Id_GpoPeriodo = ?"
                );
                $stmt->execute([
                    $_POST["Id_GpoPeriodo"]
                ]);

                $grupoPeriodo = $stmt->fetchAll();

                if (isset($grupoPeriodo[0])) {

                    $grupop = new grupoperiodoModel();
                    $grupop->setId_GpoPeriodo($_POST["Id_GpoPeriodo"]);
                    $grupop->setMateria(intval($grupoPeriodo[0]->Materia));
                    $grupop->setGrupo(intval($grupoPeriodo[0]->Grupo));
                    $grupop->setPeriodo($grupoPeriodo[0]->Periodo);
                    $grupop->setProfesor(intval($grupoPeriodo[0]->Profesor));
                    $grupop->setLista_Alumnos($grupoPeriodo[0]->Lista_Alumnos);
                    $grupop->setClave_Acceso($grupoPeriodo[0]->Clave_Acceso);
                    
                    $matCtrlr = new materiaController($this->pdo);
                    $mat = $matCtrlr->getMateriaByIdLocal($grupop->getMateria());
                    $m = [
                        'Id_Materia' => $mat->getId_Materia(),
                        'Materia' => $mat->getMateria(),
                        'Semestre' => $mat->getSemestre()
                    ];

                    $gpoCtrlr = new grupoController($this->pdo);
                    $gpo = $gpoCtrlr->readGrupoByIdLocal($grupop->getGrupo());
                    $g = [
                        'Grupo' => $gpo->getGrupo()
                    ];

                    $userCtrlr = new usuarioController($this->pdo);
                    $prof = $userCtrlr->getUserForSimpleById($grupop->getProfesor());
                    $profesor = [
                        'Nombres' => $prof->getNombres(),
                        'Apellidos' => $prof->getApellidos()
                    ];

                    $gp = [
                        'Id_GrupoPeriodo' => $grupop->getId_GpoPeriodo(),
                        'Materia' => $m,
                        'Grupo' => $g,
                        'Periodo' => $grupop->getPeriodo(),
                        'Profesor' => $profesor,
                        'Lista_Alumnos' => $grupop->getLista_Alumnos(),
                        'Clave_Acceso'=> $grupop->getClave_Acceso()
                    ];

                    echo json_encode(['error'=> false, 'built' => true, 'gpoperiodo' => $gp]);
                } else {
                    echo json_encode (['error' => false, 'built' => false, 'x' => $stmt->errorInfo()]);
                }
            } else {
                echo json_encode(['error' => true]);
            }
        }
    }
?>