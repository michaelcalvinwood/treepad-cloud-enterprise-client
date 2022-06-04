import { io } from 'socket.io-client';
import * as branchUtil from '../utils/branch-util';

const setSocketEventHandlers = (info) => {
    // TODO: allow for multiple resourceSockets.
    const s = info.resourceSocket[0];

    s.on('toastMessage', message => {
        console.log('toast message', message);
        info.setToast(message)}
    );

    s.on('branchOrder', branchOrder => {
        console.log(branchOrder, typeof branchOrder);
        let branches = [];
        JSON.parse(branchOrder).forEach((branch, i) => {
            const parts = branch.split('_');
            branches[i] = [];
            branches[i].owner = Number(parts[1]);
            branches[i].id = `${parts[0]}_${parts[1]}_${parts[2]}`;
            branches[i].level = Number(parts[3][0]);
            branches[i].open = parts[3][1] === 'o' ? true : false;
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

export const getResourceSocket = server => io(server);

export const subscribeToResource = info => {
    console.log('subscribeToResource userInfo', info.userInfo)
    const { resourceId } = info;
    const { resourceSocket, token } = info.userInfo;
    console.log('subscribeToResourse', resourceId);
    console.log('api-socket-io subscribeToResource resourceSocket', resourceSocket);

    resourceSocket.emit('resourceSubscribe', resourceId, token);
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