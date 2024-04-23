import 'bootstrap/dist/css/bootstrap.css';
import styles from './paginaWeb/css/register.module.css';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import Axios from 'axios';

function validationCampos(name, nickN, mail, pass, pass2, setNameError, setNickError, setMailError, setPassError, setPass2Error) {
  let isValid = true;

  // Perform validation
  if (name.trim() === '') {
    setNameError('Por favor, complete este campo.');
    isValid = false;
  }
  if (nickN.trim() === "") {
    setNickError('Por favor, complete este campo.');
    isValid = false;
  }
  if (mail.trim() === "") {
    setMailError('Por favor, complete este campo.');
    isValid = false;
  }
  if (pass.trim() === "") {
    setPassError('Por favor, complete este campo.');
    isValid = false;

  } else if (pass.length < 8 || !/[A-Z]/.test(pass) || !/\d/.test(pass)) {
    setPassError('La contraseña debe tener al menos 8 caracteres, una mayúscula y un número. ');
    isValid = false;
  }
  if (pass2.trim() === "") {
    setPass2Error('Por favor, complete este campo.');
    isValid = false;
  }
  if (pass !== pass2) {
    setPass2Error('Las contraseñas no coinciden.');
    isValid = false;
  }

  if (isValid === true) {
    return true
  }
  else {
    return false
  }

}

const Registro = () => {
  const [name, setName] = useState('');
  const [nickN, setNickN] = useState('');
  const [mail, setMail] = useState('');
  const [pass, setPass] = useState('');
  const [pass2, setPass2] = useState('');
  const [nameError, setNameError] = useState('');
  const [nickError, setNickError] = useState('');
  const [mailError, setMailError] = useState('');
  const [passError, setPassError] = useState('');
  const [pass2Error, setPass2Error] = useState('');

  const nav = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Reset errors
    setNameError('');
    setNickError('');
    setMailError('');
    setPassError('');
    setPass2Error('');

    // Validar campos
    const isValid = validationCampos(name, nickN, mail, pass, pass2, setNameError, setNickError, setMailError, setPassError, setPass2Error);

    if (!isValid) {
      // Si la validación no pasa, no continúes con el envío del formulario
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
          <input id="name" type="text" value={name} onChange={(e) => setName(e.target.value)} />
          <span id="nameError" className={`${styles.error} error`}>{nameError}</span>
          <br />



          <label htmlFor="nickN">Nickame:</label><br />
          <input id="nickN" type="text" value={nickN} onChange={(e) => setNickN(e.target.value)} />
          <span id="nickError" className={`${styles.error} error`}>{nickError}</span>
          <br />


          <label htmlFor="mail">Mail:</label><br />
          <input id="mail" type="email" value={mail} onChange={(e) => setMail(e.target.value)} />
          <span id="mailError" className={`${styles.error} error`}>{mailError}</span>
          <br />


          <label htmlFor="pass">Password:</label><br />
          <input id="pass" type="password" value={pass} onChange={(e) => setPass(e.target.value)} />
          <span id="passError" className={`${styles.error} error`}>{passError}</span>
          <br />


          <label htmlFor="pass2">Confirm Password:</label><br />
          <input id="pass2" type="password" value={pass2} onChange={(e) => setPass2(e.target.value)} />
          <span id="pass2Error" className={`${styles.error} error`}>{pass2Error}</span>
          <br />


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