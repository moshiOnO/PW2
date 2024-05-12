import 'bootstrap/dist/css/bootstrap.css';
import styles from './paginaWeb/css/dashboard.module.css';
import React, { useState, useEffect } from 'react';
import Masonry from 'masonry-layout';
import Axios from 'axios';
import { Link } from 'react-router-dom';

//Componentes
import CardContainer from './components/cardContainerDashboard';


function Dashboard() {


    const [allImg, setAllImg] = useState([]);
    const [base64Images, setBase64Images] = useState([]);
    const [Titlepubs, setTitlespubs] = useState([]);
    const cardDatadummy = [
        { imageUrl: "./resources/pubs/Gwen uwu.png", title: "Gwen uwu" },
        { imageUrl: "./resources/pubs/1083226.jpg", title: "Just gettin' fun" },
        { imageUrl: "./resources/pubs/yeh.jpg", title: "yeh" },
        { imageUrl: "./resources/pubs/hijodeturepuchamadre.png", title: "staaaaar" },
        { imageUrl: "./resources/pubs/StarRail_Image_1693122087.png", title: "march coquette" },
        { imageUrl: "./resources/pubs/1135214.jpg", title: "my beauty HU TAOOOOOO" },
        // Agrega más datos según sea necesario
    ];        

    //Obtiene valores de las fotos
    useEffect(() => {
        Axios.get("http://localhost:3001/getAllImg")
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
            const base64Promises = allImg.map((val) => {
                const blob = new Blob([new Uint8Array(val.foto_usuario.data)], { type: 'image/jpeg' });
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
        };

        if (allImg.length > 0) {
            convertImagesToBase64();
        }
    }, [allImg]);
    //Valores de getallimgs    
    const imageData = base64Images.map((data) => ({        
        image: data.base64String,
        title: data.nickname_usuario // O cualquier otra propiedad del usuario que desees mostrar como título
    }));
    


    //Masonry Effect    
    useEffect(() => {
        // Selecciona el contenedor de Masonry y crea una nueva instancia de Masonry
        const grid = document.querySelector('.row-cols-md-3');
        const masonry = new Masonry(grid, {
            itemSelector: '.col',
            percentPosition: true
        });

        // Actualiza Masonry después de que las imágenes se hayan cargado completamente
        masonry.layout();
    }, []); // El segundo argumento de useEffect es un arreglo de dependencias vacío para que se ejecute solo una vezconsole.log(styles);




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


            <CardContainer data={cardDatadummy} />
           

        </>



    );
}

export default Dashboard