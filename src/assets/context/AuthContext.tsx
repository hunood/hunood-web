import React, { createContext, FC } from 'react';
import useAuth, { Auth } from '../hooks/useAuth';

const AuthContext = createContext({} as Auth);

const AuthProvider: FC = ({ children }) => {
    const { ...auth } = useAuth();
    
    return (
        <AuthContext.Provider value={auth}>
            {children}
        </AuthContext.Provider>
    )
}

export { AuthContext, AuthProvider };
