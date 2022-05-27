import React from "react";

export interface WindowDimensions {
    height: number,
    width: number
}

export interface DesktopSections {
    controls: boolean,
    trees: boolean,
    branches: boolean,
    leaves: boolean
}

export interface Modals {
    addTree: boolean
}

const AppContext = React.createContext<{
    isLoggedIn: boolean,
    windowDimensions: WindowDimensions,
    menuPage: string,
    desktopSections: DesktopSections,
    userName: string,
    userId: number,
    email: string,
    server: string,
    token: string,
    modals: Modals,
    
    setIsLoggedIn: (value: boolean) => void,
    setWindowDimensions: (windowDimensions: WindowDimensions) => void,
    setMenuPage: (val: string) => void,
    setDesktopSections: (cb: (val: DesktopSections) => DesktopSections) => void,
    setUserName: (val: string) => void;
    setUserId: (val: number) => void;
    setEmail: (val: string) => void;
    setServer: (val: string) => void;
    setToken: (val: string) => void;
    setModals: (cb: (val: Modals) => Modals) => void;
}>({
    isLoggedIn: false,
    windowDimensions: {height: 0, width: 0},
    menuPage: 'trees',
    desktopSections: { 
        controls: true,
        trees: true,
        branches: true,
        leaves: false
    },
    userName: '',
    userId: -1,
    email: '',
    server: '',
    token: '',
    modals: {
        addTree: false
    },

    setIsLoggedIn: () => {},
    setWindowDimensions: () => {},
    setMenuPage: () => {},
    setDesktopSections: () => {},
    setUserName: () => {},
    setUserId: () => {},
    setEmail: () => {},
    setServer: () => {},
    setToken: () => {},
    setModals: () => {}

});

export default AppContext;