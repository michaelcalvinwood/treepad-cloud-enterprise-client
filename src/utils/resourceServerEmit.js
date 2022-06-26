import { io } from 'socket.io-client';
import * as branchUtil from './branch-util';
import * as monitor from './eventMonitor';

export const getResourceSocket = server => io(server);

export const subscribeToResource = info => {
    
    const { resourceId } = info;
    const { resourceSocket, token } = info.userInfo;

    const dbMessage = {
        p: `api-socket-io.js subscribeToResource`,
        info
    }
 
    monitor.events(['emit'], {emit: 'browser|resourceSubscribe', resourceId, token});
    resourceSocket.emit('resourceSubscribe', resourceId, token);
}

export const getBranchNames = info => {
    if (!info.branchList || !info.branchList.length) return;
    const {branchList, token} = info;

    monitor.events(['emit', {emit: 'browser|getBranchNames', branchList, token}]);
    info.resourceSocket.emit('getBranchNames', branchList, token);
}

export const setBranchName = info => {
    const { socket, token, branchId, branchName, treeId, ancestors } = info;
    
    if (!branchId) return;

    monitor.events(['emit'], {emit: 'browser|setBranchName', branchId, branchName, treeId, ancestors, token});

    socket.emit('setBranchName', branchId, branchName, treeId, ancestors, token);
}

export const setBranchOrder = info => {
    
    const {branchOrder, newBranch, treeId, ancestors, token, socket} = info;

    const newBranchId = newBranch && newBranch.id;

    monitor.events(['emit'], {emit: 'browser|setBranchOrder', branchOrder, newBranchId, treeId, ancestors, token});

    socket.emit('setBranchOrder', branchOrder, newBranchId, treeId, ancestors, token);
}

export const getBranchName = (id, ctx) => {
    console.log('api-socket-io getBranchName', id, ctx);
    if (!id) return;

    const socket = ctx.userInfo.resourceSocket;
    const { treeId } = ctx.tree;
    const { token } = ctx.userInfo;

    const permissions = null;

    monitor.events(['emit'], {emit: 'browser|getBranchName', id, treeId, permissions, token});

    socket.emit('getBranchName', id, treeId, permissions, token);
}

export const getBranchInfo = (id, ctx) => {
    monitor.events(['emit'], {emit: 'browser|getBranchInfo', id, ctx});
    const { curTreeId } = ctx;
    const { resourceSocket: socket, token} = ctx.userInfo;
    
    if (!id) return;

    const permissions = null;

    monitor.events(['emit'], {emit: 'browser|getBranchInfo', id, curTreeId, permissions, token})
    socket.emit('getBranchInfo', id, curTreeId, permissions, token)
}

export const getAllModules = (ctx) => {
    const { resourceSocket: socket, token} = ctx.userInfo;

    monitor.events(['emit'], {emit: 'browser|getAllModules'});

    socket.emit('getAllModules');
}

export const setCurModule = (moduleId, ctx) => {
    const { branch } = ctx;
    const branchId = branch.id;
    const socket = ctx.userInfo.resourceSocket;

    monitor.events(['emit'], {emit: 'browser|setCurModule', branchId, moduleId});

    socket.emit('branchCurModule', branchId, moduleId);
}