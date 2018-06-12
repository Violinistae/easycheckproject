<?php
    class tipoinstrumentoController extends BaseController {
        
        public function readTipoInstrumentoById($Id_TipoI) {
            if (isset($Id_TipoI)) {
                $stmt = $this->pdo->prepare(
                    "SELECT * FROM tipoinstrumento
                        WHERE Id_TipoInstr = ?"
                );

                $stmt->execute([
                    $Id_TipoI
                ]);

                $tInstr = $stmt->fetchAll();
                
                if (isset($tInstr[0])) {
                    $typeI = new tipoinstrumentoModel();
                    $typeI = $tInstr[0]->Id_TipoInstr;
                    $typeI = $tInstr[0]->TipoInstrumento;

                    return $typeI; 
                } else {
                    return null;
                }
            } else {
                return null;
            }
        }
        
    }
    
?>