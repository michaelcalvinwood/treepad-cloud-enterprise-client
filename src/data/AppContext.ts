import React from "react";

export interface WindowDimensions {
    height: number,
    width: number
}

export interface DesktopSections {
    controls: boolean,
    trees: boolean,
    branches: boolean,
    leaves: boolean
}

export interface TreeInfo {
    tree_id: string,
    icon: string,
    color: string,
    tree_name: string,
    tree_desc: string,
    owner_name: string,
    updated_ts: number,
    type: string
}

export interface Modals {
    addTree: {
        active: boolean,
        type: string,
        treeId: string,
    }
}

export const initModals = {
    addTree: {
        active: false,
        type: 'insert',
        treeId: ''
    }
}

const AppContext = React.createContext<{
    isLoggedIn: boolean,
    windowDimensions: WindowDimensions,
    menuPage: string,
    desktopSections: DesktopSections,
    userName: string,
    userId: number,
    email: string,
    server: string,
    token: string,
    treeInfo: TreeInfo[],
    curTree: string,
    toast: string,
    modals: Modals,
    
    setIsLoggedIn: (value: boolean) => void,
    setWindowDimensions: (windowDimensions: WindowDimensions) => void,
    setMenuPage: (val: string) => void,
    setDesktopSections: (cb: (val: DesktopSections) => DesktopSections) => void,
    // setDesktopSections: (val: DesktopSections) => void,
    setUserName: (val: string) => void;
    setUserId: (val: number) => void;
    setEmail: (val: string) => void;
    setServer: (val: string) => void;
    setToken: (val: string) => void;
    setTreeInfo: (val: TreeInfo[]) => void;
    setCurTree: (val: string) => void;
    setToast: (val: string) => void;
    setModals: (cb: (val: Modals) => Modals) => void;
    
}>({
    isLoggedIn: false,
    windowDimensions: {height: 0, width: 0},
    menuPage: 'trees',
    desktopSections: { 
        controls: false,
        trees: true,
        branches: true,
        leaves: false
    },
    userName: '',
    userId: -1,
    email: '',
    server: '',
    token: '',
    treeInfo: [],
    curTree: "",
    toast: '',
    modals: initModals,

    setIsLoggedIn: () => {},
    setWindowDimensions: () => {},
    setMenuPage: () => {},
    setDesktopSections: () => {},
    setUserName: () => {},
    setUserId: () => {},
    setEmail: () => {},
    setServer: () => {},
    setToken: () => {},
    setTreeInfo: () => {},
    setCurTree: () => {},
    setToast: () => {},
    setModals: () => {}
});

export default AppContext;