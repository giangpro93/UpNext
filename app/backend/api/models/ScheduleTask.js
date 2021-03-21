const ScheduleItem = require('./ScheduleItem');
const ScheduleReminder = require('./ScheduleReminder');
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
    let obj = {};
    if(assigned) obj.assigned = assigned;
    if(due) obj.due = due;
    return ScheduleItem.create({ entity_id, title, description, type: 'task' })
    .then(item => 
        db('ScheduleTask')
        .insert({ id: item.id, ...obj })
        .then(() => getById(item.id))
        .then(task => 
            (reminder 
            ? ScheduleReminder.create({...reminder, link_id: task.id})
            : Promise.resolve())
            .then(() => task)
        )
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
    const { id, title, description, assigned, due, reminder } = task;
    let obj = {};
    if(assigned) obj.assigned = assigned;
    if(due) obj.due = due;
    return ScheduleItem.update({id, title, description})
    .then(() => 
        (Object.keys(obj).length === 0
        ? Promise.resolve()
        : db('ScheduleTask')
            .where({id})
            .update(obj))
        .then(() => 
            getById(id)
            .then(t =>
                (reminder 
                ? ScheduleReminder.create({...reminder, entity_id: t.entity_id, link_id: id})
                : Promise.resolve())
                .then(() => t)
            )
        )
    );
}

function deleteById(id) {
    return getById(id)
    .then(task => 
        ScheduleItem.deleteById(id)
        .then(() => task)   
    );
}