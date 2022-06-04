
export interface UserInfo {
    isLoggedIn: boolean,
    email: string,
    id: number,
    userName: string,
    server: string,
    resourceSocket: any,
    token: any
}

export interface ResourceSocket {
    owner: number,
    server: string,
    connection: any
}

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

export interface Tree {
    treeId: string,
    icon: string,
    color: string,
    treeName: string,
    treeDesc: string,
    ownerName: string,
    updatedTs: number,
    type: string
}

export interface Branch {
    id: string,
    name: string | null,
    owner: number,
    level: number,
    open: boolean,
    nameChecked: boolean
}

export interface Modals {
    addTree: {
        active: boolean,
        type: string,
        treeId: string,
    }
}
