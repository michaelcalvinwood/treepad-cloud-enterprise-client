import React, { useState } from "react";
import AppContext, { WindowDimensions } from "./AppContext";
import { Storage } from '@capacitor/storage';

let staticVal: boolean = false;

const AppContextProvider: React.FC = props => {
    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
    const [windowDimensions, setWindowDimensions] = useState<WindowDimensions>({height: window.innerHeight, width: window.innerWidth});
    const [menuPage, setMenuPage] = useState<string>('trees');
    const [userName, setUserName] = useState<string>('');

    const windowResize = () => {
        console.log(window.innerWidth, window.innerHeight);
        setWindowDimensions(prev => {
            prev = { height: window.innerHeight, width: window.innerWidth};
            return {...prev};
        })
      };
    
    const initContext = async () => {
        if (staticVal) return;
        staticVal = true;

        windowResize();
        window.addEventListener('resize', windowResize);
        console.log(windowDimensions);
        setIsLoggedIn(false);
        setMenuPage('trees');
        // const authorizationData = await Storage.get({key: 'authorization'});
        // const authorizationInfo = authorizationData.value && authorizationData.value.length ?
        //     JSON.parse(authorizationData.value) :
        //     null;

       
    };

    initContext();
    return(
        <AppContext.Provider
            value = {{
                isLoggedIn,
                windowDimensions,
                menuPage,
                userName,

                setIsLoggedIn,
                setWindowDimensions,
                setMenuPage,
                setUserName
            }}>
            {props.children}
        </AppContext.Provider>
    )
}

export default AppContextProvider;