<?php
    class tipoevaluacionController extends BaseController {
        public function readTipoEvaluacion() {
            $TiposEvaluacion = $this->pdo->prepare(
                "SELECT * FROM tipoevaluacion ORDER BY Id_TipoEv"
            );

            $TiposEvaluacion->execute();
            $evaluationTypes = array();

            while ($TipoEv = $TiposEvaluacion->fetch(PDO::FETCH_ASSOC)) {
                $evType = new tipoevaluacionModel(); 
                $evType->setId_TipoEv($TipoEv["Id_TipoEv"]);
                $evType->setTipoEvaluacion($TipoEv["TipoEvaluacion"]);

                $et = array(
                    'Id_TipoEv' => $evType->getId_TipoEv(), 
                    'TipoEvaluacion' => $evType->getTipoEvaluacion()
                );

                $evaluationTypes[] = $et;

            }
            
            echo json_encode(array('tiposEvaluacion' => $evaluationTypes));
        }
    }
    
?>