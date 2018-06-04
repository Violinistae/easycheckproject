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
    }
    
?>