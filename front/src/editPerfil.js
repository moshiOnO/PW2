import React, { useRef, useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import Swal from 'sweetalert2';
import styles from './paginaWeb/css/editperfil.module.css';
import axiosInstance from './AxiosConf/axiosconf';
import { useNavigate } from 'react-router-dom';

// Componentes
import Menu from './components/menuComponent';
import {usePerfil} from './components/publicacionUtils';

function Editperfil() {
    const nav = useNavigate();
    const perfil = usePerfil(); 
    const [formData, setFormData] = useState({
        nickname: '',
        desc: '',
        nombre: '',
        contraseña: ''
    });
    const [archivo, setArchivo] = useState(null);
    const [errors, setErrors] = useState({});
    const fileInputRef = useRef(null);
    const imgElementRef = useRef(null);    
   
    // Manejadores de eventos
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const validateForm = () => {
        const newErrors = {};
        Object.keys(formData).forEach((key) => {
            if (!formData[key]?.trim() && key !== 'contraseña') { // La contraseña puede estar vacía si no se va a cambiar
                newErrors[key] = `${key.charAt(0).toUpperCase() + key.slice(1)} es requerido`;
            }
        });
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleFileInputChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const imgUrl = URL.createObjectURL(file);
            imgElementRef.current.src = imgUrl;
            setArchivo(file);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validateForm()) {
            const formDataToSend = new FormData();
            formDataToSend.append('nickname', formData.nickname);
            formDataToSend.append('desc', formData.desc);
            formDataToSend.append('nombre', formData.nombre);                      
            if (formData.contraseña.trim()) {
                formDataToSend.append('contrasenia', formData.contraseña);
            }
            if (archivo) {
                formDataToSend.append('foto', archivo);
            }
    
            // Para verificar si la contraseña se ha agregado correctamente
            for (let pair of formDataToSend.entries()) {
                console.log(pair[0] + ': ' + pair[1]);
            }            
    
            axiosInstance.put('http://localhost:3001/actualizarPerfil', formDataToSend, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })
            .then(response => {
                Swal.fire({
                    title: 'Tu perfil se modificó con éxito',
                    text: '<3',
                    icon: 'success',
                    confirmButtonText: 'Yeiiiiii :DD'
                }).then((result) => {
                    if (result.isConfirmed) {
                        nav('/dashboard');
                    }
                });
            })
            .catch(error => {
                if (error.response && error.response.status === 400) {
                    setErrors({ nickname: error.response.data });
                } else {
                    console.error('Error al actualizar el perfil:', error);
                }
            });
        }
    };
    
    return (
        <>
            <Menu perfil={perfil} />
            <div className="container">
                <form onSubmit={handleSubmit}>
                    <div className={`${styles["row"]} row`}>
                        <div id={styles.pfinfo} className="col-md-12" data-id="IDdelacuentaUwU">
                            <div id={styles.pfp}>
                                <img id={styles.pfPhoto} ref={imgElementRef} src={perfil.foto || "../../resources/pfp/lovers.jpeg"} />
                                <input type="file" id="newPFP" accept="image/*" style={{ display: "none" }} onChange={handleFileInputChange} ref={fileInputRef} />
                                <button id={styles.subirImagenBtn} className="btn btn-primary" type="button" onClick={() => fileInputRef.current.click()}>Subir imagen</button>
                            </div>
                            <div id='inputsTexts'>
                                <div id={styles.pfnick}>
                                    <h3>Nickname</h3>
                                    <input type="text" id={styles.inputs} placeholder="Ingrese su nickname aquí" name="nickname" value={formData.nickname} onChange={handleChange} />
                                    {errors.nickname && <p className={styles.error}>{errors.nickname}</p>}

                                    <h3>Descripción</h3>
                                    <input type="text" id={styles.inputs} placeholder="Ingrese su descripción aquí" name="desc" value={formData.desc} onChange={handleChange} />
                                    {errors.desc && <p className={styles.error}>{errors.desc}</p>}

                                    <h3>Nombre</h3>
                                    <input type="text" id={styles.inputs} placeholder="Ingrese su nombre aquí" name="nombre" value={formData.nombre} onChange={handleChange} />
                                    {errors.nombre && <p className={styles.error}>{errors.nombre}</p>}

                                    <h3>Contraseña</h3>
                                    <input type="password" id={styles.inputs} placeholder="Ingrese su contraseña aquí" name="contraseña" value={formData.contraseña} onChange={handleChange} />
                                    {errors.contraseña && <p className={styles.error}>{errors.contraseña}</p>}
                                </div>
                            </div>
                            <button id={styles.guardaInfo} className="btn btn-primary" type="submit">Guardar Cambios</button>
                        </div>
                    </div>
                </form>
            </div>
        </>
    );
}

export default Editperfil;


