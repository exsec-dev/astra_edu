import axios from "axios";

const AxiosInstance = axios.create({
    baseURL: 'https://exsec-projects.store',
    headers: {
        'Content-Type': 'application/json',
    }
});
  
AxiosInstance.interceptors.request.use(config =>
    {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    }, error =>
    {
        return Promise.reject(error);
    }
);
  
export default AxiosInstance;