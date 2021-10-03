import { useState, useEffect } from 'react';
import { BehaviorSubject } from 'rxjs';
import { AuthenticateService, AuthenticateResponse, ForbidService } from 'services/authentication';
import { Usuario } from 'services/authentication/AuthenticateService/interfaces/response';
import Connector from 'services/_config-services/connector';

interface DataAuthentication extends AuthenticateResponse {
    accessToken: string,
    refreshToken: string
}

const useAuth = () => {
    const initialAuth: DataAuthentication = {
        accessToken: '',
        refreshToken: '',
        id: '',
        email: '',
        emailValido: false,
        etapaOnboarding: 0,
        empresas: [],
        usuario: {} as Usuario,
    };

    const [authenticated, setAuthenticated] = useState<boolean>(localStorage.hasItem('@Auth:token'));
    const [auth, setAuth] = useState<DataAuthentication>(initialAuth);
    const observableAuth = new BehaviorSubject<DataAuthentication>(auth).asObservable();

    const getAuth = () => {
        const auth_ = JSON.parse(localStorage.getItem('@Auth:auth') || '{}') as DataAuthentication;
        auth_.accessToken = localStorage.getItem('@Auth:token') || '';
        auth_.refreshToken = localStorage.getItem('@Auth:refresh') || '';
        return auth_;
    };

    useEffect(() => {
        const subscription = observableAuth.subscribe(setAuth);

        if (Boolean(auth.accessToken) !== authenticated) {
            setAuthenticated(Boolean(auth.accessToken));
        }

        return () => {
            subscription.unsubscribe();
        };
    }, [observableAuth, authenticated, auth.accessToken]);

    useEffect(() => {
        const auth_ = getAuth();
        setAuth(getAuth());
        
        if (auth_.accessToken) {
            setAuthenticated(true);
        }
    }, []);

    const handleLogin = async (login: { username: string, password: string, remember: boolean }) => {
        try {
            const auth = await new AuthenticateService().execute({
                email: login.username,
                senha: login.password
            }) as DataAuthentication;

            if (auth) {
                localStorage.setItem('@Auth:token', auth.accessToken);
                localStorage.setItem('@Auth:refresh', auth.refreshToken);
                localStorage.setItem('@Auth:auth', JSON.stringify(auth));
                setAuth(auth);
            }

            Connector
                .getInstance()
                .axios.defaults.headers.common = {
                'Authorization': auth.accessToken,
                'Refresh-Authorization': auth.refreshToken
            };

            return Promise.resolve(auth);
        }
        catch (err) {
            return Promise.resolve(err as { message: string, error: boolean });
        }
    };

    const handleLogout = async () => {
        try {
            const cleanAuthStorage = () => {
                localStorage.removeItem('@Auth:token');
                localStorage.removeItem('@Auth:refresh');
                localStorage.removeItem('@Auth:auth');
                setAuth(initialAuth);
            };

            await new ForbidService().execute().finally(cleanAuthStorage);
            return Promise.resolve(true);
        }
        catch (err) {
            return Promise.resolve(false);
        }

    };

    const updateAuth = ({ ...data }: Partial<DataAuthentication>) => {
        const auth = JSON.parse(localStorage.getItem('@Auth:auth') || '{}') as DataAuthentication;
        const newAuth = Object.assign(auth, data);
        localStorage.setItem('@Auth:auth', JSON.stringify(newAuth));
        setAuth(getAuth());
    };

    return { authenticated, auth, handleLogin, handleLogout, updateAuth };
}

type Auth = ReturnType<typeof useAuth>

export default useAuth;
export type { Auth };
