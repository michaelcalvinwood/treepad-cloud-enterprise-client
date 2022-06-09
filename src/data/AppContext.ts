import { UserInfo } from "os";
import React from "react";
import * as appInterface from "./AppInterfaces";


export const initModals = {
    addTree: {
        active: false,
        type: 'insert',
        treeId: ''
    }
}

export const initUserInfo = {
    isLoggedIn: false,
    email: '',
    id: -1,
    userName: '',
    server: "",
    token: null,
    resourceSocket: null
}

const AppContext = React.createContext<{
    activeSection: string,
    branch: appInterface.Branch | null,
    branches: appInterface.Branch[],
    desktopSections: appInterface.DesktopSections,
    menuPage: string,
    modals: appInterface.Modals,
    toast: string,
    tree: appInterface.Tree | null,
    trees: appInterface.Tree[],
    userInfo: appInterface.UserInfo,
    windowDimensions: appInterface.WindowDimensions,
    
    changeBranchName: (branchId: string, branchName: string) => void,
    setActiveSection: (val: string) => void;
    setBranch: (val: appInterface.Branch) => void;
    setBranches: (val: appInterface.Branch[]) => void;
    setDesktopSections: (cb: (val: appInterface.DesktopSections) => appInterface.DesktopSections) => void,
    setMenuPage: (val: string) => void,
    setModals: (cb: (val: appInterface.Modals) => appInterface.Modals) => void;
    setTrees: (val: appInterface.Tree[]) => void;
    setToast: (val: string) => void;
    setUserInfo: (val: appInterface.UserInfo) => void;
    setWindowDimensions: (windowDimensions: appInterface.WindowDimensions) => void,
    subscribeToTree: (val: appInterface.Tree) => void;
    setResourceSocketEventHandlers: (val: any) => void;
    
    
}>({
    activeSection: 'trees',
    branch: null,
    branches: [],
    desktopSections: { 
        controls: false,
        trees: true,
        branches: true,
        leaves: false
    },
    menuPage: 'trees',
    modals: initModals,
    trees: [],
    tree: null,
    toast: '',
    userInfo: initUserInfo,
    windowDimensions: {height: 0, width: 0},

    changeBranchName: () => {},
    setActiveSection: () => {},
    setBranch: () => {},
    setBranches: () => {},
    setDesktopSections: () => {},
    setMenuPage: () => {},
    setModals: () => {},
    setTrees: () => {},
    setToast: () => {},
    setUserInfo: () => {},
    setWindowDimensions: () => {},
    subscribeToTree: () => {},
    setResourceSocketEventHandlers: () => {},
});

export default AppContext;