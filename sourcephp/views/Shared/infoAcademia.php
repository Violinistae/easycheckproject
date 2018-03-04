<?php
	//Consulta tipo usuario-> variable para if
?>
<div>
	<div>
		<button><<span></span></button>
	</div>
	<div>
		<div>
			<div>
				<label>Nombre de Academia</label>
			<?php
				//Realizar consulta nombre acad aqui
				if ("Cuenta Coordinador"):?>
					<input type="text" name="" value='<?php echo "Valor de la consulta de nom acad"; ?>' placeholder="">
			<?php
				endif;
				else:?>
					<label><?php echo "Valor de la consulta de nom acad"; ?></label>
			<?php 
				endif;?>
			</div>

			<div>
				<label>Ciclo Escolar</label>
			<?php
				
				if ("Cuenta Coordinador"):?>
					<select name="" multiple>
						<?php echo "Valor Consulta"; ?>
						<option value="Feb_Jun">Feb_Jun</option>
						<option value="Ago_Dic">Ago_Dic</option>
					</select>
					<select name="" multiple>
						<?php
							echo 'ValorConsulta';
							for ($i = 1995; $i < 2019; ++$i):
						?>
							<option value="<?php echo $i;?>"><?php echo $i;?></option>
						<?php endfor; ?>
					</select>
			<?php 
				endif;
				else:?>
					<label><?php echo "Ciclo Escolar"; ?></label>
					<label><?php echo "Año"; ?></label>
			<?php 
				endif;?>
			</div>

			<div>
				
			</div>
		</div>
		<div>
			<div>
				
			</div>
			<div>
				
			</div>
			<div>
				
			</div>
		</div>
	</div>
</div>