<link rel="stylesheet" type="text/css" href="../../source/css/styleAcadOvewview.css">
<div id="acadOverview">
	<nav>
		<ul>
			<li>
				<label id="academianamelbl">Nombre de Academia</label>
			</li>
			<li>
				<span></span>
			</li>
		</ul>
	</nav>
	<div>
		<div class="acadOverbtn1">
			<label>Configuración de Grupo</label>
		</div>
		<div class="acadOverbtn2">
			<label>Información de Grupo</label>
		</div>
		<div class="acadOverbtn3">
			<label>Administrar integrantes</label>
		</div>
	</div>
	<div>
		<span></span>
	</div>
	<div>
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