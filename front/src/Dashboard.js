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
    //Valores para verificar si el usuario sigue a alguien      
    const idusuario = 6; //6:non, 2:sis
    const [hasFollowed, setHasFollowed] = useState(true);

    //Obtiene valores de las fotos y demás cosas de la base de datos
    useEffect(() => {
        Axios.get(`http://localhost:3001/getufollowed?id_usuario=${idusuario}`)
            .then((response) => {
                if (response.data === "No imagen") {
                    alert("No hay imágenes");
                    //console.log("no hay datos aksdjksdjkasdj xD");
                } else {
                    setAllImg(response.data);
                    //console.log(response.data);
                }
            })
            .catch((error) => {
                console.error("Error fetching images:", error);
            });
    }, []);
    //Verificar si el procedure devolvió datos
    useEffect(() => {
        // Verificar si allImg[0] está vacío o no tiene datos
        if (allImg.length > 0 && Array.isArray(allImg[0]) && allImg[0].length === 0) {
            console.log("No hay datos en allImg[0]");
            setHasFollowed(false);
        }
    }, [allImg]);
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
                    console.log(base64Strings); // Cambiado a log de base64Strings en lugar de base64Images
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

            {/* Renderiza el contenedor de tarjetas con los datos */}
            {hasFollowed ?
                (
                    <CardContainer data={
                        base64Images.map(
                            (base64String, index) => (
                                {
                                    imageUrl: base64String,
                                    title: allImg[0][index].titulo_publi
                                }
                            )
                        )
                    } />
                )
                :
                (
                    // Puedes agregar un else aquí si deseas renderizar algo diferente cuando la variableVerdadera sea falsa
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

export default Dashboard