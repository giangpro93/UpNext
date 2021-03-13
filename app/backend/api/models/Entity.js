const db = require('../../knex_db');
const { logAndThrow } = require('../helpers/errors');

module.exports = {
    create,
    getAll,
    update,
    deleteById,
    getById,
    getByEmail
};

function create(entity) {
    const { name, email, description, image } = entity;
    return db('Entity')
        .insert({ name, email, description, image })
        .then(() => getByEmail(email))
        .catch(logAndThrow('Entity creation error'));
}

function getAll() {
    return db.select().from('Entity');
}

function update(entity) {
    let { email, name, description, image } = entity;
    if(!name) name = null;
    if(!description) description = null;
    if(!image) image = null;

    const query = id =>
        db('Entity')
        .where('id', id)
        .update({id, name, description, image})
        .then(() => getById(id))
        .catch(logAndThrow('Entity update error'));

    return entity.id 
    ? query(entity.id) 
    : getByEmail(email)
        .then(e => query(e.id))
}

function deleteById(id) {
    return getById(id)
        .then(entity => 
            db('Entity')
            .where('id', id)
            .del()
            .then(() => entity)
            .catch(logAndThrow(`Could not delete entity with id = ${id}`))
        );
}

function getById(id) {
    return db.select()
    .from('Entity')
    .where('id', id)
    .then(entities => entities[0])
    .catch(logAndThrow(`Could not fetch entity with id = ${id}`));
}

function getByEmail(email) {
    return db.select()
    .from('Entity')
    .where('email', email)
    .then(entities => entities[0])
    .catch(logAndThrow(`Could not fetch entity with email = ${email}`));
}