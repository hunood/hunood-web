import * as React from 'react';
import { BehaviorSubject } from 'rxjs';

const { useState, useEffect } = React;

function useMenuDashboard() {
    const collapsedMenu = Boolean(JSON.parse(localStorage.getItem('@CollapsedMenu') || String(window.innerWidth < 500)));
    
    const [isMenuOpened, setIsMenuOpened] = useState<boolean>(collapsedMenu);
    const observableOpenedMenu = new BehaviorSubject<boolean>(isMenuOpened).asObservable();

    const toggleMenuDashboard = () => {
        localStorage.setItem('@CollapsedMenu', String(!collapsedMenu));
        setIsMenuOpened(!collapsedMenu);    
    };
    
    useEffect(() => {
        const subscription = observableOpenedMenu.subscribe(setIsMenuOpened);
        return () => {
            subscription.unsubscribe();
        };
    }, [observableOpenedMenu]);

    return { isMenuOpened, toggleMenuDashboard };
}


type MenuDashboard = ReturnType<typeof useMenuDashboard>

export default useMenuDashboard;
export type { MenuDashboard };