import { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import axiosInstance from '../AxiosConf/axiosconf';

export function usePerfil() {
    const [perfil, setPerfil] = useState({ nombre: '', foto: '' });

    useEffect(() => {
        axiosInstance.get('/perfilMenu')
            .then(response => {
                setPerfil({ nombre: response.data.nombre, foto: response.data.foto });
            })
            .catch(error => {
                console.error("Error al obtener la información del perfil:", error);
            });
    }, []);

    return perfil;
}

export function usePublicacion(id_publi) {
    const [publicacion, setPublicacion] = useState({});

    useEffect(() => {
        axiosInstance.get(`/publicacion/${id_publi}`)
            .then(response => {
                const data = response.data;
                //console.log(response.data.id_autor);
                if (data.imageUrl) {
                    //data.imageUrl = `data:image/jpeg;base64,${data.imageUrl}`;
                }
                if (data.autorPfp) {
                    //data.autorPfp = `data:image/jpeg;base64,${data.autorPfp}`;
                }
                setPublicacion(data);
            })
            .catch(error => {
                console.error("Error al obtener la información de la publicación:", error);
            });
    }, [id_publi]);

    return [publicacion, setPublicacion];
}

export function useFollow(authorId) {
    const [followed, setFollowed] = useState(false);

    useEffect(() => {
        axiosInstance.get(`/isFollowing/${authorId}`)
            .then(response => {
                setFollowed(response.data);
            })
            .catch(error => {
                console.error('Error al verificar si sigue al autor:', error);
            });
    }, [authorId]);

    const handleFollowButtonClick = () => {
        if (followed) {
            axiosInstance.post('/unfollow', { authorId })
                .then(response => {
                    setFollowed(false);
                    Swal.fire({
                        title: 'Dejaste de seguir al usuario',
                        text: ':C',
                        icon: 'warning',
                        confirmButtonText: 'Lo seeee'
                    })
                })
                .catch(error => {
                    console.error('Error al dejar de seguir al autor:', error);
                });
        } else {
            axiosInstance.post('/follow', { authorId })
                .then(response => {
                    setFollowed(true);
                    Swal.fire({
                        title: 'Comenzaste a seguir al usuario con éxito',
                        text: '<3',
                        icon: 'success',
                        confirmButtonText: 'Yeiiiiii :DD'
                    })
                })
                .catch(error => {
                    console.error('Error al seguir al autor:', error);
                });
        }
    };

    return { followed, handleFollowButtonClick };
}

export function useComment() {
    const [commentText, setCommentText] = useState('');
    const [commentError, setCommentError] = useState('');

    const handleFormSubmit = (event, id_publi, id_usuario, reloadComments) => {
        event.preventDefault();
        if (commentText.trim() === '') {
            setCommentError('Por favor, escribe un comentario antes de enviar.');
        } else {
            setCommentError('');
            console.log(commentText)
            axiosInstance.post('/addComm', { id_publi, id_usuario, commentText })
                .then(() => {
                    setCommentText('');
                    window.location.reload(); // Recargar la página
                })
                .catch(error => {
                    console.error("Error al enviar el comentario:", error);
                    setCommentError('Error al enviar el comentario. Inténtalo de nuevo.');
                });
        }
    };

    return { commentText, setCommentText, commentError, handleFormSubmit };
}

export function useLikes(postId) {
    const [likes, setLikes] = useState(0);
    const [liked, setLiked] = useState(false);

    useEffect(() => {
        axiosInstance.get(`/likes/${postId}`)
            .then(response => {
                setLikes(response.data.likes);
            })
            .catch(error => {
                console.error('Error al obtener los likes:', error);
            });

        axiosInstance.get(`/isLiked/${postId}`)
            .then(response => {
                setLiked(response.data);
            })
            .catch(error => {
                console.error('Error al verificar si ha dado like:', error);
            });
    }, [postId]);

    const handleLikeButtonClick = () => {
        if (liked) {
            axiosInstance.post('/unlike', { postId })
                .then(response => {
                    setLikes(likes - 1);
                    setLiked(false);
                })
                .catch(error => {
                    console.error('Error al quitar el like:', error);
                });
        } else {
            axiosInstance.post('/like', { postId })
                .then(response => {
                    setLikes(likes + 1);
                    setLiked(true);
                })
                .catch(error => {
                    if (error.response && error.response.status === 400) {
                        Swal.fire({
                            icon: 'warning',
                            title: 'Advertencia',
                            text: 'Ya has dado like a esta publicación'
                        });
                    } else {
                        console.error('Error al agregar el like:', error);
                    }
                });
        }
    };

    return { likes, liked, handleLikeButtonClick };
}




