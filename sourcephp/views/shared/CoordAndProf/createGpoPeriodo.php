<link rel="stylesheet" type="text/css" href="../../source/css/styleCreateGpoPeriodo.css">
<div id="createGpoPeriodoInstrucc">
    <p>Ingrese los datos solicitados para crear un grupo Periodo</p>
</div>
<div id="createGpoPeriodoInputs">
    <div id="acadSelectContainer">
        <label>Academia</label>
        <select name="academiaSelect" id="academiaSelect">
        </select>
    </div>
    <div id="matSelectContainer">
        <label>Materia</label>
        <select name="materiaSelect" id="materiaSelect">
        </select>
    </div>
    <div id="periodoContainer">
        <label>Periodo</label>
        <div id="periodPart">
            <select name="periodCiclo" id="periodCiclo"></select>
            <select name="periodoYear" id="periodoYear"></select>
        </div>
    </div>
    <div id="listaAlumContainer">
        <label>Archivo Excel Valores Parciales</label>
            
        <button id="listaAlumBtn">
            Seleccionar Archivo
            <input type="file" name="listaAlumFile" id="listaAlumFile">
        </button>
    </div>
</div>
<script type="text/javascript" src="../../source/js/appCreateGpoPeriodo.js"></script>