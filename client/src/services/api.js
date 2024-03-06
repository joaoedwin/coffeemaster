import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:3001/',
});

// Adiciona um interceptador de requisição
api.interceptors.request.use(config => {
    const token = sessionStorage.getItem('token');
    config.headers.Authorization = token ? `Bearer ${token}` : '';
    return config;
});

export default api;