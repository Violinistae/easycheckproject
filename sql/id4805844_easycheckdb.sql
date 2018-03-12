-- phpMyAdmin SQL Dump
-- version 4.6.5.2
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 12-03-2018 a las 07:05:58
-- Versión del servidor: 10.1.21-MariaDB
-- Versión de PHP: 7.1.1

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `id4805844_easycheckdb`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `academia`
--

CREATE TABLE `academia` (
  `Id_Academia` int(11) NOT NULL,
  `Academia` varchar(28) NOT NULL,
  `Carrera` varchar(38) NOT NULL,
  `Clave_Acceso` varchar(20) NOT NULL,
  `Ciclo_Year` smallint(6) NOT NULL,
  `Ciclo_Periodo` varchar(8) NOT NULL,
  `Max_Integrantes` tinyint(4) NOT NULL,
  `Lista_Prof` varchar(50) NOT NULL,
  `CoordinadorAcad` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `acciones`
--

CREATE TABLE `acciones` (
  `Id_Acciones` smallint(6) NOT NULL,
  `Controlador` varchar(30) NOT NULL,
  `Metodo` varchar(30) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `acciones`
--

INSERT INTO `acciones` (`Id_Acciones`, `Controlador`, `Metodo`) VALUES
(1, 'Users', 'login'),
(2, 'Users', 'verifyUser');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `aspectosevaluacion`
--

CREATE TABLE `aspectosevaluacion` (
  `Id_Aspecto` tinyint(4) NOT NULL,
  `Descripcion` varchar(5) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `aspectosevaluacion`
--

INSERT INTO `aspectosevaluacion` (`Id_Aspecto`, `Descripcion`) VALUES
(1, 'Saber'),
(2, 'Hacer'),
(3, 'Ser');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `criteriosrubrica`
--

CREATE TABLE `criteriosrubrica` (
  `Id_CriteriosFilaR` int(11) NOT NULL,
  `FilaRubrica` int(11) NOT NULL,
  `Identificador` varchar(15) NOT NULL,
  `DescripcionIdent` varchar(260) NOT NULL,
  `ValorIdent` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `cuestionario`
--

CREATE TABLE `cuestionario` (
  `Id_FilaCues` int(11) NOT NULL,
  `Instrumento` int(11) NOT NULL,
  `Pregunta_Tipo` tinyint(4) NOT NULL,
  `AspectoEv` tinyint(4) NOT NULL,
  `NumPregunta` tinyint(4) NOT NULL,
  `Pregunta` varchar(260) NOT NULL,
  `PonderacionPreg` tinyint(4) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `evaluacionfilasguiaobs`
--

CREATE TABLE `evaluacionfilasguiaobs` (
  `Id_EvFilaGuiaObs` int(11) NOT NULL,
  `Evaluador` int(11) NOT NULL,
  `Evaluado` int(11) NOT NULL,
  `FilaGuiaObs` int(11) NOT NULL,
  `Cumplimiento` tinyint(1) NOT NULL,
  `Puntaje` tinyint(4) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `evaluacionfilaslistacotejo`
--

CREATE TABLE `evaluacionfilaslistacotejo` (
  `Id_EvFilaListaCot` int(11) NOT NULL,
  `Evaluador` int(11) NOT NULL,
  `Evaluado` int(11) NOT NULL,
  `FilaListaCotejo` int(11) NOT NULL,
  `Cumplimiento` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `evaluacionfilasrubrica`
--

CREATE TABLE `evaluacionfilasrubrica` (
  `Id_EvFilaRubrica` int(11) NOT NULL,
  `Evaluador` int(11) NOT NULL,
  `Evaluado` int(11) NOT NULL,
  `FilaRubrica` int(11) NOT NULL,
  `CriterioSelect` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `evaluacioninstrumento`
--

CREATE TABLE `evaluacioninstrumento` (
  `Id_EvInstr` int(11) NOT NULL,
  `Instrumento` int(11) NOT NULL,
  `Alumno` int(11) NOT NULL,
  `PuntajeTotal` tinyint(4) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `evaluacionparcial`
--

CREATE TABLE `evaluacionparcial` (
  `Id_EvParcial` int(11) NOT NULL,
  `Parcial` int(11) NOT NULL,
  `Puntaje` int(11) NOT NULL,
  `Alumno` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `evaluacionrespuestacues`
--

CREATE TABLE `evaluacionrespuestacues` (
  `Id_EvRespCues` int(11) NOT NULL,
  `Respuesta` int(11) NOT NULL,
  `Evaluador` int(11) NOT NULL,
  `PorcentajeObtenido` tinyint(4) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `guiaobservacion`
--

CREATE TABLE `guiaobservacion` (
  `Id_FilaGuiadO` int(11) NOT NULL,
  `AspectoEv` tinyint(4) NOT NULL,
  `Instrumento` int(11) NOT NULL,
  `NumElemento` tinyint(4) NOT NULL,
  `Acciones_Ev` varchar(260) NOT NULL,
  `PonderacionElem` tinyint(4) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `instrumento`
--

CREATE TABLE `instrumento` (
  `Id_Instrumento` int(11) NOT NULL,
  `Creador` int(11) NOT NULL,
  `TipoInstrumento` tinyint(4) NOT NULL,
  `TipoEvaluacion` tinyint(4) NOT NULL,
  `Clave_Elem` varchar(6) NOT NULL,
  `NombElemento` varchar(15) NOT NULL,
  `Materia` varchar(52) NOT NULL,
  `Parcial` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `instrumentosacademia`
--

CREATE TABLE `instrumentosacademia` (
  `Id_InstrAcad` int(11) NOT NULL,
  `GpoAcademia` int(11) NOT NULL,
  `Instrumento` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `instrumentosmateria`
--

CREATE TABLE `instrumentosmateria` (
  `Id_InstrMateria` int(11) NOT NULL,
  `GpoMateria` int(11) NOT NULL,
  `Instrumento` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `integrantesacademia`
--

CREATE TABLE `integrantesacademia` (
  `Id_IntegAcad` int(11) NOT NULL,
  `Academia` int(11) NOT NULL,
  `Integrante` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `integrantesmateria`
--

CREATE TABLE `integrantesmateria` (
  `Id_IntegMateria` int(11) NOT NULL,
  `Materia` int(11) NOT NULL,
  `Integrante` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `integrantesmateria`
--

INSERT INTO `integrantesmateria` (`Id_IntegMateria`, `Materia`, `Integrante`) VALUES
(1, 1, 14300143);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `listacotejo`
--

CREATE TABLE `listacotejo` (
  `Id_FilaListaC` int(11) NOT NULL,
  `Instrumento` int(11) NOT NULL,
  `AspectoEv` tinyint(4) NOT NULL,
  `NumElemento` tinyint(4) NOT NULL,
  `IndicadoresEv` varchar(260) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `materia`
--

CREATE TABLE `materia` (
  `Id_Materia` int(11) NOT NULL,
  `MateriaNomb` varchar(52) NOT NULL,
  `Semestre` tinyint(4) NOT NULL,
  `Grupo` varchar(3) NOT NULL,
  `ClaveAcceso` varchar(20) NOT NULL,
  `Par1Mes` tinyint(4) NOT NULL,
  `Par1Dia` tinyint(4) NOT NULL,
  `Par2Mes` tinyint(4) NOT NULL,
  `Par2Dia` tinyint(4) NOT NULL,
  `Par3Mes` tinyint(4) NOT NULL,
  `Par3Dia` tinyint(4) NOT NULL,
  `MaxIntegrantes` tinyint(4) NOT NULL,
  `Profesor` int(11) NOT NULL,
  `ListaAlumnos` varchar(50) NOT NULL,
  `ValoresParciales` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `materia`
--

INSERT INTO `materia` (`Id_Materia`, `MateriaNomb`, `Semestre`, `Grupo`, `ClaveAcceso`, `Par1Mes`, `Par1Dia`, `Par2Mes`, `Par2Dia`, `Par3Mes`, `Par3Dia`, `MaxIntegrantes`, `Profesor`, `ListaAlumnos`, `ValoresParciales`) VALUES
(1, 'Organizacion de Computadoras', 6, 'A', 'miclave99', 0, 0, 0, 0, 0, 0, 10, 14300281, 'nadaalumnos', 'nadavaloresparciales');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `opcionespreguntas`
--

CREATE TABLE `opcionespreguntas` (
  `Id_OpcionesPreg` int(11) NOT NULL,
  `NumOpcion` int(11) NOT NULL,
  `Opcion` varchar(60) NOT NULL,
  `Pregunta` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `permisosllenado`
--

CREATE TABLE `permisosllenado` (
  `Id_PermisosLlenado` int(11) NOT NULL,
  `HoraLimite` tinyint(4) NOT NULL,
  `DiaLimite` tinyint(4) NOT NULL,
  `MesLimite` tinyint(4) NOT NULL,
  `Instrumento` int(11) NOT NULL,
  `Materia` int(11) NOT NULL,
  `Alumno` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `preguntatipo`
--

CREATE TABLE `preguntatipo` (
  `Id_TipoPregunta` tinyint(4) NOT NULL,
  `TipoPregunta` varchar(18) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `preguntatipo`
--

INSERT INTO `preguntatipo` (`Id_TipoPregunta`, `TipoPregunta`) VALUES
(1, 'Opción Múltiple'),
(2, 'Completar Campos'),
(3, 'Pregunta Cerrada'),
(4, 'Pregunta Abierta');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `respuestacuestionario`
--

CREATE TABLE `respuestacuestionario` (
  `Id_RespuestaFilaC` int(11) NOT NULL,
  `Evaluado` int(11) NOT NULL,
  `Pregunta` int(11) NOT NULL,
  `Respuesta` varchar(60) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `rubrica`
--

CREATE TABLE `rubrica` (
  `Id_FilaRubrica` int(11) NOT NULL,
  `Instrumento` int(11) NOT NULL,
  `AspectoEv` tinyint(4) NOT NULL,
  `NumElemento` tinyint(4) NOT NULL,
  `Descripcion` varchar(40) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `solicitudesacademia`
--

CREATE TABLE `solicitudesacademia` (
  `Id_SolicitudAcad` int(11) NOT NULL,
  `Academia` int(11) NOT NULL,
  `Solicitante` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `solicitudesmateria`
--

CREATE TABLE `solicitudesmateria` (
  `Id_SolicitudMateria` int(11) NOT NULL,
  `Materia` int(11) NOT NULL,
  `Solicitante` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tipoevaluacion`
--

CREATE TABLE `tipoevaluacion` (
  `Id_TipoEv` tinyint(4) NOT NULL,
  `TipoEvaluacion` varchar(18) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `tipoevaluacion`
--

INSERT INTO `tipoevaluacion` (`Id_TipoEv`, `TipoEvaluacion`) VALUES
(1, 'Autoevaluación'),
(2, 'Coevaluación'),
(3, 'Heteroevaluación');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tipoinstrumento`
--

CREATE TABLE `tipoinstrumento` (
  `Id_TipoInstr` tinyint(4) NOT NULL,
  `TipoInstrumento` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `tipoinstrumento`
--

INSERT INTO `tipoinstrumento` (`Id_TipoInstr`, `TipoInstrumento`) VALUES
(1, 'Rúbrica'),
(2, 'Lista de Cotejo'),
(3, 'Guía de Observación'),
(4, 'Cuestionario');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tiposusuarios`
--

CREATE TABLE `tiposusuarios` (
  `Id_TipoUsuario` int(11) NOT NULL,
  `Tipo_Usuario` varchar(25) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `tiposusuarios`
--

INSERT INTO `tiposusuarios` (`Id_TipoUsuario`, `Tipo_Usuario`) VALUES
(1, 'Coordinador de Academia'),
(2, 'Profesor'),
(3, 'Alumno');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuario`
--

CREATE TABLE `usuario` (
  `Registro_U` int(11) NOT NULL,
  `Nombres` varchar(30) NOT NULL,
  `Apellidos` varchar(40) DEFAULT NULL,
  `Nombre_Institucion` varchar(45) DEFAULT NULL,
  `Email` varchar(35) DEFAULT NULL,
  `Contrasena` varchar(20) NOT NULL,
  `Escolaridad` varchar(15) DEFAULT NULL,
  `Foto` varchar(25) DEFAULT NULL,
  `Tipo_Usuario` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `usuario`
--

INSERT INTO `usuario` (`Registro_U`, `Nombres`, `Apellidos`, `Nombre_Institucion`, `Email`, `Contrasena`, `Escolaridad`, `Foto`, `Tipo_Usuario`) VALUES
(14300143, 'Jesús Eduardo', 'Fuentes Rangel', 'Centro de Enseñanza Técnica Industrial', 'edufeb0510@gmail.com', 'weroJSON99', 'Doctorado', '14300143', 2),
(14300281, 'Emiliano', 'Moreno Salazar', 'Centro de Enseñanza Técnica Industrial', 'ssbbemims@gmail.com', '12345678', 'Bachillerato', '14300281', 1);

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `academia`
--
ALTER TABLE `academia`
  ADD PRIMARY KEY (`Id_Academia`),
  ADD KEY `CoordinadorAcad` (`CoordinadorAcad`),
  ADD KEY `CoordinadorAcad_2` (`CoordinadorAcad`);

--
-- Indices de la tabla `acciones`
--
ALTER TABLE `acciones`
  ADD PRIMARY KEY (`Id_Acciones`);

--
-- Indices de la tabla `aspectosevaluacion`
--
ALTER TABLE `aspectosevaluacion`
  ADD PRIMARY KEY (`Id_Aspecto`);

--
-- Indices de la tabla `criteriosrubrica`
--
ALTER TABLE `criteriosrubrica`
  ADD PRIMARY KEY (`Id_CriteriosFilaR`),
  ADD KEY `FilaRubrica` (`FilaRubrica`);

--
-- Indices de la tabla `cuestionario`
--
ALTER TABLE `cuestionario`
  ADD PRIMARY KEY (`Id_FilaCues`),
  ADD KEY `Instrumento` (`Instrumento`),
  ADD KEY `Pregunta_Tipo` (`Pregunta_Tipo`),
  ADD KEY `AspectoEv` (`AspectoEv`);

--
-- Indices de la tabla `evaluacionfilasguiaobs`
--
ALTER TABLE `evaluacionfilasguiaobs`
  ADD PRIMARY KEY (`Id_EvFilaGuiaObs`),
  ADD KEY `Evaluador` (`Evaluador`),
  ADD KEY `Evaluado` (`Evaluado`),
  ADD KEY `FilaGuiaObs` (`FilaGuiaObs`);

--
-- Indices de la tabla `evaluacionfilaslistacotejo`
--
ALTER TABLE `evaluacionfilaslistacotejo`
  ADD PRIMARY KEY (`Id_EvFilaListaCot`),
  ADD KEY `Evaluador` (`Evaluador`),
  ADD KEY `Evaluado` (`Evaluado`),
  ADD KEY `FilaListaCotejo` (`FilaListaCotejo`);

--
-- Indices de la tabla `evaluacionfilasrubrica`
--
ALTER TABLE `evaluacionfilasrubrica`
  ADD PRIMARY KEY (`Id_EvFilaRubrica`),
  ADD KEY `Evaluador` (`Evaluador`),
  ADD KEY `Evaluado` (`Evaluado`),
  ADD KEY `FilaRubrica` (`FilaRubrica`),
  ADD KEY `CriterioSelect` (`CriterioSelect`);

--
-- Indices de la tabla `evaluacioninstrumento`
--
ALTER TABLE `evaluacioninstrumento`
  ADD PRIMARY KEY (`Id_EvInstr`),
  ADD UNIQUE KEY `Alumno` (`Alumno`),
  ADD KEY `Instrumento` (`Instrumento`);

--
-- Indices de la tabla `evaluacionparcial`
--
ALTER TABLE `evaluacionparcial`
  ADD PRIMARY KEY (`Id_EvParcial`),
  ADD KEY `Alumno` (`Alumno`),
  ADD KEY `Alumno_2` (`Alumno`);

--
-- Indices de la tabla `evaluacionrespuestacues`
--
ALTER TABLE `evaluacionrespuestacues`
  ADD PRIMARY KEY (`Id_EvRespCues`),
  ADD KEY `Respuesta` (`Respuesta`),
  ADD KEY `Evaluador` (`Evaluador`);

--
-- Indices de la tabla `guiaobservacion`
--
ALTER TABLE `guiaobservacion`
  ADD PRIMARY KEY (`Id_FilaGuiadO`),
  ADD KEY `AspectoEv` (`AspectoEv`),
  ADD KEY `Instrumento` (`Instrumento`);

--
-- Indices de la tabla `instrumento`
--
ALTER TABLE `instrumento`
  ADD PRIMARY KEY (`Id_Instrumento`),
  ADD KEY `Creador` (`Creador`),
  ADD KEY `TipoInstrumento` (`TipoInstrumento`),
  ADD KEY `TipoEvaluacion` (`TipoEvaluacion`);

--
-- Indices de la tabla `instrumentosacademia`
--
ALTER TABLE `instrumentosacademia`
  ADD PRIMARY KEY (`Id_InstrAcad`),
  ADD KEY `GpoAcademia` (`GpoAcademia`),
  ADD KEY `Instrumento` (`Instrumento`);

--
-- Indices de la tabla `instrumentosmateria`
--
ALTER TABLE `instrumentosmateria`
  ADD PRIMARY KEY (`Id_InstrMateria`),
  ADD KEY `GpoMateria` (`GpoMateria`),
  ADD KEY `Instrumento` (`Instrumento`);

--
-- Indices de la tabla `integrantesacademia`
--
ALTER TABLE `integrantesacademia`
  ADD PRIMARY KEY (`Id_IntegAcad`),
  ADD KEY `Academia` (`Academia`),
  ADD KEY `Integrante` (`Integrante`);

--
-- Indices de la tabla `integrantesmateria`
--
ALTER TABLE `integrantesmateria`
  ADD PRIMARY KEY (`Id_IntegMateria`),
  ADD UNIQUE KEY `Integrante` (`Integrante`),
  ADD KEY `Materia` (`Materia`);

--
-- Indices de la tabla `listacotejo`
--
ALTER TABLE `listacotejo`
  ADD PRIMARY KEY (`Id_FilaListaC`),
  ADD UNIQUE KEY `AspectoEv` (`AspectoEv`),
  ADD KEY `Instrumento` (`Instrumento`);

--
-- Indices de la tabla `materia`
--
ALTER TABLE `materia`
  ADD PRIMARY KEY (`Id_Materia`),
  ADD KEY `Profesor` (`Profesor`);

--
-- Indices de la tabla `opcionespreguntas`
--
ALTER TABLE `opcionespreguntas`
  ADD PRIMARY KEY (`Id_OpcionesPreg`),
  ADD KEY `Pregunta` (`Pregunta`);

--
-- Indices de la tabla `permisosllenado`
--
ALTER TABLE `permisosllenado`
  ADD PRIMARY KEY (`Id_PermisosLlenado`),
  ADD UNIQUE KEY `Materia` (`Materia`),
  ADD KEY `Instrumento` (`Instrumento`),
  ADD KEY `Alumno` (`Alumno`);

--
-- Indices de la tabla `preguntatipo`
--
ALTER TABLE `preguntatipo`
  ADD PRIMARY KEY (`Id_TipoPregunta`);

--
-- Indices de la tabla `respuestacuestionario`
--
ALTER TABLE `respuestacuestionario`
  ADD PRIMARY KEY (`Id_RespuestaFilaC`),
  ADD KEY `Evaluado` (`Evaluado`),
  ADD KEY `Pregunta` (`Pregunta`);

--
-- Indices de la tabla `rubrica`
--
ALTER TABLE `rubrica`
  ADD PRIMARY KEY (`Id_FilaRubrica`),
  ADD KEY `Instrumento` (`Instrumento`),
  ADD KEY `AspectoEv` (`AspectoEv`);

--
-- Indices de la tabla `solicitudesacademia`
--
ALTER TABLE `solicitudesacademia`
  ADD PRIMARY KEY (`Id_SolicitudAcad`),
  ADD KEY `Solicitante` (`Solicitante`),
  ADD KEY `Academia` (`Academia`);

--
-- Indices de la tabla `solicitudesmateria`
--
ALTER TABLE `solicitudesmateria`
  ADD PRIMARY KEY (`Id_SolicitudMateria`),
  ADD KEY `Solicitante` (`Solicitante`),
  ADD KEY `Materia` (`Materia`);

--
-- Indices de la tabla `tipoevaluacion`
--
ALTER TABLE `tipoevaluacion`
  ADD PRIMARY KEY (`Id_TipoEv`);

--
-- Indices de la tabla `tipoinstrumento`
--
ALTER TABLE `tipoinstrumento`
  ADD PRIMARY KEY (`Id_TipoInstr`);

--
-- Indices de la tabla `tiposusuarios`
--
ALTER TABLE `tiposusuarios`
  ADD PRIMARY KEY (`Id_TipoUsuario`);

--
-- Indices de la tabla `usuario`
--
ALTER TABLE `usuario`
  ADD PRIMARY KEY (`Registro_U`),
  ADD UNIQUE KEY `Email` (`Email`),
  ADD KEY `Tipo_Usuario` (`Tipo_Usuario`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `acciones`
--
ALTER TABLE `acciones`
  MODIFY `Id_Acciones` smallint(6) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
--
-- AUTO_INCREMENT de la tabla `aspectosevaluacion`
--
ALTER TABLE `aspectosevaluacion`
  MODIFY `Id_Aspecto` tinyint(4) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;
--
-- AUTO_INCREMENT de la tabla `criteriosrubrica`
--
ALTER TABLE `criteriosrubrica`
  MODIFY `Id_CriteriosFilaR` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT de la tabla `cuestionario`
--
ALTER TABLE `cuestionario`
  MODIFY `Id_FilaCues` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT de la tabla `evaluacionfilasguiaobs`
--
ALTER TABLE `evaluacionfilasguiaobs`
  MODIFY `Id_EvFilaGuiaObs` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT de la tabla `evaluacionfilaslistacotejo`
--
ALTER TABLE `evaluacionfilaslistacotejo`
  MODIFY `Id_EvFilaListaCot` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT de la tabla `evaluacionfilasrubrica`
--
ALTER TABLE `evaluacionfilasrubrica`
  MODIFY `Id_EvFilaRubrica` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT de la tabla `evaluacioninstrumento`
--
ALTER TABLE `evaluacioninstrumento`
  MODIFY `Id_EvInstr` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT de la tabla `evaluacionparcial`
--
ALTER TABLE `evaluacionparcial`
  MODIFY `Id_EvParcial` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT de la tabla `evaluacionrespuestacues`
--
ALTER TABLE `evaluacionrespuestacues`
  MODIFY `Id_EvRespCues` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT de la tabla `guiaobservacion`
--
ALTER TABLE `guiaobservacion`
  MODIFY `Id_FilaGuiadO` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT de la tabla `instrumento`
--
ALTER TABLE `instrumento`
  MODIFY `Id_Instrumento` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT de la tabla `instrumentosacademia`
--
ALTER TABLE `instrumentosacademia`
  MODIFY `Id_InstrAcad` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT de la tabla `instrumentosmateria`
--
ALTER TABLE `instrumentosmateria`
  MODIFY `Id_InstrMateria` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT de la tabla `integrantesacademia`
--
ALTER TABLE `integrantesacademia`
  MODIFY `Id_IntegAcad` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT de la tabla `integrantesmateria`
--
ALTER TABLE `integrantesmateria`
  MODIFY `Id_IntegMateria` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
--
-- AUTO_INCREMENT de la tabla `listacotejo`
--
ALTER TABLE `listacotejo`
  MODIFY `Id_FilaListaC` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT de la tabla `materia`
--
ALTER TABLE `materia`
  MODIFY `Id_Materia` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
--
-- AUTO_INCREMENT de la tabla `opcionespreguntas`
--
ALTER TABLE `opcionespreguntas`
  MODIFY `Id_OpcionesPreg` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT de la tabla `permisosllenado`
--
ALTER TABLE `permisosllenado`
  MODIFY `Id_PermisosLlenado` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT de la tabla `preguntatipo`
--
ALTER TABLE `preguntatipo`
  MODIFY `Id_TipoPregunta` tinyint(4) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;
--
-- AUTO_INCREMENT de la tabla `respuestacuestionario`
--
ALTER TABLE `respuestacuestionario`
  MODIFY `Id_RespuestaFilaC` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT de la tabla `rubrica`
--
ALTER TABLE `rubrica`
  MODIFY `Id_FilaRubrica` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT de la tabla `tipoevaluacion`
--
ALTER TABLE `tipoevaluacion`
  MODIFY `Id_TipoEv` tinyint(4) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;
--
-- AUTO_INCREMENT de la tabla `tipoinstrumento`
--
ALTER TABLE `tipoinstrumento`
  MODIFY `Id_TipoInstr` tinyint(4) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;
--
-- AUTO_INCREMENT de la tabla `tiposusuarios`
--
ALTER TABLE `tiposusuarios`
  MODIFY `Id_TipoUsuario` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;
--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `academia`
--
ALTER TABLE `academia`
  ADD CONSTRAINT `academia_ibfk_1` FOREIGN KEY (`CoordinadorAcad`) REFERENCES `usuario` (`Registro_U`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `criteriosrubrica`
--
ALTER TABLE `criteriosrubrica`
  ADD CONSTRAINT `criteriosrubrica_ibfk_1` FOREIGN KEY (`FilaRubrica`) REFERENCES `rubrica` (`Id_FilaRubrica`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `cuestionario`
--
ALTER TABLE `cuestionario`
  ADD CONSTRAINT `cuestionario_ibfk_1` FOREIGN KEY (`Pregunta_Tipo`) REFERENCES `preguntatipo` (`Id_TipoPregunta`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `cuestionario_ibfk_2` FOREIGN KEY (`Instrumento`) REFERENCES `instrumento` (`Id_Instrumento`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `cuestionario_ibfk_3` FOREIGN KEY (`AspectoEv`) REFERENCES `aspectosevaluacion` (`Id_Aspecto`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `evaluacionfilasguiaobs`
--
ALTER TABLE `evaluacionfilasguiaobs`
  ADD CONSTRAINT `evaluacionfilasguiaobs_ibfk_1` FOREIGN KEY (`Evaluador`) REFERENCES `usuario` (`Registro_U`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `evaluacionfilasguiaobs_ibfk_2` FOREIGN KEY (`FilaGuiaObs`) REFERENCES `guiaobservacion` (`Id_FilaGuiadO`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `evaluacionfilasguiaobs_ibfk_3` FOREIGN KEY (`Evaluado`) REFERENCES `usuario` (`Registro_U`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `evaluacionfilaslistacotejo`
--
ALTER TABLE `evaluacionfilaslistacotejo`
  ADD CONSTRAINT `evaluacionfilaslistacotejo_ibfk_1` FOREIGN KEY (`Evaluador`) REFERENCES `usuario` (`Registro_U`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `evaluacionfilaslistacotejo_ibfk_2` FOREIGN KEY (`FilaListaCotejo`) REFERENCES `listacotejo` (`Id_FilaListaC`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `evaluacionfilaslistacotejo_ibfk_3` FOREIGN KEY (`Evaluado`) REFERENCES `usuario` (`Registro_U`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `evaluacionfilasrubrica`
--
ALTER TABLE `evaluacionfilasrubrica`
  ADD CONSTRAINT `evaluacionfilasrubrica_ibfk_1` FOREIGN KEY (`Evaluador`) REFERENCES `usuario` (`Registro_U`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `evaluacionfilasrubrica_ibfk_2` FOREIGN KEY (`Evaluado`) REFERENCES `usuario` (`Registro_U`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `evaluacionfilasrubrica_ibfk_3` FOREIGN KEY (`FilaRubrica`) REFERENCES `rubrica` (`Id_FilaRubrica`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `evaluacionfilasrubrica_ibfk_4` FOREIGN KEY (`CriterioSelect`) REFERENCES `criteriosrubrica` (`Id_CriteriosFilaR`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `evaluacioninstrumento`
--
ALTER TABLE `evaluacioninstrumento`
  ADD CONSTRAINT `evaluacioninstrumento_ibfk_1` FOREIGN KEY (`Instrumento`) REFERENCES `instrumento` (`Id_Instrumento`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `evaluacioninstrumento_ibfk_2` FOREIGN KEY (`Alumno`) REFERENCES `usuario` (`Registro_U`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `evaluacionparcial`
--
ALTER TABLE `evaluacionparcial`
  ADD CONSTRAINT `evaluacionparcial_ibfk_1` FOREIGN KEY (`Alumno`) REFERENCES `usuario` (`Registro_U`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `evaluacionrespuestacues`
--
ALTER TABLE `evaluacionrespuestacues`
  ADD CONSTRAINT `evaluacionrespuestacues_ibfk_1` FOREIGN KEY (`Respuesta`) REFERENCES `respuestacuestionario` (`Id_RespuestaFilaC`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `evaluacionrespuestacues_ibfk_2` FOREIGN KEY (`Evaluador`) REFERENCES `usuario` (`Registro_U`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `guiaobservacion`
--
ALTER TABLE `guiaobservacion`
  ADD CONSTRAINT `guiaobservacion_ibfk_1` FOREIGN KEY (`Instrumento`) REFERENCES `instrumento` (`Id_Instrumento`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `guiaobservacion_ibfk_2` FOREIGN KEY (`AspectoEv`) REFERENCES `aspectosevaluacion` (`Id_Aspecto`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `instrumento`
--
ALTER TABLE `instrumento`
  ADD CONSTRAINT `instrumento_ibfk_1` FOREIGN KEY (`Creador`) REFERENCES `usuario` (`Registro_U`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `instrumento_ibfk_2` FOREIGN KEY (`TipoEvaluacion`) REFERENCES `tipoevaluacion` (`Id_TipoEv`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `instrumento_ibfk_3` FOREIGN KEY (`TipoInstrumento`) REFERENCES `tipoinstrumento` (`Id_TipoInstr`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `instrumentosacademia`
--
ALTER TABLE `instrumentosacademia`
  ADD CONSTRAINT `instrumentosacademia_ibfk_1` FOREIGN KEY (`Instrumento`) REFERENCES `instrumento` (`Id_Instrumento`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `instrumentosacademia_ibfk_2` FOREIGN KEY (`GpoAcademia`) REFERENCES `academia` (`Id_Academia`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `instrumentosmateria`
--
ALTER TABLE `instrumentosmateria`
  ADD CONSTRAINT `instrumentosmateria_ibfk_1` FOREIGN KEY (`Instrumento`) REFERENCES `instrumento` (`Id_Instrumento`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `instrumentosmateria_ibfk_2` FOREIGN KEY (`GpoMateria`) REFERENCES `materia` (`Id_Materia`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `integrantesacademia`
--
ALTER TABLE `integrantesacademia`
  ADD CONSTRAINT `integrantesacademia_ibfk_2` FOREIGN KEY (`Academia`) REFERENCES `academia` (`Id_Academia`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `integrantesacademia_ibfk_3` FOREIGN KEY (`Integrante`) REFERENCES `usuario` (`Registro_U`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `integrantesmateria`
--
ALTER TABLE `integrantesmateria`
  ADD CONSTRAINT `integrantesmateria_ibfk_1` FOREIGN KEY (`Integrante`) REFERENCES `usuario` (`Registro_U`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `integrantesmateria_ibfk_2` FOREIGN KEY (`Materia`) REFERENCES `materia` (`Id_Materia`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `listacotejo`
--
ALTER TABLE `listacotejo`
  ADD CONSTRAINT `listacotejo_ibfk_1` FOREIGN KEY (`Instrumento`) REFERENCES `instrumento` (`Id_Instrumento`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `listacotejo_ibfk_2` FOREIGN KEY (`AspectoEv`) REFERENCES `aspectosevaluacion` (`Id_Aspecto`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `materia`
--
ALTER TABLE `materia`
  ADD CONSTRAINT `materia_ibfk_1` FOREIGN KEY (`Profesor`) REFERENCES `usuario` (`Registro_U`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `opcionespreguntas`
--
ALTER TABLE `opcionespreguntas`
  ADD CONSTRAINT `opcionespreguntas_ibfk_1` FOREIGN KEY (`Pregunta`) REFERENCES `cuestionario` (`Id_FilaCues`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `permisosllenado`
--
ALTER TABLE `permisosllenado`
  ADD CONSTRAINT `permisosllenado_ibfk_1` FOREIGN KEY (`Instrumento`) REFERENCES `instrumento` (`Id_Instrumento`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `permisosllenado_ibfk_2` FOREIGN KEY (`Materia`) REFERENCES `materia` (`Id_Materia`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `permisosllenado_ibfk_3` FOREIGN KEY (`Alumno`) REFERENCES `usuario` (`Registro_U`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `respuestacuestionario`
--
ALTER TABLE `respuestacuestionario`
  ADD CONSTRAINT `respuestacuestionario_ibfk_1` FOREIGN KEY (`Evaluado`) REFERENCES `usuario` (`Registro_U`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `respuestacuestionario_ibfk_2` FOREIGN KEY (`Pregunta`) REFERENCES `cuestionario` (`Id_FilaCues`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `rubrica`
--
ALTER TABLE `rubrica`
  ADD CONSTRAINT `rubrica_ibfk_1` FOREIGN KEY (`AspectoEv`) REFERENCES `aspectosevaluacion` (`Id_Aspecto`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `solicitudesacademia`
--
ALTER TABLE `solicitudesacademia`
  ADD CONSTRAINT `solicitudesacademia_ibfk_1` FOREIGN KEY (`Academia`) REFERENCES `academia` (`Id_Academia`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `solicitudesacademia_ibfk_2` FOREIGN KEY (`Solicitante`) REFERENCES `usuario` (`Registro_U`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `solicitudesmateria`
--
ALTER TABLE `solicitudesmateria`
  ADD CONSTRAINT `solicitudesmateria_ibfk_1` FOREIGN KEY (`Solicitante`) REFERENCES `usuario` (`Registro_U`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `solicitudesmateria_ibfk_2` FOREIGN KEY (`Materia`) REFERENCES `materia` (`Id_Materia`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `usuario`
--
ALTER TABLE `usuario`
  ADD CONSTRAINT `usuario_ibfk_1` FOREIGN KEY (`Tipo_Usuario`) REFERENCES `tiposusuarios` (`Id_TipoUsuario`) ON DELETE CASCADE ON UPDATE CASCADE;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
