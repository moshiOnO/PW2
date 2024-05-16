import 'bootstrap/dist/css/bootstrap.css';
import React, { useState, useEffect } from 'react';
import Masonry from 'masonry-layout';
import axiosInstance from './AxiosConf/axiosconf';

//Componentes
import CardContainer from './components/cardContainerDashboard';
import Menu from './components/menuComponent';

function Dashboard() {
    const [allImg, setAllImg] = useState([]);
    const [base64Images, setBase64Images] = useState([]);
    const [hasFollowed, setHasFollowed] = useState(true);
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

    useEffect(() => {
        axiosInstance.get("http://localhost:3001/getufollowed")
            .then((response) => {
                if (response.data === "No imagen") {
                    alert("No hay imágenes");
                } else {
                    setAllImg(response.data);
                }
            })
            .catch((error) => {
                console.error("Error fetching images:", error);
            });
    }, []);

    useEffect(() => {
        if (allImg.length > 0 && Array.isArray(allImg[0]) && allImg[0].length === 0) {
            console.log("No hay datos en allImg[0]");
            setHasFollowed(false);
        }
    }, [allImg]);

    useEffect(() => {
        const convertImagesToBase64 = async () => {
            if (allImg.length > 0 && Array.isArray(allImg[0]) && allImg[0].length > 0) {
                const base64Promises = allImg[0].map((val) => {
                    const blob = new Blob([new Uint8Array(val.foto_publi.data)], { type: 'image/jpeg' });
                    const reader = new FileReader();
                    reader.readAsDataURL(blob);
                    return new Promise((resolve) => {
                        reader.onloadend = () => {
                            resolve(reader.result.split(',')[1]);
                        };
                    });
                });

                try {
                    const base64Strings = await Promise.all(base64Promises);
                    setBase64Images(base64Strings);
                } catch (error) {
                    console.error("Error converting images to base64:", error);
                }
            }
        };

        convertImagesToBase64();
    }, [allImg]);

    useEffect(() => {
        const initializeMasonry = () => {
            const grid = document.querySelector('.row-cols-md-3');
            if (grid) {
                const masonry = new Masonry(grid, {
                    itemSelector: '.col',
                    percentPosition: true
                });
                masonry.layout();
            }
        };

        initializeMasonry();
    }, [allImg]);

    return (
        <>
            <Menu perfil={perfil} /> 
            {hasFollowed ?
                (
                    <CardContainer data={
                        base64Images.map(
                            (base64String, index) => (
                                {
                                    imageUrl: base64String,
                                    title: allImg[0][index].titulo_publi,
                                    idPubli: allImg[0][index].id_publi
                                }
                            )
                        )
                    } />
                )
                :
                (
                    <div className="container d-flex justify-content-center align-items-center" style={{ minHeight: '100vh' }}>
                        <div className="text-center" style={{ fontSize: '2rem' }}>
                            Comienza a seguir tus artistas favoritos en "Explorar"
                        </div>
                    </div>
                )
            }
        </>
    );
}

export default Dashboard;
