<?php
	//Consulta tipo usuario-> variable para if    Realizar función desde controlador
	//Realizar query de consulta que regrese todos los datos de la academia
	$acadqueryresult = "resultado de query de acad";
	$creadoracad = "Creador Academia";
?>
<div>
	<div>
		<button><span></span></button>
	</div>
	<div>
		<div>
			<label>Información Academia <?php echo $acadqueryresult; ?></label>
			<div>
				<label>Nombre de Academia</label>
			<?php
				if (true/*"Cuenta Coordinador"*/):?>
					<input type="text" name="nombreAcad" value='<?php echo $acadqueryresult;?>' placeholder="">
			<?php
				else: ?>
					<label><?php echo $acadqueryresult; ?></label>
			<?php 
				endif;?>
			</div>

			<div>
				<label>Ciclo Escolar</label>
			<?php
				
				if (true/*"Cuenta Coordinador"*/):?>
					<select name="cicloEscolar" multiple>
						<?php echo $acadqueryresult; ?>
						<option value="Feb_Jun">Feb_Jun</option>
						<option value="Ago_Dic">Ago_Dic</option>
					</select>
					<select name="yearCicloE" multiple>
						<?php
							echo $acadqueryresult;
							for ($i = 1995; $i < 2019; ++$i):
						?>
							<option value="<?php echo $i;?>"><?php echo $i;?></option>
						<?php endfor; ?>
					</select>
			<?php 
				else:?>
					<label><?php echo $acadqueryresult; ?></label>
					<label><?php echo $acadqueryresult; ?></label>
			<?php 
				endif;?>
			</div>

			<div>
				<label>Clave única de acceso</label>
			<?php
				if(true/*"Coordinador de Academia"*/):
			?>
				<input type="text" name="claveAccesoAcad" value='<?php echo $acadqueryresult; ?>' placeholder="">
			
			<?php
				else:?>
					<label><?php echo $acadqueryresult; ?></label>
			<?php
				endif;?>
			</div>
		</div>
		<div>
			<div>
				<label>Lista Profesores</label>
				<?php if("Coordinador de Academia"):?>
				<input type="file" name="listaProfesores">
				<button id="loadlista" value="Subir" onclick="handleFileSelect();"></button>
			<?php
				else:?>
					<label>Creador de Grupo Academia</label>
					<label><?php echo $creadoracad; ?></label>
			<?php
				endif;?>
			</div>
			<div>
				<label>Número máximo de Integrantes</label>
				<?php if(true/*"Coordinador de Academia"*/):?>
				<input type="text" name="numintegAcad" value='<?php echo $acadqueryresult; ?>' placeholder="">
			<?php
				else:?>
					<label><?php echo $acadqueryresult; ?></label>
			<?php
				endif;?>
			</div>
			<div>
				<?php if(true/*"Coordinador de Academia"*/):?>
				<button name="updateAcadInfo" class="upadateAcadInfo">Actualizar Información</button>
			<?php
				else:?>
					<button name="leaveAcad" class="leaveAcad">Actualizar Información</button>
			<?php
				endif;?>
			</div>
		</div>
	</div>
</div>