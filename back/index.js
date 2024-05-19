const express = require('express');
const app = express();
const mysql = require('mysql');
const cors = require('cors');
const multer = require('multer');
const session = require('express-session');

//Cors bien configurao
app.use(cors({
    origin: 'http://localhost:3000', // Ajusta esto al puerto donde corre tu React app
    credentials: true // Permitir el envío de cookies
}));
app.use(express.json());
//Session
app.use(session({
    secret: 'secret_key',
    resave: false,
    saveUninitialized: false,
    cookie: {
        secure: false, // Usar `true` sólo en producción con HTTPS
        httpOnly: true,
        maxAge: 1000 * 60 * 60 * 24 // Cookie válida por un día
    },
    name: 'id_usuario'
}));
//Verificar sesión existente
function verificarSesion(req, res, next) {
    if (req.session.userId) {
        next(); // El usuario está logueado, continuar con la solicitud
    } else {
        res.status(401).send("No autorizado"); // No logueado, enviar error
    }
}
//Configuración del servidor
app.listen(3001,
    () => {
        console.log("Escuchupapuando en puertopapu 3papumil");
    }
)
app.get('/', (req, res) => {
    res.send('Hola putupapu3000');
});
const db = mysql.createConnection(
    {
        host: "localhost",
        user: "root",
        password: "",
        database: "pw2"
    }
)
//PAra las imágenes
const fileFil = (req, file, cb) => {
    // reject a file
    if (file.mimetype === 'image/png' || file.mimetype === 'image/jpeg' || file.mimetype === 'image/jpg') {
        cb(null, true);
    } else {
        cb(null, false);

        return cb(new Error('Only .png, .jpg and .jpeg format allowed!'));
    }
};
const strg = multer.memoryStorage();
const upload = multer({
    storage: strg,
    fileFilter: fileFil
})



//******************************Inicio y registro de sesión ************************
// Modifica la ruta "/registro" para incluir el apodo (nickname) del usuario
app.post("/registro", (req, res) => {
    const { name, nickN, mail, pass } = req.body;

    const sql = 'INSERT INTO usuario (nombre_usuario, nickname_usuario, email_usuario, contrasenia_usuario) VALUES (?, ?, ?, ?)';
    db.query(sql, [name, nickN, mail, pass], (err, result) => {
        if (err) {
            res.status(500).send('Error al registrar el usuario');
            throw err;
        }
        res.status(200).send('Usuario registrado exitosamente');
    });
});
// Modifica la ruta "/create" para incluir el apodo (nickname) del usuario
app.post("/create", (req, resp) => {
    const usu = req.body.usuario;
    const nick = req.body.apodo; // Cambio de nombre de variable
    const correo = req.body.correo;
    const passw = req.body.contra;

    db.query('INSERT INTO usuario (nombre_usuario, nickname_usuario, email_usuario, contrasenia_usuario) VALUES (?, ?, ?, ?)',
        [usu, nick, correo, passw], // Modificación para incluir el apodo
        (err, data) => {
            if (err) {
                console.log(err);
                resp.status(500).send("Error al registrar el usuario");
            } else {
                resp.send("Información insertada");
            }
        }
    );
});
//Login para almacenar cosas 
app.post("/login", (req, resp) => {
    //console.log("Datos recibidos:", req.body.us, req.body.con);
    db.query("SELECT * FROM usuario WHERE nickname_usuario=? AND contrasenia_usuario=?", [req.body.us, req.body.con], (err, data) => {
        if (err) {
            console.error("Error en la consulta:", err);
            resp.status(500).send(err); // Manejar errores de base de datos
        } else {
            //console.log("Resultado de la consulta:", data);
            if (data.length > 0) {
                req.session.userId = data[0].id_usuario; // Almacenar el ID del usuario en la sesión
                //console.log("Sesión actualizada con userID:", req.session.userId); // Mostrar el ID del usuario almacenado en la sesión
                resp.json({ alert: 'Success' }); // Usuario encontrado
            } else {
                resp.json({ alert: 'IncorrectPassword' }); // Contraseña incorrecta o usuario no encontrado
            }
        }
    });
});

//***************************************************************************************
//***************************************************************************************
//***************************************************************************************


// Obtener info general del usuario para el menú
app.get("/perfilMenu", verificarSesion, (req, res) => {
    const userId = req.session.userId;
    if (userId) {
        db.query("SELECT * FROM usuario WHERE id_usuario = ?", [userId], (err, result) => {
            if (err) {
                return res.status(500).send("Error al recuperar la información del usuario");
            }
            if (result.length > 0) {
                const usuario = result[0];
                const foto = usuario.foto_usuario ? Buffer.from(usuario.foto_usuario).toString('base64') : null;
                res.json({
                    id: usuario.id_usuario,
                    nombre: usuario.nombre_usuario,
                    nickname: usuario.nickname_usuario,
                    email: usuario.email_usuario,
                    descripcion: usuario.desc_usuario,
                    foto: foto ? `data:image/jpeg;base64,${foto}` : null
                });
            } else {
                res.status(404).send("Usuario no encontrado.");
            }
        });
    } else {
        res.status(401).send("Usuario no autenticado.");
    }
});




// Ruta para obtener el perfil de un usuario por su ID
app.get("/perfil/:userId", verificarSesion, (req, res) => {
    const userId = req.params.userId;
    db.query("SELECT * FROM usuario WHERE id_usuario = ?", [userId], (err, result) => {
        if (err) {
            return res.status(500).send("Error al recuperar la información del usuario");
        }
        if (result.length > 0) {
            const usuario = result[0];
            const foto = usuario.foto_usuario ? Buffer.from(usuario.foto_usuario).toString('base64') : null;
            res.json({
                id: usuario.id_usuario,
                nombre: usuario.nombre_usuario,
                nickname: usuario.nickname_usuario,
                email: usuario.email_usuario,
                descripcion: usuario.desc_usuario,
                foto: foto ? `data:image/jpeg;base64,${foto}` : null
            });
        } else {
            res.status(404).send("Usuario no encontrado.");
        }
    });
});
// Ruta para obtener las publicaciones de un usuario por su ID
app.get('/userPosts/:userId', verificarSesion, (req, res) => {
    const userId = req.params.userId;

    const getUserPostsQuery = 'SELECT * FROM publicacion WHERE id_autor = ?';

    db.query(getUserPostsQuery, [userId], (err, results) => {
        if (err) {
            console.error('Error al obtener las publicaciones del usuario:', err);
            return res.status(500).send('Error al obtener las publicaciones del usuario');
        }

        // Convertir las imágenes a base64
        const publicaciones = results.map(pub => {
            const fotoPubli = pub.foto_publi ? pub.foto_publi.toString('base64') : null;
            return {
                ...pub,
                imageUrl: fotoPubli ? `data:image/jpeg;base64,${fotoPubli}` : null
            };
        });

        res.json(publicaciones);
    });
});



// Ruta para obtener estadísticas de publicaciones/likes por día de la semana
app.get('/stats/publicacionesLikes', verificarSesion, (req, res) => {
    const userId = req.session.userId;
    const query = 'CALL getPublicacionesLikes(?)';

    db.query(query, [userId], (err, results) => {
        if (err) {
            console.error('Error al obtener estadísticas de publicaciones/likes:', err);
            return res.status(500).send('Error al obtener estadísticas de publicaciones/likes');
        }
        res.json(results[0]);
    });
});

// Ruta para obtener estadísticas de interacciones semanales
app.get('/stats/interaccionesSemanales', verificarSesion, (req, res) => {
    const userId = req.session.userId;
    const query = 'CALL getInteraccionesSemanales(?)';

    db.query(query, [userId], (err, results) => {
        if (err) {
            console.error('Error al obtener estadísticas de interacciones semanales:', err);
            return res.status(500).send('Error al obtener estadísticas de interacciones semanales');
        }
        res.json(results[0]);
    });
});

// Ruta para obtener estadísticas de seguidores mensuales
app.get('/stats/seguidoresMensuales', verificarSesion, (req, res) => {
    const userId = req.session.userId;
    const query = 'CALL getSeguidoresMensuales(?)';

    db.query(query, [userId], (err, results) => {
        if (err) {
            console.error('Error al obtener estadísticas de seguidores mensuales:', err);
            return res.status(500).send('Error al obtener estadísticas de seguidores mensuales');
        }
        res.json(results[0]);
    });
});





// Ruta para borrar una publicación usando un procedimiento almacenado
app.delete('/deletePost/:postId', verificarSesion, (req, res) => {
    const { postId } = req.params;

    const deletePostProcedure = 'CALL borrarPublis_byid(?)';

    db.query(deletePostProcedure, [postId], (err, result) => {
        if (err) {
            console.error('Error al borrar la publicación:', err);
            return res.status(500).send('Error al borrar la publicación');
        }

        res.status(200).send('Publicación borrada exitosamente');
    });
});
//Ruta para obtener la info de la publicación para editar
app.get('/publicacionEdit/:postId', (req, res) => {
    const { postId } = req.params;

    const getPostQuery = 'SELECT * FROM publicacion WHERE id_publi = ?';
    const getCategoriesQuery = 'SELECT id_cat FROM publi_cat WHERE id_publi = ?';

    db.query(getPostQuery, [postId], (err, postResult) => {
        if (err) {
            console.error('Error al obtener la publicación:', err);
            return res.status(500).send('Error al obtener la publicación');
        }

        if (postResult.length > 0) {
            const post = postResult[0];
            const fotoPubli = post.foto_publi ? post.foto_publi.toString('base64') : null;
            const postDetails = {
                ...post,
                imageUrl: fotoPubli ? `data:image/jpeg;base64,${fotoPubli}` : null
            };

            db.query(getCategoriesQuery, [postId], (err, categoriesResult) => {
                if (err) {
                    console.error('Error al obtener las categorías:', err);
                    return res.status(500).send('Error al obtener las categorías');
                }

                const categories = categoriesResult.map(row => row.id_cat);
                postDetails.categories = categories;
                res.json(postDetails);
            });
        } else {
            res.status(404).send('Publicación no encontrada');
        }
    });
});
// Ruta para actualizar una publicación existente
app.put('/updatePost/:postId', verificarSesion, upload.single('image'), (req, res) => {
    const { postId } = req.params;
    const { title, description, categories } = req.body;
    const image = req.file ? req.file.buffer : null;

    if (!title || !description || !categories) {
        return res.status(400).send('Faltan datos requeridos');
    }

    let updatePostQuery;
    const queryParams = [title, description, postId];

    if (image) {
        updatePostQuery = 'UPDATE publicacion SET titulo_publi = ?, desc_publi = ?, foto_publi = ? WHERE id_publi = ?';
        queryParams.splice(2, 0, image); // Insertar la imagen en la posición correcta en queryParams
    } else {
        updatePostQuery = 'UPDATE publicacion SET titulo_publi = ?, desc_publi = ? WHERE id_publi = ?';
    }

    const deleteCategoriesQuery = 'DELETE FROM publi_cat WHERE id_publi = ?';
    const addCategoryQuery = 'INSERT INTO publi_cat (id_publi, id_cat) VALUES (?, ?)';

    db.beginTransaction(err => {
        if (err) {
            console.error('Error al iniciar la transacción:', err);
            return res.status(500).send('Error al iniciar la transacción');
        }

        db.query(updatePostQuery, queryParams, (err, result) => {
            if (err) {
                console.error('Error al actualizar la publicación:', err);
                return db.rollback(() => {
                    res.status(500).send('Error al actualizar la publicación');
                });
            }

            db.query(deleteCategoriesQuery, [postId], (err) => {
                if (err) {
                    console.error('Error al eliminar las categorías:', err);
                    return db.rollback(() => {
                        res.status(500).send('Error al eliminar las categorías');
                    });
                }

                const categoryIds = JSON.parse(categories);
                const categoryPromises = categoryIds.map(categoryId => {
                    return new Promise((resolve, reject) => {
                        db.query(addCategoryQuery, [postId, categoryId], (err) => {
                            if (err) {
                                reject(err);
                            } else {
                                resolve();
                            }
                        });
                    });
                });

                Promise.all(categoryPromises)
                    .then(() => {
                        db.commit(err => {
                            if (err) {
                                console.error('Error al confirmar la transacción:', err);
                                return db.rollback(() => {
                                    res.status(500).send('Error al confirmar la transacción');
                                });
                            }

                            res.status(200).send('Publicación actualizada exitosamente');
                        });
                    })
                    .catch(err => {
                        console.error('Error al agregar categorías:', err);
                        db.rollback(() => {
                            res.status(500).send('Error al agregar categorías');
                        });
                    });
            });
        });
    });
});






//Obtener info para la ventana de publicacion
app.get('/publicacion/:id_publi', (req, res) => {
    const { id_publi } = req.params;

    const publicacionQuery = 'CALL getPublicacion(?)';
    const comentariosQuery = 'CALL getComentarios(?)';
    const categoriasQuery = 'CALL getCategorias(?)';
    const recomendacionesQuery = 'CALL getRecomendaciones(?)';
    const recientesQuery = 'CALL getRecientesAutor(?)';

    db.query(publicacionQuery, [id_publi], (err, publicacionResult) => {
        if (err) return res.status(500).send('Error al obtener la publicación');
        if (publicacionResult[0].length === 0) return res.status(404).send('Publicación no encontrada');

        const publicacion = publicacionResult[0][0];
        //console.log(publicacion.id_autor);
        const fotoPubli = publicacion.foto_publi ? publicacion.foto_publi.toString('base64') : null;
        const fotoAutor = publicacion.foto_usuario ? publicacion.foto_usuario.toString('base64') : null;
        publicacion.imageUrl = fotoPubli ? `data:image/jpeg;base64,${fotoPubli}` : null;
        publicacion.autorPfp = fotoAutor ? `data:image/jpeg;base64,${fotoAutor}` : null;

        db.query(comentariosQuery, [id_publi], (err, comentariosResult) => {
            if (err) return res.status(500).send('Error al obtener los comentarios');
            publicacion.comentarios = comentariosResult[0].map(comentario => {
                const comentarioFoto = comentario.foto_usuario ? comentario.foto_usuario.toString('base64') : null;
                return {
                    id_comentario: comentario.id_comm,
                    username: comentario.username,
                    text: comentario.desc_comm,
                    pfp: comentarioFoto ? `data:image/jpeg;base64,${comentarioFoto}` : null
                };
            });

            db.query(categoriasQuery, [id_publi], (err, categoriasResult) => {
                if (err) return res.status(500).send('Error al obtener las categorías');
                publicacion.categorias = categoriasResult[0].map(cat => cat.title_cat);

                db.query(recomendacionesQuery, [id_publi], (err, recomendacionesResult) => {
                    if (err) return res.status(500).send('Error al obtener las recomendaciones');
                    publicacion.recomendaciones = recomendacionesResult[0].map(rec => {
                        const recFoto = rec.foto_publi ? rec.foto_publi.toString('base64') : null;
                        return {
                            id: rec.id_publi,
                            imageUrl: recFoto ? `data:image/jpeg;base64,${recFoto}` : null
                        };
                    });

                    db.query(recientesQuery, [id_publi], (err, recientesResult) => {
                        if (err) return res.status(500).send('Error al obtener las publicaciones recientes');
                        publicacion.recientes = recientesResult[0].map(rec => {
                            const recFoto = rec.foto_publi ? rec.foto_publi.toString('base64') : null;
                            return {
                                id: rec.id_publi,
                                imageUrl: recFoto ? `data:image/jpeg;base64,${recFoto}` : null
                            };
                        });

                        res.json(publicacion);
                    });
                });
            });
        });
    });
});
//Subir comms
app.post('/addComm', verificarSesion, (req, res) => {
    const { id_publi, commentText } = req.body;
    const userId = req.session.userId;

    console.log('req.body:', req.body);
    console.log('userId:', userId);

    if (!id_publi || !commentText) {
        return res.status(400).send('Faltan datos requeridos');
    }

    const agregarComentarioQuery = 'INSERT INTO comentario (id_usuario, desc_comm) VALUES (?, ?)';
    const conectarComentarioQuery = 'INSERT INTO publi_comm (id_publi, id_comm) VALUES (?, ?)';

    db.beginTransaction(err => {
        if (err) {
            console.error('Error al iniciar la transacción:', err);
            return res.status(500).send('Error al iniciar la transacción');
        }

        db.query(agregarComentarioQuery, [userId, commentText], (err, result) => {
            if (err) {
                console.error('Error al agregar el comentario:', err);
                return db.rollback(() => {
                    res.status(500).send('Error al agregar el comentario');
                });
            }

            const id_comentario = result.insertId;

            db.query(conectarComentarioQuery, [id_publi, id_comentario], (err) => {
                if (err) {
                    console.error('Error al conectar el comentario con la publicación:', err);
                    return db.rollback(() => {
                        res.status(500).send('Error al conectar el comentario con la publicación');
                    });
                }

                db.commit(err => {
                    if (err) {
                        console.error('Error al confirmar la transacción:', err);
                        return db.rollback(() => {
                            res.status(500).send('Error al confirmar la transacción');
                        });
                    }

                    res.status(201).send('Comentario agregado exitosamente');
                });
            });
        });
    });
});

// Ruta para seguir a un autor
app.post('/follow', verificarSesion, (req, res) => {
    const { authorId } = req.body;
    const userId = req.session.userId;

    const followQuery = 'INSERT INTO follow (id_usuario, id_ufollowed, fecha_follow ) VALUES (?, ?, NOW() )';

    db.query(followQuery, [userId, authorId], (err, result) => {
        if (err) {
            console.error('Error al seguir al autor:', err);
            return res.status(500).send('Error al seguir al autor');
        }
        res.status(200).send('Autor seguido exitosamente');
    });
});
// Ruta para dejar de seguir a un autor
app.post('/unfollow', verificarSesion, (req, res) => {
    const { authorId } = req.body;
    const userId = req.session.userId;

    const unfollowQuery = 'DELETE FROM follow WHERE id_usuario = ? AND id_ufollowed = ?';

    db.query(unfollowQuery, [userId, authorId], (err, result) => {
        if (err) {
            console.error('Error al dejar de seguir al autor:', err);
            return res.status(500).send('Error al dejar de seguir al autor');
        }
        res.status(200).send('Autor dejado de seguir exitosamente');
    });
});
// Ruta para verificar si el usuario sigue a un autor
app.get('/isFollowing/:authorId', verificarSesion, (req, res) => {
    const userId = req.session.userId;
    const { authorId } = req.params;

    const isFollowingQuery = 'SELECT * FROM follow WHERE id_usuario = ? AND id_ufollowed = ?';

    db.query(isFollowingQuery, [userId, authorId], (err, result) => {
        if (err) {
            console.error('Error al verificar si el usuario sigue al autor:', err);
            return res.status(500).send('Error al verificar seguimiento');
        }
        res.status(200).send(result.length > 0);
    });
});
// Ruta para obtener el número de likes de una publicación
app.get('/likes/:postId', (req, res) => {
    const { postId } = req.params;

    const getLikesQuery = 'SELECT COUNT(*) AS likes FROM likes WHERE id_publi = ?';

    db.query(getLikesQuery, [postId], (err, results) => {
        if (err) {
            console.error('Error al obtener los likes:', err);
            return res.status(500).send('Error al obtener los likes');
        }

        res.json({ likes: results[0].likes });
    });
});
// Ruta para agregar un like a una publicación
app.post('/like', verificarSesion, (req, res) => {
    const { postId } = req.body;
    const userId = req.session.userId;

    // Verificar si el usuario ya ha dado like
    const checkLikeQuery = 'SELECT * FROM likes WHERE id_publi = ? AND id_usuario = ?';

    db.query(checkLikeQuery, [postId, userId], (err, results) => {
        if (err) {
            console.error('Error al verificar el like:', err);
            return res.status(500).send('Error al verificar el like');
        }

        if (results.length > 0) {
            return res.status(400).send('Ya has dado like a esta publicación');
        } else {
            const addLikeQuery = 'INSERT INTO likes (id_publi, id_usuario, fecha_like) VALUES (?, ?, NOW())';

            db.query(addLikeQuery, [postId, userId], (err, result) => {
                if (err) {
                    console.error('Error al agregar el like:', err);
                    return res.status(500).send('Error al agregar el like');
                }

                res.status(200).send('Like agregado exitosamente');
            });
        }
    });
});
// Ruta para quitar un like de una publicación (opcional)
app.post('/unlike', verificarSesion, (req, res) => {
    const { postId } = req.body;
    const userId = req.session.userId;

    const removeLikeQuery = 'DELETE FROM likes WHERE id_publi = ? AND id_usuario = ?';

    db.query(removeLikeQuery, [postId, userId], (err, result) => {
        if (err) {
            console.error('Error al quitar el like:', err);
            return res.status(500).send('Error al quitar el like');
        }

        res.status(200).send('Like quitado exitosamente');
    });
});
// Ruta para verificar si el usuario ha dado like a una publicación
app.get('/isLiked/:postId', verificarSesion, (req, res) => {
    const userId = req.session.userId;
    const { postId } = req.params;

    const isLikedQuery = 'SELECT * FROM likes WHERE id_publi = ? AND id_usuario = ?';

    db.query(isLikedQuery, [postId, userId], (err, results) => {
        if (err) {
            console.error('Error al verificar si el usuario ha dado like:', err);
            return res.status(500).send('Error al verificar si el usuario ha dado like');
        }

        res.status(200).send(results.length > 0);
    });
});





//Subir post
app.post('/addPost', verificarSesion, upload.single('image'), (req, res) => {
    const { title, description, categories } = req.body;
    const userId = req.session.userId;
    const image = req.file ? req.file.buffer : null;

    if (!title || !description || !categories || !image) {
        return res.status(400).send('Faltan datos requeridos');
    }

    const addPostQuery = 'INSERT INTO publicacion (id_autor, titulo_publi, desc_publi, foto_publi, fecha_publi) VALUES (?, ?, ?, ?, NOW())';
    const addCategoryQuery = 'INSERT INTO publi_cat (id_publi, id_cat) VALUES (?, ?)';

    db.beginTransaction(err => {
        if (err) {
            console.error('Error al iniciar la transacción:', err);
            return res.status(500).send('Error al iniciar la transacción');
        }

        db.query(addPostQuery, [userId, title, description, image], (err, result) => {
            if (err) {
                console.error('Error al agregar la publicación:', err);
                return db.rollback(() => {
                    res.status(500).send('Error al agregar la publicación');
                });
            }

            const postId = result.insertId;
            const categoryIds = JSON.parse(categories);

            const categoryPromises = categoryIds.map(categoryId => {
                return new Promise((resolve, reject) => {
                    db.query(addCategoryQuery, [postId, categoryId], (err) => {
                        if (err) {
                            reject(err);
                        } else {
                            resolve();
                        }
                    });
                });
            });

            Promise.all(categoryPromises)
                .then(() => {
                    db.commit(err => {
                        if (err) {
                            console.error('Error al confirmar la transacción:', err);
                            return db.rollback(() => {
                                res.status(500).send('Error al confirmar la transacción');
                            });
                        }

                        res.status(201).send('Publicación agregada exitosamente');
                    });
                })
                .catch(err => {
                    console.error('Error al agregar categorías:', err);
                    db.rollback(() => {
                        res.status(500).send('Error al agregar categorías');
                    });
                });
        });
    });
});
//Obtener categorías
app.get('/categorias', (req, res) => {
    const getCategoriasQuery = 'SELECT id_cat, title_cat FROM categoria';

    db.query(getCategoriasQuery, (err, results) => {
        if (err) {
            console.error('Error al obtener las categorías:', err);
            return res.status(500).send('Error al obtener las categorías');
        }

        if (results.length > 0) {
            const categorias = results.map(row => ({
                id: row.id_cat,
                name: row.title_cat
            }));
            res.json(categorias);
        } else {
            res.status(404).send('No se encontraron categorías');
        }
    });
});



//******************************Edición de perfil************************
// Configuración de multer para manejar la carga de archivos
app.put("/actualizarPerfil", verificarSesion, upload.single('foto'), (req, res) => {
    const userId = req.session.userId;
    const { nickname, desc, nombre, contrasenia } = req.body;
    const foto = req.file ? req.file.buffer : null;

    console.log("Datos recibidos:", req.body); // Verifica los datos recibidos
    console.log("Contraseña recibida:", contrasenia);
  
    if (userId) {
      // Verificar si el nickname ya existe para otro usuario
      db.query("SELECT id_usuario FROM usuario WHERE nickname_usuario = ? AND id_usuario != ?", [nickname, userId], (err, result) => {
        if (err) {
          return res.status(500).send("Error al verificar el nickname");
        }
        if (result.length > 0) {
          return res.status(400).send("El nickname ya está en uso por otro usuario");
        }
  
        // Construir la consulta de actualización
        let query = "UPDATE usuario SET nickname_usuario = ?, desc_usuario = ?, nombre_usuario = ?, contrasenia_usuario = ?";
        //console.log("Contraseña recibida", contraseña);
        const params = [nickname, desc, nombre, contrasenia, userId];
        if (foto) {
          query += ", foto_usuario = ?";
          params.splice(4, 0, foto); // Insertar la foto en la posición correcta en params
        }
        query += " WHERE id_usuario = ?";
  
        // Si no hay conflictos, proceder con la actualización
        db.query(query, params, (err, result) => {
          if (err) {
            return res.status(500).send("Error al actualizar la información del usuario");
          }
          res.status(200).send("Perfil actualizado exitosamente");
        });
      });
    } else {
      res.status(401).send("Usuario no autenticado.");
    }
  });
  
  



//******************************DashBoard ************************
app.get("/getnewtoold",
    (req, resp) => {
        db.query("CALL publis_newtoold",
            (error, data) => {
                if (error) {
                    resp.send(error);
                } else {
                    if (data.length > 0) {
                        resp.json(data);
                    } else {
                        resp.json('No imagen');
                    }
                }
            })
    });

app.get("/getufollowed", verificarSesion, (req, resp) => {
    const userId = req.session.userId; // Usar el ID del usuario desde la sesión
    if (userId) {
        db.query("CALL publis_ufollowed(?)", [userId], (error, data) => {
            if (error) {
                resp.status(500).send(error);
            } else if (data.length > 0) {
                resp.json(data);
            } else {
                resp.json('No imagen');
            }
        });
    } else {
        resp.status(401).send("No autorizado");
    }
});

//***************************************************************************************
//***************************************************************************************
//***************************************************************************************


//******************************Lógica de carga de imágenes************************

app.post("/file", upload.single('file'),
    (req, resp) => {
        const imagenB64 = req.file.buffer;
        const usName = req.body.user;

        db.query("INSERT INTO usuario(nickname_usuario, foto_usuario) VALUES(?,?)",
            [usName, imagenB64],
            (err, data) => {
                if (err) {
                    resp.json({
                        "alert": 'Error'
                    })
                } else {
                    resp.json({
                        "alert": 'Success'
                    })
                }
            })
        console.log(imagenB64, usName);
    })
app.get("/getAllImg",
    (req, resp) => {
        db.query("SELECT * FROM usuario",
            (error, data) => {
                if (error) {
                    resp.send(error);
                } else {
                    if (data.length > 0) {
                        resp.json(data);
                    } else {
                        resp.json('No imagen');
                    }
                }
            })
    })

//***************************************************************************************
//***************************************************************************************
//***************************************************************************************

//Referencia de elminado de "usuarios.js"
app.delete("/delete/:nomUser",
    (req, resp) => {
        const nombreU = req.params.nomUser;

        db.query('DELETE FROM usuarios WHERE name=?',
            nombreU,
            (error, data) => {
                if (error) {
                    console.log(error);
                } else {
                    resp.send("Empleado eliminado");
                }
            })
    }


)
//Obtener usuarios *solo para referencias*
app.get("/getU",
    (req, resp) => {
        db.query('SELECT * FROM usuario',
            (error, data) => {
                if (error) {
                    console.log(error);
                } else {
                    resp.send(data);
                }
            })
    }
)