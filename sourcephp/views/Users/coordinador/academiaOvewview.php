<div>
	<nav>
		<ul>
			<li>
				<label><?php echo 'Academia Query'; ?></label>
			</li>
			<li>
				<span></span>
			</li>
		</ul>
	</nav>
	<div>
		<button>
			<label>Configuración de Grupo</label>
		</button>
		<button>
			<label>Información de Grupo</label>
		</button>
		<button>
			<label>Administrar integrantes</label>
		</button>
	</div>
	<div>
		<?php
			/*
			- Realizar consulta y verificar cantidad de instrumentos que puede ver
			- Verificar si el de búsqueda tiene algo para de ahí filtrar la búsqueda, si no solo se mostrarán todos los instrumetnos ordenados conforme al filtro.
			- Filtro principal --> materia alfabéticamente
			*/
			$long = 9;			//Query de cantidad de instrumentos que cumplen con el filtro
			//Grid de 3 horizontales
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
			<?php?endfor;
		?>
	</div>
</div>