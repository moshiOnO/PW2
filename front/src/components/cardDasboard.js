import React from 'react';
import styles from '../paginaWeb/css/dashboard.module.css';
import { Link } from 'react-router-dom'; // Asumiendo que estás usando React Router

function Card({ imageUrl, title, idPubli }) {
    return (
        <div className={`${styles.card} card`}>
            <Link to={`/publicacion/${idPubli}`}>
                <img src={`data:image/jpeg;base64,${imageUrl}`} alt={title} />
                <div className={`${styles["card-body"]} card-body`}>
                    <p className="card-title">{title}</p>
                </div>
            </Link>
        </div>
    );
}

export default Card;

