<link rel="stylesheet" href="../../source/css/styleRequestGpoP.css">
<div id="resquestGpoPContainer">
	<div id="instruccRequestGpoP">
		<p>Solicitud a Grupo Periodo</p>	
	</div>
	<form id="requestGpoPForm" action="" method="post">
		<div>	
			<label>Clave Grupo Periodo</label>
			<input type="text" id="claveGpoPeriodo" name="claveGpoPeriodo" autocomplete="off">
		</div>
		<div>	
			<label>Materia del Grupo Periodo</label>
			<input type="text" id="materiaGpoP" name="materiaGpoP" autocomplete="off">
        </div>
        <div>
            <label>Grupo</label>
            <select name="grupoSelect" id="grupoSelect">
                <option value="null">- Grupo -</option>
            </select>
        </div>
		<div>
			<label>Clave Única de Acceso</label>
			<input type="password" id="claveAccesoGpoP" name="claveAccesoGpoP" autocomplete="off">
		</div>
		<div id="sendRequesGPDiv">
			<input id="sendGpoPRequest" type="submit" value="Enviar">
		</div>
	</form>
</div>
<script type="text/javascript" src="../../source/js/appRequestGpoP.js"></script>