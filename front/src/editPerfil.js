import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-icons/font/bootstrap-icons.css'
import Swal from 'sweetalert2';
import styles from './paginaWeb/css/editperfil.module.css';
import React, { useRef, useState, useEffect } from 'react';
import Axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

function Editperfil() {
    const nav = useNavigate()
    const [nickname, setNickname] = useState('');
    const [desc, setDesc] = useState('');
    const [nombre, setNombre] = useState('');
    const [contraseña, setContraseña] = useState('');
    const [errors, setErrors] = useState({});
    const handleNicknameChange = (event) => {
        setNickname(event.target.value);
    };
    const handleNombreChange = (event) => {
        setNombre(event.target.value);
    };
    const handleContraseñaChange = (event) => {
        setContraseña(event.target.value);
    };
    const handleDescChange = (event) => {
        setDesc(event.target.value);
    };
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
    //Función para submit
    const handleSubmit = () => {
        // Realizar validaciones
        const errors = {};
        if (!nickname.trim()) {
            errors.nickname = 'Nickname es requerido';
        }

        if (!desc.trim()) {
            errors.desc = 'Descripción es requerida';
        }

        if (!nombre.trim()) {
            errors.nombre = 'Nombre es requerido';
        }
        if (!contraseña.trim()) {
            errors.contraseña = 'Contraseña es requerida';
        }

        // Actualizar el estado de los errores
        setErrors(errors);

        // Si no hay errores, envía los datos al servidor
        if (Object.keys(errors).length === 0) {
            // Lógica para enviar los datos al servidor
            Swal.fire({
                title: 'Tu perfil DEEZY se modificó con éxito',
                text: '<3',
                icon: 'success',
                confirmButtonText: 'Yeiiiiii :DD'} // Aquí cambia el texto del botón de confirmación
            ).then((result) => {
                if (result.isConfirmed) {
                    // Redirigir al usuario a la página "/dashboard"
                    nav("/dashboard");
                }
            });
        }
    };




    return (
        <>
            {/* <!-- Menú del apartado superior --> */}
            <nav id={styles.menu} className="navbar navbar-expand-lg navbar-light">
                <a id={styles.companyname} className="navbar-brand" href="#">DEEZY</a>
                <ul id={styles.menuElements} className="navbar-nav">
                    {/* css                 bootstrap */}
                    <li className={`${styles["nav-item"]}`} >
                        <Link className={`${styles["nav-link"]} nav-link`} to="/dashboard">Inicio</Link>
                    </li>
                    <li className={`${styles["nav-item"]}`}>
                        <Link className={`${styles["nav-link"]} nav-link`} to="/explore">Explorar</Link>
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

            {/* <!-- Info del perfil --> */}
            <div className="container">

                <div className={`${styles["row"]} row`}>
                    {/* <!-- Columna para el nombre y publis --> */}
                    <div id={styles.pfinfo} className="col-md-12" data-id="IDdelacuentaUwU">

                        <div id={styles.pfp}>
                            <img id={styles.pfPhoto} ref={imgElementRef} src="../../resources/pfp/lovers.jpeg" />
                            <input type="file" id="newPFP" accept="image/*" style={{ display: "none" }} onChange={handleFileInputChange} ref={fileInputRef} />
                            <button id={styles.subirImagenBtn} className="btn btn-primary" onClick={handleButtonClick}>Subir imagen</button>
                        </div>

                        <div id='inputsTexts'>
                            <div id={styles.pfnick}>

                                <h3>Nickname</h3>
                                <input type="text" id={styles.inputs} placeholder="Ingrese su nickname aquí"
                                    value={nickname}
                                    onChange={handleNicknameChange} />
                                {errors.nickname && <p className={styles.error}>{errors.nickname}</p>}

                                <h3>Descripción</h3>
                                <input type="text" id={styles.inputs} placeholder="Ingrese su descripción aquí"
                                    value={desc}
                                    onChange={handleNicknameChange} />
                                {errors.desc && <p className={styles.error}>{errors.desc}</p>}

                                <h3>Nombre</h3>
                                <input type="text" id={styles.inputs} placeholder="Ingrese su nombre aquí"
                                    value={nombre}
                                    onChange={handleNombreChange} />
                                {errors.nombre && <p className={styles.error}>{errors.nombre}</p>}

                                <h3>Contraseña</h3>
                                <input type="text" id={styles.inputs} placeholder="Ingrese su contraseña aquí"
                                    value={contraseña}
                                    onChange={handleContraseñaChange} />
                                {errors.contraseña && <p className={styles.error}>{errors.contraseña}</p>}
                            </div>
                        </div>
                        <button id={styles.guardaInfo} className="btn btn-primary" type="submit" onClick={handleSubmit}>Guardar Cambios</button>

                    </div>


                </div>
            </div>



        </>

    );

}

export default Editperfil;