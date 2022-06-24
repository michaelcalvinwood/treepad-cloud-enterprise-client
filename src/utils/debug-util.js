let eventList = [
    'showSelectedBranch',
    'renderBranches'
];

export const eventDebug = (dEvent, message) => {
    return;
    const test = eventList.find(ev => ev === dEvent);
    if (!test) return;
    
    console.log(`${dEvent}:Client`,message);
}