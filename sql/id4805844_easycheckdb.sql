-- phpMyAdmin SQL Dump
-- version 4.6.5.2
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 15-04-2018 a las 23:55:17
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
  `Clave_Acceso` varchar(20) NOT NULL,
  `Ciclo_Periodo` char(14) NOT NULL,
  `Lista_Prof` varchar(70) NOT NULL,
  `Coordinador_Acad` int(11) NOT NULL,
  `Carrera` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `academia`
--

INSERT INTO `academia` (`Id_Academia`, `Academia`, `Clave_Acceso`, `Ciclo_Periodo`, `Lista_Prof`, `Coordinador_Acad`, `Carrera`) VALUES
(1, 'Informática', '12345678', 'Feb - Jun 2018', '', 1, 1),
(2, 'Informatica', '12345678', 'Feb - Jun 2018', '', 123, 1);

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
(1, 'Users', 'Login'),
(2, 'Users', 'verifyUser'),
(3, 'Users', 'registerUser'),
(4, 'Carrera', 'getCarreras'),
(5, 'Users', 'getSessionVariables'),
(6, 'Users', 'Logout');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `aspectoevaluacion`
--

CREATE TABLE `aspectoevaluacion` (
  `Id_Aspecto` tinyint(4) NOT NULL,
  `Descripcion` varchar(5) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `aspectoevaluacion`
--

INSERT INTO `aspectoevaluacion` (`Id_Aspecto`, `Descripcion`) VALUES
(1, 'Saber'),
(2, 'Hacer'),
(3, 'Ser');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `carrera`
--

CREATE TABLE `carrera` (
  `Id_Carrera` int(11) NOT NULL,
  `Carrera` varchar(70) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `carrera`
--

INSERT INTO `carrera` (`Id_Carrera`, `Carrera`) VALUES
(1, 'Tgo. Desarrollo de Software');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `criteriosfilarubrica`
--

CREATE TABLE `criteriosfilarubrica` (
  `Id_CriterioFilaR` int(11) NOT NULL,
  `FilaRubrica` int(11) NOT NULL,
  `Identificador` varchar(15) NOT NULL,
  `DescripcionIdent` varchar(260) NOT NULL,
  `ValorIdent` tinyint(4) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `cuestionario`
--

CREATE TABLE `cuestionario` (
  `Id_FilaCues` int(11) NOT NULL,
  `Instrumento` int(11) NOT NULL,
  `TipoPregunta` tinyint(4) NOT NULL,
  `AspectoEv` tinyint(4) NOT NULL,
  `NumPregunta` tinyint(4) NOT NULL,
  `Pregunta` varchar(260) NOT NULL,
  `PonderacionPreg` tinyint(4) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `evaluacionfilaguiaobs`
--

CREATE TABLE `evaluacionfilaguiaobs` (
  `Id_EvFilaGuiaObs` int(11) NOT NULL,
  `Evaluador` int(11) NOT NULL,
  `Evaluado` int(11) NOT NULL,
  `FilaGuiaObs` int(11) NOT NULL,
  `Cumplimiento` tinyint(1) NOT NULL,
  `Puntaje` tinyint(4) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `evaluacionfilalistac`
--

CREATE TABLE `evaluacionfilalistac` (
  `Id_EvFilaListaCot` int(11) NOT NULL,
  `FilaListaCotejo` int(11) NOT NULL,
  `Evaluado` int(11) NOT NULL,
  `Evaluador` int(11) NOT NULL,
  `Cumplimiento` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `evaluacionfilarubrica`
--

CREATE TABLE `evaluacionfilarubrica` (
  `Id_EvFilaRubrica` int(11) NOT NULL,
  `Evaluador` int(11) NOT NULL,
  `Evaluado` int(11) NOT NULL,
  `FilaRubrica` int(11) NOT NULL,
  `CriterioSeleccionado` int(11) NOT NULL
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
-- Estructura de tabla para la tabla `evaluacionrespuestacues`
--

CREATE TABLE `evaluacionrespuestacues` (
  `Id_EvRespCues` int(11) NOT NULL,
  `Respuesta` int(11) NOT NULL,
  `PorcentajeObtenido` tinyint(4) NOT NULL,
  `Evaluador` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `grupo`
--

CREATE TABLE `grupo` (
  `Id_Grupo` tinyint(4) NOT NULL,
  `Grupo` char(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `grupoperiodo`
--

CREATE TABLE `grupoperiodo` (
  `Id_GpoPeriodo` int(11) NOT NULL,
  `Materia` int(11) NOT NULL,
  `Grupo` tinyint(4) NOT NULL,
  `Periodo` char(14) NOT NULL,
  `Profesor` int(11) NOT NULL,
  `Lista_Alumnos` varchar(70) NOT NULL,
  `Clave_Acceso` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `guiadeobservacion`
--

CREATE TABLE `guiadeobservacion` (
  `Id_FilaGuiadO` int(11) NOT NULL,
  `AspectoEv` tinyint(4) NOT NULL,
  `Instrumento` int(11) NOT NULL,
  `NumElemento` tinyint(4) NOT NULL,
  `AccionesEv` varchar(260) NOT NULL,
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
  `ClaveElem` varchar(6) NOT NULL,
  `NombElemento` varchar(15) NOT NULL,
  `Materia` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `instrumentoscompartidos`
--

CREATE TABLE `instrumentoscompartidos` (
  `Id_SharedInstr` int(11) NOT NULL,
  `Materia` int(11) NOT NULL,
  `Instrumento` int(11) NOT NULL,
  `Academia` int(11) NOT NULL
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
-- Estructura de tabla para la tabla `listagrupo`
--

CREATE TABLE `listagrupo` (
  `Id_ListaGrupo` int(11) NOT NULL,
  `Alumno` int(11) NOT NULL,
  `GpoPeriodo` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `materia`
--

CREATE TABLE `materia` (
  `Id_Materia` int(11) NOT NULL,
  `Materia` varchar(52) NOT NULL,
  `Semestre` tinyint(4) NOT NULL,
  `Valores_Parciales` varchar(70) NOT NULL,
  `Academia` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `opcionespregunta`
--

CREATE TABLE `opcionespregunta` (
  `Id_OpcionesP` int(11) NOT NULL,
  `NumOpcion` tinyint(4) NOT NULL,
  `Opcion` varchar(60) NOT NULL,
  `Pregunta` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `parciales`
--

CREATE TABLE `parciales` (
  `Id_Periodo` mediumint(9) NOT NULL,
  `Parcial1` date NOT NULL,
  `Parcial2` date NOT NULL,
  `Parcial3` date NOT NULL,
  `Periodo` char(14) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `permisosllenado`
--

CREATE TABLE `permisosllenado` (
  `Id_PermisoLlenado` int(11) NOT NULL,
  `FechaLimite` datetime NOT NULL,
  `Instrumento` int(11) NOT NULL,
  `GpoPeriodo` int(11) NOT NULL,
  `Alumno` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `respuestacuestionario`
--

CREATE TABLE `respuestacuestionario` (
  `Id_RespuestaFilaC` int(11) NOT NULL,
  `Pregunta` int(11) NOT NULL,
  `Evaluado` int(11) NOT NULL,
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
-- Estructura de tabla para la tabla `solicitudeslistagrupo`
--

CREATE TABLE `solicitudeslistagrupo` (
  `Id_SolicitudLGpo` int(11) NOT NULL,
  `GrupoPeriodo` int(11) NOT NULL,
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
-- Estructura de tabla para la tabla `tipopregunta`
--

CREATE TABLE `tipopregunta` (
  `Id_TipoPregunta` tinyint(4) NOT NULL,
  `TipoPregunta` varchar(18) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `tipopregunta`
--

INSERT INTO `tipopregunta` (`Id_TipoPregunta`, `TipoPregunta`) VALUES
(1, 'Opción Múltiple'),
(2, 'Completar Campos'),
(3, 'Pregunta Cerrada'),
(4, 'Pregunta Abierta');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tiposusuarios`
--

CREATE TABLE `tiposusuarios` (
  `Id_TipoUsuario` tinyint(4) NOT NULL,
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
  `Apellidos` varchar(40) NOT NULL,
  `Email` varchar(35) NOT NULL,
  `Password` varchar(20) NOT NULL,
  `Escolaridad` varchar(15) NOT NULL,
  `Tipo_Usuario` tinyint(4) NOT NULL,
  `Foto` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `usuario`
--

INSERT INTO `usuario` (`Registro_U`, `Nombres`, `Apellidos`, `Email`, `Password`, `Escolaridad`, `Tipo_Usuario`, `Foto`) VALUES
(1, 'Andrés', 'Figueroa Flores', 'academia@gmail.com', '12345678', 'Maestría', 1, ''),
(12, 'Carlos', 'Molina Martínez', 'profesor@gmail.com', '12345678', 'Maestría', 2, ''),
(123, 'Yael Arturo', 'Chavoya Andalón', 'mail@gmail.com', '12345678', 'Licenciatura', 1, ''),
(123456, 'Antonio', 'Lozano', 'mail@gmail.com', '12345678', 'Maestría', 2, ''),
(14300084, 'Yael Arturo', 'Chavoya Andalon', 'mail@gmail.com', '12345678', '', 3, ''),
(14300142, 'wero', 'fuentes', 'wero@gmail.com', '14300143', 'Maestría', 2, ''),
(14300143, 'wero', 'fuentes', 'wero@gmail.com', '14300143', '', 3, ''),
(14300281, 'Emiliano', 'Moreno Salazar', 'ssbbemis@gmail.com', '12345678', '-', 3, '');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `academia`
--
ALTER TABLE `academia`
  ADD PRIMARY KEY (`Id_Academia`),
  ADD KEY `Carrera` (`Carrera`),
  ADD KEY `Coordinador_Acad` (`Coordinador_Acad`);

--
-- Indices de la tabla `acciones`
--
ALTER TABLE `acciones`
  ADD PRIMARY KEY (`Id_Acciones`);

--
-- Indices de la tabla `aspectoevaluacion`
--
ALTER TABLE `aspectoevaluacion`
  ADD PRIMARY KEY (`Id_Aspecto`);

--
-- Indices de la tabla `carrera`
--
ALTER TABLE `carrera`
  ADD PRIMARY KEY (`Id_Carrera`);

--
-- Indices de la tabla `criteriosfilarubrica`
--
ALTER TABLE `criteriosfilarubrica`
  ADD PRIMARY KEY (`Id_CriterioFilaR`),
  ADD KEY `FilaRubrica` (`FilaRubrica`);

--
-- Indices de la tabla `cuestionario`
--
ALTER TABLE `cuestionario`
  ADD PRIMARY KEY (`Id_FilaCues`),
  ADD KEY `Instrumento` (`Instrumento`),
  ADD KEY `TipoPregunta` (`TipoPregunta`),
  ADD KEY `AspectoEv` (`AspectoEv`);

--
-- Indices de la tabla `evaluacionfilaguiaobs`
--
ALTER TABLE `evaluacionfilaguiaobs`
  ADD PRIMARY KEY (`Id_EvFilaGuiaObs`),
  ADD KEY `Evaluador` (`Evaluador`),
  ADD KEY `Evaluado` (`Evaluado`),
  ADD KEY `FilaGuiaObs` (`FilaGuiaObs`);

--
-- Indices de la tabla `evaluacionfilalistac`
--
ALTER TABLE `evaluacionfilalistac`
  ADD PRIMARY KEY (`Id_EvFilaListaCot`),
  ADD KEY `Evaluador` (`Evaluador`),
  ADD KEY `Evaluado` (`Evaluado`),
  ADD KEY `FilaListaCotejo` (`FilaListaCotejo`);

--
-- Indices de la tabla `evaluacionfilarubrica`
--
ALTER TABLE `evaluacionfilarubrica`
  ADD PRIMARY KEY (`Id_EvFilaRubrica`),
  ADD KEY `Evaluador` (`Evaluador`),
  ADD KEY `Evaluado` (`Evaluado`),
  ADD KEY `FilaRubrica` (`FilaRubrica`),
  ADD KEY `CriterioSeleccionado` (`CriterioSeleccionado`);

--
-- Indices de la tabla `evaluacioninstrumento`
--
ALTER TABLE `evaluacioninstrumento`
  ADD PRIMARY KEY (`Id_EvInstr`),
  ADD KEY `Instrumento` (`Instrumento`),
  ADD KEY `Alumno` (`Alumno`);

--
-- Indices de la tabla `evaluacionrespuestacues`
--
ALTER TABLE `evaluacionrespuestacues`
  ADD PRIMARY KEY (`Id_EvRespCues`),
  ADD KEY `Respuesta` (`Respuesta`),
  ADD KEY `Evaluador` (`Evaluador`);

--
-- Indices de la tabla `grupo`
--
ALTER TABLE `grupo`
  ADD PRIMARY KEY (`Id_Grupo`);

--
-- Indices de la tabla `grupoperiodo`
--
ALTER TABLE `grupoperiodo`
  ADD PRIMARY KEY (`Id_GpoPeriodo`),
  ADD KEY `Materia` (`Materia`),
  ADD KEY `Grupo` (`Grupo`),
  ADD KEY `Profesor` (`Profesor`);

--
-- Indices de la tabla `guiadeobservacion`
--
ALTER TABLE `guiadeobservacion`
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
  ADD KEY `TipoEvaluacion` (`TipoEvaluacion`),
  ADD KEY `Materia` (`Materia`);

--
-- Indices de la tabla `instrumentoscompartidos`
--
ALTER TABLE `instrumentoscompartidos`
  ADD PRIMARY KEY (`Id_SharedInstr`),
  ADD KEY `Materia` (`Materia`),
  ADD KEY `Instrumento` (`Instrumento`),
  ADD KEY `Academia` (`Academia`),
  ADD KEY `Materia_2` (`Materia`);

--
-- Indices de la tabla `integrantesacademia`
--
ALTER TABLE `integrantesacademia`
  ADD PRIMARY KEY (`Id_IntegAcad`),
  ADD KEY `Academia` (`Academia`),
  ADD KEY `Integrante` (`Integrante`);

--
-- Indices de la tabla `listacotejo`
--
ALTER TABLE `listacotejo`
  ADD PRIMARY KEY (`Id_FilaListaC`),
  ADD KEY `AspectoEv` (`AspectoEv`),
  ADD KEY `Instrumento` (`Instrumento`);

--
-- Indices de la tabla `listagrupo`
--
ALTER TABLE `listagrupo`
  ADD PRIMARY KEY (`Id_ListaGrupo`),
  ADD KEY `Alumno` (`Alumno`),
  ADD KEY `GpoPeriodo` (`GpoPeriodo`);

--
-- Indices de la tabla `materia`
--
ALTER TABLE `materia`
  ADD PRIMARY KEY (`Id_Materia`),
  ADD KEY `Academia` (`Academia`);

--
-- Indices de la tabla `opcionespregunta`
--
ALTER TABLE `opcionespregunta`
  ADD PRIMARY KEY (`Id_OpcionesP`),
  ADD KEY `Pregunta` (`Pregunta`);

--
-- Indices de la tabla `parciales`
--
ALTER TABLE `parciales`
  ADD PRIMARY KEY (`Id_Periodo`);

--
-- Indices de la tabla `permisosllenado`
--
ALTER TABLE `permisosllenado`
  ADD PRIMARY KEY (`Id_PermisoLlenado`),
  ADD KEY `Instrumento` (`Instrumento`),
  ADD KEY `GpoPeriodo` (`GpoPeriodo`),
  ADD KEY `Alumno` (`Alumno`);

--
-- Indices de la tabla `respuestacuestionario`
--
ALTER TABLE `respuestacuestionario`
  ADD PRIMARY KEY (`Id_RespuestaFilaC`),
  ADD KEY `Pregunta` (`Pregunta`),
  ADD KEY `Evaluado` (`Evaluado`);

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
  ADD KEY `Academia` (`Academia`),
  ADD KEY `Solicitante` (`Solicitante`);

--
-- Indices de la tabla `solicitudeslistagrupo`
--
ALTER TABLE `solicitudeslistagrupo`
  ADD PRIMARY KEY (`Id_SolicitudLGpo`),
  ADD KEY `GrupoPeriodo` (`GrupoPeriodo`),
  ADD KEY `Solicitante` (`Solicitante`);

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
-- Indices de la tabla `tipopregunta`
--
ALTER TABLE `tipopregunta`
  ADD PRIMARY KEY (`Id_TipoPregunta`);

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
  ADD KEY `Tipo_Usuario` (`Tipo_Usuario`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `academia`
--
ALTER TABLE `academia`
  MODIFY `Id_Academia` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
--
-- AUTO_INCREMENT de la tabla `acciones`
--
ALTER TABLE `acciones`
  MODIFY `Id_Acciones` smallint(6) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;
--
-- AUTO_INCREMENT de la tabla `aspectoevaluacion`
--
ALTER TABLE `aspectoevaluacion`
  MODIFY `Id_Aspecto` tinyint(4) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;
--
-- AUTO_INCREMENT de la tabla `carrera`
--
ALTER TABLE `carrera`
  MODIFY `Id_Carrera` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
--
-- AUTO_INCREMENT de la tabla `criteriosfilarubrica`
--
ALTER TABLE `criteriosfilarubrica`
  MODIFY `Id_CriterioFilaR` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT de la tabla `cuestionario`
--
ALTER TABLE `cuestionario`
  MODIFY `Id_FilaCues` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT de la tabla `evaluacionfilaguiaobs`
--
ALTER TABLE `evaluacionfilaguiaobs`
  MODIFY `Id_EvFilaGuiaObs` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT de la tabla `evaluacionfilalistac`
--
ALTER TABLE `evaluacionfilalistac`
  MODIFY `Id_EvFilaListaCot` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT de la tabla `evaluacionfilarubrica`
--
ALTER TABLE `evaluacionfilarubrica`
  MODIFY `Id_EvFilaRubrica` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT de la tabla `evaluacioninstrumento`
--
ALTER TABLE `evaluacioninstrumento`
  MODIFY `Id_EvInstr` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT de la tabla `evaluacionrespuestacues`
--
ALTER TABLE `evaluacionrespuestacues`
  MODIFY `Id_EvRespCues` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT de la tabla `grupo`
--
ALTER TABLE `grupo`
  MODIFY `Id_Grupo` tinyint(4) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT de la tabla `grupoperiodo`
--
ALTER TABLE `grupoperiodo`
  MODIFY `Id_GpoPeriodo` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT de la tabla `guiadeobservacion`
--
ALTER TABLE `guiadeobservacion`
  MODIFY `Id_FilaGuiadO` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT de la tabla `instrumento`
--
ALTER TABLE `instrumento`
  MODIFY `Id_Instrumento` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT de la tabla `instrumentoscompartidos`
--
ALTER TABLE `instrumentoscompartidos`
  MODIFY `Id_SharedInstr` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT de la tabla `integrantesacademia`
--
ALTER TABLE `integrantesacademia`
  MODIFY `Id_IntegAcad` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT de la tabla `listacotejo`
--
ALTER TABLE `listacotejo`
  MODIFY `Id_FilaListaC` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT de la tabla `listagrupo`
--
ALTER TABLE `listagrupo`
  MODIFY `Id_ListaGrupo` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT de la tabla `materia`
--
ALTER TABLE `materia`
  MODIFY `Id_Materia` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT de la tabla `opcionespregunta`
--
ALTER TABLE `opcionespregunta`
  MODIFY `Id_OpcionesP` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT de la tabla `parciales`
--
ALTER TABLE `parciales`
  MODIFY `Id_Periodo` mediumint(9) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT de la tabla `permisosllenado`
--
ALTER TABLE `permisosllenado`
  MODIFY `Id_PermisoLlenado` int(11) NOT NULL AUTO_INCREMENT;
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
-- AUTO_INCREMENT de la tabla `solicitudesacademia`
--
ALTER TABLE `solicitudesacademia`
  MODIFY `Id_SolicitudAcad` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT de la tabla `solicitudeslistagrupo`
--
ALTER TABLE `solicitudeslistagrupo`
  MODIFY `Id_SolicitudLGpo` int(11) NOT NULL AUTO_INCREMENT;
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
-- AUTO_INCREMENT de la tabla `tipopregunta`
--
ALTER TABLE `tipopregunta`
  MODIFY `Id_TipoPregunta` tinyint(4) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;
--
-- AUTO_INCREMENT de la tabla `tiposusuarios`
--
ALTER TABLE `tiposusuarios`
  MODIFY `Id_TipoUsuario` tinyint(4) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;
--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `academia`
--
ALTER TABLE `academia`
  ADD CONSTRAINT `academia_ibfk_1` FOREIGN KEY (`Carrera`) REFERENCES `carrera` (`Id_Carrera`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `academia_ibfk_2` FOREIGN KEY (`Coordinador_Acad`) REFERENCES `usuario` (`Registro_U`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `criteriosfilarubrica`
--
ALTER TABLE `criteriosfilarubrica`
  ADD CONSTRAINT `criteriosfilarubrica_ibfk_1` FOREIGN KEY (`FilaRubrica`) REFERENCES `rubrica` (`Id_FilaRubrica`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `cuestionario`
--
ALTER TABLE `cuestionario`
  ADD CONSTRAINT `cuestionario_ibfk_1` FOREIGN KEY (`TipoPregunta`) REFERENCES `tipopregunta` (`Id_TipoPregunta`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `cuestionario_ibfk_2` FOREIGN KEY (`AspectoEv`) REFERENCES `aspectoevaluacion` (`Id_Aspecto`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `cuestionario_ibfk_3` FOREIGN KEY (`Instrumento`) REFERENCES `instrumento` (`Id_Instrumento`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `evaluacionfilaguiaobs`
--
ALTER TABLE `evaluacionfilaguiaobs`
  ADD CONSTRAINT `evaluacionfilaguiaobs_ibfk_1` FOREIGN KEY (`FilaGuiaObs`) REFERENCES `guiadeobservacion` (`Id_FilaGuiadO`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `evaluacionfilaguiaobs_ibfk_2` FOREIGN KEY (`Evaluador`) REFERENCES `usuario` (`Registro_U`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `evaluacionfilaguiaobs_ibfk_3` FOREIGN KEY (`Evaluado`) REFERENCES `usuario` (`Registro_U`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `evaluacionfilalistac`
--
ALTER TABLE `evaluacionfilalistac`
  ADD CONSTRAINT `evaluacionfilalistac_ibfk_1` FOREIGN KEY (`FilaListaCotejo`) REFERENCES `listacotejo` (`Id_FilaListaC`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `evaluacionfilalistac_ibfk_2` FOREIGN KEY (`Evaluado`) REFERENCES `usuario` (`Registro_U`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `evaluacionfilalistac_ibfk_3` FOREIGN KEY (`Evaluador`) REFERENCES `usuario` (`Registro_U`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `evaluacionfilarubrica`
--
ALTER TABLE `evaluacionfilarubrica`
  ADD CONSTRAINT `evaluacionfilarubrica_ibfk_1` FOREIGN KEY (`FilaRubrica`) REFERENCES `rubrica` (`Id_FilaRubrica`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `evaluacionfilarubrica_ibfk_2` FOREIGN KEY (`Evaluador`) REFERENCES `usuario` (`Registro_U`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `evaluacionfilarubrica_ibfk_3` FOREIGN KEY (`Evaluado`) REFERENCES `usuario` (`Registro_U`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `evaluacionfilarubrica_ibfk_4` FOREIGN KEY (`CriterioSeleccionado`) REFERENCES `criteriosfilarubrica` (`Id_CriterioFilaR`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `evaluacioninstrumento`
--
ALTER TABLE `evaluacioninstrumento`
  ADD CONSTRAINT `evaluacioninstrumento_ibfk_1` FOREIGN KEY (`Alumno`) REFERENCES `usuario` (`Registro_U`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `evaluacioninstrumento_ibfk_2` FOREIGN KEY (`Instrumento`) REFERENCES `instrumento` (`Id_Instrumento`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `evaluacionrespuestacues`
--
ALTER TABLE `evaluacionrespuestacues`
  ADD CONSTRAINT `evaluacionrespuestacues_ibfk_1` FOREIGN KEY (`Respuesta`) REFERENCES `respuestacuestionario` (`Id_RespuestaFilaC`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `evaluacionrespuestacues_ibfk_2` FOREIGN KEY (`Evaluador`) REFERENCES `usuario` (`Registro_U`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `grupoperiodo`
--
ALTER TABLE `grupoperiodo`
  ADD CONSTRAINT `grupoperiodo_ibfk_1` FOREIGN KEY (`Profesor`) REFERENCES `usuario` (`Registro_U`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `grupoperiodo_ibfk_2` FOREIGN KEY (`Grupo`) REFERENCES `grupo` (`Id_Grupo`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `grupoperiodo_ibfk_3` FOREIGN KEY (`Materia`) REFERENCES `materia` (`Id_Materia`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `guiadeobservacion`
--
ALTER TABLE `guiadeobservacion`
  ADD CONSTRAINT `guiadeobservacion_ibfk_1` FOREIGN KEY (`Instrumento`) REFERENCES `instrumento` (`Id_Instrumento`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `guiadeobservacion_ibfk_2` FOREIGN KEY (`AspectoEv`) REFERENCES `aspectoevaluacion` (`Id_Aspecto`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `instrumento`
--
ALTER TABLE `instrumento`
  ADD CONSTRAINT `instrumento_ibfk_1` FOREIGN KEY (`Creador`) REFERENCES `usuario` (`Registro_U`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `instrumento_ibfk_2` FOREIGN KEY (`TipoEvaluacion`) REFERENCES `tipoevaluacion` (`Id_TipoEv`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `instrumento_ibfk_3` FOREIGN KEY (`TipoInstrumento`) REFERENCES `tipoinstrumento` (`Id_TipoInstr`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `instrumento_ibfk_4` FOREIGN KEY (`Materia`) REFERENCES `materia` (`Id_Materia`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `instrumentoscompartidos`
--
ALTER TABLE `instrumentoscompartidos`
  ADD CONSTRAINT `instrumentoscompartidos_ibfk_1` FOREIGN KEY (`Instrumento`) REFERENCES `instrumento` (`Id_Instrumento`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `instrumentoscompartidos_ibfk_2` FOREIGN KEY (`Academia`) REFERENCES `academia` (`Id_Academia`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `instrumentoscompartidos_ibfk_3` FOREIGN KEY (`Materia`) REFERENCES `materia` (`Id_Materia`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `integrantesacademia`
--
ALTER TABLE `integrantesacademia`
  ADD CONSTRAINT `integrantesacademia_ibfk_1` FOREIGN KEY (`Academia`) REFERENCES `academia` (`Id_Academia`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `integrantesacademia_ibfk_2` FOREIGN KEY (`Integrante`) REFERENCES `usuario` (`Registro_U`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `listacotejo`
--
ALTER TABLE `listacotejo`
  ADD CONSTRAINT `listacotejo_ibfk_1` FOREIGN KEY (`Instrumento`) REFERENCES `instrumento` (`Id_Instrumento`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `listacotejo_ibfk_2` FOREIGN KEY (`AspectoEv`) REFERENCES `aspectoevaluacion` (`Id_Aspecto`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `listagrupo`
--
ALTER TABLE `listagrupo`
  ADD CONSTRAINT `listagrupo_ibfk_1` FOREIGN KEY (`Alumno`) REFERENCES `usuario` (`Registro_U`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `listagrupo_ibfk_2` FOREIGN KEY (`GpoPeriodo`) REFERENCES `grupoperiodo` (`Id_GpoPeriodo`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `materia`
--
ALTER TABLE `materia`
  ADD CONSTRAINT `materia_ibfk_1` FOREIGN KEY (`Academia`) REFERENCES `academia` (`Id_Academia`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `opcionespregunta`
--
ALTER TABLE `opcionespregunta`
  ADD CONSTRAINT `opcionespregunta_ibfk_1` FOREIGN KEY (`Pregunta`) REFERENCES `cuestionario` (`Id_FilaCues`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `permisosllenado`
--
ALTER TABLE `permisosllenado`
  ADD CONSTRAINT `permisosllenado_ibfk_1` FOREIGN KEY (`Instrumento`) REFERENCES `instrumento` (`Id_Instrumento`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `permisosllenado_ibfk_2` FOREIGN KEY (`Alumno`) REFERENCES `usuario` (`Registro_U`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `permisosllenado_ibfk_3` FOREIGN KEY (`GpoPeriodo`) REFERENCES `grupoperiodo` (`Id_GpoPeriodo`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `respuestacuestionario`
--
ALTER TABLE `respuestacuestionario`
  ADD CONSTRAINT `respuestacuestionario_ibfk_1` FOREIGN KEY (`Pregunta`) REFERENCES `cuestionario` (`Id_FilaCues`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `respuestacuestionario_ibfk_2` FOREIGN KEY (`Evaluado`) REFERENCES `usuario` (`Registro_U`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `rubrica`
--
ALTER TABLE `rubrica`
  ADD CONSTRAINT `rubrica_ibfk_1` FOREIGN KEY (`Instrumento`) REFERENCES `instrumento` (`Id_Instrumento`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `rubrica_ibfk_2` FOREIGN KEY (`AspectoEv`) REFERENCES `aspectoevaluacion` (`Id_Aspecto`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `solicitudesacademia`
--
ALTER TABLE `solicitudesacademia`
  ADD CONSTRAINT `solicitudesacademia_ibfk_1` FOREIGN KEY (`Solicitante`) REFERENCES `usuario` (`Registro_U`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `solicitudesacademia_ibfk_2` FOREIGN KEY (`Academia`) REFERENCES `academia` (`Id_Academia`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `solicitudeslistagrupo`
--
ALTER TABLE `solicitudeslistagrupo`
  ADD CONSTRAINT `solicitudeslistagrupo_ibfk_1` FOREIGN KEY (`Solicitante`) REFERENCES `usuario` (`Registro_U`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `solicitudeslistagrupo_ibfk_2` FOREIGN KEY (`GrupoPeriodo`) REFERENCES `grupoperiodo` (`Id_GpoPeriodo`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `usuario`
--
ALTER TABLE `usuario`
  ADD CONSTRAINT `usuario_ibfk_1` FOREIGN KEY (`Tipo_Usuario`) REFERENCES `tiposusuarios` (`Id_TipoUsuario`) ON DELETE CASCADE ON UPDATE CASCADE;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
