import { useState, useEffect } from 'react';
import { AuthenticateService, AuthenticateResponse } from 'services/authentication';

interface DataAuthentication extends AuthenticateResponse { }

const useAuth = () => {
    const [authenticated, setAuthenticated] = useState(false);
    const [loading, setLoading] = useState(true);
    const [auth, setAuth] = useState({} as DataAuthentication);

    useEffect(() => {
        const token = localStorage.getItem('@Auth:token');

        if (token) {
            setAuthenticated(true);
        }

        setLoading(false);
    }, []);

    const handleLogin = async (login: { username: string, password: string, remember: boolean }) => {
        try {
            const auth = await new AuthenticateService().execute({
                email: login.username,
                senha: login.password
            });

            setAuth(auth);
            setAuthenticated(true);

            if (auth?.accessToken) {
                localStorage.setItem('@Auth:token', auth.accessToken.split('Bearer')[1].trim());
            }

            return Promise.resolve(true);
        }
        catch (err) {
            return Promise.resolve(false);
        }
    }

    const handleLogout = () => {
        localStorage.removeItem('@Auth:token');
        setAuth({} as DataAuthentication);
        setAuthenticated(false);
    }

    return { authenticated, loading, auth, handleLogin, handleLogout };
}

type Auth = ReturnType<typeof useAuth>

export default useAuth;
export type { Auth };