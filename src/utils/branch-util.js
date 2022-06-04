import * as socketIo from './api-socket-io';

export const setBranchName = (branchId, branchName, setBranches) => {
    setBranches(prev => {
        let curBranch = prev.find(branch => branch.id === branchId);
        if (curBranch) curBranch.name = branchName;
        return([...prev]);
    })
}

export const addSibling = (tree, branches, setBranches, socket) => {
    
    // branch has parent?
    // if yes, get owner from parent 
    // else get owner from tree
    


}