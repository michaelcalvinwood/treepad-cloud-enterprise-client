import React from "react";

const AppContext = React.createContext<{
    isLoggedIn: boolean,

    setIsLoggedIn: (value: boolean) => void;
}>({
    isLoggedIn: false,

    setIsLoggedIn: () => {}
});

export default AppContext;