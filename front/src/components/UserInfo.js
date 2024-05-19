import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styles from '../paginaWeb/css/perfil.module.css';
import axiosInstance from '../AxiosConf/axiosconf';
import Swal from 'sweetalert2';
import Cookies from 'js-cookie';

const UserInfo = ({ profile, loggedInUserId }) => {

    const navigate = useNavigate();

    const handleLogout = () => {
        axiosInstance.post('http://localhost:3001/logout')
            .then(() => {
                Swal.fire(
                    'Cuídate y toma agua ' + profile.nickname + '!',
                    '<3',
                    'success'
                ).then((result) => {
                    if (result.isConfirmed) {
                        Cookies.remove('id_usuario');
                        navigate('/');
                    }
                });
            })
            .catch(error => {
                console.error('Error al cerrar sesión:', error);
            });
    };

    return (
        <div id={styles.pfp}>
            {loggedInUserId === profile.id && (
                <Link id={styles.editButton} to="/editperfil">
                    <span className="bi bi-wrench"></span>
                </Link>
            )}
            <img src={profile.foto} alt="PFP" />
            <h2>{profile.nombre}</h2>
            <p>{profile.descripcion}</p>
            <hr className={styles.separador} />

            {loggedInUserId === profile.id && (
                <>
                    <h2>Estadísticas</h2>
                    <div id={styles.featured}>
                        <Link to="/stats/publicacionesLikes">Publicaciones/Likes</Link>
                        <Link to="/stats/interaccionesSemanales">Interacciones Semanales</Link>
                        <Link to="/stats/seguidoresMensuales">Seguidores Mensuales</Link>
                    </div>
                    <br></br>
                    <button className="btn btn-danger" onClick={handleLogout}>Cerrar Sesión</button>
                </>
            )}

        </div>
    );
};

export default UserInfo;
