import axios from "axios";

export const getTrees = (server, token, setTreeInfo) => {
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
        setTreeInfo(res.data)
    })
    .catch(err => {
        console.log('Get trees db error', err);
    })
}

export const createTree = (server, token, icon, treeName, treeDesc, setModals, setMessage, setTreeInfo) => {
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
        setTreeInfo(res.data);
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

export const editTree = (server, token, icon, treeId, treeName, treeDesc, setModals, setMessage, setTreeInfo) => {
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
        setTreeInfo(res.data);
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
            const newTreeList = prev.filter(tree => tree.tree_id !== treeId);
            return ([...newTreeList]);
        });
    })
    .catch(err => {
        console.log(err);

        if(!err.response.data) setToast(err.message);
        else setToast(err.response.data);
    })
}