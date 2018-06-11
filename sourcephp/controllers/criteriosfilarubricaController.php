<?php
    class criteriosfilarubricaController extends BaseController {

        public function insertCriterioFilaR($dataCriterio, $FilaR) {

            $criterioR = new criteriosfilarubricaModel();
            $criterioR->setFilaRubrica($FilaR);
            $criterioR->setIdentificador($dataCriterio[0][0]);
            $criterioR->setDescripcionIdent($dataCriterio[1]);
            $criterioR->setValorIdent($dataCriterio[0][1]);            

            $stmt = $this->pdo->prepare(
                "INSERT INTO criteriosfilarubrica (
                    FilaRubrica,
                    Identificador,
                    DescripcionIdent,
                    ValorIdent
                ) values (
                    ?, ?, ?, ?
                )"
            );

            $stmt->execute([
                $criterioR->getFilaRubrica(),
                $criterioR->getIdentificador(),
                $criterioR->getDescripcionIdent(),
                $criterioR->getValorIdent() 
            ]);

        }
    }
    
?>