<div>
	<div>
		<button><<span></span></button>
	</div>
	<div>
		<label>Integrantes Academia <?php echo "Nombre Academia"; ?></label>
		<ul>
			<li>Nombre</li>
			<li>Apellidos</li>
			<?php $cantidadintegrantes = 3; 
			for ($i = 0; $i < $cantidadintegrantes; $i++):?>
				<li><?php echo "Nombre del integrante"; ?></li>
				<li><?php echo "Apellidos integrante"; ?></li>
			<?php endfor; ?>
		</ul>
	</div>
</div>