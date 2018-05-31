<link rel="stylesheet" type="text/css" href="../../source/css/styleListAcademias.css">
<div id="listAcademiasPage">
	<nav>
		<ul id="listAcademiasNav">
			<li id="pathPage">
				<label>Grupos tipo Academia</label>
			</li>
            <li id="sendRequest">
                <i id="requestBtn" class="far fa-envelope" title="Realziar petición a grupo Academia"></i>
            </li>
			<li id="inputsNavAcademias">
				<input type="text" id ="searchAcademiaInput" name="searchAcademia" placeholder="Buscar academia">
			</li>            
		</ul>
	</nav>
		
	<table id="academiasTableContent">
		<tr id="topTableRow">
			<th>
				Clave Academia
			</th>
			<th>
				Nombre Academia
			</th>
			<th>
				Acciones Academia
			</th>
		</tr>
    </table>
    
    <div id="noAcademiasAvailable">
        <p>No hay grupos Academia a los que perteneza</p>
        <br>
        <p>Presione el ícono de mensaje para realizar una petición a alguna</p>
    </div>
</div>
<script type="text/javascript" src="../../source/js/appListAcademias.js"></script>	