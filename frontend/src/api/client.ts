import axios from 'axios';
import { API_URL, JWT_CONFIG } from '../config/constants';
import { getToken } from '../utils/jwt';

const client = axios.create({
    baseURL: API_URL
});

client.interceptors.request.use(
    config => {
        const token = getToken();
        if (token)
            config.headers[JWT_CONFIG.TOKEN_HEADER_KEY] = `${JWT_CONFIG.TOKEN_PREFIX} ${token}`;
        return config;
    },
    error => Promise.reject(error)
);

export default client;