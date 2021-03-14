const ScheduleItem = require('./ScheduleItem');
const db = require('../../knex_db');

module.exports = {
    tasksInfo,
    create,
    getById,
    update,
    deleteById
}

function tasksInfo() {
    const attrs = ['ScheduleItem.*', 'ScheduleTask.assigned', 'ScheduleTask.due', 'Entity.name'];
    return db
    .select(...attrs, db.raw("'task' as type"))
    .from('ScheduleTask')
    .leftJoin('ScheduleItem', 'ScheduleTask.id', 'ScheduleItem.id')
    .leftJoin('Entity', 'ScheduleItem.entity_id', 'Entity.id');
}

function create(task) {
    const { entity_id, title, description, assigned, due } = task;
    return ScheduleItem.create({ entity_id, title, description })
    .then(item => 
        db('ScheduleTask')
        .insert({ id: item.id, assigned, due })
        .then(() => getById(item.id))
    );
}

function getById(id) {
    return db
    .first()
    .from('ScheduleTask')
    .leftJoin('ScheduleItem', 'ScheduleTask.id', 'ScheduleItem.id')
    .where('ScheduleTask.id', id);
}

function update(task) {
    const { id, title, description, assigned, due } = task;
    return ScheduleItem.update({id, title, description})
    .then(() => 
        db('ScheduleTask')
        .update({id, assigned, due})
        .then(() => getById(id))
    );
}

function deleteById(id) {
    return getById(id)
    .then(task => 
        ScheduleItem.deleteById(id)
        .then(() => task)   
    );
}