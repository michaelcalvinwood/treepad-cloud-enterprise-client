import React from "react";

export interface WindowDimensions {
    height: number,
    width: number
}

const AppContext = React.createContext<{
    isLoggedIn: boolean,
    windowDimensions: WindowDimensions,
    setIsLoggedIn: (value: boolean) => void;
    setWindowDimensions: (windowDimensions: WindowDimensions) => void;
}>({
    isLoggedIn: false,
    windowDimensions: {height: 0, width: 0},

    setIsLoggedIn: () => {},
    setWindowDimensions: () => {}
});

export default AppContext;