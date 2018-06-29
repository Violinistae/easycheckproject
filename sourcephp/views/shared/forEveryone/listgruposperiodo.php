<link rel="stylesheet" type="text/css" href="../../source/css/styleListGruposPeriodo.css">
<input type="file" id="inputListaAlumnos" name="updateListaAlumnos"/>
<div id="listGposPPage">
    <nav>
        <ul id="listGposPNav">
            <li id="pathPage">
                <label id="pathGP">Grupos Periodo creados</label>
            </li>
            <li id="inputNavGposP">
                <input type="text" id ="searchGpoPInput" name="searchGpoPInput" placeholder="Buscar grupo periodo">
            </li>
        </ul>
    </nav>

    <table id="allGPTable">
        <tr>
            <td>
                <table id="headGpTable">
                     <tr id="topTableRow">
                        <th class="headColGP claveCol">
                            Clave
                        </th>
                        <th class="headColGP materiaCol">
                            Materia
                        </th>
                        <th class="headColGP cicloCol">
                            Ciclo Escolar
                        </th>
                        <th class="headColGP grupoCol">
                            Grado / Grupo
                        </th>
                        <th class="headColGP accionesGpo">
                            Acciones Gpo Periodo
                        </th>
                    </tr>        
                </table>
            </td>
        </tr>
        <tr>
            <td>
                <div id="forGPOverflow">
                    <table id="listGposPMainC">                                     
                    </table>
                </div>
            </td>
        </tr>
    </table>

    <div id="noGposPAvailable">

    </div>
</div>
<script type="text/javascript" src="../../source/js/appListGruposPeriodo.js"></script>