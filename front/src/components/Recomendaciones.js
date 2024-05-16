// Recomendaciones.js

import React from 'react';
import { Link } from 'react-router-dom';
import styles from '../paginaWeb/css/PostVentana.module.css';

function Recomendaciones({ recomendaciones }) {
    return (
        <div id={styles.recommContainer}>
            <div id={styles.recomm}>
                <h2>Recomendaciones</h2>
                {recomendaciones && recomendaciones.map((rec, index) => (
                    <div key={index} id={styles.recP}>
                        <Link to={`/publicacion/${rec.id}`}>
                            <img src={rec.imageUrl} alt="posts" />
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Recomendaciones;
