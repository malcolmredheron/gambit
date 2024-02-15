import cookie from "cookiejs";
import { JWT_CONFIG } from "../config/constants";

export const setToken = (token: string) => {
    cookie.set(JWT_CONFIG.TOKEN_STORAGE_KEY, token);
}

export const getToken = () => {
    return cookie.get(JWT_CONFIG.TOKEN_STORAGE_KEY);
}

export const removeToken = () => {
    return cookie.remove(JWT_CONFIG.TOKEN_STORAGE_KEY);
}
