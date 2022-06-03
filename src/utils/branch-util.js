export const setBranchName = (branchId, branchName, setBranches) => {
    setBranches(prev => {
        let curBranch = prev.find(branch => branch.id === branchId);
        if (curBranch) curBranch.name = branchName;
        return([...prev]);
    })
}