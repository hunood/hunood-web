import axios from "axios";
import { config } from "config";

const refreshToken = async (error: any) => {
    try {
        if(error?.response?.status === 418){
            throw new Error('Aunteicação inválida, token não enviado.');
        }

        const sendAccessToken =  error.config.headers['Authorization'];
        const sendRefreshToken = error.config.headers['Refresh-Authorization'];
        axios.defaults.headers.common['Authorization'] = sendAccessToken;
        axios.defaults.headers.common['Refresh-Authorization'] = sendRefreshToken;
        
        const res = await axios.post(config.backendUrl + "authentication/refresh");
        
        const accessToken = res.headers['authorization'];
        const refreshToken = res.headers['refresh-authorization'];

        return Promise.resolve({ accessToken, refreshToken });
    } catch (_) {
        localStorage.removeItem('@Auth:token');
        localStorage.removeItem('@Auth:refresh');
        localStorage.removeItem('@Auth:auth');
        window.location.reload();
        return Promise.reject();
    }
};

export { refreshToken };