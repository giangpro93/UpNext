
module.exports = {
    addDays,
    addHours
};

function addDays(date, days) {
    let date_ = new Date(date);
    date_.setDate(date_.getDate() + days);
    return date_;
}

function addHours(date, hours) {
    let date_ = new Date(date);
    date_.setTime(date_.getTime() + (hours * 60 * 60 * 1000));
    return date_;
}