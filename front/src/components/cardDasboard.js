import React from 'react';
import { Link } from 'react-router-dom'; // Asumiendo que estás usando React Router

function Card({ imageUrl, title }) {
    return (
        <div className={`${styles.card} card`}>
            <Link to="/publicacion">
                <img src={imageUrl} className="card-img-top" alt={title} />
                <div className={`${styles["card-body"]} card-body`}>
                    <p className="card-title">{title}</p>
                </div>
            </Link>
        </div>
    );
}

export default Card;
