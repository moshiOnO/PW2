import 'bootstrap/dist/css/bootstrap.css';
import styles from './paginaWeb/css/stats.module.css';
import React, { useRef, useEffect } from 'react';
import Chart from 'chart.js/auto'

import { Link } from 'react-router-dom';


function Stats() {
    const chartContainer = useRef(null);
    const chartInstance = useRef(null);

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
            <nav id={styles.menu} className="navbar navbar-expand-lg navbar-light">
                <a id={styles.companyname} className="navbar-brand" href="#">DEEZY</a>
                <ul id={styles.menuElements} className="navbar-nav">
                    <li className={`${styles["nav-item"]}`}>
                        <Link className={`${styles["nav-link"]} nav-link`} to="/dashboard">Inicio</Link>
                    </li>
                    <li className={`${styles["nav-item"]}`}>
                        <Link className={`${styles["nav-link"]} nav-link`} to="/dashboard">Explorar</Link>
                    </li>
                    <li className={`${styles["nav-item"]}`}>
                        <a className={`${styles["nav-link"]} nav-link`} href="editPubs.html">Crear</a>
                    </li>
                    <li className={`${styles["nav-item"]}`}>
                        <Link to="/perfil">
                            <img src="/resources/pfp/lovers.jpeg" alt="PFP" />
                        </Link>
                    </li>
                </ul>
            </nav>

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