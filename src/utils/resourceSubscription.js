import { io } from 'socket.io-client';


const setSocketEventHandlers = (info) => {
    const s = info.resourceSocket;

    s.on('toastMessage', message => {
        console.log('toast message', message);
        info.setToast(message)}
    );

    s.on('branchOrder', branchOrder => {
        console.log(branchOrder);
    })
}

export const subscribeToResource = info => {
    if (info.newResourceId === info.resourceId) return;

    if (!info.resourceSocket) {
        const connection = info.server;
        info.resourceSocket = io(connection);
        setSocketEventHandlers(info);
        info.setResourceSocket(info.resourceSocket);
    }

    info.resourceSocket.emit('resourceSubscribe', info.newResourceId, info.token);
    info.setResourceId(info.newResourceId);
}