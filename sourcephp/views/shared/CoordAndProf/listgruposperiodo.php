<link rel="stylesheet" type="text/css" href="../../source/css/styleListGruposPeriodo.css">
<input type="file" id="inputListaAlumnos" name="updateListaAlumnos"/>
<div id="listGposPPage">
    <nav>
        <ul id="listGposPNav">
            <li id="pathPage">
                <label>Grupos periodo creados</label>
            </li>
            <li id="inputNavGposP">
                <input type="text" id ="searchGpoPInput" name="searchGpoPInput" placeholder="Buscar materia">
            </li>
        </ul>
    </nav>

    <table id="allGPTable">
        <tr>
            <td>
                <table id="headGpTable">
                     <tr id="topTableRow">
                        <th class="claveCol">
                            Clave
                        </th>
                        <th class="materiaCol">
                            Materia
                        </th>
                        <th class="cicloCol">
                            Ciclo Escolar
                        </th>
                        <th class="grupoCol">
                            Grupo
                        </th>
                        <th class="accionesGpo">
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