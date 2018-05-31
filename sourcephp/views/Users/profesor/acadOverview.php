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
		<div class="instrumentsContainer">
			<?php
			$long = 16;
			for ($i = 0; $i < $long; $i++):
			?>
				<div id="<?php echo $i?>" class="instrumentDiv">
					<span class="instrumentImg">

					</span>
					<span class="instrumentTextPart">
						<label class="nomElemInstr">Nombre elemento</label>
						<label>Materia</label>	
					</span>
				</div>
			<?php endfor;?>
		</div>
	</div>
</div>
<script type="text/javascript" src="../../source/js/appAcadOverview<.js"></script>