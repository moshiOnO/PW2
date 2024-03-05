import 'bootstrap/dist/css/bootstrap.css';
import style from './paginaWeb/css/login.module.css';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import Axios from 'axios';

const InicioSesion = () => {

    const[user, setUser] = useState('');
    const[pass, setPass] = useState('');  

    const nav = useNavigate()


    //Función para agregar los datos al back
    const handleSubmit = async (e) => {
        e.preventDefault();
       console.log(user);

        try {
            const response = await Axios.post('http://localhost:3001/login', {
                us: user,
                con: pass
            }).then((data)=>{
                if(data.data.alert === "Success"){
                    localStorage.setItem('sesion', JSON.stringify(data.data.usuario));
                    console.log(data);
                    nav("/dashboard");
                }else{
                    alert('Usuario no encontrado');
                }
            }).catch((error)=>{
                console.log(error);
            })


        } catch (error) {
            console.error(error);
            alert('Error al registrar el usuario');
        }


    };


    return (
        <>

            <div class={style["login-container"]}>
                <h3 class="text-white" align="center">Login!</h3>
                <form onSubmit={handleSubmit}>
                    <input type="text" placeholder="Username" value={user} onChange={(e) => setUser(e.target.value)} required />
                    <input type="password" placeholder="Password" value={pass} onChange={(e) => setPass(e.target.value)} required />
                    <button type="submit">Sign In</button>
                    <p class="text-white">Don't have an account?
                        <Link to="/register">Sign Up</Link>
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
    
         background-color: #080808;
                background-image: url('/resources/Illustrations/login.jpg');
                /* height: 500px; */
                background-position: center;
                background-repeat: no-repeat;
                background-size: cover;
    }
    `}</style>

        </>
    );

};

export default InicioSesion;