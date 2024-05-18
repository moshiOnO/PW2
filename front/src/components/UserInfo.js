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
                <Link to="/stats">Publicaciones/Likes</Link>
                <Link to="/stats">Publicaciones/Visualización</Link>
                <Link to="/stats">Interacciones/Semanales</Link>
                <Link to="/stats">Seguidores/Mensuales</Link>
            </div>
        </div>
    );
};

export default UserInfo;
