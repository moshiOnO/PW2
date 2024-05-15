// axiosconf.js
import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: 'http://localhost:3001',
    withCredentials: true // importante para las cookies de sesión
});

export default axiosInstance;

