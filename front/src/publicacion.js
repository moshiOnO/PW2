import 'bootstrap/dist/css/bootstrap.css';
import styles from './paginaWeb/css/PostVentana.module.css';
import React, { useState, useEffect } from 'react';
import Masonry from 'masonry-layout';
import Axios from 'axios';
import { Link } from 'react-router-dom';

function publicacion() {


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
                        <a className={`${styles["nav-link"]} nav-link`} href="editPubs.html">Crear</a>
                    </li>
                    <li className={`${styles["nav-item"]}`}>
                        <Link to="/perfil">
                            <img src="/resources/pfp/lovers.jpeg" alt="PFP" />
                        </Link>
                    </li>
                </ul>
            </nav>
            
            <div class={`${styles["container"]} container`}>
                
                <div class={`${styles["left-column"]} left-column`}>
                    <div class={`${styles["star"]} star`}>
                    </div>
                    <style type="text/css">
                    </style>

                    <img src="/resources/icon.png" alt="Imagen Vertical" />
                    <div class={`${styles["box"]} box`}>
                        <p>@moshiOnO 20/6/2023</p>
                    </div>
                </div>

                <div class={`${styles["middle-column"]} middle-column`}>
                    <div class={`${styles["box"]} box`}>
                        <h2>Rockyyy</h2>
                    </div>
                    <div class={`${styles["box"]} box`}>
                        <p>Sooo queria hacer una Gwen rompecorazones, pero como no le puse coletas, mejor la hice una Oc kkkkk</p>
                    </div>
                    <div class={`${styles["box"]} box`}>

                        <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/f/fb/718smiley.svg/1024px-718smiley.svg.png" />
                        <div class={`${styles["box-mini"]} box-mini`}>
                            <p>ommmmggg i wuv it ! ! 1 ＼(٥⁀▽⁀ )／
                            </p>
                        </div>
                    </div>

                    <div class={`${styles["box"]} box`}>
                        <div class={`${styles["box-mini2"]} box-mini2`}>
                            <p>Anime </p>
                        </div>

                        <div class={`${styles["box-mini3"]} box-mini3`}>
                            <p>Oc </p>
                        </div>

                        <div class={`${styles["box-mini4"]} box-mini4`}>
                            <p>Digital drawing </p>
                        </div>

                    </div>

                </div>

                <div class={`${styles["right-column"]} right-column`}>
                    <div class={`${styles["box"]} box`}>

                        <h2>Recomendaciones</h2>
                        {/* <!-- Puedes agregar más contenido aquí --> */}
                    </div>
                    <div class={`${styles["box"]} box`}>

                        <img src="/resources/foto1.png" /><br />
                        <img src="/resources/foto2.png" />
                    </div>

                    <div class={`${styles["box"]} box`}>
                        <h2>Recientes</h2>
                        <img src="/resources/foto3.png" />
                    </div>


                </div>
            </div>


        </>



    );
}

export default publicacion