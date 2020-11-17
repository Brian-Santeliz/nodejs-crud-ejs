-- phpMyAdmin SQL Dump
-- version 4.5.1
-- http://www.phpmyadmin.net
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 12-06-2020 a las 16:19:44
-- Versión del servidor: 10.1.13-MariaDB
-- Versión de PHP: 7.0.5

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

-- Base de datos: `concesionaria`
CREATE DATABASE IF NOT EXISTS concesionaria;
USE concesionaria;

-- Estructura de tabla para la tabla `clientes`
CREATE TABLE `clientes` (
  `id` int(11) NOT NULL,
  `cedula` varchar(15) COLLATE utf8_spanish_ci NOT NULL,
  `nombre` varchar(100) COLLATE utf8_spanish_ci NOT NULL,
  `telefono` varchar(15) COLLATE utf8_spanish_ci NOT NULL,
  `direccion` varchar(250) COLLATE utf8_spanish_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;
-- Volcado de datos para la tabla `clientes`
INSERT INTO `clientes` (`id`, `cedula`, `nombre`, `telefono`, `direccion`) VALUES
(2, '10032936', 'Francisco Azuaje', '04265866351', 'Valera'),
(4, '9179975', 'Milagros Pacheco', '04265773228', 'Valera'),
(3, '1920083', 'Raimundo Pacheco', '04263799226', 'Valera'),
(5, '29585013', 'Eliany Guerrero', '04165907890', 'Valera');

-- Estructura de tabla para la tabla `carros`
CREATE TABLE `carros` (
  `id` int(11) NOT NULL,
  `nombre` varchar(255) COLLATE utf8_spanish_ci DEFAULT NULL,
  `año` varchar(50) COLLATE utf8_spanish_ci NOT NULL,
  `marca` varchar(50) COLLATE utf8_spanish_ci NOT NULL,
  `especificaciones` varchar(250) COLLATE utf8_spanish_ci NOT NULL,
  `precio` double DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;
-- Volcado de datos para la tabla `carros`
INSERT INTO `carros` (`id`, `nombre`, `año`, `marca`, `especificaciones`, `precio`) VALUES
(2, 'Aveo', '2011','Chevrolet', 'Motor: 1.6, color blanco, 93.000 kilometros, aire full, servicios al dia, cauchos nuevos, bateria con 2 años de garantia', 5000),
(3, 'Optra', '2010', 'Chevrolet', 'Motor disponible de 1.8 litros y 121 CV En modelo LIMITED (ventanilla de techo), limpiaparabrisas de encendido automático, llave con código de seguridad, juego de platinas cromadas en frontal, laterales y tapa de maletero, aire condicionado digital con control automático de temperatura de cabina, equipo de sonido de alta calidad (marca ECLIPSE) y altavoces de alta potencia), traen seguros de puertas, espejos laterales y cerradura de baúl o maletera eléctricos y remotos (desde el interior de la cabina de pasajeros) y apertura remota del bául desde la llave del vehículo.', 21),
(4, 'CherokeeGrand Cherokee Limited X','2020', 'JEEP', 'Jeep Grand Cherokee Limited X 2020 cuenta con el multipremiado motor V8 Pentastar de 3.6L acoplado a la moderna transmisión Torque Flite de 8 velocidades generando una potencia de 295 hp y 260 lb-pie de torque, y al mismo tiempo una excelente economía de combustible gracias al moderno sistema Start/Stop, permitiendo obtener un rendimiento de combustible de hasta 14.87km/lt en carretera. ', 26),
(5, 'Runner','2016', 'Toyota', 'Toyota 4Runner 2011 cuenta con un motor V-6 de 4.0 litros. Tiene 270 caballos de fuerza a 5.600 rpm y 278 libras-pie de torsión a 4.400 rpm. Es capaz de remolcar hasta 5.000 libras (2.268 kg) y una carga útil de hasta 1.700 libras (771 kg).', 9);

-- Estructura de tabla para la tabla `fabricantes`
CREATE TABLE `fabricantes` (
  `id` int(11) NOT NULL,
  `rif` varchar(15) COLLATE utf8_spanish_ci NOT NULL,
  `nombre` varchar(100) COLLATE utf8_spanish_ci NOT NULL,
  `telefono` varchar(15) COLLATE utf8_spanish_ci NOT NULL,
  `direccion` varchar(250) COLLATE utf8_spanish_ci NOT NULL,
  `contacto` varchar(100) COLLATE utf8_spanish_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;
-- Volcado de datos para la tabla `fabricantes`
INSERT INTO `fabricantes` (`id`, `rif`, `nombre`, `telefono`, `direccion`, `contacto`) VALUES
(1, 'J-2364789-1', 'Chevrolet', '0212-2519197', 'Barquisimeto', 'Mario Carreño'),
(2, 'J-5841446-5', 'General Motors', '0424-7899564', 'Caracas', 'Rafael Simancas'),
(3, 'J-9671382-8', 'Jeep', '0416-5999864', 'Valencia', 'Yajaira Cestari');

-- Estructura de tabla para la tabla `usuarios`
CREATE TABLE `usuarios` (
  `id` int(11) NOT NULL,
  `usuario` varchar(50) COLLATE utf8_spanish_ci NOT NULL,
  `clave` varchar(50) COLLATE utf8_spanish_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

-- Volcado de datos para la tabla `usuarios`
INSERT INTO `usuarios` (`id`, `usuario`, `clave`) VALUES
(1, 'anyelo', '1234');

-- Índices para tablas volcadas

-- Indices de la tabla `clientes`
ALTER TABLE `clientes`
  ADD PRIMARY KEY (`cedula`),
  ADD UNIQUE KEY `indice` (`id`);
-- Indices de la tabla `carros`
ALTER TABLE `carros`
  ADD PRIMARY KEY (`id`);
-- Indices de la tabla `fabricantes`
ALTER TABLE `fabricantes`
  ADD PRIMARY KEY (`rif`),
  ADD UNIQUE KEY `indice` (`id`);
-- Indices de la tabla `usuarios`
ALTER TABLE `usuarios`
  ADD PRIMARY KEY (`usuario`),
  ADD UNIQUE KEY `index` (`id`);

-- AUTO_INCREMENT de las tablas volcadas

-- AUTO_INCREMENT de la tabla `clientes`
ALTER TABLE `clientes`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;
-- AUTO_INCREMENT de la tabla `carros`
ALTER TABLE `carros`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;
-- AUTO_INCREMENT de la tabla `fabricantes`
ALTER TABLE `fabricantes`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;
-- AUTO_INCREMENT de la tabla `usuarios`
ALTER TABLE `usuarios`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
