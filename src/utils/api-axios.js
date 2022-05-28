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

export const createTree = (server, token, icon, treeName, treeDesc, setModals, setMessage) => {
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
        setModals(prev => {
            prev.addTree = false;
            return{...prev}
        })
    })
    .catch(err => {
        console.log(err);

        if(!err.response.data) setMessage(err.message);
        else setMessage(err.response.data);
    })

}