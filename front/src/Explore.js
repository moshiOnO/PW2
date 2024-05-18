import 'bootstrap/dist/css/bootstrap.css';
//import styles from './paginaWeb/css/dashboard.module.css';
import React, { useState, useEffect } from 'react';
import Masonry from 'masonry-layout';
//import Axios from 'axios';
import axiosInstance from './AxiosConf/axiosconf';
//import { Link } from 'react-router-dom';

//Componentes
import CardContainer from './components/cardContainerDashboard';
import Menu from './components/menuComponent';
import {usePerfil} from './components/publicacionUtils';


function Explore() {


    const [allImg, setAllImg] = useState([]);
    const [base64Images, setBase64Images] = useState([]);

    const perfil = usePerfil(); 


    //Obtiene valores de las fotos y demás cosas de la base de datos
    useEffect(() => {
        axiosInstance.get("http://localhost:3001/getnewtoold")
            .then((response) => {
                if (response.data === "No imagen") {
                    alert("No hay imágenes");
                } else {
                    setAllImg(response.data);
                    //console.log(response.data);
                }
            })
            .catch((error) => {
                console.error("Error fetching images:", error);
            });
    }, []);
    //Conversion de los valores a un base64
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
                    //console.log(base64Strings); // Cambiado a log de base64Strings en lugar de base64Images
                } catch (error) {
                    console.error("Error converting images to base64:", error);
                }
            }
        };

        convertImagesToBase64(); // Llamamos a la función de conversión independientemente del tamaño de allImg

    }, [allImg]);
    //Masonry effect    
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

            {/* <!-- Menú del apartado superior --> */}
            {/* // Usando el componente del Menú */}
            <Menu perfil={perfil} /> 

            {/* Renderiza el contenedor de tarjetas con los datos */}
            <CardContainer data=
                {base64Images.map((base64String, index) =>
                (
                    {
                        imageUrl: base64String,
                        title: allImg[0][index].titulo_publi,
                        idPubli: allImg[0][index].id_publi
                    }
                ))
                }
            />



        </>



    );
}

export default Explore