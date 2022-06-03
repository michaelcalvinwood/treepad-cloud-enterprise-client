import React, { useEffect, useState } from "react";
import AppContext, {initModals} from "./AppContext";
import { Storage } from '@capacitor/storage';
import * as socketIo from '../utils/api-socket-io';
import * as appInterface from "./AppInterfaces";

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
    const [branch, setBranch] = useState<string>('');
    const [branches, setBranches] = useState<appInterface.Branch[]>([]);
    const [desktopSections, setDesktopSections] = useState<appInterface.DesktopSections>({
        controls: false,
        trees: true,
        branches: true,
        leaves: false
    })
    const [email, setEmail] = useState<string>('');
    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
    const [menuPage, setMenuPage] = useState<string>('trees');
    const [server, setServer] = useState<string>('');
    const [token, setToken] = useState<string>('');
    const [trees, setTrees] = useState<appInterface.Tree[]>([]);
    const [tree, setTree] = useState<appInterface.Tree | null>(null);
    const [toast, setToast] = useState<string>('');
    const [modals, setModals] = useState<appInterface.Modals>(initModals);
    const [resourceSocket, setResourceSocket] = useState<any>(null);
    const [resourceId, setResourceId] = useState<string>('');
    const [userId, setUserId] = useState<number>(-1);
    const [userName, setUserName] = useState<string>('');
    const [windowDimensions, setWindowDimensions] = useState<appInterface.WindowDimensions>({height: window.innerHeight, width: window.innerWidth});
    
    const windowResize = () => {
        // console.log(window.innerWidth, window.innerHeight);
        setWindowDimensions(prev => {
            prev = { height: window.innerHeight, width: window.innerWidth};
            return {...prev};
        })
      };

    const subscribeToTree = (subTree: appInterface.Tree) => {
        console.log('subscribeToTree', subTree);
        const info = {
            newResourceId: subTree.treeId,
            server,
            resourceId,
            resourceSocket,
            token,
            branch,
            setResourceId,
            setResourceSocket,
            setToast,
            setBranches,
            setBranch
        }

        socketIo.subscribeToResource(info);     
        setTree(subTree);
    }
    
    const initContext = async () => {
        if (staticVal) return;
        staticVal = true;

        windowResize();
        window.addEventListener('resize', windowResize);
        setIsLoggedIn(false);
        setMenuPage('trees');
        setDesktopSections({
            controls: false,
            trees: true,
            branches: true,
            leaves: false
        })
        setTree(null);
        setBranch('');
        // const authorizationData = await Storage.get({key: 'authorization'});
        // const authorizationInfo = authorizationData.value && authorizationData.value.length ?
        //     JSON.parse(authorizationData.value) :
        //     null;

       
    };

    useEffect(() => {
        if (trees.length && !tree) subscribeToTree(trees[0]);
    },[trees]);

    useEffect(() => {
        
    }, [desktopSections]);

    initContext();
    return(
        <AppContext.Provider
            value = {{
                branch,
                branches,
                desktopSections,
                email,
                isLoggedIn,
                menuPage,
                modals,
                resourceSocket,
                server,
                toast,
                token,
                tree,
                trees,
                userName,
                userId,
                windowDimensions,
                
                setBranch,
                setBranches,
                setDesktopSections,
                setEmail,
                setIsLoggedIn,
                setMenuPage,
                setModals,
                setResourceSocket,
                setServer,
                setToast,
                setToken,
                setTrees,
                setUserId,
                setUserName,
                setWindowDimensions,
                subscribeToTree,
                
                
            }}>
            {props.children}
        </AppContext.Provider>
    )
}

export default AppContextProvider;