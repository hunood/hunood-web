import { createContext, FC } from 'react';
import useMenuDashboard, { MenuDashboard } from '../../hooks/useMenuDashboard';

const GlobalContext = createContext({} as MenuDashboard);

const GlobalProvider: FC = ({ children }) => {
    const { ...menu } = useMenuDashboard();

    return (
        <GlobalContext.Provider value={menu}>
            {children}
        </GlobalContext.Provider>
    )
}

export { GlobalContext, GlobalProvider };
