<link rel="stylesheet" type="text/css" href="../../source/css/styleAcadOvewview.css">
<div id="acadOverview">
	<nav id="mainNavAcad">
		<ul>
			<li>
				<label id="academiaNamelbl">Nombre Academia</label>
			</li>			
		</ul>
	</nav>
	<div id="groupActionsBar">
		<button class="acadOverbtn">Configuración de Grupo</button>
		<button class="acadOverbtn">Información de Grupo</button>
		<button class="acadOverbtn">Administrar integrantes</button>
	</div>
	<div id="mainContainerAcadOverview">
		<?php
		$long = 9;
		for ($i = 0; $i < $long; $i++):
		?>
			<div>
				<span></span>
				<span>
					<p><?php
						echo "Tipo Instrumento + Nom Elemento + Materia?";
					?></p>
				</span>
			</div>
		<?php endfor;?>
	</div>
</div>