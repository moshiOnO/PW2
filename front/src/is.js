import 'bootstrap/dist/css/bootstrap.css';
import style from './paginaWeb/css/login.module.css';
import Swal from 'sweetalert2';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
//import Axios from 'axios';
import axiosInstance from './AxiosConf/axiosconf';

const InicioSesion = () => {

    const [user, setUser] = useState('');
    const [pass, setPass] = useState('');
    const nav = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axiosInstance.post('http://localhost:3001/login', {
                us: user,
                con: pass
            });

            if (response.data.alert === "Success") {
                //localStorage.setItem('sesion', user);
                Swal.fire(
                    'Bienvenido a DEEZY ' + user + '!',
                    '<3',
                    'success'
                ).then((result) => {
                    if (result.isConfirmed) {
                        nav("/dashboard");
                    }
                });
            } else {
                Swal.fire('Usuario no encontrado o contraseña incorrecta', ':C', 'error');
            }
        } catch (error) {
            console.error(error);
            Swal.fire('No pudimos conectarnos al servidor', ':C', 'error');
        }
    };

    return (
        <>
            <div className={style["login-container"]}>
                <h3 className="text-white" align="center">Login!</h3>
                <form onSubmit={handleSubmit}>
                    <input type="text" placeholder="Username" value={user} onChange={(e) => setUser(e.target.value)} required />
                    <input type="password" placeholder="Password" value={pass} onChange={(e) => setPass(e.target.value)} required />
                    <button type="submit">Sign In</button>
                    <p className="text-white">Don't have an account?
                        <Link to="/register">Sign Up</Link>
                    </p>
                </form>
            </div>

            <style>{`
    body {
        /* Eliminamos display:flex y align-items/justify-content */
        /* Ajustamos el margin a 0 */
        margin: 0;
    
        /* Agregamos los estilos de la imagen de fondo */
        background-color: #080808;
        background-image: url('/resources/Illustrations/login.jpg');
        background-position: center;
        background-repeat: no-repeat;
        background-size: cover;
    }
    
    /* Establecemos un z-index alto para asegurarnos de que la imagen de fondo esté detrás de otras capas */
    body::before {
        content: "";
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        z-index: -1;
        background-color: #080808;
        background-image: url('/resources/Illustrations/login.jpg');
        background-position: center;
        background-repeat: no-repeat;
        background-size: cover;
    }
    
    `}</style>


        </>
    );
};

export default InicioSesion;
