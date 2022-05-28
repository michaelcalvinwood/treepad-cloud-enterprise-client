import axios from "axios";

export const getTrees = (server, token, setTreeInfo) => {
    const request = {
        url: `${server}/trees`,
        method: 'get',
        params: {
            token: token
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