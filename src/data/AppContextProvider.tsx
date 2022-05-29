import React, { useEffect, useState } from "react";
import AppContext, { WindowDimensions, DesktopSections, Modals, TreeInfo } from "./AppContext";
import { Storage } from '@capacitor/storage';

let staticVal: boolean = false;

const AppContextProvider: React.FC = props => {
    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
    const [windowDimensions, setWindowDimensions] = useState<WindowDimensions>({height: window.innerHeight, width: window.innerWidth});
    const [menuPage, setMenuPage] = useState<string>('trees');
    const [desktopSections, setDesktopSections] = useState<DesktopSections>({
        controls: true,
        trees: true,
        branches: true,
        leaves: false
    })
    const [userName, setUserName] = useState<string>('');
    const [userId, setUserId] = useState<number>(-1);
    const [email, setEmail] = useState<string>('');
    const [server, setServer] = useState<string>('');
    const [token, setToken] = useState<string>('');
    const [modals, setModals]= useState<Modals>({
        addTree: false
    })
    const [treeInfo, setTreeInfo] = useState<TreeInfo[]>([]);
    const [curTree, setCurTree] = useState<string>('');
    const [toast, setToast] = useState<string>('');

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
        setDesktopSections({
            controls: true,
            trees: true,
            branches: true,
            leaves: false
        })
        // const authorizationData = await Storage.get({key: 'authorization'});
        // const authorizationInfo = authorizationData.value && authorizationData.value.length ?
        //     JSON.parse(authorizationData.value) :
        //     null;

       
    };

    useEffect(() => {
        if (treeInfo.length && !curTree) setCurTree(treeInfo[0].tree_id);
    },[treeInfo]);

    initContext();
    return(
        <AppContext.Provider
            value = {{
                isLoggedIn,
                windowDimensions,
                menuPage,
                desktopSections,
                userName,
                userId,
                email,
                server,
                token,
                modals,
                treeInfo,
                curTree,
                toast,

                setIsLoggedIn,
                setWindowDimensions,
                setMenuPage,
                setDesktopSections,
                setUserName,
                setUserId,
                setEmail,
                setServer,
                setToken,
                setModals,
                setTreeInfo,
                setCurTree,
                setToast,
            }}>
            {props.children}
        </AppContext.Provider>
    )
}

export default AppContextProvider;