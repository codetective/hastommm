import axios from 'axios';
import baseURL from '../helpers/config';


// const token = localStorage.getItem("token");

export const http = axios.create({
    baseURL: baseURL,
    timeout: 100000,
    withCredentials: true,
    headers: {
        'Accept': 'application/json',
        // 'Authorization': `Bearer ${token}`,
        'Access-Control-Allow-Origin': '*',
    }
})

http.interceptors.request.use(function(config) {
    const token = localStorage.getItem('token');
    config.headers.Authorization = token ? `Bearer ${token}` : '';
    return config;
});