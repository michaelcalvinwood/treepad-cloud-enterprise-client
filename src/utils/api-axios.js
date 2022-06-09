import axios from "axios";
import { filterSharp } from "ionicons/icons";

const convertDbTreeToStateTree = tree => {
    let filtered = {};
    filtered.color = tree.color;
    filtered.icon = tree.icon;
    filtered.ownerName = tree.ownerName || tree.owner_name;
    filtered.desc = tree.desc || tree.treeDesc || tree.tree_desc;
    filtered.id = tree.id || tree.treeId || tree.tree_id;
    filtered.name = tree.name || tree.treeName || tree.tree_name;
    filtered.type = tree.type;
    filtered.updatedTs = tree.updatedTs || tree.updated_ts;
    return filtered;
}

export const getTrees = (server, token, setTrees) => {
    const request = {
        url: `${server}/trees`,
        method: 'get',
        headers: {
            Authorization: `Bearer ${token}`
        }
    }

    axios(request)
    .then(res => {
        console.log('Get trees data', res.data);
        const trees = res.data.map(tree => convertDbTreeToStateTree(tree));
        setTrees(trees)
    })
    .catch(err => {
        console.log('Get trees db error', err);
    })
}

export const createTree = (server, token, icon, treeName, treeDesc, setModals, setMessage, setTrees) => {
    const request = {
        url: `${server}/trees`,
        method: 'post',
        headers: {
            Authorization: `Bearer ${token}`
        },
        data: {
            icon,
            treeName,
            treeDesc
        }
    }

    axios(request)
    .then(res => {
        console.log(`axios create tree`, res.data);
        const treeInfo = res.data.map(tree => convertDbTreeToStateTree(tree));

        setTrees(treeInfo);
        setModals(prev => {
            prev.addTree.active = false;
            return{...prev}
        })
    })
    .catch(err => {
        console.log(err);

        if(!err.response) setMessage(err.message);
        else setMessage(err.response.data);
    })
}

export const editTree = (server, token, icon, treeId, treeName, treeDesc, setModals, setMessage, setTrees) => {
    const request = {
        url: `${server}/tree/${treeId}`,
        method: 'put',
        headers: {
            Authorization: `Bearer ${token}`
        },
        data: {
            icon,
            treeName,
            treeDesc
        }
    }

    axios(request)
    .then(res => {
        setTrees(res.data);
        setModals(prev => {
            prev.addTree.active = false;
            return{...prev}
        })
    })
    .catch(err => {
        console.log(err);

        if(!err.response) setMessage(err.message);
        else setMessage(err.response.data);
    })
}

export const deleteTree = (server, token, treeId, setTreeInfo, setToast) => {
    const request = {
        url: `${server}/tree/${treeId}`,
        method: 'delete',
        headers: {
            Authorization: `Bearer ${token}`
        }    
    }

    axios(request)
    .then(res => {
        setTreeInfo(prev => {
            const newTreeList = prev.filter(tree => tree.treeId !== treeId);
            return ([...newTreeList]);
        });
    })
    .catch(err => {
        console.log(err);

        if(!err.response.data) setToast(err.message);
        else setToast(err.response.data);
    })
}