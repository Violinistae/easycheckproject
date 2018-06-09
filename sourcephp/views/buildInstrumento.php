<html>
<head>
	<title>Easy Check - Crear Instrumento</title>
	<meta charset="utf-8">
	<meta name="viewport" content="width=device-width, initial-scale=1">
		
	<link rel="stylesheet" type="text/css" href="../../source/css/styleModals.css">
	<link rel="stylesheet" type="text/css" href="../../source/css/styleBuildInstrument.css">

	<link rel="shortcut icon" href="../../source/img/easycheckico.png" type="image/x-icon">	

	<link rel="stylesheet" type="text/css" href="../../source/css/styleBuildR.css">
	<link rel="stylesheet" type="text/css" href="../../source/css/styleBuildLC.css">
	<link rel="stylesheet" type="text/css" href="../../source/css/styleBuildGO.css">
	<link rel="stylesheet" type="text/css" href="../../source/css/styleBuildC.css">
	
</head>
<body>

	<div class="allcontainer">
		<div class="toolsBar" id="toolsBar">
			<div id="creatingLbl">
				<label id="typeInstrumento">Instrumento de Evaluación - </label>
				<label id="claveNombreInstr"></label>
			</div>
			<div id="addElementsBtns">
				<i id="addRowBtn" class="fas fa-plus-square" title="Agregar fila a instrumento"></i>
				<div class="dropableMenu" id="questionTypeDropMenu">
					
				</div>
			</div>
			<div id="saveChanges">
				<button id="saveChangesBtn">Guardar Cambios</button>
			</div>
		</div>
		<div class="maincontainer" id="maincontainer">

			<div id="tableInstrumentHead">

					<div id="headRRow">
						<div id="numElemHead" class="headRCol">
							<label class="RHeadLbl">No. de Elemento</label>
						</div>
						<div id="aspEvHead" class="headRCol">
							<label class="RHeadLbl">Aspecto de Evaluación</label>
						</div>
						<div id="descripElemHead" class="headRCol">
							<label class="RHeadLbl">Descripción Elemento</label>
						</div>
						<div id="criteriosEvHead" class="headRCol">
							<label class="RHeadLbl">Indicadores de Evaluación</label>
							<input id="numCriterios" type="text" placeholder="Ingrese #Criterios">
						</div>
						<div id="deleteRowHead" class="headRCol">
							<label class="RHeadLbl"></label>
						</div>
					</div>

			</div>

			<div id="submaincontainer">
				<div id="rowsContainer">

					<div class="instrumentRow rowR">
						<div class="rowRElement" id="numElem">
							<p class="rowRContent" id="numElemento">1</p>
						</div>
						<div class="rowRElement aspEv">
							<div class="aspEvDiv">
								<input type="radio" class="aspEvInst aspEvItem" name="aspEv" value="1" checked>
								<label class="aspEvItem">Saber</label>
							</div>
							<div class="aspEvDiv">
								<input type="radio" class="aspEvInst aspEvItem" name="aspEv" value="2">
								<label class="aspEvItem">Hacer</label>
							</div>
							<div class="aspEvDiv">
								<input type="radio" class="aspEvInst aspEvItem" name="aspEv" value="3">
								<label class="aspEvItem">Ser</label>
							</div>
						</div>
						<div class="rowRElement descripElemCol">
							<div class="lblsDescripElem">
								<label id="countCharDescripElem">Caracteres restantes: 40</label>
							</div>
							<textarea class="descripElem" id="descripElem1" name="descripElem1" autocomplete="off"></textarea>
						</div>
						<div class="rowRElement criteriosEvContainer">

							<div class="criterioEv">
								<div class="criteriosEvInputs">
									<div>
										<input type="text" class="identInput" id="identCriterio" name="identCriterio" placeholder="Identificador">
									</div>
									<div>
										<input type="text" class="identInput" id="valorIdent" name="valorIdent" placeholder="Puntaje">
									</div>
								</div>
								<div class="lblsCriteriosEv">
									<label id="countCharCriteriosEv1">Caracteres restantes: 260</label>
								</div>
								<textarea class="descripIdent" id="descripIdent1" name="descripIdent1" autocomplete="off" placeholder="Descripción"></textarea>
							</div>

							<div class="criterioEv">
								<div class="criteriosEvInputs">
									<div>
										<input type="text" class="identInput" id="identCriterio" name="identCriterio" placeholder="Identificador">
									</div>
									<div>
										<input type="text" class="identInput" id="valorIdent" name="valorIdent" placeholder="Puntaje">
									</div>
								</div>
								<div class="lblsCriteriosEv">
									<label id="countCharCriteriosEv1">Caracteres restantes: 260</label>
								</div>
								<textarea class="descripIdent" id="descripIdent1" name="descripIdent1" autocomplete="off" placeholder="Descripción"></textarea>
							</div>
							<div class="criterioEv">
								<div class="criteriosEvInputs">
									<div>
										<input type="text" class="identInput" id="identCriterio" name="identCriterio" placeholder="Identificador">
									</div>
									<div>
										<input type="text" class="identInput" id="valorIdent" name="valorIdent" placeholder="Puntaje">
									</div>
								</div>
								<div class="lblsCriteriosEv">
									<label id="countCharCriteriosEv1">Caracteres restantes: 260</label>
								</div>
								<textarea class="descripIdent" id="descripIdent1" name="descripIdent1" autocomplete="off" placeholder="Descripción"></textarea>
							</div>
							<div class="criterioEv">
								<div class="criteriosEvInputs">
									<div>
										<input type="text" class="identInput" id="identCriterio" name="identCriterio" placeholder="Identificador">
									</div>
									<div>
										<input type="text" class="identInput" id="valorIdent" name="valorIdent" placeholder="Puntaje">
									</div>
								</div>
								<div class="lblsCriteriosEv">
									<label id="countCharCriteriosEv1">Caracteres restantes: 260</label>
								</div>
								<textarea class="descripIdent" id="descripIdent1" name="descripIdent1" autocomplete="off" placeholder="Descripción"></textarea>
							</div>

							<div class="criterioEv">
								<div class="criteriosEvInputs">
									<div>
										<input type="text" class="identInput" id="identCriterio" name="identCriterio" placeholder="Identificador">
									</div>
									<div>
										<input type="text" class="identInput" id="valorIdent" name="valorIdent" placeholder="Puntaje">
									</div>
								</div>
								<div class="lblsCriteriosEv">
									<label id="countCharCriteriosEv1">Caracteres restantes: 260</label>
								</div>
								<textarea class="descripIdent" id="descripIdent1" name="descripIdent1" autocomplete="off" placeholder="Descripción"></textarea>
							</div>										
						</div>

						<div class="rowRElement" id="deleteRow">
							<i class="fas fa-minus-square deleteRowBtn" id="deleteRowBtn" title="Eliminar fila"></i>
						</div>
					</div>
					
				</div>
			</div>

		</div>
	</div>

</body>

<script type="text/javascript" src="../../source/resources/jquery-3.2.1.min.js"></script>
<script type="text/javascript" src="../../source/resources/jquery-ui-1.12.1/jquery-ui.min.js"></script>	

<script type="text/javascript" src="../../source/js/appGeneral.js"></script>
<script type="text/javascript" src="../../source/js/appBuildInstAJAX.js"></script>
<script type="text/javascript" src="../../source/js/appBuildInstrumento.js"></script>

<script type="text/javascript" src="../../source/js/appBuildR.js"></script>
<script type="text/javascript" src="../../source/js/appBuildLC.js"></script>
<script type="text/javascript" src="../../source/js/appBuildGO.js"></script>
<script type="text/javascript" src="../../source/js/appBuildC.js"></script>

<script type="text/javascript" src="../../source/resources/font-awesome/js/fontawesome-all.min.js"></script>
</html>