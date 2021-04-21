import axios from "axios";
import { config } from "config";
import { Modal as AppModal } from "assets/utils/modal";
import { Modal } from 'antd';
import { t } from "i18n";

const refreshToken = async (error: any) => {
    try {
        if (error?.response?.status === 418) {
            throw new Error(t('messages:autenticacao-invalida-nao-enviada'));
        }
        
        const sendAccessToken = error.config.headers['Authorization'];
        const sendRefreshToken = error.config.headers['Refresh-Authorization'];
        axios.defaults.headers.common['Authorization'] = sendAccessToken;
        axios.defaults.headers.common['Refresh-Authorization'] = sendRefreshToken;
        
        const res = await axios.post(config.backendUrl + "authentication/refresh");
        
        const accessToken = res.headers['authorization'];
        const refreshToken = res.headers['refresh-authorization'];
        
        return Promise.resolve({ accessToken, refreshToken });
    } catch (_) {
        Modal.destroyAll();
        const secondsModalTimout = 30;
        
        const finishSession = () => {
            localStorage.removeItem('@Auth:token');
            localStorage.removeItem('@Auth:refresh');
            localStorage.removeItem('@Auth:auth');
            window.location.reload();
        }
        
        setTimeout(() => {
            finishSession()
        }, secondsModalTimout * 1000);

        AppModal.openTimerModal(
            'error',
            t('messages:sessao-expirada'),
            t('messages:sera-deslogado'),
            secondsModalTimout,
            finishSession,
            false
        );

        return Promise.reject();
    }
};

export { refreshToken };