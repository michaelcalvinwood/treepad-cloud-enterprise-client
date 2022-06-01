import { io } from 'socket.io-client';


const setSocketEventHandlers = (s, setToast) => {
    s.on('hello', data => alert(data + ' yoyo'));

    s.on('toastMessage', message => {
        console.log('toast message', message);
        setToast(message)}
    );
}

export const subscribeToResource = async (newResourceId, resourceServer, resourceId, setResourceId, resourceSocket, setResourceSocket, token, setToast) => {
    if (newResourceId === resourceId) return;

    if (!resourceSocket) {
        const connection = resourceServer;
        resourceSocket = await io(connection);
        setSocketEventHandlers(resourceSocket, setToast);
        setResourceSocket(resourceSocket);
    }

    resourceSocket.emit('resourceSubscribe', newResourceId, token);
    setResourceId(newResourceId);

}