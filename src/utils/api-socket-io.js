import { io } from 'socket.io-client';
import * as branchUtil from '../utils/branch-util';
import * as dbUtil from '../utils/debug-util';

export const getResourceSocket = server => io(server);

export const subscribeToResource = info => {
    
    const { resourceId } = info;
    const { resourceSocket, token } = info.userInfo;

    const dbMessage = {
        p: `api-socket-io.js subscribeToResource`,
        info
    }
    dbUtil.eventDebug("subscribeToTree", dbMessage);

    resourceSocket.emit('resourceSubscribe', resourceId, token);
}

export const getBranchNames = info => {
    if (!info.branchList || !info.branchList.length) return;

    info.resourceSocket.emit('getBranchNames', info.branchList, info.token);
}

export const setBranchName = info => {
    const { socket, token, branchId, branchName, treeId, ancestors } = info;
    
    if (!branchId) return;

    const dbMessage = {
        p: `api-socket-io.js setBranchName`,
        token,
        branchId,
        branchName,
        treeId
    }

    dbUtil.eventDebug('branchNameChange', dbMessage);
    socket.emit('setBranchName', branchId, branchName, treeId, ancestors, token);
}

export const setBranchOrder = info => {
    let dbMessage = {
        p: 'api-socket-io.js setBranchOrder',
        i: info
    }

    dbUtil.eventDebug('insertSibling', dbMessage);
    dbUtil.eventDebug('deleteBranch', dbMessage);
    const {branchOrder, newBranch, treeId, ancestors, token, socket} = info;

    socket.emit('setBranchOrder', branchOrder, newBranch && newBranch.id, treeId, ancestors, token);
}

export const getBranchName = (id, ctx) => {
    console.log('api-socket-io getBranchName', id, ctx);
    if (!id) return;

    ctx.userInfo.resourceSocket.emit('getBranchName', id, ctx.tree.treeId, null, ctx.userInfo.token)
}

export const getInitialBranchName = (id, ctx) => {
    let dbMessage = {
        p: 'api-socket-io.js getInitialBranchName',
        id,
        ctx
    }
    dbUtil.eventDebug('subscribeToTree', dbMessage);

    if (!id) return;

    ctx.userInfo.resourceSocket.emit('getInitialBranchName', id, ctx.tree.id, null, ctx.userInfo.token)
}