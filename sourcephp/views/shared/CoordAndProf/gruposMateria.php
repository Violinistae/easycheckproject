<div>
	<nav>
		<ul>
			<li>
				<label><?php echo "Grupos > Materia"; ?></label>
			</li>
			<li>
				<input type="text" name="" value="">
				<button class="filtrar"><span></span></button>
			</li>
			<li>
				<span></span>
			</li>
			<?php if (true/*Cuenta Profesor*/):?>
				<li>
					<span></span>
				</li>
			<?php endif; ?>
		</ul>
	</nav>
	<div>
		<ul>
			<li>Materia</li>
			<li>Ciclo Escolar</li>
			<li>Semestre</li>
			<li>Grupo</li>
			<?php $cantidadAcad = 2; 
			for ($i = 0; $i < $cantidadintegrantes; $i++):?>
				<li><?php echo "Nombre academia"; ?></li>
				<li><?php echo "Ciclo escolar"; ?></li>
				<li><?php echo "Semestre"; ?></li>
				<li><?php echo "Grupo"; ?></li>
			<?php endfor; ?>
		</ul>
	</div>
</div>