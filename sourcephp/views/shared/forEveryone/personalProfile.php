<div>
	<nav>
		<p>Perfil</p>
	</nav>
	<div class="profilegrid">
		<div>
			<div>
				<span id="fotoperfil"></span>
				<button>Cambiar Foto Perfil</button>
				<button>Editar Perfil</button>
				<button>Eliminar Cuenta</button>
			</div>
			<div>
				<div>
					<label>Registro de Usuario</label>
					<p><?php echo "Registro de Usuario";?></p>
				</div>
				<div>
					<label>Correo Electrónico</label>
					<p><?php echo "Correo Electrónico";?></p>
				</div>
				<div>
					<label>Nombre(s)</label>
					<p><?php echo "Nombres";?></p>
				</div>
				<div>
					<label>Apellidos</label>
					<p><?php echo "Apellidos";?></p>
				</div>
				<div>
					<label>Escuela/Institución</label>
					<p><?php echo "CETI";?></p>
				</div>
			</div>

			<div>
				<?php if (true /*Cuenta tipo Coordinador o Profesor*/): ?>
					<div>
						<label>Escolaridad</label>
						<p><?php echo "Escolaridad"; ?></p>
					</div>	
				<?php endif ?>
					
				<?php
					if(true/*Cuenta es tipo Coordinador*/):
				?>
					<div>
						<label>Academia</label>
						<p><?php echo "Academia"; ?></p>
					</div>
					<div>
						<label>Carrera</label>
						<p><?php echo "Carrera"; ?></p>
					</div>
					<div>
						<label>Ciclo Escolar</label>
						<p><?php
							echo "Ciclo Escolar";
							//Realizar la consulta y de ahí determinar que string imprimir
						?></p>
					</div>
				<?php endif;?>
			</div>
		</div>
	</div>
</div>