import axios from 'axios';
import mainConfig from "../mainConfig";

const http = axios.create({
    'baseURL': mainConfig.apiURL
})

http.interceptors.request.use(async (config)=>{
    const token = localStorage.getItem('token');
    config.headers['Content-Type'] = 'application/json; charset=utf-8';
    if(token){
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export default http;