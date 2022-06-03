import { io } from 'socket.io-client';
import * as branchUtil from '../utils/branch-util';

const setSocketEventHandlers = (info) => {
    const s = info.resourceSocket;

    s.on('toastMessage', message => {
        console.log('toast message', message);
        info.setToast(message)}
    );

    s.on('branchOrder', branchOrder => {
        console.log(branchOrder, typeof branchOrder);
        let branches = [];
        JSON.parse(branchOrder).forEach((branch, i) => {
            branches[i] = [];
            branches[i].id = branch;
            branches[i].name = sessionStorage.getItem(branch);
        })
        info.setBranches(branches);
        if (!info.branch) info.setBranch(branches[0]);
    });

    s.on('branchNames', branchList => {
        if (!branchList || !branchList.length) return;
        let curBranches = info.branches;
        branchList.forEach(branch => {
            const curBranch = curBranches.find(b => b.branchId === branch.branchId);
            if (curBranch) curBranch.branchName = branch.branchName;
        })
        info.setBranches(curBranches);
    });

    s.on('branchName', (branchId, branchName, senderId) => {
        console.log('api-oscket-io branchName', branchId, branchName, senderId, s.id);
        
        if (senderId === s.id) return;
        
        branchUtil.setBranchName(branchId, branchName, info.setBranches);
    }) 
}

export const subscribeToResource = info => {
    console.log('subscribeToResourse', info.newResourceId);
    if (info.newResourceId === info.resourceId) return;

    if (!info.resourceSocket) {
        const connection = info.server;
        info.resourceSocket = io(connection);
        setSocketEventHandlers(info);
        info.setResourceSocket(info.resourceSocket);
    }
    console.log('api-socket-io subscribeToResource resourceSocket', info.resourceSocket);

    info.resourceSocket.emit('resourceSubscribe', info.newResourceId, info.token);
    info.setResourceId(info.newResourceId);
}

export const getBranchNames = info => {
    if (!info.branchList || !info.branchList.length) return;

    info.resourceSocket.emit('getBranchNames', info.branchList, info.token);
}


export const setBranchName = info => {
    console.log('api-socket-io setBranchName', info);
    const { socket, branchId, branchName, treeId, ancestors, token } = info;
    
    if (!branchId) return;

    console.log('api-socket-io setBranchName emitting');
    socket.emit('setBranchName', branchId, branchName, treeId, ancestors, token);
}