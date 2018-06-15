<link rel="stylesheet" type="text/css" href="../../source/css/styleListMaterias.css">
<input type="file" id="inputValoresParciales" name="updateValoresParciales"/>
<div id="listMateriasPage">
	<nav>
		<ul id="listMateriasNav">
			<li id="pathPage">
				<label>Materias Creadas</label>
			</li>
			<li id="inputsNavMaterias">
				<input type="text" id ="searchMateriaInput" name="searchMateria" placeholder="Buscar materia">
			</li>
		</ul>
	</nav>
		
	<table id="materiasTableContent">
		<tr id="topTableRow">
			<th>
				Clave Materia
			</th>
			<th>
				Nombre Materia
			</th>
			<th>
				Semestre
			</th>
			<th>
				Archivo
			</th>
			<th>
				Acciones Materia
			</th>
		</tr>
	</table>

	<div id="noMateriasAvailable">
    </div>
</div>
<script type="text/javascript" src="../../source/js/appListMaterias.js"></script>