import moment from 'moment';

export function dateStrFormat(date) {
    return moment(date).format('MMMM Do YYYY, h:mm a');
}

export function dateInputFormat(date) {
    return moment(date).format('YYYY-MM-DDThh:mm');
}