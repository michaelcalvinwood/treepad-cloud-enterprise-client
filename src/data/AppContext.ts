import React from "react";

export interface WindowDimensions {
    height: number,
    width: number
}

const AppContext = React.createContext<{
    isLoggedIn: boolean,
    windowDimensions: WindowDimensions,
    menuPage: string,
    userName: string,

    setIsLoggedIn: (value: boolean) => void;
    setWindowDimensions: (windowDimensions: WindowDimensions) => void;
    setMenuPage: (val: string) => void;
    setUserName: (val: string) => void;
}>({
    isLoggedIn: false,
    windowDimensions: {height: 0, width: 0},
    menuPage: 'trees',
    userName: '',

    setIsLoggedIn: () => {},
    setWindowDimensions: () => {},
    setMenuPage: () => {},
    setUserName: () => {}
});

export default AppContext;