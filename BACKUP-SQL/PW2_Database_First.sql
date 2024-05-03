-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 01-05-2024 a las 01:11:17
-- Versión del servidor: 10.4.28-MariaDB
-- Versión de PHP: 8.0.28

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `pw2`
--
CREATE DATABASE IF NOT EXISTS `pw2` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
USE `pw2`;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `categoria`
--

DROP TABLE IF EXISTS `categoria`;
CREATE TABLE `categoria` (
  `id_cat` int(11) NOT NULL,
  `title_cat` varchar(55) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `categoria`
--

INSERT INTO `categoria` (`id_cat`, `title_cat`) VALUES
(1, 'anime'),
(2, '2d'),
(3, 'oc'),
(4, 'illustration'),
(5, 'nintendo'),
(6, 'marvel'),
(7, 'dc'),
(8, 'youtube'),
(9, 'drawing'),
(10, 'sketch'),
(11, 'digital');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `comentario`
--

DROP TABLE IF EXISTS `comentario`;
CREATE TABLE `comentario` (
  `id_comm` int(11) NOT NULL,
  `id_usuario` int(11) DEFAULT NULL,
  `desc_comm` varchar(255) DEFAULT NULL,
  `fecha_comm` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `follow`
--

DROP TABLE IF EXISTS `follow`;
CREATE TABLE `follow` (
  `id_follow` int(11) NOT NULL,
  `id_usuario` int(11) DEFAULT NULL,
  `id_ufollowed` int(11) DEFAULT NULL,
  `date_follow` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `interaccion`
--

DROP TABLE IF EXISTS `interaccion`;
CREATE TABLE `interaccion` (
  `id_inter` int(11) NOT NULL,
  `id_usuario` int(11) DEFAULT NULL,
  `likesnum` int(11) DEFAULT NULL,
  `commnum` int(11) DEFAULT NULL,
  `suma` int(11) DEFAULT NULL,
  `fecha_inter` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `likes`
--

DROP TABLE IF EXISTS `likes`;
CREATE TABLE `likes` (
  `id_like` int(11) NOT NULL,
  `id_usuario` int(11) DEFAULT NULL,
  `id_publi` int(11) DEFAULT NULL,
  `fecha_like` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `publicacion`
--

DROP TABLE IF EXISTS `publicacion`;
CREATE TABLE `publicacion` (
  `id_publi` int(11) NOT NULL,
  `id_autor` int(11) DEFAULT NULL,
  `titulo_publi` varchar(50) DEFAULT NULL,
  `desc_publi` varchar(255) DEFAULT NULL,
  `email_usuario` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `publi_cat`
--

DROP TABLE IF EXISTS `publi_cat`;
CREATE TABLE `publi_cat` (
  `id_pcat` int(11) NOT NULL,
  `id_cat` int(11) DEFAULT NULL,
  `id_publi` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `publi_comm`
--

DROP TABLE IF EXISTS `publi_comm`;
CREATE TABLE `publi_comm` (
  `id_pcomm` int(11) NOT NULL,
  `id_comm` int(11) DEFAULT NULL,
  `id_publi` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `publi_likes`
--

DROP TABLE IF EXISTS `publi_likes`;
CREATE TABLE `publi_likes` (
  `id_pl` int(11) NOT NULL,
  `id_like` int(11) DEFAULT NULL,
  `id_publi` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuario`
--

DROP TABLE IF EXISTS `usuario`;
CREATE TABLE `usuario` (
  `id_usuario` int(11) NOT NULL,
  `nombre_usuario` varchar(50) DEFAULT NULL,
  `nickname_usuario` varchar(50) DEFAULT NULL,
  `desc_usuario` varchar(255) DEFAULT NULL,
  `email_usuario` varchar(50) DEFAULT NULL,
  `contrasenia_usuario` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `visualizacion`
--

DROP TABLE IF EXISTS `visualizacion`;
CREATE TABLE `visualizacion` (
  `id_vis` int(11) NOT NULL,
  `id_usuario` int(11) DEFAULT NULL,
  `id_publi` int(11) DEFAULT NULL,
  `fecha_vis` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `categoria`
--
ALTER TABLE `categoria`
  ADD PRIMARY KEY (`id_cat`);

--
-- Indices de la tabla `comentario`
--
ALTER TABLE `comentario`
  ADD PRIMARY KEY (`id_comm`),
  ADD KEY `id_usuario` (`id_usuario`);

--
-- Indices de la tabla `follow`
--
ALTER TABLE `follow`
  ADD PRIMARY KEY (`id_follow`),
  ADD KEY `id_usuario` (`id_usuario`),
  ADD KEY `id_ufollowed` (`id_ufollowed`);

--
-- Indices de la tabla `interaccion`
--
ALTER TABLE `interaccion`
  ADD PRIMARY KEY (`id_inter`),
  ADD KEY `id_usuario` (`id_usuario`);

--
-- Indices de la tabla `likes`
--
ALTER TABLE `likes`
  ADD PRIMARY KEY (`id_like`),
  ADD KEY `id_usuario` (`id_usuario`),
  ADD KEY `id_publi` (`id_publi`);

--
-- Indices de la tabla `publicacion`
--
ALTER TABLE `publicacion`
  ADD PRIMARY KEY (`id_publi`),
  ADD KEY `id_autor` (`id_autor`);

--
-- Indices de la tabla `publi_cat`
--
ALTER TABLE `publi_cat`
  ADD PRIMARY KEY (`id_pcat`),
  ADD KEY `id_cat` (`id_cat`),
  ADD KEY `id_publi` (`id_publi`);

--
-- Indices de la tabla `publi_comm`
--
ALTER TABLE `publi_comm`
  ADD PRIMARY KEY (`id_pcomm`),
  ADD KEY `id_comm` (`id_comm`),
  ADD KEY `id_publi` (`id_publi`);

--
-- Indices de la tabla `publi_likes`
--
ALTER TABLE `publi_likes`
  ADD PRIMARY KEY (`id_pl`),
  ADD KEY `id_like` (`id_like`),
  ADD KEY `id_publi` (`id_publi`);

--
-- Indices de la tabla `usuario`
--
ALTER TABLE `usuario`
  ADD PRIMARY KEY (`id_usuario`);

--
-- Indices de la tabla `visualizacion`
--
ALTER TABLE `visualizacion`
  ADD PRIMARY KEY (`id_vis`),
  ADD KEY `id_usuario` (`id_usuario`),
  ADD KEY `id_publi` (`id_publi`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `categoria`
--
ALTER TABLE `categoria`
  MODIFY `id_cat` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT de la tabla `comentario`
--
ALTER TABLE `comentario`
  MODIFY `id_comm` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `follow`
--
ALTER TABLE `follow`
  MODIFY `id_follow` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `interaccion`
--
ALTER TABLE `interaccion`
  MODIFY `id_inter` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `likes`
--
ALTER TABLE `likes`
  MODIFY `id_like` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `publicacion`
--
ALTER TABLE `publicacion`
  MODIFY `id_publi` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `publi_cat`
--
ALTER TABLE `publi_cat`
  MODIFY `id_pcat` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `publi_comm`
--
ALTER TABLE `publi_comm`
  MODIFY `id_pcomm` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `publi_likes`
--
ALTER TABLE `publi_likes`
  MODIFY `id_pl` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `usuario`
--
ALTER TABLE `usuario`
  MODIFY `id_usuario` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `visualizacion`
--
ALTER TABLE `visualizacion`
  MODIFY `id_vis` int(11) NOT NULL AUTO_INCREMENT;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `comentario`
--
ALTER TABLE `comentario`
  ADD CONSTRAINT `comentario_ibfk_1` FOREIGN KEY (`id_usuario`) REFERENCES `usuario` (`id_usuario`);

--
-- Filtros para la tabla `follow`
--
ALTER TABLE `follow`
  ADD CONSTRAINT `follow_ibfk_1` FOREIGN KEY (`id_usuario`) REFERENCES `usuario` (`id_usuario`),
  ADD CONSTRAINT `follow_ibfk_2` FOREIGN KEY (`id_ufollowed`) REFERENCES `usuario` (`id_usuario`);

--
-- Filtros para la tabla `interaccion`
--
ALTER TABLE `interaccion`
  ADD CONSTRAINT `interaccion_ibfk_1` FOREIGN KEY (`id_usuario`) REFERENCES `usuario` (`id_usuario`);

--
-- Filtros para la tabla `likes`
--
ALTER TABLE `likes`
  ADD CONSTRAINT `likes_ibfk_1` FOREIGN KEY (`id_usuario`) REFERENCES `usuario` (`id_usuario`),
  ADD CONSTRAINT `likes_ibfk_2` FOREIGN KEY (`id_publi`) REFERENCES `publicacion` (`id_publi`);

--
-- Filtros para la tabla `publicacion`
--
ALTER TABLE `publicacion`
  ADD CONSTRAINT `publicacion_ibfk_1` FOREIGN KEY (`id_autor`) REFERENCES `usuario` (`id_usuario`);

--
-- Filtros para la tabla `publi_cat`
--
ALTER TABLE `publi_cat`
  ADD CONSTRAINT `publi_cat_ibfk_1` FOREIGN KEY (`id_cat`) REFERENCES `categoria` (`id_cat`),
  ADD CONSTRAINT `publi_cat_ibfk_2` FOREIGN KEY (`id_publi`) REFERENCES `publicacion` (`id_publi`);

--
-- Filtros para la tabla `publi_comm`
--
ALTER TABLE `publi_comm`
  ADD CONSTRAINT `publi_comm_ibfk_1` FOREIGN KEY (`id_comm`) REFERENCES `comentario` (`id_comm`),
  ADD CONSTRAINT `publi_comm_ibfk_2` FOREIGN KEY (`id_publi`) REFERENCES `publicacion` (`id_publi`);

--
-- Filtros para la tabla `publi_likes`
--
ALTER TABLE `publi_likes`
  ADD CONSTRAINT `publi_likes_ibfk_1` FOREIGN KEY (`id_like`) REFERENCES `likes` (`id_like`),
  ADD CONSTRAINT `publi_likes_ibfk_2` FOREIGN KEY (`id_publi`) REFERENCES `publicacion` (`id_publi`);

--
-- Filtros para la tabla `visualizacion`
--
ALTER TABLE `visualizacion`
  ADD CONSTRAINT `visualizacion_ibfk_1` FOREIGN KEY (`id_usuario`) REFERENCES `usuario` (`id_usuario`),
  ADD CONSTRAINT `visualizacion_ibfk_2` FOREIGN KEY (`id_publi`) REFERENCES `publicacion` (`id_publi`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
