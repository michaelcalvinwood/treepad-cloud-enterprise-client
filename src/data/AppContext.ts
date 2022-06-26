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
    branches: appInterface.Branch[],
    curBranchId: string | null,
    desktopSections: appInterface.DesktopSections,
    menuPage: string,
    modals: appInterface.Modals,
    module: appInterface.Module | null,
    modules: appInterface.Module[],
    toast: string,
    tree: appInterface.Tree | null,
    trees: appInterface.Tree[],
    userInfo: appInterface.UserInfo,
    windowDimensions: appInterface.WindowDimensions,
    
    changeBranchName: (branchId: string, branchName: string) => void,
    setActiveSection: (val: string) => void;
    setBranches: (val: appInterface.Branch[]) => void;
    setCurBranchId: (val: string | null) => void;
    setDesktopSections: (cb: (val: appInterface.DesktopSections) => appInterface.DesktopSections) => void,
    setMenuPage: (val: string) => void,
    setModals: (cb: (val: appInterface.Modals) => appInterface.Modals) => void;
    setModule: (module: appInterface.Module) => void;
    setModules: (modules: appInterface.Module[]) => void;
    setTrees: (val: appInterface.Tree[]) => void;
    setToast: (val: string) => void;
    setUserInfo: (val: appInterface.UserInfo) => void;
    setWindowDimensions: (windowDimensions: appInterface.WindowDimensions) => void,
    subscribeToTree: (val: appInterface.Tree) => void;
    setResourceSocketEventHandlers: (val: any) => void;
}>({
    activeSection: 'trees',
    branches: [],
    curBranchId: '',
    desktopSections: { 
        controls: false,
        trees: true,
        branches: true,
        leaves: false
    },
    menuPage: 'trees',
    modals: initModals,
    module: null,
    modules: [],
    trees: [],
    tree: null,
    toast: '',
    userInfo: initUserInfo,
    windowDimensions: {height: 0, width: 0},

    changeBranchName: () => {},
    setActiveSection: () => {},
    setBranches: () => {},
    setCurBranchId: () => {},
    setDesktopSections: () => {},
    setMenuPage: () => {},
    setModals: () => {},
    setModule: () => {},
    setModules: () => {},
    setTrees: () => {},
    setToast: () => {},
    setUserInfo: () => {},
    setWindowDimensions: () => {},
    subscribeToTree: () => {},
    setResourceSocketEventHandlers: () => {},
});

export default AppContext;