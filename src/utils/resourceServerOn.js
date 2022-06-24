import * as dbUtil from './debug-util';
import * as monitor from './eventMonitor';

export const resourceServiceEnventHandlers = (s, state, refs) => {
    const fn = 'resourceServiceOn.js ';
    const p = 'resourceSocketOn.js|resourceServiceEventHandlers|';

    s.on('monitorEvents', (eventList, info) => {
        
        monitor.events(JSON.parse(eventList), JSON.parse(info));
    });
    s.on('debugEvent', (dEvent, message) => {
       return;
    });

    s.on('toastMessage', (message) => {
        dbUtil.eventDebug('socketReceive', {r: 'toastMessage'});
        
        state.setToast(message)}
    );

    s.on('branchOrder', (treeId, branchOrder, focus, sender) => {
        monitor.events(['clickLoginSubmit'], {on: 'branchOrder', treeId, branchOrder, focus, sender});
        
        let newBranches = [];
        let oldBranches = [...refs.branchesRef.current];
        JSON.parse(branchOrder).forEach((newBranch, i) => {
            const parts = newBranch.split('_');
            newBranches[i] = {};
            newBranches[i].owner = Number(parts[1]);
            newBranches[i].id = `${parts[0]}_${parts[1]}_${parts[2]}`;
            newBranches[i].level = Number(parts[3]);
            const exists = oldBranches.find(ob => ob.id === newBranches[i].id);
            exists && exists.name ? newBranches[i].name = exists.name : newBranches[i].name = '';
        })

        const myId = s.id;

        monitor.events(['clickLoginSubmit'], {p: p+'onBranchOrder', oldBranches, newBranches, focus, sender, myId});
        
        state.setBranches(newBranches);
        if (sender === myId) {
            if (!state.branch && !focus) state.setBranch(newBranches[0]);
            const focusBranch = newBranches.find(nb => nb.id === focus);
            if (focusBranch) state.setBranch(focusBranch);
        }
        
    });

    s.on('setBranchName', (branchId, branchName, senderId) => {
        dbUtil.eventDebug('socketReceive', {r: 'setBranchName'});
        
        dbUtil.eventDebug('branchNameChange', {
            p: fn + 'setBranchName',
            branchId,
            branchName,
            senderId,
            myId: s.id,
            branchesRef: refs.branchesRef.current,
            typeBranchesRef: typeof refs.branchesRef.current
        });
        
        if (senderId === s.id) return;

        let curBranches = refs.branchesRef.current;
        console.log('curBranches', curBranches)
        let curBranch = curBranches.find(branch => branch.id === branchId);
        
        if (curBranch.name === branchName) return;
        curBranch.name = branchName;

        state.setBranches(curBranches);
    }) 

    s.on('getInitialBranchName', (branchId, branchName, senderId) => {
        dbUtil.eventDebug('socketReceive', {r: 'getInitialBranchName'});
        
        let curBranches = refs.branchesRef.current;
        
        let curBranch = curBranches.find(branch => branch.id === branchId);
        
        dbUtil.eventDebug('subscribeToTree', {
            p: "AppContextProvider.js on getInitialBranchName",
            branchId,
            branchName,
            curBranches,
            curBranch
        });
        
        if (curBranch.name === branchName) return;
        curBranch.name = branchName;

        state.setBranches(curBranches);
    }) 

    s.on("getAllModules", data => {
        dbUtil.eventDebug('getAllModules', {
            p: fn + 'on getAllModules',
            data
        });

        const newModules = data.map(m => {
            return ({
                name: m.module_name,
                icon: m.icon
            })
        })

        state.setModules(newModules);
    })
}

