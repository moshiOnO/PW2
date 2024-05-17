// Comentarios.js
import React from 'react';
import styles from '../paginaWeb/css/PostVentana.module.css';

function Comentarios({ comentarios }) {
    return (
        <div id={styles.commentsContainer}>
            <div id={styles.commsP}>
                {comentarios && comentarios.map((comment, index) => (
                    <div key={index} id={styles.comment}>
                        <img src={comment.pfp} alt="PFP" className={styles.pfp} />
                        <p id={styles.username}>{comment.username}</p>
                        <p>{comment.text}</p>
                        <div style={{ clear: 'both' }}></div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Comentarios;


