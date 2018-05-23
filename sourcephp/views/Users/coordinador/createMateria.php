<link rel="stylesheet" type="text/css" href="../../source/css/styleCreateMateria.css">
<div id="createmateriainstrucc">
    <p>Ingrese los datos solicitados para crear una materia</p>
</div>
    <div id="createmateriainputs">    
        <div id="nombremateria">
            <label>Nombre de la materia</label>
            <input type="text" name="nombremateria" autocomplete="off" id="inputNameMateria">
        </div>
        <div id="semestremateria">
            <label>Semestre</label>
            <select name="semestreselect" id="selectSemestreMateria">
                <option value="0" selected>Seleccione un Semestre</option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
                <option value="6">6</option>
                <option value="7">7</option>
                <option value="8">8</option>
            </select>
        </div>
        <div id="valoresparcialesfile">
            <label>Archivo Excel Valores Parciales</label>
            
            <button id="valoresparcialesbtn">
                Seleccionar Archivo
                <input type="file" name="valoresparicalesfile" id="valoresparcialesinput">
            </button>
        </div>
        <div id="createmateriasubmit">
            <input id="createmateriabtn" type="submit" value="Crear Materia">
        </div>
    </div>
<script type="text/javascript" src="../../source/js/appCreateMateria.js"></script>