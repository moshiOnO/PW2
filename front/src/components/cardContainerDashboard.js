import React from 'react';
import styles from '../paginaWeb/css/dashboard.module.css';
import Card from './cardDasboard' // Asegúrate de ajustar la ruta según tu estructura de archivos

function CardContainer({ data }) {
    return (
        <div className="container mt-4">
            <div className="row row-cols-1 row-cols-md-3" data-masonry='{"percentPosition": true }'>
                {data.map((item, index) => (
                    <div className="col" key={index}>                        
                        <Card imageUrl={item.imageUrl} title={item.title} />
                    </div>
                ))}
            </div>
        </div>
    );
}

export default CardContainer;