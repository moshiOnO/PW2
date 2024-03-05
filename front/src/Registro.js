import 'bootstrap/dist/css/bootstrap.css';
import styles from './paginaWeb/css/register.module.css';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import Axios from 'axios';

const Registro = () => {

  const [name, setName] = useState('');
  const [nickN, setNickN] = useState('');
  const [mail, setMail] = useState('');
  const [pass, setPass] = useState('');
  const [pass2, setPass2] = useState('');

  const nav = useNavigate()


  //Función para agregar los datos al back
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (pass !== pass2) {
      alert('Las contraseñas no coinciden.');
      return;
    }

    try {
      const response = await Axios.post('http://localhost:3001/create', {
        usuario: name,
        correo: mail,
        contra: pass
      });
      console.log(response.data);
      //  redirigir a la página de inicio de sesión 
      // Establecer el estado para redirigir      
      alert('Usuario Registrado:D');
      nav("/dashboard");


    } catch (error) {
      console.error(error);
      alert('Error al registrar el usuario');
    }


  };


  return (
    <>

      <div className={styles["register-container"]}>
        <h3 className="text-white" align="center">Registrate!</h3>
        <form onSubmit={handleSubmit}>
          <label htmlFor="name">Name:</label><br />
          <input id="name" type="text" value={name} onChange={(e) => setName(e.target.value)} required /><br />
          <label htmlFor="nickN">Nickame:</label><br />
          <input id="nickN" type="text" value={nickN} onChange={(e) => setNickN(e.target.value)} required /><br />
          <label htmlFor="mail">Mail:</label><br />
          <input id="mail" type="email" value={mail} onChange={(e) => setMail(e.target.value)} required /><br />
          <label htmlFor="pass">Password:</label><br />
          <input id="pass" type="password" value={pass} onChange={(e) => setPass(e.target.value)} required /><br />
          <label htmlFor="pass2">Confirm Password:</label><br />
          <input id="pass2" type="password" value={pass2} onChange={(e) => setPass2(e.target.value)} required /><br />
          <button type="submit">Crear</button>
          <p className="text-white">Already have an account?
            <Link to="/">Log In</Link>
          </p>
        </form>
      </div>

      <style>{`
     body {
      display: flex;
      align-items: center;
      justify-content: center;
      height: 100vh;
      margin: 0;
      background-color: #3ea0ca; /* Color de fondo */
      background-image: url('../../resources/Illustrations/Register.jpg');
      background-position: center;
      background-repeat: no-repeat;
      background-size: cover;

  }
    `}</style>

    </>
  );

};

export default Registro;