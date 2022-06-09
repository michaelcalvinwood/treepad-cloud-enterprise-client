import React, { useEffect, useState, useRef } from "react";
import AppContext, {initModals, initUserInfo} from "./AppContext";
import { Storage } from '@capacitor/storage';
import * as socketIo from '../utils/api-socket-io';
import * as appInterface from "./AppInterfaces";
import * as dbUtil from '../utils/debug-util';

const fn = 'AppContextProvider.js ';

let staticVal = false;

const AppContextProvider = props => {
    const [activeSection, setActiveSection] = useState('trees');
    const [branch, _setBranch] = useState(null);
    const [branches, _setBranches] = useState([]);
    
    const [desktopSections, setDesktopSections] = useState({
        controls: false,
        trees: true,
        branches: true,
        leaves: false
    })
    const [menuPage, setMenuPage] = useState('trees');
    const [trees, setTrees] = useState([]);
    const [tree, setTree] = useState(null);
    const [toast, setToast] = useState('');
    const [modals, setModals] = useState(initModals);
    const [userInfo, setUserInfo] = useState(initUserInfo);
    const [windowDimensions, setWindowDimensions] = useState({height: window.innerHeight, width: window.innerWidth});
    
    const branchRef = React.useRef(branch);
    const branchesRef = React.useRef(branches);

    const fn = "AppContextProvider.js ";

    const setBranches = data => {
        dbUtil.eventDebug('subscribeToTree', {
            p: fn + 'setBranches',
            data: data,
            typeData: typeof data
        })
        branchesRef.current = data;
        _setBranches(prev => [...data]);
    }

    const setBranch = str => {
        branchRef.current = str;
        _setBranch(str);
    }

    const changeBranchName = (branchId, branchName) => {
        const curBranch = branchesRef.current.find(branch => branch.id === branchId);
        if (curBranch) {
            curBranch.name = branchName;
            setBranches(branchesRef.current);
        }
    }

    const windowResize = () => {
        // console.log(window.innerWidth, window.innerHeight);
        setWindowDimensions(prev => {
            prev = { height: window.innerHeight, width: window.innerWidth};
            return {...prev};
        })
      };

    const displayBranches = () => console.log('display branches', branches, 'branch', branch, 'desktopSections', desktopSections);

    const subscribeToTree = (subTree) => {
        console.log(`subscribeToTree`, subTree);
        
        const info = {
            branch,
            resourceId: subTree.id,
            userInfo,
            setToast,
            setBranches,
            setBranch
        }

        const dbMessage = {
            p: fn + `subscribeToTree`,
            info
        }
        dbUtil.eventDebug("subscribeToTree", dbMessage);
        socketIo.subscribeToResource(info);     
        setTree(subTree);
        setActiveSection('branches');
    }
    
    const initContext = async () => {
        if (staticVal) return;
        staticVal = true;

        windowResize();
        window.addEventListener('resize', windowResize);
        setUserInfo(initUserInfo);
        setMenuPage('trees');
        setDesktopSections({
            controls: false,
            trees: true,
            branches: true,
            leaves: false
        })
        setTree(null);
        setBranch(null);
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

    const extSetToast = (message) => {
        setToast(message);
    }

    const getBranches = () => branches;

    const setResourceSocketEventHandlers = (s) => {
      
        s.on('debugEvent', (dEvent, message) => {
            dbUtil.eventDebug('socketReceive', {r: 'debugEvent'});

            console.log(`${dEvent}:Server: ${JSON.stringify(message, null, 4)}`)
        });

        s.on('toastMessage', (message) => {
            dbUtil.eventDebug('socketReceive', {r: 'toastMessage'});
            
            setToast(message)}
        );
    
        s.on('branchOrder', (treeId, branchOrder, focus, sender) => {
            dbUtil.eventDebug('socketReceive', {r: 'branchOrder'});
            
           let dbMessage = {
               p: 'appContextProvider.js on branchOrder',
                treeId,
                branchOrder
           }
            dbUtil.eventDebug('insertSibling', dbMessage);
            dbUtil.eventDebug('subscribeToTree', dbMessage);
            
            let newBranches = [];
            let oldBranches = [...branchesRef.current];
            JSON.parse(branchOrder).forEach((newBranch, i) => {
                const parts = newBranch.split('_');
                newBranches[i] = {};
                newBranches[i].owner = Number(parts[1]);
                newBranches[i].id = `${parts[0]}_${parts[1]}_${parts[2]}`;
                newBranches[i].level = Number(parts[3]);
                const exists = oldBranches.find(ob => ob.id === newBranches[i].id);
                exists ? newBranches[i].name = exists.name : newBranches[i].name = '';
            })

            dbMessage = {
                p: 'appContextProvider.js on branchOrder',
                oldBranches,
                newBranches,
                focus,
                sender,
                myId: s.id
            }
            dbUtil.eventDebug('insertSibling', dbMessage);
            dbUtil.eventDebug('subscribeToTree', dbMessage);

            setBranches(newBranches);
            if (sender === s.id) {
                dbUtil.eventDebug('insertSibling', 'sender === s.id');
                if (!branch && !focus) setBranch(newBranches[0]);
                const focusBranch = newBranches.find(nb => nb.id === focus);
                dbUtil.eventDebug('insertSibling', {focusBranch})
                if (focusBranch) setBranch(focusBranch);
            }
            
        });
    
        s.on('setBranchName', (branchId, branchName, senderId) => {
            dbUtil.eventDebug('socketReceive', {r: 'setBranchName'});
            
            let dbMessage = {
                p: fn + 'setBranchName',
                branchId,
                branchName,
                senderId,
                myId: s.id,
                branchesRef: branchesRef.current,
                typeBranchesRef: typeof branchesRef.current
            }
            dbUtil.eventDebug('branchNameChange', dbMessage);
            
            if (senderId === s.id) return;

            let curBranches = branchesRef.current;
            console.log('curBranches', curBranches)
            let curBranch = curBranches.find(branch => branch.id === branchId);
            
            if (curBranch.name === branchName) return;
            curBranch.name = branchName;

            setBranches(curBranches);
        }) 

        s.on('getInitialBranchName', (branchId, branchName, senderId) => {
            dbUtil.eventDebug('socketReceive', {r: 'getInitialBranchName'});
            
            let curBranches = branchesRef.current;
            
            let curBranch = curBranches.find(branch => branch.id === branchId);
            
            let dbMessage = {
                p: "AppContextProvider.js on getInitialBranchName",
                branchId,
                branchName,
                curBranches,
                curBranch
            }
            dbUtil.eventDebug('subscribeToTree', dbMessage);
            
            if (curBranch.name === branchName) return;
            curBranch.name = branchName;

            setBranches(curBranches);
        
        }) 
    }

    useEffect(() => displayBranches(), [branches]);

    initContext();

    return(
        <AppContext.Provider
            value = {{
                activeSection,
                branch,
                branches,
                desktopSections,
                menuPage,
                modals,
                toast,
                tree,
                trees,
                userInfo,
                windowDimensions,
                
                changeBranchName,
                setActiveSection,
                setBranch,
                setBranches,
                setDesktopSections,
                setMenuPage,
                setModals,
                setToast,
                setTrees,
                setUserInfo,
                setWindowDimensions,
                subscribeToTree,
                setResourceSocketEventHandlers,
                
            }}>
            {props.children}
        </AppContext.Provider>
    )
}

export default AppContextProvider;