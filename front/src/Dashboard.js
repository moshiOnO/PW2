import 'bootstrap/dist/css/bootstrap.css';
import styles from './paginaWeb/css/dashboard.module.css';
import React, { useState, useEffect } from 'react';
import Masonry from 'masonry-layout';
import Axios from 'axios';
import { Link } from 'react-router-dom';


function Dashboard() {
    
    useEffect(() => {
        // Selecciona el contenedor de Masonry y crea una nueva instancia de Masonry
        const grid = document.querySelector('.row-cols-md-3');
        const masonry = new Masonry(grid, {
            itemSelector: '.col',
            percentPosition: true
        });

        // Actualiza Masonry después de que las imágenes se hayan cargado completamente
        masonry.layout();
    }, []); // El segundo argumento de useEffect es un arreglo de dependencias vacío para que se ejecute solo una vezconsole.log(styles);


    return (
        <>

            <nav id={styles.menu} className="navbar navbar-expand-lg navbar-light">
                <a id={styles.companyname} className="navbar-brand" href="#">DEEZY</a>
                <ul id={styles.menuElements} className="navbar-nav">
                    {/* css                 bootstrap */}
                    <li className={`${styles["nav-item"]} nav-item`} >
                        <a className={`${styles["nav-link"]} nav-link`} href="dashboard.html">Inicio</a>
                    </li>
                    <li className={`${styles["nav-item"]} nav-item`}>
                        <a className={`${styles["nav-link"]} nav-link`} href="dashboard.html">Explorar</a>
                    </li>
                    <li className={`${styles["nav-item"]} nav-item`}>
                        <a className={`${styles["nav-link"]} nav-link`} href="editPubs.html">Crear</a>
                    </li>
                    <li className={`${styles["nav-item"]} nav-item`}>
                        <a href="perfil.html">
                            <img src="/resources/pfp/lovers.jpeg" alt="PFP" />
                        </a>
                    </li>
                </ul>
            </nav>


            <div className="container mt-4">

                <div className="row row-cols-1 row-cols-md-3" data-masonry='{"percentPosition": true }'>

                    <div class="col">
                        <div className={`${styles.card} card`}>
                            <img src="./resources/pubs/Gwen uwu.png" class="card-img-top" alt="Imagen 2" />
                            <div className={`${styles["card-body"]} card-body`}>
                                <p class="card-title">Gwen uwu</p>
                            </div>
                        </div>
                    </div>



                    <div class="col">
                        <div className={`${styles.card} card`}>
                            <img src="./resources/pubs/1083226.jpg" class="card-img-top" alt="Imagen 2" />
                            <div className={`${styles["card-body"]} card-body`}>
                                <p class="card-title">Just gettin' fun</p>
                            </div>
                        </div>
                    </div>

                    <div class="col">
                        <div className={`${styles.card} card`}>
                            <img src="/resources/pubs/yeh.jpg" class="card-img-top" alt="Imagen 3" />
                            <div className={`${styles["card-body"]} card-body`}>
                                <p class="card-title">yeh</p>
                            </div>
                        </div>
                    </div>

                    <div class="col">
                        <div className={`${styles.card} card`}>
                            <img src="../../resources/pubs/hijodeturepuchamadre.png" class="card-img-top" alt="Imagen 1" />
                            <div className={`${styles["card-body"]} card-body`}>
                                <p class="card-title">staaaar⭐</p>
                            </div>
                        </div>
                    </div>

                    <div class="col">
                        <div className={`${styles.card} card`}>
                            <img src="../../resources/pubs/StarRail_Image_1693122087.png" class="card-img-top" alt="Imagen 2" />
                            <div className={`${styles["card-body"]} card-body`}>
                                <p class="card-title">march coquette</p>
                            </div>
                        </div>
                    </div>

                    <div class="col">
                        <div className={`${styles.card} card`}>
                            <img src="../../resources/pubs/1135214.jpg" class="card-img-top" alt="Imagen 3" />
                            <div className={`${styles["card-body"]} card-body`}>
                                <p class="card-title">my beauty HU TAOOOOO!</p>
                            </div>
                        </div>
                    </div>



                </div>

            </div>        


        </>



    );
}

export default Dashboard