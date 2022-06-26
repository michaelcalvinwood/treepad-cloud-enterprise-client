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
    const [branches, _setBranches] = useState([]);
    const [curBranchId, _setCurBranchId] = useState('');
    
    const [desktopSections, setDesktopSections] = useState({
        controls: false,
        trees: true,
        branches: true,
        leaves: false
    })
    const [menuPage, setMenuPage] = useState('trees');
    const [modals, setModals] = useState(initModals);
    const [module, setModule] = useState(null);
    const [modules, _setModules] = useState([]);
    const [trees, setTrees] = useState([]);
    const [curTreeId, setCurTreeId] = useState('');
    const [toast, setToast] = useState('');
    const [userInfo, setUserInfo] = useState(initUserInfo);
    const [windowDimensions, setWindowDimensions] = useState({height: window.innerHeight, width: window.innerWidth});
    
    const branchesRef = React.useRef(branches);
    const curBranchIdRef = React.useRef(curBranchId);
    const modulesRef = React.useRef(modules);

    const setBranches = data => {
        dbUtil.eventDebug('subscribeToTree', {
            p: fn + 'setBranches',
            data: data,
            typeData: typeof data
        })
        branchesRef.current = data;
        _setBranches(prev => [...data]);
    }

    const setCurBranchId = str => {
        curBranchIdRef.current = str;
        _setCurBranchId(str);
    }

    const setModules = val => {
        modulesRef.current = val;
        _setModules(val);
    }
    
    const getModules = () => {
        return modules;
    }

    const state = {
        activeSection,
        setActiveSection,
        branches,
        setBranches,
        curBranchId,
        setCurBranchId,
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
        curBranchIdRef,
        branchesRef,
        modulesRef
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

    const subscribeToTree = (subTree) => {
        dbUtil.eventDebug(`renderBranches`, {
            process: 'AppContextProvider.js subscribeToTree',
            subTree
        });
        
        const info = {
            curBranchId,
            resourceId: subTree.id,
            userInfo,
            setToast,
            setBranches,
            setCurBranchId
        }

        const dbMessage = {
            p: fn + `subscribeToTree`,
            info
        }
        dbUtil.eventDebug("subscribeToTree", dbMessage);
        socketIo.subscribeToResource(info);     
        setCurTreeId(subTree.id);
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
        setCurTreeId('');
        setCurBranchId('');
        // const authorizationData = await Storage.get({key: 'authorization'});
        // const authorizationInfo = authorizationData.value && authorizationData.value.length ?
        //     JSON.parse(authorizationData.value) :
        //     null;

       
    };

    useEffect(() => {
        if (trees.length && !curTreeId) subscribeToTree(trees[0]);
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
                branches,
                curBranchId,
                curTreeId,
                desktopSections,
                menuPage,
                modals,
                module,
                modules,
                toast,
                trees,
                userInfo,
                windowDimensions,
                
                changeBranchName,
                setActiveSection,
                setBranches,
                setCurBranchId,
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