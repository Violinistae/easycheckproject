<?php
    class instrumentoController extends BaseController {
        public function insertInstrumento() {

            $newInstrumento = new instrumentoModel();
            $newInstrumento->setCreador($_SESSION["userreg"]);
            $newInstrumento->setTipoInstrumento($_POST["tipoInstrumento"]);
            $newInstrumento->setTipoEvaluacion($_POST["tipoEv"]);
            $newInstrumento->setClaveElem($_POST["claveElemento"]);
            $newInstrumento->setNombElemento($_POST["nombreElemento"]);
            $newInstrumento->setInstruccLlenado($_POST["instruccionesLlenado"]);
            $newInstrumento->setMateria($_POST["materiaId"]);

            $stmt = $this->pdo->prepare(
                "INSERT INTO instrumento (
                    Creador,
                    TipoInstrumento,
                    TipoEvaluacion,
                    ClaveElem,
                    NombElemento,
                    InstruccLlenado,
                    Materia
                ) values (
                    ?, ?, ?, ?, ?, ?, ?
                )"
            );
            $stmt->execute([
                $newInstrumento->getCreador(),
                $newInstrumento->getTipoInstrumento(),
                $newInstrumento->getTipoEvaluacion(),
                $newInstrumento->getClaveElem(),
                $newInstrumento->getNombElemento(),
                $newInstrumento->getInstruccLlenado(),
                $newInstrumento->getMateria()
            ]);

            //Verify error ?

            $newInstrumento->setId_Instrumento($this->pdo->lastinsertId());

            $inst = array(
                'Id_Instrumento' =>$newInstrumento->getId_Instrumento(),
                'Creador' =>$newInstrumento->getCreador(),
                'TipoInstrumento' =>$newInstrumento->getTipoInstrumento(),
                'TipoEvaluacion' =>$newInstrumento->getTipoEvaluacion(),
                'ClaveElem' =>$newInstrumento->getClaveElem(),
                'NombElem' =>$newInstrumento->getNombElemento(),
                'InstruccLlenado' =>$newInstrumento->getInstruccLlenado(),
                'Materia' =>$newInstrumento->getMateria()
            );

            echo json_encode(array('instrumento' => $inst));
            return;
        }
    }
?>