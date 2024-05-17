import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.bundle.js';
import styles from './paginaWeb/css/PostVentana.module.css';
import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { usePerfil, usePublicacion, useFollow, useLikes, useComment } from './components/publicacionUtils';
import axiosInstance from './AxiosConf/axiosconf';

//Componentes
import Menu from './components/menuComponent';
import Comentarios from './components/Comentarios';
import Recomendaciones from './components/Recomendaciones';

function Publicacion() {
    const { id_publi } = useParams();
    const perfil = usePerfil();
    const [publicacion, setPublicacion] = usePublicacion(id_publi);
    const { followed, handleFollowButtonClick } = useFollow(publicacion.id_autor);
    const { likes, liked, handleLikeButtonClick } = useLikes(id_publi);
    const { commentText, setCommentText, commentError, handleFormSubmit } = useComment();

    return (
        <>
            <Menu perfil={perfil} />

            <div className="container">
                <div className={`${styles["row"]} row`}>
                    <div className="col-md-4">
                        <div id={styles.carouselExample} className="carousel slide">
                            <div className={`${styles["carousel-inner"]} carousel-inner`}>
                                <div className={`${styles["carousel-item"]} carousel-item active`}>
                                    <img className="d-block w-100" src={publicacion.imageUrl} alt="Primera imagen" />
                                </div>
                            </div>
                        </div>

                        <div id={styles.autorInfo}>
                            <Link to="/perfil">
                                <img src={publicacion.autorPfp} alt="PFP" />
                            </Link>

                            <div id={styles.addInfo}>
                                <p className="autorInfo" id={publicacion.id_autor}>{publicacion.autorNombre}</p>
                                {/* <p id="autor">{publicacion.autorNombre}</p> */}
                                {/* <p id="dateP">{publicacion.fecha_publi}</p> */}
                            </div>

                            <button id={styles.followButton} className="btn btn-primary" onClick={handleFollowButtonClick}>
                                <span id={styles.followIcon} className="ml-2">{followed ? '✓' : '×'}</span>
                            </button>
                        </div>
                    </div>

                    <div className="col-md-1">
                        <div id={styles.likesContainer}>
                            <button type="button" className="btn btn-like" onClick={handleLikeButtonClick}>
                                <i className={`bi ${liked ? 'bi-heart-fill' : 'bi-heart'}`}></i>
                            </button>
                            <p id={styles.contadorL}>{likes}</p>
                        </div>

                        <div id={styles.comI}>
                            <button type="button" className="btn btn-comments">
                                <i className="bi bi-chat"></i>
                            </button>
                        </div>
                    </div>

                    <div id={styles.postInfo} className="col-md-3">
                        <h2 id={styles.titleP}>{publicacion.titulo_publi}</h2>
                        <p id={styles.descP}>{publicacion.desc_publi}</p>

                        <Comentarios comentarios={publicacion.comentarios} />

                        <form id={styles.commentForm} onSubmit={(e) => handleFormSubmit(e, id_publi)}>
                            <div className="form-group">
                                <label htmlFor="commentText">Agregar comentario:</label>
                                <textarea className="form-control" id="commentText" rows="3" value={commentText} onChange={(e) => setCommentText(e.target.value)}></textarea>
                                <span id={styles.commentError} className="error-text" style={{ display: commentError ? 'inline' : 'none' }}>{commentError}</span>
                            </div>
                            <button type="submit" className="btn btn-primary">Enviar comentario</button>
                        </form>

                        <div id={styles.catP}>
                            {publicacion.categorias && publicacion.categorias.map((cat, index) => (
                                <p key={index}>{cat}</p>
                            ))}
                        </div>
                    </div>

                    <div className="col-md-4">
                        <Recomendaciones recomendaciones={publicacion.recomendaciones} />

                        <div id={styles.recentContainer}>
                            <div id={styles.recents}>
                                <h2>Recientes</h2>
                                {publicacion.recientes && publicacion.recientes.map((rec, index) => (
                                    <div key={index} id={styles.rectP}>
                                        <Link to={`/publicacion/${rec.id}`}>
                                            <img src={rec.imageUrl} alt="posts" />
                                        </Link>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Publicacion;


