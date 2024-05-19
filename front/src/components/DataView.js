import React from 'react';
import Chart from 'chart.js/auto';

const DataView = ({ data, labels, title }) => {
    const chartContainer = React.useRef(null);
    const chartInstance = React.useRef(null);

    React.useEffect(() => {
        if (chartInstance.current) {
            chartInstance.current.destroy();
        }

        if (chartContainer.current && data.length > 0) {
            const ctx = chartContainer.current.getContext('2d');
            chartInstance.current = new Chart(ctx, {
                type: 'line',
                data: {
                    labels: labels,
                    datasets: [
                        {
                            label: title,
                            data: data,
                            borderWidth: 1,
                            backgroundColor: 'RGBA(0, 123, 255, 0.5)', // Color de los datos
                        },
                    ],
                },
                options: {
                    scales: {
                        y: {
                            beginAtZero: true,
                        },
                    },
                },
            });
        }
    }, [data, labels, title]);

    return <canvas ref={chartContainer}></canvas>;
};

export default DataView;
