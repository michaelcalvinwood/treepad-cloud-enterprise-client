import { io } from 'socket.io-client';


const setSocketEventHandlers = s => {
    s.on('hello', data => alert(data + ' yoyo'));
}

export const subscribeToResource = (newResourceId, resourceServer, resourceId, setResourceId, resourceSocket, setResourceSocket) => {
    if (newResourceId === resourceId) return;

    if (resourceSocket) {
        resourceSocket.emit('resourceSubscribe', newResourceId);
        setResourceId(newResourceId);
        return;
    }

    const connection = resourceServer;
    console.log(`trying to connect to ${connection}`);
    const s = io(connection);
    setSocketEventHandlers(s);
    setResourceSocket(s);
    setResourceId(newResourceId);
    console.log(`Connected to ${connection}`);
}