<?php
    class instrumentoController extends BaseController {
        public function getDataCreateInstrument() {

            $createInstrData = array(
                'tipoInstrumento' => $_POST["tipoInstrumento"],                 
                'claveElemento' => $_POST["claveElemento"],
                'nombreElemento' => $_POST["nombreElemento"]                
            );

            echo json_encode(array('createInst' => $createInstrData));
            return;           

        }
    }
?>