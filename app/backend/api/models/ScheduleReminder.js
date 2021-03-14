const ScheduleItem = require('./ScheduleItem');
const db = require('../../knex_db');

module.exports = {
    remindersInfo,
    create,
    getById,
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
    const { entity_id, title, description, time, link_id } = reminder;
    return ScheduleItem.create({ entity_id, title, description })
    .then(item => 
        db('ScheduleReminder')
        .insert({ id: item.id, time, link_id })
        .then(() => getById(item.id))
    );
}

function getById(id) {
    return remindersInfo()
    .where('ScheduleReminder.id', id)
    .then(reminders => reminders[0]);
}

function update(reminder) {
    const { id, title, description, time, link_id } = reminder;
    return ScheduleItem.update({id, title, description})
    .then(() => 
        db('ScheduleReminder')
        .update({id, time, link_id})
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