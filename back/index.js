const express = require('express');
const app = express();
const mysql = require('mysql');
const cors = require('cors');

app.use(cors());
app.use(express.json());

app.listen(3001, 
    ()=>{
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

app.post("/create", 
    (req, resp)=>{
        const usu = req.body.usuario;
        const correo = req.body.correo;
        const passw = req.body.contra;

        db.query('INSERT INTO usuarios(name, email, pass) VALUES (?,?,?)',
        [usu, correo, passw],
        (err, data)=>{
            if(err){
                console.log(err);
            }else{
                resp.send("Información insertada");
            }
        }
        )
    }
)


app.get("/getU",
    (req, resp)=>{
        db.query('SELECT * FROM usuarios',
        (error, data)=>{
            if(error){
                console.log(error);
            }else{
                resp.send(data);
            }
        })
    }
)

app.delete("/delete/:nomUser",
(req, resp)=>{
    const nombreU = req.params.nomUser;

    db.query('DELETE FROM usuarios WHERE name=?',
    nombreU,
    (error, data)=>{
        if(error){
            console.log(error);
        }else{
            resp.send("Empleado eliminado");
        }
    })
}
)