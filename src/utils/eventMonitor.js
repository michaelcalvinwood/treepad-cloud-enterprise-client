exports.pretty = v => console.log(JSON.stringify(v, null, 4));
exports.j = str => JSON.stringify(str, null, 4);

/* Registered events:

    clickLoginSubmit
    displayModules
    emit
    on

*/


const eventList = ['on', 'emit', 'displayModules'];

exports.events = (events, info) => {
    if (!eventList) return;
    if (!Array.isArray(events)) return;

    const isSet = events.find(event => {
        const isInList = eventList.indexOf(event);
        return isInList === -1 ? false : true;
    })

    if (!isSet) return;

    console.log(info);

    //console.log(JSON.stringify(info, null, 4));
    return;
}