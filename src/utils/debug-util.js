let eventList = [
    'socketReceive'
];

export const eventDebug = (dEvent, message) => {
    const test = eventList.find(ev => ev === dEvent);
    if (!test) return;
    
    console.log(`${dEvent}:Client`,message);
}