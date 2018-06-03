<html>
<head>
	<title>Easy Check - Crear Instrumento</title>
	<meta charset="utf-8">
	<meta name="viewport" content="width=device-width, initial-scale=1">
		
	<link rel="stylesheet" type="text/css" href="../../source/css/styleModals.css">
	<link rel="stylesheet" type="text/css" href="../../source/css/styleBuildInstrument.css">

	<link rel="shortcut icon" href="../../source/img/easycheckico.png" type="image/x-icon">	

	<link rel="stylesheet" type="text/css" href="../../source/css/styleBuildLC.css">
	<link rel="stylesheet" type="text/css" href="../../source/css/styleBuildGO.css">
	<link rel="stylesheet" type="text/css" href="../../source/css/styleBuildC.css">
	
</head>
<body>
	<div class="modalwarning" id="modwarning">
		<div id="modalwarningcontent">
			<div id="warningtitle">
				<p>Favor de confirmar la acción</p>
			</div>
			<div id="warningtexts">
				<p id="warningprincipaltext"></p>
				<p id="warningsecondarytext"></p>
			</div>
			<div id="confirmbtns">
				<button id="confirmbtn">Aceptar</button>
				<button id="cancelbtn">Cancelar</button>
			</div>
		</div>
	</div>

	<div class="modalinformation" id="modinformation">
		<div id="modalinformationcontent">
			<div id="informationtitle">
				<p></p>
			</div>
			<div id="informationtexts">
				<p id="informationprincipaltext"></p>
				<p id="informationsecondarytext"></p>
			</div>
			<div id="continuebtns">
				<button id="continuebtn">Continuar</button>
			</div>
		</div>
	</div>
	
	<div class="modalforactions" id="modforactions">
		<div id="modalforactionscontent">
			<div id="modalforactionsmainbtns">
				<i class="fas fa-chevron-circle-left" id="returnmodalbtn"></i>
				<i class="fa fa-times-circle" id="exitmodalbtn"></i>
			</div>
			<div id="modalforactionscontainer">

			</div>
		</div>
	</div>

	<div class="allcontainer">
		<div class="toolsBar" id="toolsBar">
			<div id="creatingLbl">
				<label id="typeInstrumento">Instrumento de Evaluación - </label>
				<label id="claveNombreInstr"></label>
			</div>
			<div id="addElementsBtns">
				<i id="addRowBtn" class="fas fa-plus-square" title="Agregar fila a instrumento"></i>
			</div>
			<div id="saveChanges">
				<button id="saveChangesBtn">Guardar Cambios</button>
			</div>
		</div>
		<div class="maincontainer" id="maincontainer">

			<div id="tableInstrumentHead">
			</div>

			<div id="submaincontainer">
				<div id="rowsContainer">
				
					<div class="instrumentRow rowCMultiple">
						<div class="rowCElement">
							<p class="rowCContent" id="numElemento">1</p>
						</div>
						<div class="aspEv">						
								<input type="radio" name="aspEv" value="1" checked>Saber
								<input type="radio" name="aspEv" value="2">Hacer
								<input type="radio" name="aspEv" value="3">Ser
						</div>

						<div class="rowCElement pregRes" id="pregResContainer">

							<div class="pregCol" id="pregCol">
								<div class="lblsPregTxtArea">
									<label id="countCharPreg">Caracteres restantes: 260</label>
								</div>
								<textarea class="pregTxtArea" id="pregTxtArea" name="pregTxtArea" autocomplete="off"></textarea>
							</div>

							<div class="resCol" id="resCol">

								<div class="opcPregPart">
									<div class="pregOpcion">
										<div class="lblsPregOpcTxtArea">
											<label id="countCharPregOpc">Restantes: 60</label>
										</div>
										<input type="text" class="opcPregTxtInput" id="opcPregTxtInput" name="opcPregTxtInput"  placeholder="Opción A" autocomplete="off">
									</div>

									<div class="pregOpcion">
										<div class="lblsPregOpcTxtArea">
											<label id="countCharPregOpc">Restantes: 60</label>
										</div>
										<input type="text" class="opcPregTxtInput" id="opcPregTxtInput" name="opcPregTxtInput"  placeholder="Opción B" autocomplete="off">
									</div>
								</div>
								<div class="opcPregPart">
									<div class="pregOpcion">
										<div class="lblsPregOpcTxtArea">
											<label id="countCharPregOpc">Restantes: 60</label>
										</div>
										<input type="text" class="opcPregTxtInput" id="opcPregTxtInput" name="opcPregTxtInput"  placeholder="Opción C" autocomplete="off">
									</div>

									<div class="pregOpcion">
										<div class="lblsPregOpcTxtArea">
											<label id="countCharPregOpc">Restantes: 60</label>
										</div>
										<input type="text" class="opcPregTxtInput" id="opcPregTxtInput" name="opcPregTxtInput"  placeholder="Opción D" autocomplete="off">
									</div>
								</div>
								
							</div>

						</div>

						<div class="rowCElement" id="ponderacionRowC">
							<input type="text" id="pondElem" class="ponderacionElemento">&nbsp %
						</div>
						<div class="rowCElement">
							<i class="fas fa-minus-square deleteRowBtn" title="Eliminar fila"></i>
						</div>
					</div>
					
					

					<!-- 
						countCharPregOpc -> 11 (numpreg, numopc)
						opcPregTxtArea -> 11 (numpreg, numopc)
					-->


				</div>
			</div>

		</div>
	</div>
</body>

<script type="text/javascript" src="../../source/resources/jquery-3.2.1.min.js"></script>
<script type="text/javascript" src="../../source/resources/jquery-ui-1.12.1/jquery-ui.min.js"></script>	

<script type="text/javascript" src="../../source/js/appGeneral.js"></script>
<script type="text/javascript" src="../../source/js/appBuildInstrumento.js"></script>

<script type="text/javascript" src="../../source/js/appBuildLC.js"></script>
<script type="text/javascript" src="../../source/js/appBuildGO.js"></script>

<script type="text/javascript" src="../../source/resources/font-awesome/js/fontawesome-all.min.js"></script>
</html>