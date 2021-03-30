const moment = require('moment-timezone');


const timezone = 'America/Chicago';
module.exports = {
    dateInputFormat,
    dateStrFormat,
    dateStore,
    toUTC,
    toLocal,
    format
}

function dateStrFormat(date) {
    return dateStore(date)
        .format('MMMM Do YYYY, h:mm a');
}

function dateInputFormat(date) {
    return format(dateStore(date));
}

// store as local timezone
function dateStore(date) {
    return moment.tz(date, timezone);
}

function toUTC(date) {
    return dateStore(date).utc();
}

function toLocal(date) {
    return dateStore(date);
}

function format(date) {
    return date.format('YYYY-MM-DDTHH:mm');
}