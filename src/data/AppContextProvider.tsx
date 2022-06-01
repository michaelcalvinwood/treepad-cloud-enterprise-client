import React, { useEffect, useState } from "react";
import AppContext, { WindowDimensions, DesktopSections, Modals, TreeInfo, initModals } from "./AppContext";
import { Storage } from '@capacitor/storage';
import * as socketSubribe from '../utils/resourceSubscription';

interface ServerToClientEvents {
    noArg: () => void;
    basicEmit: (a: number, b: string, c: Buffer) => void;
    withAck: (d: string, callback: (e: number) => void) => void;
  }
  
  interface ClientToServerEvents {
    hello: () => void;
  }
  
  interface InterServerEvents {
    ping: () => void;
  }
  
  interface SocketData {
    name: string;
    age: number;
  }

let staticVal: boolean = false;

const AppContextProvider: React.FC = props => {
    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
    const [windowDimensions, setWindowDimensions] = useState<WindowDimensions>({height: window.innerHeight, width: window.innerWidth});
    const [menuPage, setMenuPage] = useState<string>('trees');
    const [desktopSections, setDesktopSections] = useState<DesktopSections>({
        controls: false,
        trees: true,
        branches: true,
        leaves: false
    })
    const [userName, setUserName] = useState<string>('');
    const [userId, setUserId] = useState<number>(-1);
    const [email, setEmail] = useState<string>('');
    const [server, setServer] = useState<string>('');
    const [token, setToken] = useState<string>('');
    const [treeInfo, setTreeInfo] = useState<TreeInfo[]>([]);
    const [curTree, setCurTree] = useState<string>('');
    const [curBranch, setCurBranch] = useState<string>('');
    const [branchOrder, setBranchOrder] = useState<string>('');
    const [toast, setToast] = useState<string>('');
    const [modals, setModals] = useState<Modals>(initModals);
    const [resourceSocket, setResourceSocket] = useState<any>(null);
    const [resourceId, setResourceId] = useState<string>('');
    
    const windowResize = () => {
        console.log(window.innerWidth, window.innerHeight);
        setWindowDimensions(prev => {
            prev = { height: window.innerHeight, width: window.innerWidth};
            return {...prev};
        })
      };

    const subscribeToTree = (treeId: string) => {
        const info = {
            newResourceId: treeId,
            server,
            resourceId,
            setResourceId,
            resourceSocket,
            setResourceSocket,
            token,
            setToast,
            setBranchOrder,
            setCurBranch
        }

        socketSubribe.subscribeToResource(info);        
        setCurTree(treeId);
    }
    
    const initContext = async () => {
        if (staticVal) return;
        staticVal = true;

        console.log('init context');
        windowResize();
        window.addEventListener('resize', windowResize);
        console.log(windowDimensions);
        setIsLoggedIn(false);
        setMenuPage('trees');
        setDesktopSections({
            controls: false,
            trees: true,
            branches: true,
            leaves: false
        })
        setCurTree('');
        // const authorizationData = await Storage.get({key: 'authorization'});
        // const authorizationInfo = authorizationData.value && authorizationData.value.length ?
        //     JSON.parse(authorizationData.value) :
        //     null;

       
    };

    useEffect(() => {
        if (treeInfo.length && !curTree) subscribeToTree(treeInfo[0].tree_id);
    },[treeInfo]);

    useEffect(() => {
        console.log('desktopSectionsHasChanged', desktopSections)
    }, [desktopSections]);

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
                treeInfo,
                curTree,
                toast,
                modals,

                setIsLoggedIn,
                setWindowDimensions,
                setMenuPage,
                setDesktopSections,
                setUserName,
                setUserId,
                setEmail,
                setServer,
                setToken,
                setTreeInfo,
                subscribeToTree,
                setToast,
                setModals
            }}>
            {props.children}
        </AppContext.Provider>
    )
}

export default AppContextProvider;