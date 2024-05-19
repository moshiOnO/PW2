import React from 'react';
import { Link } from 'react-router-dom';
import styles from '../paginaWeb/css/perfil.module.css';

const UserPosts = ({ posts, onDelete, loggedInUserId }) => {
    return (
        <div id={styles.pfpubs}>
            {posts.map((post, index) => {
                const formattedDate = new Date(post.fecha_publi).toLocaleDateString('es-ES', {
                    day: '2-digit',
                    month: '2-digit',
                    year: 'numeric'
                });

                return (
                    <div key={index} id={styles.pubpfp}>
                        {loggedInUserId === post.id_autor && (                            
                            <>        
                            {/* {console.log(post.id_publi)}                     */}
                                <Link id={styles.editPub} to={`/editpost/${post.id_publi}`}>
                                    <span className="bi bi-wrench-adjustable"></span>
                                </Link>
                                <button id={styles.removePub} onClick={() => onDelete(post.id_publi)}>
                                    <span className="bi bi-trash"></span>
                                </button>
                            </>
                        )}
                        <img src={post.imageUrl} alt="Post" />
                        <div id={styles.pubpfpT}>
                            <h4>{post.titulo_publi}</h4>
                            <p id={styles.datePub}>El post se creó el: {formattedDate}</p>
                            <p>{post.desc_publi}</p>
                        </div>
                    </div>
                );
            })}
        </div>
    );
};

export default UserPosts;


