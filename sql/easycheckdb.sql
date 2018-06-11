-- phpMyAdmin SQL Dump
-- version 4.8.0
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 11-06-2018 a las 23:19:26
-- Versión del servidor: 10.1.31-MariaDB
-- Versión de PHP: 7.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `easycheckdb`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `academia`
--

CREATE TABLE `academia` (
  `Id_Academia` int(11) NOT NULL,
  `Academia` varchar(28) NOT NULL,
  `Clave_Acceso` varchar(100) NOT NULL,
  `Ciclo_Periodo` char(14) NOT NULL,
  `Lista_Prof` varchar(70) NOT NULL,
  `Coordinador_Acad` int(11) NOT NULL,
  `Carrera` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `academia`
--

INSERT INTO `academia` (`Id_Academia`, `Academia`, `Clave_Acceso`, `Ciclo_Periodo`, `Lista_Prof`, `Coordinador_Acad`, `Carrera`) VALUES
(1, 'Informática', '$2y$10$MY5OmpcrBY3NIYsrL.w4teUryw7iV/jdNWauiXPaPwdhlxncPQJaO', 'Feb - Jun 2018', 'listaProf6463ProfesInformatica', 123, 1),
(2, 'Electrónica Analógica', '$2y$10$u9zwI/Bz0.l2vBf65NR.COqEy0oW42BPy/HP4.NaM99jrYHLTFdOe', 'Feb - Jun 2018', 'listaProf1943ProfesAnalógica', 60, 1);

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
(1, 'usuario', 'Login'),
(2, 'usuario', 'verifyUser'),
(3, 'usuario', 'registerUser'),
(4, 'carrera', 'getCarreras'),
(5, 'usuario', 'getSessionVariables'),
(6, 'usuario', 'Logout'),
(7, 'usuario', 'getUserInfo'),
(8, 'usuario', 'updateUserInfo'),
(9, 'materia', 'insertMateria'),
(10, 'materia', 'readMateria'),
(11, 'file', 'saveFile_getPathForJS'),
(12, 'file', 'create_writeFile'),
(13, 'materia', 'getMateriaById'),
(14, 'materia', 'updateMateria'),
(15, 'file', 'deleteFile'),
(16, 'materia', 'deleteMateria'),
(17, 'academia', 'getAcademiaByCoordinador'),
(18, 'tipoevaluacion', 'readTipoEvaluacion'),
(19, 'file', 'getContentFile'),
(20, 'instrumento', 'insertInstrumento'),
(21, 'listacotejo', 'cleanListaCotejo'),
(22, 'listacotejo', 'saveListaCotejo'),
(23, 'guiadeobservacion', 'cleanGuiaObs'),
(24, 'guiadeobservacion', 'saveGuiaObs'),
(25, 'cuestionario', 'cleanCuestionario'),
(26, 'cuestionario', 'saveCuestionario'),
(27, 'cuestionario', 'readCuestionario'),
(28, 'instrumento', 'readInstrumento'),
(29, 'opcionespregunta', 'readOpcionesPreg'),
(30, 'listacotejo', 'readListaCotejo'),
(31, 'guiadeobservacion', 'readGuiaObs'),
(32, 'academia', 'updateAcademia'),
(33, 'academia', 'getAcademiaById'),
(34, 'academia', 'verifyRequestToAcad'),
(35, 'integrantesacademia', 'verifyToInsertNewMember'),
(36, 'integrantesacademia', 'getAcadMembers'),
(37, 'rubrica', 'cleanRubrica'),
(38, 'rubrica', 'saveRubrica'),
(39, 'rubrica', 'readRubrica');

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

--
-- Volcado de datos para la tabla `criteriosfilarubrica`
--

INSERT INTO `criteriosfilarubrica` (`Id_CriterioFilaR`, `FilaRubrica`, `Identificador`, `DescripcionIdent`, `ValorIdent`) VALUES
(49, 23, '9', '9', 9),
(50, 23, '0', '0', 10),
(51, 23, '4', '4', 4),
(52, 23, '5', '5', 5),
(78, 29, 'Excelente', 'Es perfecto', 100),
(79, 29, 'Bueno', 'Casi es perfecto', 80),
(80, 29, 'Suficiente', 'Puede mejorar', 70),
(81, 29, 'Regular', 'Hay que mejorar mucho', 60),
(82, 29, 'Malo', 'Es indispensable mejorar', 40),
(83, 30, 'Excelente', 'Excelente', 100),
(84, 30, 'Bueno', 'BUeno', 80),
(85, 30, 'Regular', 'Regular', 60),
(86, 30, 'Malo', 'Malo', 10);

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
  `ResCorrecta` varchar(60) DEFAULT NULL,
  `PonderacionPreg` tinyint(4) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `cuestionario`
--

INSERT INTO `cuestionario` (`Id_FilaCues`, `Instrumento`, `TipoPregunta`, `AspectoEv`, `NumPregunta`, `Pregunta`, `ResCorrecta`, `PonderacionPreg`) VALUES
(75, 4, 3, 1, 1, '¿Qué es un POCO en programación orientada a objetos en C#?', NULL, 2),
(76, 4, 1, 1, 2, 'Cuál es la contraparte de Microsoft a Java', '1', 34),
(77, 4, 3, 2, 3, 'Explica el proceso para crear una aplicación Java en NetBeans.', NULL, 29),
(78, 4, 1, 2, 4, '¿Qué es Java en el mundo la informática?', '1', 12),
(79, 4, 2, 1, 5, 'Una ___ es un elemento que permite crear objetos con determinados atributos y métodos.', 'Clase', 20),
(80, 4, 3, 1, 6, 'Hola', NULL, 3),
(84, 7, 3, 1, 1, 'Explica el proceso para subir una imagen', NULL, 33),
(85, 7, 1, 1, 2, '10 + 1', '4', 34),
(86, 7, 2, 1, 3, 'El lenguaje ___ se utiliza para generar consultas a una base de datos.', 'SQL', 33);

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
  `Clave_Acceso` varchar(100) NOT NULL
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

--
-- Volcado de datos para la tabla `guiadeobservacion`
--

INSERT INTO `guiadeobservacion` (`Id_FilaGuiadO`, `AspectoEv`, `Instrumento`, `NumElemento`, `AccionesEv`, `PonderacionElem`) VALUES
(8, 2, 6, 1, 'Hola 1', 15),
(9, 1, 6, 2, 'xcv', 3),
(10, 3, 6, 3, 'ljasd', 50),
(11, 1, 6, 4, 'Nada', 32);

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
  `NombElemento` varchar(25) NOT NULL,
  `InstruccLlenado` varchar(260) NOT NULL,
  `Materia` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `instrumento`
--

INSERT INTO `instrumento` (`Id_Instrumento`, `Creador`, `TipoInstrumento`, `TipoEvaluacion`, `ClaveElem`, `NombElemento`, `InstruccLlenado`, `Materia`) VALUES
(4, 123, 4, 2, 'P1.4', 'Examen', 'Prueba', 4),
(5, 123, 2, 2, 'P1.2', 'Actividades en Clase', 'Prueba Lista Cotejo', 5),
(6, 123, 3, 2, 'P3.3', 'Prácticas', 'GuiaObs prueba', 8),
(7, 123, 4, 2, 'P1.4', 'Examen', 'hola examen', 4),
(8, 123, 4, 2, 'P2.4', 'Examen', 'Hola', 4),
(10, 123, 1, 2, 'P1.3', 'Prácticas', 'Seleccione el criterio más adecuado para describir el elemento a evaluar de cada práctica.', 4),
(11, 123, 1, 2, 'P3.3', 'Prácticas', 'Prácticas POO', 8),
(12, 12, 1, 2, 'P1.3', 'Prácticas', 'Seleccione el mejor criterio', 10);

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

--
-- Volcado de datos para la tabla `integrantesacademia`
--

INSERT INTO `integrantesacademia` (`Id_IntegAcad`, `Academia`, `Integrante`) VALUES
(1, 1, 12),
(2, 2, 12);

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

--
-- Volcado de datos para la tabla `listacotejo`
--

INSERT INTO `listacotejo` (`Id_FilaListaC`, `Instrumento`, `AspectoEv`, `NumElemento`, `IndicadoresEv`) VALUES
(11, 5, 3, 1, 'Las actividades están ordenadas y limpias.'),
(12, 5, 1, 2, 'Las respuestas de las actividades son correctas'),
(13, 5, 3, 3, 'Las actividades fueron realizadas en tiempo y forma'),
(14, 5, 1, 4, 'fg');

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
) ENGINE=InnoDB DEFAULT CHARSET=latin1 ROW_FORMAT=COMPACT;

--
-- Volcado de datos para la tabla `materia`
--

INSERT INTO `materia` (`Id_Materia`, `Materia`, `Semestre`, `Valores_Parciales`, `Academia`) VALUES
(4, 'Programación Avanzada I', 7, 'valPar9337ParcialesPrograAvanzadaI', 1),
(5, 'Seguridad en ITI', 8, 'valPar3554SeguridadenITI', 1),
(8, 'POO', 4, 'valPar6365ValoresParcialesPOO', 1),
(9, 'Sistemas Embebidos II', 8, 'valPar3490SistemasEmbebidosI', 1),
(10, 'Temas de Electrónica I', 4, 'valPar3083TEIValPar', 2);

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

--
-- Volcado de datos para la tabla `opcionespregunta`
--

INSERT INTO `opcionespregunta` (`Id_OpcionesP`, `NumOpcion`, `Opcion`, `Pregunta`) VALUES
(129, 1, 'JavaScript', 76),
(130, 2, 'Entity Framework', 76),
(131, 3, 'C++', 76),
(132, 4, 'C#', 76),
(133, 1, 'Un café', 78),
(134, 2, 'Una tecnología para desarrollar Software', 78),
(135, 3, 'Solo un lenguaje de programación', 78),
(136, 4, 'Nada importante', 78),
(141, 1, '9', 85),
(142, 2, '6', 85),
(143, 3, '16', 85),
(144, 4, '11', 85);

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
  `Descripcion` varchar(40) NOT NULL,
  `NumCriterios` tinyint(4) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `rubrica`
--

INSERT INTO `rubrica` (`Id_FilaRubrica`, `Instrumento`, `AspectoEv`, `NumElemento`, `Descripcion`, `NumCriterios`) VALUES
(23, 10, 1, 1, 'asdno', 4),
(29, 11, 2, 1, 'Sabe medir resistencias', 5),
(30, 12, 1, 1, 'Medir resistencias', 4);

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
(3, 'Pregunta Abierta');

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
  `Password` varchar(100) NOT NULL,
  `Escolaridad` varchar(15) NOT NULL,
  `Tipo_Usuario` tinyint(4) NOT NULL,
  `Foto` varchar(100) NOT NULL,
  `Hash` varchar(120) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `usuario`
--

INSERT INTO `usuario` (`Registro_U`, `Nombres`, `Apellidos`, `Email`, `Password`, `Escolaridad`, `Tipo_Usuario`, `Foto`, `Hash`) VALUES
(12, 'Carlos', 'Molina Martínez', 'profesor@gmail.com', '$2y$10$5FQoGpWZ58BdE/.U7WUzLOyVV0eDD0JqCRzmL2ROiL9JYVoWM7nae', 'Ingeniería', 2, '', ''),
(60, 'Alejandra', 'Alcaráz Torres', 'electronica@gmail.com', '$2y$10$dCEnoiy8JVt.FGeDx9Z42egnYwhe3kYOQx/ZSHt2095iYYy/Bok0m', 'Maestría', 1, '', ''),
(123, 'Gustavo', 'Rojas', 'academia@gmail.com', '$2y$10$kbbnaMsfXIssgogx3IGPeOU8335k42dfFOP.Jr4O8M1hsynVTEAju', 'Maestría', 1, '', ''),
(14300281, 'Emiliano', 'Moreno', 'ssbbemims@gmail.com', '$2y$10$Fnz9vMd6uHS5U3.ZCl4EM.Od3cJNUEMjLdUXlJBE8hs5ZZCJXeOKi', '', 3, '', '');

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
  MODIFY `Id_Acciones` smallint(6) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=40;

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
  MODIFY `Id_CriterioFilaR` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=87;

--
-- AUTO_INCREMENT de la tabla `cuestionario`
--
ALTER TABLE `cuestionario`
  MODIFY `Id_FilaCues` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=87;

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
  MODIFY `Id_FilaGuiadO` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT de la tabla `instrumento`
--
ALTER TABLE `instrumento`
  MODIFY `Id_Instrumento` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT de la tabla `instrumentoscompartidos`
--
ALTER TABLE `instrumentoscompartidos`
  MODIFY `Id_SharedInstr` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `integrantesacademia`
--
ALTER TABLE `integrantesacademia`
  MODIFY `Id_IntegAcad` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de la tabla `listacotejo`
--
ALTER TABLE `listacotejo`
  MODIFY `Id_FilaListaC` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT de la tabla `listagrupo`
--
ALTER TABLE `listagrupo`
  MODIFY `Id_ListaGrupo` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `materia`
--
ALTER TABLE `materia`
  MODIFY `Id_Materia` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT de la tabla `opcionespregunta`
--
ALTER TABLE `opcionespregunta`
  MODIFY `Id_OpcionesP` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=145;

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
  MODIFY `Id_FilaRubrica` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=31;

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
  MODIFY `Id_TipoPregunta` tinyint(4) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

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
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
