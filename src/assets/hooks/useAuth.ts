import { useState, useEffect } from 'react';
import { AuthenticateService, AuthenticateResponse, ForbidService } from 'services/authentication';
import Connector from 'services/_config-services/connector';

interface DataAuthentication extends AuthenticateResponse { }

const useAuth = () => {
    const [authenticated, setAuthenticated] = useState(!!localStorage.getItem('@Auth:token'));

    useEffect(() => {
        const token = localStorage.getItem('@Auth:token');

        if (token) {
            setAuthenticated(true);
        }
    }, []);

    const handleLogin = async (login: { username: string, password: string, remember: boolean }) => {
        try {
            const auth = await new AuthenticateService().execute({
                email: login.username,
                senha: login.password
            });

            if (auth) {
                localStorage.setItem('@Auth:token', auth.accessToken);
                localStorage.setItem('@Auth:refresh', auth.refreshToken);
                localStorage.setItem('@Auth:auth', JSON.stringify(auth));
            }

            setAuthenticated(true);
            
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
    }

    const handleLogout = async () => {
        try {
            new ForbidService().execute()
                .finally(() => {
                    setAuthenticated(false);
                    localStorage.removeItem('@Auth:token');
                    localStorage.removeItem('@Auth:refresh');
                    localStorage.removeItem('@Auth:auth');
                });

            return Promise.resolve(true);
        }
        catch (err) {
            return Promise.resolve(false);
        }

    }

    const auth = (() => {
        return JSON.parse(localStorage.getItem('@Auth:auth') || '{}') as DataAuthentication;
    })()

    return { authenticated, auth, handleLogin, handleLogout };
}

type Auth = ReturnType<typeof useAuth>

export default useAuth;
export type { Auth };
