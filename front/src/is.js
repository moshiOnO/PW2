import 'bootstrap/dist/css/bootstrap.css';
import style from './paginaWeb/css/login.module.css';
import Swal from 'sweetalert2';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import Axios from 'axios';

const InicioSesion = () => {

    const [user, setUser] = useState('');
    const [pass, setPass] = useState('');
    const nav = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        try {
            const response = await Axios.post('http://localhost:3001/login', {
                us: user,
                con: pass
            });
    
            if (response.data.alert === "Success") {
                localStorage.setItem('sesion', user);
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
        </>
    );
};

export default InicioSesion;
