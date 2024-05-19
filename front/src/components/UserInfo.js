import React from 'react';
import { Link } from 'react-router-dom';
import styles from '../paginaWeb/css/perfil.module.css';

const UserInfo = ({ profile, loggedInUserId }) => {
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
            <h2>Estadísticas</h2>
            <div id={styles.featured}>
                <Link to="/stats/publicacionesLikes">Publicaciones/Likes</Link>
                <Link to="/stats/interaccionesSemanales">Interacciones Semanales</Link>
                <Link to="/stats/seguidoresMensuales">Seguidores Mensuales</Link>
            </div>
            <button id={styles.cerrarsesion}>Cerrar Sesión</button>
        </div>
    );
};

export default UserInfo;
