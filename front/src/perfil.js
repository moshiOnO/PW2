import 'bootstrap/dist/css/bootstrap.css';
import styles from './paginaWeb/css/perfil.module.css';
import React, { useState, useEffect } from 'react';
import Masonry from 'masonry-layout';
import Axios from 'axios';
import { Link } from 'react-router-dom';

function perfil() {


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
                        <a className={`${styles["nav-link"]} nav-link`} href="dashboard.html">Explorar</a>
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

            <div class="container">
                <div class="row">

                    {/* <!--Columna para la info personal del usuario--> */}
                    <div class="col-md-3">
                        <div id={styles.pfp}>
                            <img src="../../resources/pfp/itadori rocks.jpeg" alt="PFP" />
                            <h2> Donnie Balboa</h2>
                            <p> Me gusta la saga de los juegos de Persona :DD</p>
                            <hr class={`${styles["separador"]}`} />
                            <h2>Featured</h2>
                            <div id={styles.featured}>
                                <p>Título</p>
                                <p>Título</p>
                            </div>
                        </div>
                    </div>

                    {/* <!-- Columna para el nombre y publis --> */}
                    <div id={styles.pfinfo} class="col-md-8">

                        <div id={styles.pfn}>
                            <h3>@moshiOnO</h3>
                        </div>

                        <div id={styles.pfpubs}>
                            <div id={styles.pubpfp}>
                                <img src="../../resources/pubs/Akali.jpeg" alt="" />
                                <div id={styles.pubpfpT}>
                                    <h4>Título</h4>
                                    <p id={styles.datePub}>Fecha uwu</p>
                                    <p>Mi bieja weeeeeee</p>
                                </div>
                            </div>

                            <div id={styles.pubpfp}>
                                <img src="../../resources/pubs/yanfo.jpeg" alt="" />
                                <div id={styles.pubpfpT}>
                                    <h4>Título</h4>
                                    <p id={styles.datePub}>Fecha uwu</p>
                                    <p>Un fondo de pantallita o qué?</p>
                                </div>
                            </div>

                            <div id={styles.pubpfp}>
                                <img src="../../resources/pubs/DanHeng.jpeg" alt="" />
                                <div id={styles.pubpfpT}>
                                    <h4>Título</h4>
                                    <p id={styles.datePub}>Fecha uwu</p>
                                    <p>Que me preñe el cumpleañero</p>
                                </div>
                            </div>

                            <div id={styles.pubpfp}>
                                <img src="../../resources/pubs/ururaka.jpeg" alt="" />
                                <div id={styles.pubpfpT}>
                                    <h4>Título</h4>
                                    <p id={styles.datePub}>Fecha uwu</p>
                                    <p>AAAAAAAAAAAAAAAA TE AMOOOOOOO MUCHO musunene</p>
                                </div>
                            </div>


                        </div>
                    </div>


                </div>
            </div>


        </>



    );
}

export default perfil