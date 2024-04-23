import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.bundle.js'
import Swal from 'sweetalert2';
import styles from './paginaWeb/css/createpost.module.css';
import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

function Editpost() {
    const nav = useNavigate()
    useEffect(() => {
        const handleFileChange = (event) => {
            const carouselInner = document.getElementById('carouselInner');
            carouselInner.innerHTML = ''; // Limpiar el contenido anterior del carrusel

            const files = event.target.files;
            for (let i = 0; i < files.length; i++) {
                const file = files[i];
                const reader = new FileReader();
                reader.onload = (e) => {
                    const img = document.createElement('img');
                    img.src = e.target.result;
                    img.className = 'd-block w-100 carousel-item';
                    carouselInner.appendChild(img);
                };
                reader.readAsDataURL(file);
            }
        };

        const botonSubirFoto = document.getElementById('BotonSubirFoto');
        if (botonSubirFoto) {
            botonSubirFoto.addEventListener('change', handleFileChange);
        }

        return () => {
            if (botonSubirFoto) {
                botonSubirFoto.removeEventListener('change', handleFileChange);
            }
        };
    }, []);

    // Función para validar el título y la descripción antes de postear
    const validarPosteo = () => {
        const titulo = document.getElementById("titleP").value.trim();
        const desc = document.getElementById("descP").value.trim();
        const categorias = document.querySelectorAll(".categoria input[type='checkbox']"); // Selecciona todos los elementos de categoría

        const tituloValido = titulo.length > 0;
        const descValida = desc.length > 0;
        let alMenosUnaCategoriaSeleccionada = false;

        // Verifica si al menos una categoría ha sido seleccionada
        categorias.forEach((categoria) => {
            if (categoria.checked) {
                alMenosUnaCategoriaSeleccionada = true;
            }
        });

        if (!tituloValido || !descValida || !alMenosUnaCategoriaSeleccionada) {
            if (!tituloValido) {
                document.getElementById("titleError").textContent = "El título es requerido.";
            } else {
                document.getElementById("titleError").textContent = "";
            }

            if (!descValida) {
                document.getElementById("descError").textContent = "La descripción es requerida.";
            } else {
                document.getElementById("descError").textContent = "";
            }

            if (!alMenosUnaCategoriaSeleccionada) {
                document.getElementById("catError").textContent = "Debes seleccionar al menos una categoría.";
            } else {
                document.getElementById("catError").textContent = "";
            }

            return false;
        } else {
            /*
            // Limpiar los mensajes de error si los campos están validados
            // document.getElementById("titleError").textContent = "";
            // document.getElementById("descError").textContent = "";
            // document.getElementById("catError").textContent = "";
            // // Restablecer los valores de los campos
            // document.getElementById("titleP").value = "";
            // document.getElementById("descP").value = "";
            // No necesitas recargar la página en React
            // window.location.reload();
            */
            //Lógica de subir datos al server
            Swal.fire({
                title: 'Tu publicación se creó con éxito',
                text: '<3',
                icon: 'success',
                confirmButtonText: 'Yeiiiiii :DD'
            } // Aquí cambia el texto del botón de confirmación
            ).then((result) => {
                if (result.isConfirmed) {
                    // Redirigir al usuario a la página "/dashboard"
                    nav("/dashboard");
                }
            });

            return true;
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
                    <div className="col-md-4">
                        <div id={styles.carouselExample} className="carousel slide" data-bs-ride="carousel">
                            <div className="carousel-inner" id="carouselInner">
                                {/* <!-- Aquí se agregarán dinámicamente las imágenes seleccionadas --> */}
                            </div>
                        </div>
                        <label htmlFor="BotonSubirFoto" className={`${styles.customfileupload} custom-file-upload`}>Subir foto</label>
                        <input type="file" accept="image/*" id="BotonSubirFoto" style={{ marginTop: '10px' }} hidden />
                    </div>

                    {/* <!-- Información del post --> */}
                    <div id={styles.postInfo} className="col-md-8">
                        <input type="text" id="titleP" className={styles.titleP} placeholder="Nuevo Título" style={{ marginBottom: '10px' }} />

                        <span id="titleError" className={`${styles.error} error-message`}></span>
                        <br />
                        <input type="text" id="descP" className={`${styles.descP} error-message`} placeholder="Nueva Descripción" style={{ marginBottom: '10px' }} />

                        <span id="descError" className={`${styles.error} error-message`}></span>
                        <br />

                        <div id="catP" className={`${styles.catP} col-md-8`} style={{ marginBottom: '10px' }}>
                            <div className="form-check form-check-inline categoria">
                                <input className={`${styles.formcheckinput} form-check-input`} type="checkbox" value="" id="animeCheck" style={{ display: 'none' }} />
                                <label className={`${styles.formchecklabel} form-check-label checkbox-label`} htmlFor="animeCheck">Anime</label>
                            </div>
                            <div className="form-check form-check-inline categoria">
                                <input className={`${styles.formcheckinput} form-check-input`} type="checkbox" value="" id="drawingCheck" style={{ display: 'none' }} />
                                <label className={`${styles.formchecklabel} form-check-label checkbox-label`} htmlFor="drawingCheck">Drawing</label>
                            </div>
                            <div className="form-check form-check-inline categoria">
                                <input className={`${styles.formcheckinput} form-check-input`} type="checkbox" value="" id="ocCheck" style={{ display: 'none' }} />
                                <label className={`${styles.formchecklabel} form-check-label checkbox-label`} htmlFor="ocCheck">OC</label>
                            </div>
                            <span id="catError" className={`${styles.error} error-message`}></span>
                        </div>

                        {/* <!-- Botón personalizado para postear --> */}
                        <button id={styles.BotonPostear} onClick={validarPosteo} style={{ marginTop: '10px' }}>Postear</button>
                    </div>
                </div>
            </div>

        </>

    );
}

export default Editpost