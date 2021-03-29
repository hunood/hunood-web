import { useState, useEffect } from 'react';
import { AuthenticateService, AuthenticateResponse, ForbidService } from 'services/authentication';
import Connector from 'services/_config-services/connector';

interface DataAuthentication extends AuthenticateResponse { }

const useAuth = () => {
    const [authenticated, setAuthenticated] = useState(false);
    const [loading, setLoading] = useState(true);
    const [auth, setAuth] = useState({} as DataAuthentication);

    useEffect(() => {
        const token = localStorage.getItem('@Auth:token');
        const auth = localStorage.getItem('@Auth:auth');

        if (token) {
            setAuthenticated(true);
            setAuth(JSON.parse(auth || '{}'));
        }

        setLoading(false);
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
            setAuth(auth);

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
                    setAuth({} as DataAuthentication);
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

    return { authenticated, loading, auth, handleLogin, handleLogout };
}

type Auth = ReturnType<typeof useAuth>

export default useAuth;
export type { Auth };
