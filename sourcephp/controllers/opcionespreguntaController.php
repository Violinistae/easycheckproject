<?php

    class opcionespreguntaController extends BaseController {
        
        public function insertOpcionPregunta($numOpcion, $Opcion, $Pregunta) {

            $opcionpregunta = new opcionespreguntaModel();
            $opcionpregunta->setNumOpcion($numOpcion);
            $opcionpregunta->setOpcion($Opcion);
            $opcionpregunta->setPregunta($Pregunta);

            $stmt = $this->pdo->prepare(
                "INSERT INTO opcionespregunta (
                    NumOpcion,
                    Opcion,
                    Pregunta
                ) values (
                    ?, ?, ?
                )"
            );

            $stmt->execute([
                $opcionpregunta->getNumOpcion(),
                $opcionpregunta->getOpcion(),
                $opcionpregunta->getPregunta()
            ]);

        }


        public function readOpcionesP ($preguntaId) {
            $stmt = $this->pdo->prepare(
                "SELECT * FROM opcionespregunta
                    WHERE Pregunta = ?"
            );
            $stmt->execute([
                $preguntaId
            ]);
            
            if ($stmt->rowCount() > 0) {
                $opcPreg = array();
                while ($option = $stmt->fetch(PDO::FETCH_ASSOC)) {
                    $opc = new opcionespreguntaModel();
                    $opc->setId_OpcionesP(intval($option["Id_OpcionesP"]));
                    $opc->setNumOpcion(intval($option["NumOpcion"]));
                    $opc->setOpcion($option["Opcion"]);
                    $opc->setPregunta($option["Pregunta"]);
                    
                    $o = ([
                        'Id_OpcionesP' => $opc->getId_OpcionesP(),
                        'NumOpcion' => $opc->getNumOpcion(),
                        'Opcion' => $opc->getOpcion(),
                        'Pregunta' => $opc->getPregunta(),
                    ]);

                    $opcPreg[] = $o;
                }

                return $opcPreg;
            } else {
                return null;
            }
        }

        public function readOpcionesPregunta () {
            if (isset($_POST["numPreg"])) {
                $stmt = $this->pdo->prepare(
                    "SELECT * FROM opcionespregunta
                        WHERE Pregunta = ?"
                );
                $stmt->execute([
                    $_POST["numPreg"]
                ]);
                
                if ($stmt->rowCount() > 0) {
                    $opcPreg = array();
                    while ($option = $stmt->fetch(PDO::FETCH_ASSOC)) {
                        $opc = new opcionespreguntaModel();
                        $opc->setId_OpcionesP(intval($option["Id_OpcionesP"]));
                        $opc->setNumOpcion(intval($option["NumOpcion"]));
                        $opc->setOpcion($option["Opcion"]);
                        $opc->setPregunta($option["Pregunta"]);
                        
                        $o = ([
                            'Id_OpcionesP' => $opc->getId_OpcionesP(),
                            'NumOpcion' => $opc->getNumOpcion(),
                            'Opcion' => $opc->getOpcion(),
                            'Pregunta' => $opc->getPregunta(),
                        ]);

                        $opcPreg[] = $o;
                    }

                    echo json_encode (['error' => false, 'opcPreg' => $opcPreg]);
                } else {
                    echo json_encode(['error' => true]);
                }
                
            } else {
                echo json_encode (['error' => true]);
            }
        }
    }
    
?>