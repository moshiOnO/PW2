import { useState, useEffect } from 'react';
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

export function useFollow() {
    const [followed, setFollowed] = useState(false);

    const handleFollowButtonClick = () => {
        setFollowed(!followed);
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


