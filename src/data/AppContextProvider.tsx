import React, { useState } from "react";
import AppContext from "./AppContext";
import { Storage } from '@capacitor/storage';

let staticVal: boolean = false;

const AppContextProvider: React.FC = props => {
    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

    const initContext = async () => {
        if (staticVal) return;
        staticVal = true;

        setIsLoggedIn(false);
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


                setIsLoggedIn
            }}>
            {props.children}
        </AppContext.Provider>
    )
}

export default AppContextProvider;