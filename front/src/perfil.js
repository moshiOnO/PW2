import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import Swal from 'sweetalert2';
import styles from './paginaWeb/css/perfil.module.css';
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axiosInstance from './AxiosConf/axiosconf';

//Componentes
import Menu from './components/menuComponent';
import { usePerfil } from './components/publicacionUtils';
import UserInfo from './components/UserInfo';
import UserPosts from './components/UserPosts';

const Perfil = () => {
    const { userId } = useParams();
    const perfilMenu = usePerfil();
    const [perfil, setPerfil] = useState({
        ID: '',
        nombre: '',
        nickname: '',
        email: '',
        descripcion: '',
        foto: ''
    });
    const [userPosts, setUserPosts] = useState([]);

    useEffect(() => {
        axiosInstance.get(`/perfil/${userId}`)
            .then(response => {
                setPerfil(response.data);
            })
            .catch(error => {
                console.error('Error al obtener la información del perfil:', error);
            });

        axiosInstance.get(`/userPosts/${userId}`)
            .then(response => {
                setUserPosts(response.data);
            })
            .catch(error => {
                console.error('Error al obtener las publicaciones del usuario:', error);
            });
    }, [userId]);

    const mostrarVentanaConfirmacion = (postId) => {
        Swal.fire({
            title: '¿Estás seguro?',
            text: 'Se borrará la información de forma permanente.',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#E4AF9E',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Sí, borrar',
            cancelButtonText: 'Cancelar'
        }).then((result) => {
            if (result.isConfirmed) {
                axiosInstance.delete(`/deletePost/${postId}`)
                    .then(response => {
                        Swal.fire({
                            title: 'Tu post se borró con éxito',
                            text: '<3',
                            icon: 'success',
                            confirmButtonText: 'Yeiiiiii :DD',
                            confirmButtonColor: '#E4AF9E'
                        }).then((result) => {
                            if (result.isConfirmed) {
                                setUserPosts(userPosts.filter(post => post.id !== postId));
                            }
                        });
                    })
                    .catch(error => {
                        console.error('Error al borrar la publicación:', error);
                        Swal.fire({
                            title: 'Error',
                            text: 'Hubo un problema al borrar la publicación.',
                            icon: 'error',
                            confirmButtonText: 'OK',
                            confirmButtonColor: '#E4AF9E'
                        });
                    });
            }
        });
    };

    return (
        <>
            <Menu perfil={perfilMenu} />

            <div className="container">
                <div className={`${styles.row} row`}>
                    <div className="col-md-3">
                        {console.log(perfil, perfilMenu.ID)}
                        <UserInfo profile={perfil} loggedInUserId={perfilMenu.ID} />
                    </div>

                    <div id={styles.pfinfo} className="col-md-8">
                        <div id={styles.pfn}>
                            <h3>@{perfil.nickname}</h3>
                        </div>
                        <UserPosts posts={userPosts} onDelete={mostrarVentanaConfirmacion} loggedInUserId={perfilMenu.ID} />
                    </div>
                </div>
            </div>
        </>
    );
};

export default Perfil;
