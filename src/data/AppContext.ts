import React from "react";
import * as appInterface from "./AppInterfaces";


export const initModals = {
    addTree: {
        active: false,
        type: 'insert',
        treeId: ''
    }
}

const AppContext = React.createContext<{
    branch: string,
    branches: appInterface.Branch[],
    desktopSections: appInterface.DesktopSections,
    email: string,
    isLoggedIn: boolean,
    menuPage: string,
    modals: appInterface.Modals,
    resourceSocket: any,
    server: string,
    toast: string,
    token: string,
    tree: appInterface.Tree | null,
    trees: appInterface.Tree[],
    userId: number,
    userName: string,
    windowDimensions: appInterface.WindowDimensions,
    
    setBranch: (val: string) => void;
    setBranches: (val: appInterface.Branch[]) => void;
    setDesktopSections: (cb: (val: appInterface.DesktopSections) => appInterface.DesktopSections) => void,
    setEmail: (val: string) => void;
    setIsLoggedIn: (value: boolean) => void,
    setMenuPage: (val: string) => void,
    setModals: (cb: (val: appInterface.Modals) => appInterface.Modals) => void;
    setResourceSocket: (val: any) => void;
    setServer: (val: string) => void;
    setToken: (val: string) => void;
    setTrees: (val: appInterface.Tree[]) => void;
    setToast: (val: string) => void;
    setUserId: (val: number) => void;
    setUserName: (val: string) => void;
    setWindowDimensions: (windowDimensions: appInterface.WindowDimensions) => void,
    subscribeToTree: (val: appInterface.Tree) => void;
    
}>({
    branch: '',
    branches: [],
    desktopSections: { 
        controls: false,
        trees: true,
        branches: true,
        leaves: false
    },
    email: '',
    isLoggedIn: false,
    menuPage: 'trees',
    modals: initModals,
    server: '',
    resourceSocket: null,
    token: '',
    trees: [],
    tree: null,
    toast: '',
    userId: -1,
    userName: '',
    windowDimensions: {height: 0, width: 0},

    setBranch: () => {},
    setBranches: () => {},
    setEmail: () => {},
    setIsLoggedIn: () => {},
    setResourceSocket: () => {},
    setMenuPage: () => {},
    setDesktopSections: () => {},
    setUserName: () => {},
    setUserId: () => {},
    setServer: () => {},
    setToken: () => {},
    setTrees: () => {},
    setToast: () => {},
    setModals: () => {},
    setWindowDimensions: () => {},
    subscribeToTree: () => {},
});

export default AppContext;