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
        .catch(logAndThrow('Entity creation error'));
}

function getAll() {
    return db.select().from('Entity');
}

function update(entity) {
    let { id, name, description, image } = entity;
    if(!name) name = null;
    if(!description) description = null;
    if(!image) image = null;

    // return db.raw('update Entity set name = ?, description = ? where id = ?',
    //     [name, description, id])
    //     .then(res => res.rows)
    //     .catch(logAndThrow('Entity update error'));
    return db('Entity')
        .where('id', id)
        .update({name, description, image})
        .catch(logAndThrow('Entity update error'));
}

function deleteById(id) {
    return db('Entity')
        .where('id', id)
        .del()
        .catch(logAndThrow(`Could not delete entity with id = ${id}`));
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