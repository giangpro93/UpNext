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
    const { entity_id, title, location, description, assigned, due, reminder } = task;
    let obj = {};
    if(assigned) obj.assigned = assigned;
    if(due) obj.due = due;
    return ScheduleItem.create({ entity_id, title, location, description, type: 'task' })
    .then(item => 
        db('ScheduleTask')
        .insert({ id: item.id, ...obj })
        .then(() => getById(item.id))
        .then(t => {
            let p = Promise.resolve();
            if(reminder) 
                p = ScheduleReminder.create({ entity_id: t.entity_id, time: reminder, title: `Reminder: ${t.title}`, location: t.location, description: `Reminder: ${t.title}`, link_id: t.id})
            return p.then(() => t);
        })
    );
}

function getById(id) {
    return tasksInfo()
    .where('ScheduleTask.id', id)
    .then(tasks => tasks[0]);
}

function update(task) {
    const { id, title, location, description, assigned, due, reminder } = task;
    let obj = {};
    if(assigned) obj.assigned = assigned;
    if(due) obj.due = due;
    return ScheduleItem.update({id, title, location, description})
    .then(() => 
        (Object.keys(obj).length === 0
        ? Promise.resolve()
        : db('ScheduleTask')
            .where({id})
            .update(obj))
        .then(() => 
            getById(id)
            .then(t => {
                let p = Promise.resolve();
                if(reminder)
                    p = ScheduleReminder.getByLinkId(e.id)
                        .then(r => ScheduleReminder.update({ entity_id: t.entity_id, time: reminder, title: `Reminder: ${t.title}`, location: t.location, description: `Reminder: ${t.title}`, link_id: t.id}))
                        .catch(() => ScheduleReminder.create({ entity_id: t.entity_id, time: reminder, title: `Reminder: ${t.title}`, location: t.location, description: `Reminder: ${t.title}`, link_id: t.id}))
            
                return p.then(() => t)
            })
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