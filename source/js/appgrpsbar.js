$("#groupbarcontent").ready(function ($) {

    createMateria = (e) => {

        $(".buttonnewinst").removeClass('active');
        $(".subdropumen").removeClass('active');
        //Cookie name Action to do
        actionsCookieName = "aiCoTndDtoO";        
        setCookie(actionsCookieName, "createMateria", 7);
        $("#modforactions").fadeIn("400");

        $.ajax({
            url: "../../sourcephp/views/Users/coordinador/createMateria.php",
            type: "POST"
        }).done(function (resCreateMateriaForm) { 
            insertCreateMateriaForm(resCreateMateriaForm);
            
        }).fail(function () {
            AJAXrequestFailed("Fallo en petición AJAX para insertar formulario de creación de materia");
        });
    }

        insertCreateMateriaForm = (resCreateMateriaForm) => {            
            document.getElementById("modalforactionscontainer").innerHTML = resCreateMateriaForm;            
            getAndExecuteNewInsertedScript(document.getElementById("modalforactionscontainer"));
        }

    createGpoPeriodo = (e) => {
        $(".buttonnewinst").removeClass('active');
        $(".subdropumen").removeClass('active');
        //Cookie name Action to do
        actionsCookieName = "aiCoTndDtoO";
        setCookie(actionsCookieName, "createMateria", 7);
        $("#modforactions").fadeIn("400");

        $.ajax({
            url: "../../sourcephp/views/shared/CoordAndProf/createGpoPeriodo.php",
            type: "POST"
        }).done(function (resCreateGpoPeriodoForm) {
            insertCreateGpoPeriodoForm(resCreateGpoPeriodoForm);
        }).fail(function () {
            AJAXrequestFailed("Fallo en petición AJAX para insertar formulario de creación de grupo periodo");
        });
    }

        insertCreateGpoPeriodoForm = (resCreateGpoPeriodoForm) => {
            document.getElementById("modalforactionscontainer").innerHTML = resCreateGpoPeriodoForm;
            getAndExecuteNewInsertedScript(document.getElementById("modalforactionscontainer"));

            getSessionVariables(insertDataForGpoPe);
        }

        insertDataForGpoPe = (sessionVariables) => {
            if (!sessionVariables.error) {
                switch (parseInt(sessionVariables.usertype)) {
                    case 1:
                        dataAcademiaFromJS = {
                            fromJS: 1
                        };
                        $.ajax({
                            url: '../../index_ajax.php?controller=academia&action=getAcademiaByCoordinador',
                            type: 'POST',
                            dataType: 'json',
                            data: dataAcademiaFromJS
                        }).done(function (resAcademia) {
                            setAcadOnSelectForCoordGpoP(resAcademia);
                        }).fail(function () {
                            AJAXrequestFailed("Fallo en petición AJAX para obtener materias de cuenta de coordinador de academia.");
                        })
                        break;
                    case 2:
                        $.ajax({
                            url: "../../index_ajax.php?controller=integrantesacademia&action=getAcadMembers",
                            type: 'POST',
                            dataType: 'json'
                        }).done(function (resAcadsMemberOf) {
                            if (!resAcadsMemberOf.error) {
                                if (resAcadsMemberOf.memberAcads) {
                                    insertAcademiasProfMemberToSelectGpoP(resAcadsMemberOf.acads);
                                }
                            }
                        }).fail(function () {
                            AJAXrequestFailed("Fallo en petición para obtener academias miembro usuario");
                        })
                        break;
                }
            } else {
                closeUserSession();
            }
        }
        
        setAcadOnSelectForCoordGpoP = (resAcademia) => {
            let idAcad = parseInt(resAcademia.academia.Id_Academia);
            let acad = resAcademia.academia.Academia;

            let academiaSelect = document.getElementById("academiaSelect");
            let academiaCoordinada = document.createElement("option");

            academiaSelect.disabled = true;
            academiaSelect.remove(0);
            academiaCoordinada.text = acad;
            academiaCoordinada.value = idAcad;
            academiaSelect.add(academiaCoordinada);

            var materiaSelect = document.getElementById("materiaSelect");
            let toSelectMateria = document.createElement("option");

            materiaSelect.remove(0);
            materiaSelect.disabled = false;
            toSelectMateria.value = "null";
            toSelectMateria.text = "- Seleccione una materia -";
            materiaSelect.add(toSelectMateria);

            readMateriasData = {
                purpose: 2,
                idAcademia: idAcad
            }
            $.ajax({
                url: '../../index_ajax.php?controller=materia&action=readMateria',
                type: 'POST',
                dataType: 'json',
                data: readMateriasData
            }).done(function (materiasAcademia) {
                insertMateriasIntoSelectGpoP(materiasAcademia);
            }).fail(function () {
                AJAXrequestFailed("Fallo en petición AJAX obtener materias de una academia");
            });  

        }

            
    insertMateriasIntoSelectGpoP = (materiasAcademia) => {
        if (!materiasAcademia.error) {
            let materiasSelect = document.getElementById("materiaSelect");
            let materiasForSelect = materiasAcademia.materias;

            materiasForSelect.forEach(materia => {
                let optionMateria = document.createElement("option");
                optionMateria.value = materia.Id_Materia;
                optionMateria.text = materia.Materia;
                materiasSelect.add(optionMateria);
            });
            insertGrpsOnSelect();
        } else {
            let mainmessage = "Favor de recargar la página. Sentimos las molestias.";
            let secmessage = "Presione el botón para continuar";
            showMessage("wArNinGbTn_AcTiOn", 0, mainmessage, secmessage);
        }
    }

    insertAcademiasProfMemberToSelectGpoP = (acads) => {
        let academiaMateriaSelect = document.getElementById("academiaSelect");
        academiaMateriaSelect.remove(0);
        academiaMateriaSelect.disabled = false;

        let opc = document.createElement("option");
        opc.value = "null";
        opc.textContent = "- Seleccione una academia -";
        opc.selected = true;

        academiaMateriaSelect.add(opc);

        for (let i = 0; i < acads.length; ++i) {
            let op = document.createElement("option");
            op.value = acads[i][0];
            op.textContent = acads[i][1];
            academiaMateriaSelect.add(op);
        }
        insertGrpsOnSelect();
    }

    insertGrpsOnSelect = () => {

        $.ajax({
            url: '../../index_ajax.php?controller=grupo&action=readGrupos',
            type: 'POST',
            dataType: 'json'
        }).done(function (resGrps) {
            if (!resGrps.error) {
                let gps = resGrps.Grupos;
                var grupoSelect = document.getElementById("grupoSelect");
                for (let i = 0; i < gps.length; ++i) {
                    let op = document.createElement("option");
                    op.text = gps[i].Grupo;
                    op.value = gps[i].Id_Grupo;
                    grupoSelect.add(op);
                }
            }
        }).fail(function () {
            AJAXrequestFailed("Fallo en petición AJAX para insertar grupos en select");
        });
        
    }

// ---------------------------------------------------------------------------------------------------------------------------------
// ------------------------------------------- USER INTERACTION TRIGGERS -----------------------------------------------------------
// ---------------------------------------------------------------------------------------------------------------------------------

    // ------------------------------- Redirección a páginas ----------------------------------------------

    $('#showacadbtn').click(function (e) { gotoAcademiaOverview(); });
    $('#showmaterias').click(function (e) { gotoMaterias(e) });
    
    // --------------------------------- Cargar algún modal -----------------------------------------------
    $('#createmateria').click(function (e) { createMateria(e) });
    $('body').on('click', '#creategpoperiodobtn', function (e) { createGpoPeriodo(e); });
    $('body').on('click', '#showgrposperiodobtn', function (e) { gotoGposPeriodo(e); });
    
});