import React, { useEffect, useState, useRef } from "react";
import AppContext, {initModals, initUserInfo} from "./AppContext";
import { Storage } from '@capacitor/storage';
import * as socketIo from '../utils/resourceServerEmit';
import * as appInterface from "./AppInterfaces";
import * as dbUtil from '../utils/debug-util';
import * as resourceServiceOn from '../utils/resourceServerOn';

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
    const [modals, setModals] = useState(initModals);
    const [module, setModule] = useState(null);
    const [modules, setModules] = useState([]);
    const [trees, setTrees] = useState([]);
    const [tree, setTree] = useState(null);
    const [toast, setToast] = useState('');
    const [userInfo, setUserInfo] = useState(initUserInfo);
    const [windowDimensions, setWindowDimensions] = useState({height: window.innerHeight, width: window.innerWidth});
    
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
    
    const branchRef = React.useRef(branch);
    const branchesRef = React.useRef(branches);

    const state = {
        activeSection,
        setActiveSection,
        branch,
        setBranch,
        branches,
        setBranches,
        desktopSections,
        setDesktopSections,
        menuPage,
        setMenuPage,
        modals,
        setModals,
        module,
        setModule,
        modules,
        setModules,
        trees,
        setTrees,
        toast,
        setToast,
        userInfo,
        setUserInfo,
        windowDimensions,
        setWindowDimensions
    }

    const refs = {
        branchRef,
        branchesRef
    }

    const fn = "AppContextProvider.js ";

    const setResourceSocketEventHandlers = (s) => resourceServiceOn.resourceServiceEnventHandlers(s, state, refs);

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
        dbUtil.eventDebug(`renderBranches`, {
            process: 'AppContextProvider.js subscribeToTree',
            subTree
        });
        
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
                module,
                modules,
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
                setModule,
                setModules,
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