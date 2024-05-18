import 'bootstrap/dist/css/bootstrap.css';
import styles from './paginaWeb/css/stats.module.css';
import React, { useRef, useEffect , useState} from 'react';
import Chart from 'chart.js/auto'
import axiosInstance from './AxiosConf/axiosconf';

import { Link } from 'react-router-dom';

//Componentes
import Menu from './components/menuComponent';


function Stats() {    
    const chartContainer = useRef(null);
    const chartInstance = useRef(null);

    //Variables para el menú
    const [perfil, setPerfil] = useState({ nombre: '', foto: '' });
    //Obtiene los datos para el menu
    useEffect(() => {
        axiosInstance.get('/perfilMenu')
            .then(response => {
                //console.log(response.data.foto);                
                setPerfil({ nombre: response.data.nombre, foto: response.data.foto, ID: response.data.id });
            })
            .catch(error => {
                console.error("Error al obtener la información del perfil:", error);
            });
    }, []);

    //Chart
    useEffect(() => {
        if (chartInstance.current) {
            chartInstance.current.destroy();
        }

        if (chartContainer.current) {
            const ctx = chartContainer.current.getContext('2d');
            chartInstance.current = new Chart(ctx, {
                type: 'line',
                data: {
                    labels: ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'],
                    datasets: [{
                        label: 'Visualizaciones',
                        data: [12, 19, 3, 5, 2, 3, 4],
                        borderWidth: 1,
                        backgroundColor: "RGBA(0,0,0,0.5)" // Negro menos 
                    },
                    {
                        label: 'Interacciones',
                        data: [5, 15, 7, 10, 2, 8, 6],
                        borderWidth: 1,
                        backgroundColor: "RGBA(0,255,0,0.5)" // Verde menos 
                    },
                    {
                        label: 'Me gusta',
                        data: [6, 12, 5, 7, 3, 4, 9],
                        borderWidth: 1,
                        backgroundColor: "RGBA(255,0,0,0.5)" // Rojo menos 
                    }]
                },
                options: {
                    scales: {
                        y: {
                            beginAtZero: true
                        }
                    }
                }
            });
        }
    }, []);

    return (
        <>
            {/* <!-- Menú del apartado superior --> */}
            <Menu perfil={perfil} /> 

            <br />
            <br />

            <div className="container">
                <h2>Gráficos semanales de publicaciones</h2>
                <br />
                <div id="chartcontainer" className={styles.chartcontainer}>
                    <canvas id="myChart" ref={chartContainer}></canvas>
                </div>
            </div>
        </>
    );
}

export default Stats;