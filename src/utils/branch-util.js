import * as socketIo from './api-socket-io';
import { v4 as uuidv4 } from 'uuid';
import * as dbUtil from './debug-util';

const fn = 'branch-util.js ';

const getBranchFromBranchId = (branchId, branches) => {
    return branches.find(branch => branch.id === branchId);
}

const getNumChildren = (branch, index, branches) => {
    if (index >= branches.length - 1) return 0;
    let numChildren = 0;
    for (let i = index + 1; i < branches.length; ++i) {
        if (branches[i].level <= branch.level) break;
        ++numChildren;
    }
    return numChildren;
}

const getIndexFromId = (branchId, branches, DbEvent) => {

    for (let i = 0; i < branches.length; ++i) {
        if (branches[i].id === branchId) return i;
    }

    dbUtil.eventDebug(DbEvent, {
        p: 'branch-util.js getIndexFromId',
        i: `invalid branchId: ${branchId}`
    });

    return false;
}

const createNewBranch = (owner, level) => {
    return {
            id: `B_${owner}_${uuidv4()}`,
            level,
            name: '',
            owner
    }
}

export const insertSibling = (branchId, appCtx) => {
    const {branch, branches, setBranch, setBranches} = appCtx;

    let curBranches = [...branches];
    const branchIndex = getIndexFromId(branchId, curBranches, 'insertSibling');
    if (branchIndex === false) return;
    const curBranch = curBranches[branchIndex];
    const newBranch = createNewBranch(curBranch.owner, curBranch.level);

    const numChildren = getNumChildren(branch, branchIndex, curBranches);
    const insertionPoint = branchIndex + numChildren + 1;
   
    const dbMessage = {
        p: "branch-util.js insertSibling",
        curBranch,
        numChildren,
        branches,
        newBranch
    }

    dbUtil.eventDebug('insertSibling', dbMessage);

    curBranches.splice(insertionPoint, 0, newBranch);

    const info = {
        branchOrder: curBranches.map(branch => `${branch.id}_${branch.level}`),
        newBranch,
        treeId: appCtx.tree.id,
        ancestors: null,
        token: appCtx.userInfo.token,
        socket: appCtx.userInfo.resourceSocket
    }

    socketIo.setBranchOrder(info); 
}

export const insertChild = (branchId, appCtx) => {
    const {branch, branches, setBranch, setBranches} = appCtx;

    let curBranches = [...branches];
    const branchIndex = getIndexFromId(branchId, curBranches, 'insertSibling');
    if (branchIndex === false) return;
    const curBranch = curBranches[branchIndex];
    const newLevel = curBranch.level + 1;
    const newBranch = createNewBranch(curBranch.owner, newLevel);
    
    const dbMessage = {
        p: "branch-util.js insertChild",
        curBranch,
        newLevel,
        branches,
        newBranch,
        maxLevels: process.env.REACT_APP_MAX_CHILD_LEVELS
    }
   
    dbUtil.eventDebug('insertChild', dbMessage);

    if (newLevel > process.env.REACT_APP_MAX_CHILD_LEVELS) return;

    curBranches.splice(branchIndex+1, 0, newBranch);

    const info = {
        branchOrder: curBranches.map(branch => `${branch.id}_${branch.level}`),
        newBranch,
        treeId: appCtx.tree.id,
        ancestors: null,
        token: appCtx.userInfo.token,
        socket: appCtx.userInfo.resourceSocket
    }

    socketIo.setBranchOrder(info); 
}

export const insertParent = (branchId, branch, setBranch, branches, setBranches) => {
    console.log('insertParent');
}

export const moveFocusUp = (branchId, appCtx) => {
    const { branches, setBranch } = appCtx;
    let index = getIndexFromId(branchId, branches, 'moveFocusUp');
    if (index === 0) return;

    --index;
    setBranch(branches[index]);

}

export const moveBranchUp = (branchId, branch, setBranch, branches, setBranches) => {
  

}

export const moveFocusDown = (branchId, appCtx) => {
    dbUtil.eventDebug('moveFocusDown', {
        p: fn + 'moveFocusDown',
        appCtx
    })
    const { branches, setBranch } = appCtx;
    let index = getIndexFromId(branchId, branches, 'moveFocusUp');
    let dbMessage = {
        p: fn + 'moveFocusDown',
        branches, setBranch, index
    }
    dbUtil.eventDebug('moveFocusDown', dbMessage);

    if (index >= (branches.length - 1)) return;

    ++index;
    setBranch(branches[index]);
}

export const moveBranchDown = (branchId, branch, setBranch, branches, setBranches) => {
    console.log('moveBranchDown');
}

export const indent = (branchId, branch, setBranch, branches, setBranches) => {
    console.log('indent');
}

export const outdent = (branchId, branch, setBranch, branches, setBranches) => {
    console.log('outdent');
}

export const copy = (branchId, branch, setBranch, branches, setBranches) => {
    console.log('copy');
}

export const deleteBranch = (branchId, appCtx) => {
    const {branch, branches, setBranch, setBranches} = appCtx;

    let curBranches = [...branches];
    if (curBranches.length < 2) {
        appCtx.setToast('You must keep at least one branch');
        return;
    }
    const branchIndex = getIndexFromId(branchId, curBranches, 'insertSibling');
    if (branchIndex === false) return;
    const curBranch = curBranches[branchIndex];
    let newBranch;
    if (branchIndex > 0) newBranch = curBranches[branchIndex - 1];
    else newBranch = curBranches[0];
   
    const numChildren = getNumChildren(branch, branchIndex, curBranches);
    const deletedBranches = curBranches.splice(branchIndex, numChildren + 1);
    
    const dbMessage = {
        p: "branch-util.js deleteBranch",
        curBranch,
        numChildren,
        branches,
        curBranches,
        newBranch,
        deletedBranches
    }

    dbUtil.eventDebug('deleteBranch', dbMessage);


    const info = {
        branchOrder: curBranches.map(branch => `${branch.id}_${branch.level}`),
        newBranch,
        treeId: appCtx.tree.id,
        ancestors: null,
        token: appCtx.userInfo.token,
        socket: appCtx.userInfo.resourceSocket
    }

    socketIo.setBranchOrder(info); 

    // TODO
    // socketIo.cleanUpDeletedBranches(deletedBranches);
}
export const paste = (branchId, branches, setBranches) => {
    console.log('insertSibling');
}





export const addSibling = (tree, branches, setBranches, socket) => {
    
    // branch has parent?
    // if yes, get owner from parent 
    // else get owner from tree
    


}