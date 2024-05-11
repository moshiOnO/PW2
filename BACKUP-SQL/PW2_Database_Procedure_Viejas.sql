-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 04-05-2024 a las 01:51:19
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

DELIMITER $$
--
-- Procedimientos
--
CREATE DEFINER=`root`@`localhost` PROCEDURE `publis_cat` (IN `usuario_id` INT)   BEGIN
    -- Declara una variable para almacenar el ID de la categoría
    DECLARE categoria_id INT;

    -- Declara un cursor para obtener los IDs de categorías relacionadas al usuario
    DECLARE cur CURSOR FOR
        SELECT DISTINCT id_cat
        FROM usu_cat
        WHERE id_usuario = usuario_id;

    -- Declara un manejador de errores para el cursor
    DECLARE CONTINUE HANDLER FOR NOT FOUND
        SET categoria_id = NULL;

    -- Abre el cursor
    OPEN cur;

    -- Inicializa la variable
    SET categoria_id = NULL;

    -- Recorre los resultados del cursor
    read_loop: LOOP
        FETCH cur INTO categoria_id;

        -- Sal del bucle si no hay más resultados
        IF categoria_id IS NULL THEN
            LEAVE read_loop;
        END IF;

        -- Obtiene todas las publicaciones relacionadas a la categoría actual
        SELECT DISTINCT p.id_publi, p.titulo_publi, p.desc_publi
        FROM publicacion p
        INNER JOIN publi_cat pc ON p.id_publi = pc.id_publi
        WHERE pc.id_cat = categoria_id;

    END LOOP;

    -- Cierra el cursor
    CLOSE cur;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `publis_newtoold` ()   BEGIN
    -- Selecciona las publicaciones ordenadas del más nuevo al más viejo
    SELECT id_publi, titulo_publi, desc_publi
    FROM publicacion
    ORDER BY fecha_publi DESC;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `publis_ufollowed` (IN `usuario_id` INT)   BEGIN
    SELECT p.titulo_publi, p.foto_publi
    FROM follow f
    JOIN publicacion p ON f.id_ufollowed = p.id_autor
    WHERE f.id_usuario = usuario_id;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `publi_cat_p` (IN `id_publiT` INT, IN `nombre_cat` VARCHAR(255))   BEGIN

    DECLARE categoria_idT INT;
 -- Obtener el ID de la categoría
    SELECT id_cat INTO categoria_idT
    FROM categoria
    WHERE title_cat = nombre_categoria;

    -- Insertar una fila en la tabla intermedia
    INSERT INTO publi_cat (id_publi, id_cat)
    VALUES (id_publiT, categoria_idT);
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `usu_cat_p` (IN `usuario_id` INT, IN `publicacion_id` INT)   BEGIN
    -- Declara una variable para almacenar el ID de la categoría
    DECLARE categoria_id INT;

    -- Declara una variable para almacenar temporalmente los resultados del cursor
    DECLARE rows_affected INT;

    -- Declara un cursor para almacenar los resultados de la consulta
    DECLARE cur CURSOR FOR
        SELECT id_cat
        FROM publi_cat
        WHERE id_publi = publicacion_id;

    -- Declara un manejador de errores para el cursor
    DECLARE CONTINUE HANDLER FOR NOT FOUND
        SET categoria_id = NULL;

    -- Abre el cursor
    OPEN cur;

    -- Inicializa la variable
    SET categoria_id = NULL;

    -- Inicializa la variable rows_affected
    SET rows_affected = 0;

    -- Recorre los resultados del cursor
    read_loop: LOOP
        FETCH cur INTO categoria_id;

        -- Sal del bucle si no hay más resultados
        IF categoria_id IS NULL THEN
            LEAVE read_loop;
        END IF;

        -- Verificar si ya existe una entrada en la tabla intermedia para este par de IDs
        SELECT COUNT(*)
        INTO rows_affected
        FROM usu_cat
        WHERE id_usuario = usuario_id AND id_cat = categoria_id;

        -- Si no existe una entrada, insertarla; de lo contrario, no hacer nada
        IF rows_affected = 0 THEN
            INSERT INTO usu_cat (id_usuario, id_cat)
            VALUES (usuario_id, categoria_id);
        END IF;
    END LOOP;

    -- Cierra el cursor
    CLOSE cur;
END$$

DELIMITER ;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `categoria`
--

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

CREATE TABLE `follow` (
  `id_follow` int(11) NOT NULL,
  `id_usuario` int(11) DEFAULT NULL,
  `id_ufollowed` int(11) DEFAULT NULL,
  `fecha_follow` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `interaccion`
--

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

CREATE TABLE `publicacion` (
  `id_publi` int(11) NOT NULL,
  `id_autor` int(11) DEFAULT NULL,
  `titulo_publi` varchar(50) DEFAULT NULL,
  `desc_publi` varchar(255) DEFAULT NULL,
  `fecha_publi` datetime DEFAULT NULL,
  `foto_publi` mediumblob DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `publi_cat`
--

CREATE TABLE `publi_cat` (
  `id_pcat` int(11) NOT NULL,
  `id_cat` int(11) DEFAULT NULL,
  `id_publi` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `publi_comm`
--

CREATE TABLE `publi_comm` (
  `id_pcomm` int(11) NOT NULL,
  `id_comm` int(11) DEFAULT NULL,
  `id_publi` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `publi_likes`
--

CREATE TABLE `publi_likes` (
  `id_pl` int(11) NOT NULL,
  `id_like` int(11) DEFAULT NULL,
  `id_publi` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuario`
--

CREATE TABLE `usuario` (
  `id_usuario` int(11) NOT NULL,
  `foto_usuario` mediumblob NOT NULL,
  `nombre_usuario` varchar(50) DEFAULT NULL,
  `nickname_usuario` varchar(50) DEFAULT NULL,
  `desc_usuario` varchar(255) DEFAULT NULL,
  `email_usuario` varchar(50) DEFAULT NULL,
  `contrasenia_usuario` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `usuario`
--

INSERT INTO `usuario` (`id_usuario`, `foto_usuario`, `nombre_usuario`, `nickname_usuario`, `desc_usuario`, `email_usuario`, `contrasenia_usuario`) VALUES
(1, '', 'moshiOnO', 'moshiOnO', 'Me gusta comer xD', 'moshiuwu@uanl.edu.mx', 'asdasdsad');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `visualizacion`
--

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
  MODIFY `id_usuario` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

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
