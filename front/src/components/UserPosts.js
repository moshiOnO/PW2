import React from 'react';
import { Link } from 'react-router-dom';
import styles from '../paginaWeb/css/perfil.module.css';

const UserPosts = ({ posts, onDelete, loggedInUserId }) => {
    return (
        <div id={styles.pfpubs}>
            {posts.map((post, index) => {
                //console.log('Rendering post:', post);

                return (
                    <div key={index} id={styles.pubpfp}>
                        {loggedInUserId === post.id_autor && (
                            <>
                                <Link id={styles.editPub} to={`/editpost/${post.id}`}>
                                    <span className="bi bi-wrench-adjustable"></span>
                                </Link>
                                <button id={styles.removePub} onClick={() => onDelete(post.id)}>
                                    <span className="bi bi-trash"></span>
                                </button>
                            </>
                        )}
                        <img src={post.imageUrl} alt="Post" />
                        <div id={styles.pubpfpT}>
                            <h4>{post.titulo_publi}</h4>
                            <p id={styles.datePub}>{post.fecha_publi}</p>
                            <p>{post.desc_publi}</p>
                        </div>
                    </div>
                );
            })}
        </div>
    );
};

export default UserPosts;

