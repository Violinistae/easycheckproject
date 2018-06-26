<link rel="stylesheet" type="text/css" href="../../source/css/styleCreateGpoPeriodo.css">
<div id="createGpoPeriodoInstrucc">
    <p>Ingrese los datos solicitados para crear un Grupo Periodo</p>
</div>
<form id="createGpoPeriodoInputs" action="">
    <div id="acadSelectContainer">
        <label>Academia</label>
        <select name="academiaSelect" id="academiaSelect">
            <option value="null">- Seleccione una academia -</option>
        </select>
    </div>
    <div id="matSelectContainer">
        <label>Materia</label>
        <select name="materiaSelect" id="materiaSelect" disabled>
            <option value="null">- Seleccione una academia -</option>
        </select>
    </div>
    <div id="claveAccessContainer">
        <label>Clave acceso a grupo</label>
        <input type="password" name="claveAccesoInput" id="claveAccesoInput">
    </div>
    <div id="claveAccess2Container">
        <label>Confirmar clave acceso</label>
        <input type="password" name="claveAccesoVerf" id="claveAccesoVerf">
    </div>
    <div id="grupoContainer">
        <label>Grupo</label>
        <select name="grupoSelect" id="grupoSelect">
            <option value="null">- Grupo -</option>
        </select>
    </div>
    <div id="periodoContainer">
        <label>Periodo</label>
        <div id="periodPart">
            <select name="periodoCiclo" id="periodoCiclo">
                <option value="Feb-Jun">Feb - Jun</option>
                <option value="Ago-Dic">Ago - Dic</option>
            </select>
            <select name="periodoYear" id="periodoYear">
                <?php 
                    $year = 2018;
                    for ($i = $year; $i > $year-5; $i--):
                ?>
                    <option value="<?php echo $i;?>"><?php echo $i;?></option>
                <?php endfor; ?>
            </select>	
        </div>
    </div>
    <div id="listaAlumContainer">
        <label>Archivo Excel Lista Alumnos</label>
            
        <button id="listaAlumBtn">
            Seleccionar Archivo
            <input type="file" name="listaAlumFile" id="listaAlumFile">
        </button>
    </div>

    <div id="creategpoperiodosubmit">
        <input id="creategpoperbtn" type="submit" value="Crear Grupo Periodo">
    </div>
</from>
<script type="text/javascript" src="../../source/js/appCreateGpoPeriodo.js"></script>