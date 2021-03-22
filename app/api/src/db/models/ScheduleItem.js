const db = require('../../knex_db');

module.exports = {
    create,
    getById,
    update,
    deleteById
}

function create(item) {
    const { entity_id, title, description, type } = item;
    return db('ScheduleItem')
    .insert(item)
    .then(() =>
        db.first()
        .from('ScheduleItem')
        .where('entity_id', entity_id)
        .andWhere('title', title)
        .andWhere('description', description)
        .orderBy('id', 'desc')
    );
}

function getById(id) {
    return db
    .first()
    .from('ScheduleItem')
    .where('id', id);
}

function update(item) {
    const { id, title, description } = item;
    let obj = {};
    if(title) obj.title = title;
    if(description) obj.description = description;
    return Object.keys(obj).length === 0
    ? getById(id)
    : db('ScheduleItem')
        .where({id})
        .update(item)
        .then(() => getById(id))
}

function deleteById(id) {
    return getById(id)
    .then(item => 
        db('ScheduleItem')
        .where('id', id)
        .del()
        .then(() => item)
    );
}