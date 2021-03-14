const ScheduleItem = require('./ScheduleItem');
const db = require('../../knex_db');

module.exports = {
    eventsInfo,
    create,
    getById,
    update,
    deleteById
}

function eventsInfo() {
    const attrs = ['ScheduleItem.*', 'ScheduleEvent.start', 'ScheduleEvent.end', 'Entity.name'];
    return db
    .select(...attrs, db.raw("'event' as type"))
    .from('ScheduleEvent')
    .leftJoin('ScheduleItem', 'ScheduleEvent.id', 'ScheduleItem.id')
    .leftJoin('Entity', 'ScheduleItem.entity_id', 'Entity.id');
}

function create(event) {
    const { entity_id, title, description, start, end } = event;
    return ScheduleItem.create({ entity_id, title, description })
    .then(item => 
        db('ScheduleEvent')
        .insert({ id: item.id, start, end })
        .then(() => getById(item.id))
    );
}

function getById(id) {
    return eventsInfo()
    .where('ScheduleEvent.id', id)
    .then(events => events[0]);
}

function update(event) {
    const { id, title, description, start, end } = event;
    return ScheduleItem.update({id, title, description})
    .then(() => 
        db('ScheduleEvent')
        .update({id, start, end})
        .then(() => getById(id))
    );
}

function deleteById(id) {
    return getById(id)
    .then(event => 
        ScheduleItem.deleteById(id)
        .then(() => event)   
    );
}