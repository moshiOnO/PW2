import 'bootstrap/dist/css/bootstrap.css';
import styles from './paginaWeb/css/stats.module.css';
import React, { useEffect, useState } from 'react';
import axiosInstance from './AxiosConf/axiosconf';
import { useNavigate } from 'react-router-dom';

//Componentes
import Menu from './components/menuComponent';
import DataView from './components/DataView';
import {usePerfil} from './components/publicacionUtils';


function Stats({ option }) {
    const navigate = useNavigate();
    const perfil = usePerfil(); 
    const [publicacionesLikes, setPublicacionesLikes] = useState([]);
    const [interaccionesSemanales, setInteraccionesSemanales] = useState([]);
    const [seguidoresMensuales, setSeguidoresMensuales] = useState([]);   

    useEffect(() => {
        axiosInstance.get('/stats/publicacionesLikes')
            .then(response => {
                setPublicacionesLikes(response.data);
                console.log(response.data);
            })
            .catch(error => {
                console.error('Error al obtener estadísticas de publicaciones/likes:', error);
            });

        axiosInstance.get('/stats/interaccionesSemanales')
            .then(response => {
                setInteraccionesSemanales(response.data);
            })
            .catch(error => {
                console.error('Error al obtener estadísticas de interacciones semanales:', error);
            });

        axiosInstance.get('/stats/seguidoresMensuales')
            .then(response => {
                setSeguidoresMensuales(response.data);
            })
            .catch(error => {
                console.error('Error al obtener estadísticas de seguidores mensuales:', error);
            });
    }, []);

    const renderDataView = () => {
        const labels = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'];
        if (option === 'publicacionesLikes') {
            const likesData = labels.map(dia => {
                const stat = publicacionesLikes.find(stat => stat.dia === dia);
                return stat ? stat.likes : 0;
            });
            return <DataView data={likesData} labels={labels} title="Likes" />;
        } else if (option === 'interaccionesSemanales') {
            const semanas = interaccionesSemanales.map(stat => stat.semana);
            const comentariosData = interaccionesSemanales.map(stat => stat.comentarios);
            const likesData = interaccionesSemanales.map(stat => stat.likes);
            return (
                <>
                {console.log(comentariosData)}
                    <DataView data={comentariosData} labels={semanas} title="Comentarios por Semana" />
                    <DataView data={likesData} labels={semanas} title="Likes por Semana" />
                </>
            );
        } else if (option === 'seguidoresMensuales') {
            const months = seguidoresMensuales.map(stat => stat.mes);
            const seguidoresData = seguidoresMensuales.map(stat => stat.seguidores);
            return <DataView data={seguidoresData} labels={months} title="Seguidores" />;
        }
        return null;
    };

    return (
        <>
             
             <Menu perfil={perfil} />
            <div className="container">
                <h2>Estadísticas</h2>
                <div className={styles.buttonGroup}>
                <button type="button" className={`btn btn-primary ${styles.buttonPrimary}`} onClick={() => navigate('/stats/publicacionesLikes')}>
                        Publicaciones/Likes
                    </button>
                    <button type="button" className={`btn btn-secondary ${styles.buttonSecondary}`} onClick={() => navigate('/stats/interaccionesSemanales')}>
                        Interacciones Semanales
                    </button>
                    <button type="button" className={`btn btn-success ${styles.buttonSuccess}`} onClick={() => navigate('/stats/seguidoresMensuales')}>
                        Seguidores Mensuales
                    </button>
                </div>
                <div className={styles.chartContainer}>
                    {renderDataView()}
                </div>
            </div>
             
        </>
    );
}

export default Stats;

