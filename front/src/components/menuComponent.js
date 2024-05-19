// Menu.js
import React from 'react';
import { Link } from 'react-router-dom';
import styles from '../paginaWeb/css/dashboard.module.css';  // Ajusta la ruta según tu estructura de directorios

function Menu({ perfil }) {
    return (
        <nav id={styles.menu} className="navbar navbar-expand-lg navbar-light">
            <a id={styles.companyname} className="navbar-brand" href="#">DEEZY</a>
            <ul id={styles.menuElements} className="navbar-nav">
                <li className={`${styles["nav-item"]}`}>
                    <Link className={`${styles["nav-link"]} nav-link`} to="/dashboard">Inicio</Link>
                </li>
                <li className={`${styles["nav-item"]}`}>
                    <Link className={`${styles["nav-link"]} nav-link`} to="/explore">Explorar</Link>
                </li>
                <li className={`${styles["nav-item"]}`}>
                    <Link className={`${styles["nav-link"]} nav-link`} to="/createpost">Crear</Link>
                </li>
                <li className={`${styles["nav-item"]}`}>
                    <Link to={`/perfil/${perfil.ID}`} >
                        {perfil.foto ? <img src={perfil.foto} alt="Perfil" /> : <img src="/resources/pfp/lovers.jpeg" alt="PFP" />}
                    </Link>
                </li>
            </ul>
        </nav>
    );
}

export default Menu;
