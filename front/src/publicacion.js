import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.bundle.js'
import styles from './paginaWeb/css/PostVentana.module.css';
import React, { useState, useEffect } from 'react';
import Masonry from 'masonry-layout';
import Axios from 'axios';
import { Link } from 'react-router-dom';

function Publicacion() {

    const [followed, setFollowed] = useState(false);
    const [commentText, setCommentText] = useState('');
    const [commentError, setCommentError] = useState('');

    const handleFollowButtonClick = () => {
        setFollowed(!followed);
    };
    const handleFormSubmit = (event) => {
        event.preventDefault();
        if (commentText.trim() === '') {
            setCommentError('Por favor, escribe un comentario antes de enviar.');
        } else {
            // Aquí puedes agregar el código para enviar el comentario a la base de datos
            setCommentError('');
            setCommentText('');
        }
    };



    return (
        <>
             {/* <!-- Menú del apartado superior --> */}
             <nav id={styles.menu} class="navbar navbar-expand-lg navbar-light">
                <a id={styles.companyname} class="navbar-brand" href="#">DEEZY</a>
                <ul id={styles.menuElements} class="navbar-nav">
                    {/* css                 bootstrap */}
                    <li className={`${styles["nav-item"]}`} >
                        <Link className={`${styles["nav-link"]} nav-link`} to="/dashboard">Inicio</Link>
                    </li>
                    <li className={`${styles["nav-item"]}`}>
                        <Link className={`${styles["nav-link"]} nav-link`} to="/dashboard">Explorar</Link>
                    </li>
                    <li className={`${styles["nav-item"]}`}>
                        <Link className={`${styles["nav-link"]} nav-link`} to="/editpost">Crear</Link>
                    </li>
                    <li className={`${styles["nav-item"]}`}>
                        <Link to="/perfil">
                            <img src="/resources/pfp/lovers.jpeg" alt="PFP" />
                        </Link>
                    </li>
                </ul>
            </nav>


            {/* <!--Post --> */}
            <div className="container">

                <div className={`${styles["row"]} row`}>

                    {/* <!--Fotos--> */}
                    <div className="col-md-4">
                        {/* <!-- Dibujos y el autor --> */}
                        <div id={styles.carouselExample} className="carousel slide">
                            <div className={`${styles["carousel-inner"]} carousel-inner`}>
                                <div className={`${styles["carousel-item"]} carousel-item active`}>
                                    <img className="d-block w-100" src="../../resources/pubs/Gwen uwu.png" alt="Primera imagen" />
                                </div>                               
                            </div>                           

                        </div>

                        <div id={styles.autorInfo}>

                            <Link to="/perfil">
                                <img src="/resources/pfp/lovers.jpeg" alt="PFP" />
                            </Link>

                            <div id={styles.addInfo}>
                                <p id="autor">moshiOnO</p>
                                <p id="dateP">17/2/2020</p>
                            </div>


                            <button id={styles.followButton} className="btn btn-primary" onClick={handleFollowButtonClick}>
                                <span id={styles.followIcon} className="ml-2">{followed ? '✓' : '×'}</span>
                            </button>

                        </div>

                    </div>

                    {/* Likes  */}
                    <div class="col-md-1">
                        {/* <!-- Botón de Likes --> */}
                        <div id={styles.likesContainer}>
                            <button type="button" class="btn btn-like">
                                <i class="bi bi-heart-fill"></i>
                            </button>
                            <p id={styles.contadorL}>50</p>
                        </div>


                        {/* <!-- Icono de Comentarios --> */}
                        <div id={styles.comI}>
                            <button type="button" class="btn btn-comments">
                                <i class="bi bi-chat"></i>
                            </button>
                        </div>



                    </div>


                    <div id={styles.postInfo} class="col-md-3">
                        <h2 id={styles.titleP}>Rocky</h2>
                        <p id={styles.descP}>Sooooo, quería dbujar una gwen, pero pss no le puse coletas, así que ya es una OC :DD</p>

                        <div id={styles.commentsContainer}>
                            {/* <!-- comentarios --> */}
                            <div id={styles.commsP}>

                                <div id={styles.comment}>
                                    <img src="../../resources/pfp/acshually.jpeg" alt="PFP" />
                                    <p id={styles.username}>Mr kitty</p>
                                    <p>Omgggg i luv it aaaaaaaaa</p>
                                    <div style={{ clear: 'both' }}></div>
                                </div>

                                <div id={styles.comment}>
                                    <img src="../../resources/pfp/acshually.jpeg" alt="PFP" />
                                    <p id={styles.username}>Mr kitty</p>
                                    <p>Omgggg i luv it aaaaaaaaa</p>
                                    <div style={{ clear: 'both' }}></div>
                                </div>

                                <div id={styles.comment}>
                                    <img src="../../resources/pfp/acshually.jpeg" alt="PFP" />
                                    <p id={styles.username}>Mr kitty</p>
                                    <p>Omgggg i luv it aaaaaaaaa</p>
                                    <div style={{ clear: 'both' }}></div>
                                </div>

                                <div id={styles.comment}>
                                    <img src="../../resources/pfp/acshually.jpeg" alt="PFP" />
                                    <p id={styles.username}>Mr kitty</p>
                                    <p>Omgggg i luv it aaaaaaaaa</p>
                                    <div style={{ clear: 'both' }}></div>
                                </div>

                                <div id={styles.comment}>
                                    <img src="../../resources/pfp/gojo.jpeg" alt="PFP" />
                                    <p id={styles.username}>Gojo-Kun</p>
                                    <p>HAHAHA, im gonna create a text that's gonna surpass the 20 characters AHAHAHAHAHAH</p>
                                    <div style={{ clear: 'both' }}></div>
                                </div>

                            </div>

                            {/* <!-- escribir com --> */}
                            <form id={styles.commentForm} onSubmit={handleFormSubmit}>
                                <div className="form-group">
                                    <label htmlFor="commentText">Agregar comentario:</label>
                                    {/* Añade una clase al textarea para el texto de error */}
                                    <textarea className="form-control" id="commentText" rows="3" value={commentText} onChange={(e) => setCommentText(e.target.value)}></textarea>
                                    {/* Agrega un elemento span para mostrar el texto de error */}
                                    <span id={styles.commentError} className="error-text" style={{ display: commentError ? 'inline' : 'none' }}>{commentError}</span>
                                </div>
                                <button type="submit" className="btn btn-primary">Enviar comentario</button>
                            </form>

                        </div>

                        <div id={styles.catP}>
                            <p>Anime</p>
                            <p>Drawing</p>
                            <p>Oc</p>
                        </div>

                    </div>


                    {/* <!-- Contenido de la tercera sección --> */}
                    <div class="col-md-4">
                        <div id={styles.recommContainer}>
                            <div id={styles.recomm}>
                                <h2>Recomendaciones</h2>
                                <div id={styles.recP}>
                                    <Link href="post.html">
                                        <img src="../../resources/pubs/1135214.jpg" alt="posts" />
                                    </Link>
                                </div>
                                <div id={styles.recP}>
                                    <Link href="post.html">
                                        <img src="../../resources/pubs/hijodeturepuchamadre.png" alt="posts" />
                                    </Link>
                                </div>
                                <div id={styles.recP}>
                                    <Link href="post.html">
                                        <img src="../../resources/pubs/yeh.jpg" alt="posts" />
                                    </Link>
                                </div>
                            </div>
                        </div>

                        <div id={styles.recentContainer}>
                            <div id={styles.recents}>
                                <h2>Recientes</h2>
                                <div id={styles.rectP}>
                                    <Link href="post.html">
                                        <img src="../../resources/pubs/Akali.jpeg" alt="posts" />
                                    </Link>
                                </div>
                                <div id={styles.rectP}>
                                    <Link href="post.html">
                                        <img src="../../resources/pubs/DanHeng.jpeg" alt="posts" />
                                    </Link>
                                </div>
                                <div id={styles.rectP}>
                                    <Link href="post.html">
                                        <img src="../../resources/pubs/ururaka.jpeg" alt="posts" />
                                    </Link>
                                </div>
                            </div>
                        </div>

                    </div>



                </div>
            </div>

        </>

    );
}

export default Publicacion