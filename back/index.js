const express = require('express');
const app = express();
const mysql = require('mysql');
const cors = require('cors');
const multer = require('multer');


app.use(cors());
app.use(express.json());

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


app.post("/login", (req, resp) => {
    console.log("Datos recibidos:", req.body.us, req.body.con);
    db.query("SELECT * FROM usuario WHERE nickname_usuario=? AND contrasenia_usuario=?", [req.body.us, req.body.con], (err, data) => {
        if (err) {
            console.error("Error en la consulta:", err);
            resp.status(500).send(err); // Manejar errores de base de datos
        } else {
            console.log("Resultado de la consulta:", data);
            if (data.length > 0) {
                resp.json({ alert: 'Success' }); // Usuario encontrado
            } else {
                resp.json({ alert: 'IncorrectPassword' }); // Contraseña incorrecta o usuario no encontrado
            }
        }
    });
});

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

//Obtener las cosas para el dashboard
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
    })


//Logica  de clases para cargar imagesnes y asi
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