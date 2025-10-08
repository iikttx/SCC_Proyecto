-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 20-11-2024 a las 20:16:04
-- Versión del servidor: 10.4.32-MariaDB
-- Versión de PHP: 8.0.30

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
-- Estructura de tabla para la tabla `huellas_usuario`
--

CREATE TABLE `huellas_usuario` (
  `id_huella` char(8) NOT NULL,
  `nombre_huella` varchar(8) NOT NULL,
  `imagen` mediumblob DEFAULT NULL,
  `Usuarios_id` char(8) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Volcado de datos para la tabla `huellas_usuario`
--

INSERT INTO `huellas_usuario` (`id_huella`, `nombre_huella`, `imagen`, `Usuarios_id`) VALUES
('HU001', 'huella1', NULL, '20222198'),
('HU002', 'huella2', NULL, '20222252'),
('HU003', 'huella3', NULL, '20222781'),
('HU004', 'huella4', NULL, '20222791'),
('HU005', 'huella5', NULL, '29384018'),
('HU006', 'huella6', NULL, '20222198'),
('HU007', 'huella7', NULL, '20222252'),
('HU008', 'huella8', NULL, '20222781'),
('HU009', 'huella9', NULL, '20222791'),
('HU010', 'huella10', NULL, '29384018');

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
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Volcado de datos para la tabla `ingreso_salas`
--

INSERT INTO `ingreso_salas` (`id_ingreso`, `fecha`, `hora_entrada`, `hora_salida`, `id_sala`, `id_usuario`) VALUES
('IN001', '2024-10-01', '08:00:00', '10:00:00', '1', '20222198'),
('IN002', '2024-10-02', '09:00:00', '11:00:00', '2', '20222252'),
('IN003', '2024-10-03', '10:00:00', '12:00:00', '3', '20222781'),
('IN004', '2024-10-10', '08:30:00', '10:30:00', '3', '20222791'),
('IN005', '2024-10-05', '09:15:00', '11:15:00', '2', '29384018'),
('IN006', '2024-10-06', '07:00:00', '09:00:00', '3', '20222198'),
('IN007', '2024-10-10', '08:00:00', '10:00:00', '3', '20222252'),
('IN008', '2024-10-10', '11:00:00', '13:00:00', '2', '20222781'),
('IN009', '2024-11-09', '10:00:00', '12:00:00', '3', '20222791'),
('IN010', '2024-10-20', '12:00:00', '14:00:00', '1', '29384018');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tipo_equipo`
--

CREATE TABLE `tipo_equipo` (
  `id_tipo` char(8) NOT NULL,
  `nombre` varchar(30) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Volcado de datos para la tabla `tipo_equipo`
--

INSERT INTO `tipo_equipo` (`id_tipo`, `nombre`) VALUES
('1', 'Cañon'),
('2', 'Bocina'),
('3', 'Grabadora'),
('4', 'Microfono'),
('5', 'Mouse'),
('6', 'Laptop'),
('7', 'Extension'),
('8', 'Cable de Corriente'),
('9', 'Cable de Conexion');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `inventarios`
--

CREATE TABLE `inventarios` (
  `id` char(8) NOT NULL,
  `modelo` varchar(30) NOT NULL,
  `marca` varchar(30) DEFAULT NULL,
  `estado` varchar(30) DEFAULT NULL,
  `num_serie` varchar(30) DEFAULT NULL,
  `descripción` varchar(150) DEFAULT NULL,
  `Usuarios_id` char(8) NOT NULL,
  `tipo` char(8) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Volcado de datos para la tabla `inventarios`
--

INSERT INTO `inventarios` (`id`, `modelo`, `marca`, `estado`, `num_serie`, `tipo`, `descripción`, `Usuarios_id`) VALUES
('INV001', 'ModeloA', 'MarcaX', 'Nuevo', 'SN001', '1', 'Cañon', '20222198'),
('INV002', 'ModeloB', 'MarcaY', 'Usado', 'SN002', '1', 'Cañon', '20222252'),
('INV003', 'ModeloC', 'MarcaZ', 'Defectuoso', 'SN003', '3', 'Grabadora que graba', '20222781'),
('INV004', 'ModeloD', 'MarcaW', 'Nuevo', 'SN004', '1', 'Impresora láser', '20222791'),
('INV005', 'ModeloE', 'MarcaV', 'Usado', 'SN005', '1', 'Tablet para dibujo', '29384018'),
('INV006', 'ModeloF', 'MarcaU', 'Nuevo', 'SN006', '1', 'Cámara de alta definición', '20222198'),
('INV007', 'ModeloG', 'MarcaT', 'Defectuoso', 'SN007', '2', 'Teclado mecánico', '20222252'),
('INV008', 'ModeloH', 'MarcaS', 'Usado', 'SN008', '5', 'Mouse inalámbrico', '20222781'),
('INV009', 'ModeloI', 'MarcaR', 'Nuevo', 'SN009', '4', 'Proyector portátil', '20222791'),
('INV010', 'ModeloJ', 'MarcaQ', 'Defectuoso', 'SN010', '2', 'Laptop de gama media', '29384018');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `licenciaturas`
--

CREATE TABLE `licenciaturas` (
  `idlicenciatura` char(8) NOT NULL,
  `nombre` varchar(45) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Volcado de datos para la tabla `licenciaturas`
--

INSERT INTO `licenciaturas` (`idlicenciatura`, `nombre`) VALUES
('1', 'Ingenería en Computación'),
('2', 'Ingeneria Quimica'),
('3', 'Ingeneria en Quimica Industrial'),
('4', 'Ingeneria en Sistemas Electronicos'),
('5', 'Ingeneria Mecanica'),
('6', 'Licenciatura en Inteligencia Artificial'),
('7', 'Licenciatura en Matematicas Aplicadas');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `permisos`
--

CREATE TABLE `permisos` (
  `idPermiso` char(1) NOT NULL,
  `tipo_permiso` varchar(45) DEFAULT NULL,
  `Roles_idRol` char(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Volcado de datos para la tabla `permisos`
--

INSERT INTO `permisos` (`idPermiso`, `tipo_permiso`, `Roles_idRol`) VALUES
('1', 'Crear', '1'),
('2', 'Borrar', '1'),
('3', 'Actualizar', '1'),
('4', 'Cambiar estado', '1');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `posgrados`
--

CREATE TABLE `posgrados` (
  `idposgrado` char(8) NOT NULL,
  `nombre varchar(8)` varchar(45) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Volcado de datos para la tabla `posgrados`
--

INSERT INTO `posgrados` (`idposgrado`, `nombre varchar(8)`) VALUES
('1', 'Doctorado en Ciencas en Ingenieria Quimica'),
('2', 'Doctorado en Sistemas Computacionales y Elect'),
('3', 'Maestria en Ciencas de la Calidad'),
('4', 'Maestria en Ciencias en Ingenieria Quimica'),
('5', 'Maestria en Ciencias en Sistemas Computaciona'),
('6', 'Maestria en Ingenieria de Software'),
('7', 'Maestria en Uso y Gestion de Tecnologias de l');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `prestamos`
--

CREATE TABLE `prestamos` (
  `idPrestamo` char(10) NOT NULL,
  `licenciatura` char(8) DEFAULT NULL,
  `posgrado` char(8) DEFAULT NULL,
  `fecha` date NOT NULL,
  `area` varchar(30) NOT NULL,
  `Proposito` varchar(150) DEFAULT NULL,
  `firma` mediumblob NOT NULL,
  `id_usuario` char(8) NOT NULL,
  `Inventarios_id` char(8) NOT NULL,
  `hora_inicio` time NOT NULL,
  `hora_fin` time NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Volcado de datos para la tabla `prestamos`
--

INSERT INTO `prestamos` (`idPrestamo`, `licenciatura`, `posgrado`, `fecha`, `area`, `Proposito`, `firma`, `id_usuario`, `Inventarios_id`, `hora_inicio`, `hora_fin`) VALUES
('PR001', '1', NULL, '2024-11-01', 'Computación', 'Préstamo de laptop para investigación', '', '20222198', 'INV001', '09:00:00', '12:00:00'),
('PR002', '2', NULL, '2024-11-02', 'Electrónica', 'Préstamo de proyector para clase', '', '20222252', 'INV002', '10:00:00', '13:00:00'),
('PR003', '3', NULL, '2024-11-03', 'Ingeniería Química', 'Préstamo de monitor para laboratorio', '', '20222781', 'INV003', '11:00:00', '14:00:00'),
('PR004', '1', '1', '2024-11-04', 'Tecnologías', 'Préstamo de cámara para grabación de tesis', '', '20222791', 'INV006', '12:00:00', '15:00:00'),
('PR005', '4', NULL, '2024-11-05', 'Sistemas', 'Préstamo de impresora para proyecto de clase', '', '29384018', 'INV004', '13:00:00', '16:00:00'),
('PR006', '1', '2', '2024-11-06', 'Redes', 'Préstamo de tablet para prácticas', '', '20222198', 'INV005', '14:00:00', '17:00:00'),
('PR007', '5', NULL, '2024-11-07', 'Mecánica', 'Préstamo de teclado para trabajo grupal', '', '20222252', 'INV007', '15:00:00', '18:00:00'),
('PR008', '6', NULL, '2024-11-08', 'Inteligencia Artificial', 'Préstamo de mouse inalámbrico para investigación', '', '20222781', 'INV008', '16:00:00', '19:00:00'),
('PR009', '2', '1', '2024-11-09', 'Electrónica', 'Préstamo de laptop para proyecto personal', '', '20222791', 'INV009', '17:00:00', '20:00:00'),
('PR010', '3', '3', '2024-11-10', 'Programación', 'Préstamo de proyector para conferencia', '', '29384018', 'INV010', '18:00:00', '21:00:00');

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
  `posgrado` char(8) NOT NULL,
  `licenciatura` char(8) NOT NULL,
  `unidad_aprendizaje` char(8) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Volcado de datos para la tabla `reservaciones_salas`
--

INSERT INTO `reservaciones_salas` (`id_reservacion`, `fecha`, `inicio_hora_reservacion`, `fin_hora_reservacion`, `motivo`, `tipo_reservacion`, `id_usuario`, `id_sala`, `posgrado`, `licenciatura`, `unidad_aprendizaje`) VALUES
('RS001', '2024-10-01', '09:00:00', '11:00:00', 'Seminario de tesis', 1, '20222198', '1', '2', '1', 'UA001'),
('RS002', '2024-10-02', '10:00:00', '12:00:00', 'Clase especial', 0, '20222252', '2', '3', '2', 'UA002'),
('RS003', '2024-10-03', '08:00:00', '10:00:00', 'Taller', 1, '20222781', '3', '1', '3', 'UA003'),
('RS004', '2024-10-10', '11:00:00', '13:00:00', 'Examen parcial', 0, '20222791', '1', '2', '4', 'UA004'),
('RS005', '2024-10-05', '07:00:00', '09:00:00', 'Reunión de grupo', 1, '29384018', '2', '1', '1', 'UA005'),
('RS006', '2024-10-10', '09:30:00', '11:30:00', 'Investigación', 1, '20222198', '3', '2', '2', 'UA006'),
('RS007', '2024-10-07', '13:00:00', '15:00:00', 'Conferencia', 0, '20222252', '1', '3', '3', 'UA007'),
('RS008', '2024-10-08', '10:00:00', '12:00:00', 'Presentación', 1, '20222781', '2', '4', '4', 'UA008'),
('RS009', '2024-10-10', '15:00:00', '17:00:00', 'Defensa de tesis', 1, '20222791', '3', '1', '1', 'UA009'),
('RS010', '2024-10-20', '14:00:00', '16:00:00', 'Clase extra', 0, '29384018', '1', '2', '2', 'UA010');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `roles`
--

CREATE TABLE `roles` (
  `idRol` char(1) NOT NULL,
  `nombre` varchar(30) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

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
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Volcado de datos para la tabla `salas`
--

INSERT INTO `salas` (`id`, `nombre`, `estado`) VALUES
('1', 'Sala A', 1),
('2', 'Sala B', 1),
('3', 'Sala C', 1);

-- --------------------------------------------------------



--
-- Estructura de tabla para la tabla `unidades_aprendizaje`
--

CREATE TABLE `unidades_aprendizaje` (
  `idunidad_aprendizaje` char(8) NOT NULL,
  `nombre` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Volcado de datos para la tabla `unidades_aprendizaje`
--

INSERT INTO `unidades_aprendizaje` (`idunidad_aprendizaje`, `nombre`) VALUES
('UA001', 'Matemáticas Discretas'),
('UA002', 'Programación Orientada a Objetos'),
('UA003', 'Sistemas Operativos'),
('UA004', 'Bases de Datos'),
('UA005', 'Redes de Computadoras'),
('UA006', 'Inteligencia Artificial'),
('UA007', 'Ingeniería de Software'),
('UA008', 'Seguridad Informática'),
('UA009', 'Desarrollo Web'),
('UA010', 'Arquitectura de Computadoras');

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
  `contrasena` varchar(45) NOT NULL,
  `semestre` tinyint(2) NOT NULL,
  `rol` char(1) NOT NULL,
  `licenciatura` char(8) DEFAULT NULL,
  `posgrado` char(8) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Volcado de datos para la tabla `usuarios`
--

INSERT INTO `usuarios` (`id`, `nombre`, `apellido_paterno`, `apellido_materno`, `correo`, `contrasena`, `semestre`, `rol`, `licenciatura`, `posgrado`) VALUES
('20222198', 'Jesús', 'Trujillo', 'Espinosa', 'mr.iikttx@gmail.com', 'hola1234', 5, '3', '1', NULL),
('20222252', 'Joacim', 'Cuahutle', 'Caderon', 'yosh1@gmail.com', 'JoacimCC', 5, '3', '1', NULL),
('20222781', 'Uriel', 'Hernández', 'Vélez', 'Uriel04@gmail.com', 'Urielwazaaaaaaa', 5, '3', '1', NULL),
('20222791', 'Gerardo', 'Sánchez', 'Rámos', 'Levi_chiquito@gmail.com', 'levichiquitito', 5, '3', '1', NULL),
('29384018', 'Patricia', 'Xelhuantzi', 'Trejo', 'pati@gmail.com', 'hola1234', 5, '1', '3', NULL);

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `huellas_usuario`
--
ALTER TABLE `huellas_usuario`
  ADD PRIMARY KEY (`id_huella`),
  ADD KEY `fk_Huellas_usuario_Usuarios1_idx` (`Usuarios_id`);

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
  ADD KEY `fk_Inventarios_Usuarios1_idx` (`Usuarios_id`),
  ADD KEY `fk_Inventarios_tipo_idx`(`tipo`);

--
-- Indices de la tabla `licenciaturas`
--
ALTER TABLE `licenciaturas`
  ADD PRIMARY KEY (`idlicenciatura`);

--
-- Indices de la tabla `permisos`
--
ALTER TABLE `permisos`
  ADD PRIMARY KEY (`idPermiso`),
  ADD KEY `fk_Permisos_Roles1_idx` (`Roles_idRol`);

--
-- Indices de la tabla `posgrados`
--
ALTER TABLE `posgrados`
  ADD PRIMARY KEY (`idposgrado`);

--
-- Indices de la tabla `prestamos`
--
ALTER TABLE `prestamos`
  ADD PRIMARY KEY (`idPrestamo`),
  ADD KEY `fk_idusuario_prestamosidx` (`id_usuario`),
  ADD KEY `fk_Prestamos_Inventarios1_idx` (`Inventarios_id`),
  ADD KEY `fk_Prestamos_licenciaturas1_idx` (`licenciatura`),
  ADD KEY `fk_Prestamos_posgrados1_idx` (`posgrado`);

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
-- Indices de la tabla `unidades_aprendizaje`
--
ALTER TABLE `unidades_aprendizaje`
  ADD PRIMARY KEY (`idunidad_aprendizaje`);

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
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `huellas_usuario`
--
ALTER TABLE `huellas_usuario`
  ADD CONSTRAINT `fk_Huellas_usuario_Usuarios1` FOREIGN KEY (`Usuarios_id`) REFERENCES `usuarios` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

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
  ADD CONSTRAINT `fk_Inventarios_Usuarios1` FOREIGN KEY (`Usuarios_id`) REFERENCES `usuarios` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_Inventarios_tipo` FOREIGN KEY (`tipo`) REFERENCES `tipo_equipo` (`id_tipo`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Filtros para la tabla `permisos`
--
ALTER TABLE `permisos`
  ADD CONSTRAINT `fk_Permisos_Roles1` FOREIGN KEY (`Roles_idRol`) REFERENCES `roles` (`idRol`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Filtros para la tabla `prestamos`
--
ALTER TABLE `prestamos`
  ADD CONSTRAINT `fk_Prestamos_Inventarios1` FOREIGN KEY (`Inventarios_id`) REFERENCES `inventarios` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_Prestamos_licenciaturas1` FOREIGN KEY (`licenciatura`) REFERENCES `licenciaturas` (`idlicenciatura`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_Prestamos_posgrados1` FOREIGN KEY (`posgrado`) REFERENCES `posgrados` (`idposgrado`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_idusuario_prestamos` FOREIGN KEY (`id_usuario`) REFERENCES `usuarios` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `reservaciones_salas`
--
ALTER TABLE `reservaciones_salas`
  ADD CONSTRAINT `fk_idusuario_reservacion` FOREIGN KEY (`id_usuario`) REFERENCES `usuarios` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_reservacion_sala_Sala1` FOREIGN KEY (`id_sala`) REFERENCES `salas` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_reservaciones_salas_licenciaturas1` FOREIGN KEY (`licenciatura`) REFERENCES `licenciaturas` (`idlicenciatura`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_reservaciones_salas_posgrados1` FOREIGN KEY (`posgrado`) REFERENCES `posgrados` (`idposgrado`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_reservaciones_salas_unidades_aprendizaje1` FOREIGN KEY (`unidad_aprendizaje`) REFERENCES `unidades_aprendizaje` (`idunidad_aprendizaje`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Filtros para la tabla `usuarios`
--
ALTER TABLE `usuarios`
  ADD CONSTRAINT `fk_Usuarios_Roles1` FOREIGN KEY (`rol`) REFERENCES `roles` (`idRol`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_Usuarios_licenciaturas1` FOREIGN KEY (`licenciatura`) REFERENCES `licenciaturas` (`idlicenciatura`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_Usuarios_posgrados1` FOREIGN KEY (`posgrado`) REFERENCES `posgrados` (`idposgrado`) ON DELETE NO ACTION ON UPDATE NO ACTION;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
