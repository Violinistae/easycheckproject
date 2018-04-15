<div>
	<nav>
		<ul>
			<li>
				<label><?php echo "Grupos > Academia"; ?></label>
			</li>
			<li>
				<input type="text" name="" value="">
				<button class="filtrar"><span></span></button>
			</li>
			<li>
				<span></span>
			</li>	
		</ul>
	</nav>
	<div>
		<ul>
			<li>Academia</li>
			<li>Ciclo Escolar</li>
			<?php $cantidadAcad = 2; 
			for ($i = 0; $i < $cantidadintegrantes; $i++):?>
				<li><?php echo "Nombre academia"; ?></li>
				<li><?php echo "Ciclo escolar"; ?></li>
			<?php endfor; ?>
		</ul>
	</div>
</div>