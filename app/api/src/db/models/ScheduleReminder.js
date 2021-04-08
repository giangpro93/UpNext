const ScheduleItem = require('./ScheduleItem');
const db = require('../../knex_db');

module.exports = {
    remindersInfo,
    create,
    getById,
    getByLinkId,
    update,
    deleteById
};

function remindersInfo() {
    const attrs = ['ScheduleItem.*', 'ScheduleReminder.time', 'ScheduleReminder.link_id', 'Entity.name'];
    return db
    .select(...attrs, db.raw("T.title as link_title, 'reminder' as `type`"))
    .from('ScheduleReminder')
    .leftJoin('ScheduleItem', 'ScheduleReminder.id', 'ScheduleItem.id')
    .leftJoin('Entity', 'ScheduleItem.entity_id', 'Entity.id')
    .leftJoin('ScheduleItem as T', 'ScheduleReminder.link_id', 'T.id')
}

function create(reminder) {
    const { entity_id, title, location, description, time, link_id } = reminder;
    return time
        ? ScheduleItem.create({ entity_id, title, location, description, type: 'reminder' })
        .then(item => 
            db('ScheduleReminder')
            .insert({ id: item.id, time, link_id })
            .then(() => getById(item.id))
        )
        : Promise.reject('Could not create reminder. No time provided');
}

function getById(id) {
    return remindersInfo()
    .where('ScheduleReminder.id', id)
    .then(reminders => reminders[0]);
}

function getByLinkId(id) {
    return remindersInfo()
    .where('ScheduleReminder.link_id', id)
    .then(reminders => reminders[0]);
}

function update(reminder) {
    const { id, title, location, description, time, link_id } = reminder;
    let obj = {};
    if(time) obj.time = time;
    if(link_id) obj.link_id = link_id;
    return ScheduleItem.update({id, title, location, description})
    .then(() =>
        (Object.keys(obj).length === 0
        ? Promise.resolve()
        : db('ScheduleReminder')
        .where({id})
        .update(obj))
        .then(() => getById(id))
    );
}

function deleteById(id) {
    return getById(id)
    .then(reminder => 
        ScheduleItem.deleteById(id)
        .then(() => reminder)   
    );
}