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

        public function readCriteriosFilaR ($Id_R) {
            $stmt = $this->pdo->prepare(
                "SELECT * FROM criteriosfilarubrica
                    WHERE FilaRubrica = ?"
            );
            $stmt->execute([
                $Id_R
            ]);

            if ($stmt->rowCount() > 0) {

                $criterios = array();
                while ($criterio = $stmt->fetch(PDO::FETCH_ASSOC)) {
                    $cr = new criteriosfilarubricaModel();
                    $cr->setFilaRubrica(intval($criterio["FilaRubrica"]));
                    $cr->setIdentificador($criterio["Identificador"]);
                    $cr->setDescripcionIdent($criterio["DescripcionIdent"]);
                    $cr->setValorIdent(intval($criterio["ValorIdent"]));                    
                    
                    $c = ([
                        'Identificador' => $cr->getIdentificador(),
                        'ValorIdent' => $cr->getValorIdent()
                    ]);

                    $crt = ([
                        'headIdentificador' => $c,
                        'DescripcionIdent' => $cr->getDescripcionIdent()
                    ]);
                    
                    $criterios[] = $crt;
                }

                return $criterios;

            } else {
                return null;
            }
        }

    }
    
?>