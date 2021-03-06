// import * as dbUtil from './debug-util';
import * as monitor from './eventMonitor';
// import { setCurModule } from './resourceServerEmit';

export const resourceServiceEnventHandlers = (s, state, refs) => {
    const fn = 'resourceServiceOn.js ';
    const p = 'resourceSocketOn.js|resourceServiceEventHandlers|';

    s.on('monitorEvents', (eventList, info) => monitor.events(JSON.parse(eventList), JSON.parse(info)));

    s.on('debugEvent', (dEvent, message) => {return;});

    s.on('toastMessage', (message) => {
    
        state.setToast(message)}
    );

    s.on('branchOrder', (treeId, branchOrder, focus, sender) => {
        monitor.events(['clickLoginSubmit', 'on'], {on: 'browser|branchOrder', treeId, branchOrder, focus, sender});
        
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

        monitor.events(['clickLoginSubmit'], {on: 'browser|branchOrder', oldBranches, newBranches, focus, sender, myId});
        
        state.setBranches(newBranches);
        if (sender === myId) {
            if (!state.branch && !focus) state.setCurBranchId(newBranches[0].id);
            const focusBranch = newBranches.find(nb => nb.id === focus);
            if (focusBranch) state.setCurBranchId(focusBranch.id);
        }
        
    });

    s.on('setBranchName', (branchId, branchName, senderId) => {
        monitor.events(['on'], {on: 'browser|setBranchName', branchId, branchName, senderId});

        if (senderId === s.id) return;

        let curBranches = refs.branchesRef.current;
        
        let curBranch = curBranches.find(branch => branch.id === branchId);
        
        if (curBranch.name === branchName) return;
        curBranch.name = branchName;

        state.setBranches(curBranches);
    }) 

    s.on('getBranchInfo', (branchId, branchName, modules, defaultModule) => {
        monitor.events(['on'], {on: 'browser|getBranchInfo', branchId, branchName, modules, defaultModule});

        let curBranches = refs.branchesRef.current;
        
        let curBranch = curBranches.find(branch => branch.id === branchId);
        if (!curBranch) return;

        curBranch.name = branchName;
        curBranch.modules = modules;
        curBranch.defaultModule = defaultModule; 
        state.setBranches(curBranches);
    }) 

    s.on("getAllModules", data => {
       monitor.events(['on'], {on: 'browser|getAllModules', data});

        const newModules = data.map(m => {
            return ({
                id: m.module_id,
                name: m.module_name,
                icon: m.icon,
                server: m.server,
                port: m.port,
                url: m.url
            })
        })

        state.setModules(newModules);
    })

    s.on("branchCurModule", (branchId, moduleId) => {
        const curBranches = refs.branchesRef.current;
        let curBranch = curBranches.find(branch => branch.id === branchId);
        const modules = refs.modulesRef.current;
        monitor.events(['on'], {branchId, moduleId, modules, refs});
        const curModule = modules.find(module => module.id === moduleId);

        monitor.events(['on'], {branchId, moduleId, curBranches, curBranch, modules, curModule, state});

        const {setBranch, setModule} = state;
        
        setBranch(curBranch);
        setModule(curModule);
    })
}

