-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: localhost:3306
-- Tiempo de generación: 08-10-2025 a las 06:10:50
-- Versión del servidor: 10.4.32-MariaDB
-- Versión de PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `scc`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `ingreso_salas`
--

CREATE TABLE `ingreso_salas` (
  `id_ingreso` char(10) NOT NULL,
  `fecha` date DEFAULT NULL,
  `hora_entrada` time DEFAULT NULL,
  `hora_salida` time DEFAULT NULL,
  `id_sala` char(3) DEFAULT NULL,
  `id_usuario` char(8) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `ingreso_salas`
--

INSERT INTO `ingreso_salas` (`id_ingreso`, `fecha`, `hora_entrada`, `hora_salida`, `id_sala`, `id_usuario`) VALUES
('1759782807', '2025-10-06', '14:33:27', NULL, '1', '20222111'),
('1759782888', '2025-10-06', '14:34:48', '14:37:07', '2', '20222111'),
('1759783061', '2025-10-06', '14:37:41', '14:37:57', '2', '20222111'),
('3', '2025-06-18', '13:53:20', '13:53:20', '3', '20222121');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `inventarios`
--

CREATE TABLE `inventarios` (
  `id` int(8) NOT NULL,
  `modelo` varchar(30) NOT NULL,
  `marca` varchar(30) DEFAULT NULL,
  `estado` varchar(255) DEFAULT NULL,
  `num_serie` varchar(30) DEFAULT NULL,
  `descripcion` varchar(150) DEFAULT NULL,
  `tipo` int(8) NOT NULL,
  `id_disponible` int(8) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `inventarios`
--

INSERT INTO `inventarios` (`id`, `modelo`, `marca`, `estado`, `num_serie`, `descripcion`, `tipo`, `id_disponible`) VALUES
(1, 'HP-3', 'HP', 'En buen estado funcionando al 100%', '441323', 'Es una laptop de caracteristicas medias de tamaño pequeño color negro', 6, 3),
(3, 'Tilin', 'TilinWindows', 'De la verga', '123123', 'Tilin de', 4, 2),
(4, 'Insano', 'Windows', 'Muy buen estaod', '13132451', 'Chido', 7, 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `licenciaturas`
--

CREATE TABLE `licenciaturas` (
  `id` char(8) NOT NULL,
  `nombre` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `licenciaturas`
--

INSERT INTO `licenciaturas` (`id`, `nombre`) VALUES
('1', 'Licenciatura en Ingeniería en Computación (2024)'),
('2', 'Licenciatura en Ingeniería Química (2018)'),
('3', 'Licenciatura en Química Industrial (2018)'),
('4', 'Licenciatura en Ingeniería en Sistemas Electrónicos (2024)'),
('5', 'Licenciatura en Ingeniería Mecánica (2018)'),
('6', 'Licenciatura en Inteligencia Artificial (2024)'),
('7', 'Licenciatura en Matematicas Aplicadas (2024)'),
('8', 'Ingeniería en Computación (2024)');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `posgrados`
--

CREATE TABLE `posgrados` (
  `id` char(8) NOT NULL,
  `nombre` varchar(45) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `posgrados`
--

INSERT INTO `posgrados` (`id`, `nombre`) VALUES
('1', 'Doctorado en Ciencas en Ingenieria Quimica'),
('2', 'Doctorado en  Computacionales y Elect'),
('3', 'Maestria en Ciencas de la Calidad'),
('4', 'Maestria en Ciencias en Ingenieria Quimica'),
('5', 'Maestria en Ciencias en  Computaciona'),
('6', 'Maestria en Ingenieria de Software'),
('7', 'Maestria en Uso y Gestion de Tecnologias de l');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `prestamos`
--

CREATE TABLE `prestamos` (
  `idPrestamo` int(10) NOT NULL,
  `fecha` date NOT NULL,
  `area` varchar(30) NOT NULL,
  `Proposito` varchar(150) DEFAULT NULL,
  `firma` mediumblob NOT NULL,
  `id_usuario` char(8) DEFAULT NULL,
  `inventarios_id` int(8) NOT NULL,
  `licenciatura` char(8) DEFAULT NULL,
  `posgrado` char(8) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `prestamos`
--

INSERT INTO `prestamos` (`idPrestamo`, `fecha`, `area`, `Proposito`, `firma`, `id_usuario`, `inventarios_id`, `licenciatura`, `posgrado`) VALUES
(15359, '2025-06-16', 'Sala A', 'Lo nececito para usar el siia', 0x716531, NULL, 1, NULL, '1'),
(63510, '2025-06-16', 'Pene', 'Penear', 0x61, NULL, 1, NULL, '1');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `reservaciones_salas`
--

CREATE TABLE `reservaciones_salas` (
  `id_reservacion` char(8) NOT NULL,
  `fecha` date DEFAULT NULL,
  `inicio_hora_reservacion` time DEFAULT NULL,
  `fin_hora_reservacion` time DEFAULT NULL,
  `motivo` varchar(150) NOT NULL,
  `tipo_reservacion` tinyint(1) DEFAULT NULL,
  `id_usuario` char(8) DEFAULT NULL,
  `id_sala` char(3) DEFAULT NULL,
  `posgrado` char(8) DEFAULT NULL,
  `licenciatura` char(8) DEFAULT NULL,
  `unidad_aprendizaje` char(8) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `reservaciones_salas`
--

INSERT INTO `reservaciones_salas` (`id_reservacion`, `fecha`, `inicio_hora_reservacion`, `fin_hora_reservacion`, `motivo`, `tipo_reservacion`, `id_usuario`, `id_sala`, `posgrado`, `licenciatura`, `unidad_aprendizaje`) VALUES
('RS001', '2025-10-13', '07:00:00', '09:00:00', 'sdfsa', 1, '20222111', '1', NULL, '2', 'UAIQ001'),
('RS002', '2025-10-08', '07:00:00', '08:00:00', 'Pendejear', 1, '20222111', '2', NULL, '2', 'UAIQ001');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `respuestas_seguridad`
--

CREATE TABLE `respuestas_seguridad` (
  `id` int(11) NOT NULL,
  `usuario_id` varchar(50) NOT NULL,
  `pregunta` text NOT NULL,
  `respuesta` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `respuestas_seguridad`
--

INSERT INTO `respuestas_seguridad` (`id`, `usuario_id`, `pregunta`, `respuesta`) VALUES
(1, '20262222', '¿Cuál era el nombre de tu primera mascota?', '$2b$10$y0iVfDRLrNOU2kDrPEyV6ewVfeNyULE9deCIDJ9yH/IhhMvEAv.Bu'),
(2, '20262222', '¿Cuál es tu película favorita?', '$2b$10$AWoF0uX.nKxiHY7wBbhEPeRDKsfU8Q5G3bLAUwcFE9pIghwggS7vy'),
(3, '20222198', '¿Cuál es tu comida favorita?', '$2b$10$2R6O.v6omTdbvbxE4qVRYuH0AAYiTj0D/Atc.jD4HZ7c2LZ.Pzlwu'),
(4, '20222198', '¿Cuál fue tu primer auto?', '$2b$10$L76QIzHv1wVcwTzY16UqL.UiCoMOk3WxQ2UXZa7TboHK2EopSsDvy');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `roles`
--

CREATE TABLE `roles` (
  `idRol` char(1) NOT NULL,
  `nombre` varchar(30) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `roles`
--

INSERT INTO `roles` (`idRol`, `nombre`) VALUES
('1', 'Administrador'),
('2', 'Docente'),
('3', 'Estudiante'),
('4', 'Visitante');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `salas`
--

CREATE TABLE `salas` (
  `id` char(3) NOT NULL,
  `nombre` varchar(45) DEFAULT NULL,
  `estado` tinyint(4) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `salas`
--

INSERT INTO `salas` (`id`, `nombre`, `estado`) VALUES
('1', 'Sala A', 1),
('2', 'Sala B', 1),
('3', 'Sala C', 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tipo_equipo`
--

CREATE TABLE `tipo_equipo` (
  `id_tipo` int(8) NOT NULL,
  `nombre` varchar(30) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `tipo_equipo`
--

INSERT INTO `tipo_equipo` (`id_tipo`, `nombre`) VALUES
(1, 'Cañon'),
(2, 'Bocina'),
(3, 'Grabadora'),
(4, 'Microfono'),
(5, 'Mouse'),
(6, 'Laptop'),
(7, 'Extension'),
(8, 'Cable de Corriente'),
(9, 'Cable de Conexion');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tipo_estado`
--

CREATE TABLE `tipo_estado` (
  `id_estado` int(8) NOT NULL,
  `nombre` varchar(30) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `tipo_estado`
--

INSERT INTO `tipo_estado` (`id_estado`, `nombre`) VALUES
(1, 'Disponible'),
(2, 'No Disponible'),
(3, 'Prestado');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `unidades_aprendizaje`
--

CREATE TABLE `unidades_aprendizaje` (
  `idunidad_aprendizaje` char(8) NOT NULL,
  `nombre` varchar(100) DEFAULT NULL,
  `licenciatura` char(8) DEFAULT NULL,
  `posgrado` char(8) DEFAULT NULL,
  `semestre` varchar(2) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `unidades_aprendizaje`
--

INSERT INTO `unidades_aprendizaje` (`idunidad_aprendizaje`, `nombre`, `licenciatura`, `posgrado`, `semestre`) VALUES
('UAIQ001', 'Álgebra Superior', '2', NULL, '1'),
('UAIQ002', 'Cálculo Diferencial', '2', NULL, '1'),
('UAIQ003', 'Epistemología y Metodología para las Ciencias Básicas', '2', NULL, '1'),
('UAIQ004', 'Humanismo, Autorrealización y Sostenibilidad', '2', NULL, '1'),
('UAIQ005', 'Química Inorgánica', '2', NULL, '1'),
('UAIQ006', 'Química Orgánica', '2', NULL, '1'),
('UAIQ007', 'Seminario de Integración de la Praxis Profesional 1', '2', NULL, '1'),
('UAIQ008', 'Uso Profesional de la Información Digital', '2', NULL, '1'),
('UAIQ009', 'Álgebra Lineal', '2', NULL, '2'),
('UAIQ010', 'Cálculo Integral', '2', NULL, '2'),
('UAIQ011', 'Comprensión de Textos Académicos en Inglés', '2', NULL, '2'),
('UAIQ012', 'Física', '2', NULL, '2'),
('UAIQ013', 'Formación Cívica y Democrática', '2', NULL, '2'),
('UAIQ014', 'Innovación para el Futuro Profesional en Ciencias Básicas', '2', NULL, '2'),
('UAIQ015', 'Seminario de Integración de la Praxis Profesional 2', '2', NULL, '2'),
('UAIQ016', 'Termodinámica', '2', NULL, '2'),
('UAIQ017', 'Balances de Materia y Energía', '2', NULL, '3'),
('UAIQ018', 'Biosistemas', '2', NULL, '3'),
('UAIQ019', 'Ecuaciones Diferenciales', '2', NULL, '3'),
('UAIQ020', 'Electricidad y Magnetismo', '2', NULL, '3'),
('UAIQ021', 'Fisicoquímica', '2', NULL, '3'),
('UAIQ022', 'Química Analítica', '2', NULL, '3'),
('UAIQ023', 'Seminario de Integración de la Praxis Profesional 3', '2', NULL, '3'),
('UAIQ024', 'Equilibrio Termodinámico', '2', NULL, '4'),
('UAIQ025', 'Fenómenos de Transporte', '2', NULL, '4'),
('UAIQ026', 'Programación y Métodos Numéricos', '2', NULL, '4'),
('UAIQ027', 'Seminario de Integración de la Praxis Profesional 4', '2', NULL, '4'),
('UAIQ028', 'Sistemas de Manufactura', '2', NULL, '4'),
('UAIQ029', 'Cinética y Catálisis', '2', NULL, '5'),
('UAIQ030', 'Flujo de Fluidos', '2', NULL, '5'),
('UAIQ031', 'Ingeniería de la Calidad', '2', NULL, '5'),
('UAIQ032', 'Ingeniería para la Transferencia de Calor', '2', NULL, '5'),
('UAIQ033', 'Operaciones Unitarias Básicas', '2', NULL, '5'),
('UAIQ034', 'Seminario de Integración de la Praxis Profesional 5', '2', NULL, '5'),
('UAIQ035', 'Gestión Estratégica', '2', NULL, '4'),
('UAIQ036', 'Ingeniería de Reactores', '2', NULL, '4'),
('UAIQ037', 'Seminario de Integración de la Praxis Profesional 6', '2', NULL, '5'),
('UAIQ038', 'Separaciones Basadas en el Equilibrio', '2', NULL, '5'),
('UAIQ039', 'Dinámica y Control de Procesos', '2', NULL, '6'),
('UAIQ040', 'Ingeniería Económica', '2', NULL, '6'),
('UAIQ041', 'Seminario de Integración de la Praxis Profesional 7', '2', NULL, '6'),
('UAIQ042', 'Separaciones Basadas en Transferencia de Masa', '2', NULL, '6'),
('UAIQ043', 'Seminario de Integración de la Praxis Profesional 8', '2', NULL, '7'),
('UAIQ044', 'Síntesis de Procesos', '2', NULL, '7'),
('UAIQ045', 'Ingeniería de Proyectos', '2', NULL, '7'),
('UAIQ046', 'Prácticas Profesionales', '2', NULL, '7'),
('UAIQ047', 'Seminario de Integración de la Praxis Profesional 9', '2', NULL, '7'),
('UAIQ048', 'Probabilidad y Estadística', '2', NULL, '4');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuarios`
--

CREATE TABLE `usuarios` (
  `id` char(8) NOT NULL,
  `nombre` varchar(30) NOT NULL,
  `apellido_paterno` varchar(30) NOT NULL,
  `apellido_materno` varchar(30) NOT NULL,
  `correo` varchar(50) NOT NULL,
  `contrasena` varchar(200) NOT NULL,
  `semestre` tinyint(2) NOT NULL,
  `rol` char(1) NOT NULL,
  `licenciatura` char(8) DEFAULT NULL,
  `posgrado` char(8) DEFAULT NULL,
  `foto` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `usuarios`
--

INSERT INTO `usuarios` (`id`, `nombre`, `apellido_paterno`, `apellido_materno`, `correo`, `contrasena`, `semestre`, `rol`, `licenciatura`, `posgrado`, `foto`) VALUES
('20222111', 'Uriel', 'Hernández', 'Vélez', 'uriel@gmail.com', '$2b$10$KofdLju64eeaOwFP40NLWOoeLI3yej83V598FBEG7d8sA0oTmFSEi', 2, '2', '2', NULL, '1759782257587-839508470.png'),
('20222121', 'Gerardo', 'Sánchez', 'Ramos', 'levi_chiquito@gmail.com', '$2b$10$NzOVxW/ncT2Q4GLY1SWluuJ2sgBAH0wVti6tLOcA3ghetAV61F65W', 3, '3', '1', '6', NULL),
('20222198', 'Jesús', 'Trujillo', 'Espinosa', 'mr.iikttx@gmail.com', '$2b$10$F.GEjGbCQdvTcyTlm8nwuOln5zdxYGAXJ4B1x13JVMCDZMBsc2dmG', 1, '3', '2', '6', '1759895040113-483832492.jpg'),
('20222222', 'Joacim', 'Cuahutle', 'Calderon', 'joacim@gmail.com', '$2b$10$IQUdfU9kUix/MO6rH26VCu8C7XMqXOE//lfqSAzDBp5KwJl.z//c6', 1, '1', '6', '6', '1759776239422-486190467.jpg'),
('20262222', 'tilin', 'tilin', 'pilin', 'pinlin@gmail.com', '$2b$10$Otu3p/bQengq0cbqd1WloOkWQhU0UICb7EHK1AzG3UDwfDVLcRFRe', 1, '3', '2', NULL, NULL);

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `ingreso_salas`
--
ALTER TABLE `ingreso_salas`
  ADD PRIMARY KEY (`id_ingreso`),
  ADD KEY `fk_idSala_idx` (`id_sala`),
  ADD KEY `fk_ingreso_salas_Usuarios1_idx` (`id_usuario`);

--
-- Indices de la tabla `inventarios`
--
ALTER TABLE `inventarios`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_tipo_equipo` (`tipo`),
  ADD KEY `fk_Inventarios_tipo_estado1` (`id_disponible`);

--
-- Indices de la tabla `licenciaturas`
--
ALTER TABLE `licenciaturas`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `posgrados`
--
ALTER TABLE `posgrados`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `prestamos`
--
ALTER TABLE `prestamos`
  ADD PRIMARY KEY (`idPrestamo`),
  ADD KEY `fk_idusuario_idx` (`id_usuario`),
  ADD KEY `fk_Prestamos_Inventarios1` (`inventarios_id`),
  ADD KEY `fk_Prestamos_licenciaturas1` (`licenciatura`),
  ADD KEY `fk_Prestamos_posgrados1` (`posgrado`);

--
-- Indices de la tabla `reservaciones_salas`
--
ALTER TABLE `reservaciones_salas`
  ADD PRIMARY KEY (`id_reservacion`),
  ADD KEY `fk_idusuario_reservacion_idx` (`id_usuario`),
  ADD KEY `fk_reservacion_sala_Sala1_idx` (`id_sala`),
  ADD KEY `fk_reservaciones_salas_posgrados1_idx` (`posgrado`),
  ADD KEY `fk_reservaciones_salas_licenciaturas1_idx` (`licenciatura`),
  ADD KEY `fk_reservaciones_salas_unidades_aprendizaje1_idx` (`unidad_aprendizaje`);

--
-- Indices de la tabla `respuestas_seguridad`
--
ALTER TABLE `respuestas_seguridad`
  ADD PRIMARY KEY (`id`),
  ADD KEY `usuario_id` (`usuario_id`);

--
-- Indices de la tabla `roles`
--
ALTER TABLE `roles`
  ADD PRIMARY KEY (`idRol`);

--
-- Indices de la tabla `salas`
--
ALTER TABLE `salas`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `tipo_equipo`
--
ALTER TABLE `tipo_equipo`
  ADD PRIMARY KEY (`id_tipo`);

--
-- Indices de la tabla `tipo_estado`
--
ALTER TABLE `tipo_estado`
  ADD PRIMARY KEY (`id_estado`);

--
-- Indices de la tabla `unidades_aprendizaje`
--
ALTER TABLE `unidades_aprendizaje`
  ADD PRIMARY KEY (`idunidad_aprendizaje`),
  ADD KEY `fk_unidad_licenciatura` (`licenciatura`),
  ADD KEY `fk_unidad_posgrado` (`posgrado`);

--
-- Indices de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `correo_UNIQUE` (`correo`),
  ADD KEY `fk_Usuarios_Roles1_idx` (`rol`),
  ADD KEY `fk_Usuarios_licenciaturas1_idx` (`licenciatura`),
  ADD KEY `fk_Usuarios_posgrados1_idx` (`posgrado`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `inventarios`
--
ALTER TABLE `inventarios`
  MODIFY `id` int(8) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT de la tabla `prestamos`
--
ALTER TABLE `prestamos`
  MODIFY `idPrestamo` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=63511;

--
-- AUTO_INCREMENT de la tabla `respuestas_seguridad`
--
ALTER TABLE `respuestas_seguridad`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT de la tabla `tipo_equipo`
--
ALTER TABLE `tipo_equipo`
  MODIFY `id_tipo` int(8) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT de la tabla `tipo_estado`
--
ALTER TABLE `tipo_estado`
  MODIFY `id_estado` int(8) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `ingreso_salas`
--
ALTER TABLE `ingreso_salas`
  ADD CONSTRAINT `fk_idSala` FOREIGN KEY (`id_sala`) REFERENCES `salas` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_ingreso_salas_Usuarios1` FOREIGN KEY (`id_usuario`) REFERENCES `usuarios` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Filtros para la tabla `inventarios`
--
ALTER TABLE `inventarios`
  ADD CONSTRAINT `fk_Inventarios_tipo_estado1` FOREIGN KEY (`id_disponible`) REFERENCES `tipo_estado` (`id_estado`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_tipo_equipo` FOREIGN KEY (`tipo`) REFERENCES `tipo_equipo` (`id_tipo`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `prestamos`
--
ALTER TABLE `prestamos`
  ADD CONSTRAINT `fk_Prestamos_Inventarios1` FOREIGN KEY (`inventarios_id`) REFERENCES `inventarios` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_Prestamos_licenciaturas1` FOREIGN KEY (`licenciatura`) REFERENCES `licenciaturas` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_Prestamos_posgrados1` FOREIGN KEY (`posgrado`) REFERENCES `posgrados` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_idusuario` FOREIGN KEY (`id_usuario`) REFERENCES `usuarios` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `reservaciones_salas`
--
ALTER TABLE `reservaciones_salas`
  ADD CONSTRAINT `fk_idusuario_reservacion` FOREIGN KEY (`id_usuario`) REFERENCES `usuarios` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_reservacion_sala_Sala1` FOREIGN KEY (`id_sala`) REFERENCES `salas` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_reservaciones_salas_licenciaturas1` FOREIGN KEY (`licenciatura`) REFERENCES `licenciaturas` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_reservaciones_salas_posgrados1` FOREIGN KEY (`posgrado`) REFERENCES `posgrados` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_reservaciones_salas_unidades_aprendizaje1` FOREIGN KEY (`unidad_aprendizaje`) REFERENCES `unidades_aprendizaje` (`idunidad_aprendizaje`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Filtros para la tabla `respuestas_seguridad`
--
ALTER TABLE `respuestas_seguridad`
  ADD CONSTRAINT `respuestas_seguridad_ibfk_1` FOREIGN KEY (`usuario_id`) REFERENCES `usuarios` (`id`) ON DELETE CASCADE;

--
-- Filtros para la tabla `unidades_aprendizaje`
--
ALTER TABLE `unidades_aprendizaje`
  ADD CONSTRAINT `fk_unidad_licenciatura` FOREIGN KEY (`licenciatura`) REFERENCES `licenciaturas` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_unidad_posgrado` FOREIGN KEY (`posgrado`) REFERENCES `posgrados` (`id`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Filtros para la tabla `usuarios`
--
ALTER TABLE `usuarios`
  ADD CONSTRAINT `fk_Usuarios_Roles1` FOREIGN KEY (`rol`) REFERENCES `roles` (`idRol`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_Usuarios_licenciaturas1` FOREIGN KEY (`licenciatura`) REFERENCES `licenciaturas` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_Usuarios_posgrados1` FOREIGN KEY (`posgrado`) REFERENCES `posgrados` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
