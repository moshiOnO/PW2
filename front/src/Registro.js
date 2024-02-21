import 'bootstrap/dist/css/bootstrap.css';
import './App.css';
import {Link} from 'react-router-dom';
import {useState} from 'react';
import Axios from 'axios';


function Registro(){
  const[user, setUser] = useState('');
  const[email, setEmail] = useState('');
  const[pass, setPass] = useState('');

  const alertDatos = () =>{
    alert(user + " " + email + " " + pass);
  }

  const sendDatos = () =>{
    Axios.post("http://localhost:3001/create",
    {usuario: user,
     correo: email,
     contra: pass
    }).then(
      ()=>{
        alert("Información enviada");
      })
  }

  return(
    <div className="registrationBox">
      <div className="mb-3 box1">
        <label className="form-label">Nombre de usuario</label>
        <input type="text" className="form-control" placeholder="Usuario" 
          onChange={(e)=>{setUser(e.target.value)}} />

        <label className="form-label">Correo</label>
        <input type="email" className="form-control" placeholder="Correo"
          onChange={(e)=>{setEmail(e.target.value)}} />

        <label className="form-label">Contraseña</label>
        <input type="password" className="form-control" placeholder="Contraseña"
          onChange={(e)=>{setPass(e.target.value)}} />

        <button className="btn btn-primary" onClick={sendDatos}>Registrar</button>

        <button type="button" className="btn btn-outline-info">Iniciar sesión</button>
        <Link to="/usuarios" className="btn btn-primary">Ver usuarios</Link>
        
      </div>
    </div>
  );
}



export default Registro;
