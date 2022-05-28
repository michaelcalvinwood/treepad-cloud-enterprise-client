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

export interface Modals {
    addTree: boolean
}

export interface TreeInfo {
    tree_id: string,
    icon: string,
    color: string,
    tree_name: string,
    owner_name: string,
    updated_ts: number,
    type: string
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
    modals: Modals,
    treeInfo: TreeInfo[],
    curTree: string,
    
    setIsLoggedIn: (value: boolean) => void,
    setWindowDimensions: (windowDimensions: WindowDimensions) => void,
    setMenuPage: (val: string) => void,
    setDesktopSections: (cb: (val: DesktopSections) => DesktopSections) => void,
    setUserName: (val: string) => void;
    setUserId: (val: number) => void;
    setEmail: (val: string) => void;
    setServer: (val: string) => void;
    setToken: (val: string) => void;
    setModals: (cb: (val: Modals) => Modals) => void;
    setTreeInfo: (val: TreeInfo[]) => void;
    setCurTree: (val: string) => void;
}>({
    isLoggedIn: false,
    windowDimensions: {height: 0, width: 0},
    menuPage: 'trees',
    desktopSections: { 
        controls: true,
        trees: true,
        branches: true,
        leaves: false
    },
    userName: '',
    userId: -1,
    email: '',
    server: '',
    token: '',
    modals: {
        addTree: false
    },
    treeInfo: [],
    curTree: "",

    setIsLoggedIn: () => {},
    setWindowDimensions: () => {},
    setMenuPage: () => {},
    setDesktopSections: () => {},
    setUserName: () => {},
    setUserId: () => {},
    setEmail: () => {},
    setServer: () => {},
    setToken: () => {},
    setModals: () => {},
    setTreeInfo: () => {},
    setCurTree: () => {}
});

export default AppContext;