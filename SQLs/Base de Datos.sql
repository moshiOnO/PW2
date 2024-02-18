CREATE TABLE usuario (
    id_usuario INT PRIMARY KEY AUTO_INCREMENT,
    nme_u VARCHAR(255),
    apM_u VARCHAR(255),
    apP_u VARCHAR(255),
    nick_u VARCHAR(255),
    desc_u VARCHAR(255),
    mail_u VARCHAR(255),
    pass_u VARCHAR(255)
);

CREATE TABLE publicacion (
    id_publi INT PRIMARY KEY AUTO_INCREMENT,
    id_autor INT ,
    title_p VARCHAR(55),
    desc_p VARCHAR(255),    
    date_p DATETIME,
    FOREIGN KEY (id_autor) REFERENCES usuario(id_usuario)
);

CREATE TABLE categoria (
    id_categoria INT PRIMARY KEY AUTO_INCREMENT,
    title_cat VARCHAR(55) 
);

CREATE TABLE likes (
    id_like INT PRIMARY KEY AUTO_INCREMENT,
    id_usuario INT,
    id_publi INT,
    date_l DATETIME,
    FOREIGN KEY (id_usuario) REFERENCES usuario(id_usuario),
    FOREIGN KEY (id_publi) REFERENCES publicacion(id_publi)
);

CREATE TABLE comentarios (
    id_comm INT PRIMARY KEY AUTO_INCREMENT,
    id_usuario INT,
    desc_comm VARCHAR(255),
    date_comm DATETIME,
    FOREIGN KEY (id_usuario) REFERENCES usuario(id_usuario)
);

CREATE TABLE visualizaciones (
    id_vis INT PRIMARY KEY AUTO_INCREMENT,
    id_usuario INT,
    id_publi INT,
    fecha_inicio DATETIME,
    date_vis DATETIME,
    FOREIGN KEY (id_usuario) REFERENCES usuario(id_usuario),
    FOREIGN KEY (id_publi) REFERENCES publicacion(id_publi)
);

CREATE TABLE publi_cat (
    id_pcat INT PRIMARY KEY AUTO_INCREMENT,
    id_cat INT,
    id_publi INT,
    FOREIGN KEY (id_cat) REFERENCES categoria(id_cat),
    FOREIGN KEY (id_publi) REFERENCES publicacion(id_publi)
);

CREATE TABLE publi_comm (
    id_pcomm INT PRIMARY KEY AUTO_INCREMENT,
    id_comm INT,
    id_publi INT,
    FOREIGN KEY (id_comm) REFERENCES comentarios(id_comm),
    FOREIGN KEY (id_publi) REFERENCES publicacion(id_publi)
);

CREATE TABLE interacciones (
    id_inter INT PRIMARY KEY AUTO_INCREMENT,
    id_usuario INT,
    likesnum INT,
    commnum INT,
    suma INT,
    date_inter DATETIME,
    FOREIGN KEY (id_usuario) REFERENCES usuario(id_usuario)
);

CREATE TABLE follow (
    id_follow INT PRIMARY KEY AUTO_INCREMENT,
    id_usuario INT,
    id_Ufollowed INT,
    date_follow DATETIME,
    fecha_fin DATETIME,
    FOREIGN KEY (id_usuario) REFERENCES usuario(id_usuario),
    FOREIGN KEY (id_Ufollowed) REFERENCES usuario(id_usuario)
);

CREATE TABLE publi_likes (
    id_pl INT PRIMARY KEY AUTO_INCREMENT,
    id_publi INT,
    id_like INT,
    FOREIGN KEY (id_publi) REFERENCES publicacion(id_publi),
    FOREIGN KEY (id_like) REFERENCES likes(id_like)
);
