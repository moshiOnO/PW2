import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-icons/font/bootstrap-icons.css'
import styles from './paginaWeb/css/editperfil.module.css';
import React, { useRef, useState, useEffect } from 'react';
import Axios from 'axios';
import { Link } from 'react-router-dom';

function Editperfil() {

    // Obtener referencias a los elementos del DOM
    const fileInputRef = useRef(null);
    const imgElementRef = useRef(null);

    // Función para manejar el clic en el botón
    const handleButtonClick = () => {
        // Simular clic en el input de archivo al hacer clic en el botón
        fileInputRef.current.click();
    };

    // Función para manejar el cambio en el input de archivo
    const handleFileInputChange = () => {
        const file = fileInputRef.current.files[0]; // Obtener el archivo seleccionado

        if (file) {
            // Crear una URL local para la imagen seleccionada
            const imgUrl = URL.createObjectURL(file);

            // Mostrar la imagen seleccionada en el elemento img
            imgElementRef.current.src = imgUrl;
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
                        <a className={`${styles["nav-link"]} nav-link`} href="editPubs.html">Crear</a>
                    </li>
                    <li className={`${styles["nav-item"]}`}>
                        <Link to="/perfil">
                            <img src="/resources/pfp/lovers.jpeg" alt="PFP" />
                        </Link>
                    </li>
                </ul>
            </nav>

            {/* <!-- Info del perfil --> */}
            <div class="container">

                <div className={`${styles["row"]} row`}>
                    {/* <!-- Columna para el nombre y publis --> */}
                    <div id={styles.pfinfo} class="col-md-12" data-id="IDdelacuentaUwU">

                        <div id={styles.pfp}>
                            <img id={styles.pfPhoto}  ref={imgElementRef} src="../../resources/pfp/lovers.jpeg" />
                            <input type="file" id="newPFP" accept="image/*" style={{ display: "none" }} onChange={handleFileInputChange} ref={fileInputRef}/>
                            <button id={styles.subirImagenBtn} class="btn btn-primary" onClick={handleButtonClick}>Subir imagen</button>
                        </div>

                        <div id={styles.pfnick}>
                            <h3>Nickname</h3>
                            <input type="text" id={styles.inputs} placeholder="Ingrese su nickname aquí" />
                            <h3>Nombre</h3>
                            <input type="text" id={styles.inputs} placeholder="Ingrese su nombre aquí" />
                            <h3>Contraseña</h3>
                            <input type="text" id={styles.inputs} placeholder="Ingrese su contraseña aquí" />
                        </div>

                        <button id={styles.guardaInfo} class="btn btn-primary" type="submit">Guardar Cambios</button>

                    </div>


                </div>
            </div>



        </>

    );

}

export default Editperfil;