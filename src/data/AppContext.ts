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

const AppContext = React.createContext<{
    isLoggedIn: boolean,
    windowDimensions: WindowDimensions,
    menuPage: string,
    userName: string,
    desktopSections: DesktopSections,

    setIsLoggedIn: (value: boolean) => void;
    setWindowDimensions: (windowDimensions: WindowDimensions) => void;
    setMenuPage: (val: string) => void;
    setUserName: (val: string) => void;
    setDesktopSections: (cb: (val: DesktopSections) => DesktopSections) => void;
}>({
    isLoggedIn: false,
    windowDimensions: {height: 0, width: 0},
    menuPage: 'trees',
    userName: '',
    desktopSections: { 
        controls: true,
        trees: true,
        branches: true,
        leaves: false
    },

    setIsLoggedIn: () => {},
    setWindowDimensions: () => {},
    setMenuPage: () => {},
    setUserName: () => {},
    setDesktopSections: () => {}
});

export default AppContext;