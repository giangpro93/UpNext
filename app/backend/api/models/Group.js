const Entity = require('./Entity');
const db = require('../../knex_db');
const { logAndThrow } = require('../helpers/errors');

module.exports = {
    create,
    update,
    deleteById,
    getById,
    getByEmail,
    getAll
};

function create(group) {
    const { name, email, description, image } = group;
    // generate password hash
    return Entity.create(group)
        .then(() =>
            Entity.getByEmail(email)
            .then(entity => 
                db('Group')
                .insert({ id: entity.id })
                .then(() => getById(entity.id))
        ))
        // .then(() => authenticate({ email, password }))
        .catch(logAndThrow('Group creation failed'));
}

function update(group) {
    return Entity.update(group);
}


function deleteById(id) {
    // automatically deletes user due to CASCADE
    return Entity.deleteById(id);
}

function getById(id) {
    // get the entity
    return db
    .select('Entity.*')
    .from('Group')
    .leftJoin('Entity', function() {
        this.on('Group.id', '=', 'Entity.id')
    })
    .where('Entity.id', id)
    .then(groups => groups[0])
    .catch(logAndThrow('Could not fetch group'));
}

function getByEmail(email) {
    // get the entity
    return Entity.getByEmail(email)
    // check that the entity is a group
    // if so, return the entity object
    .then(entity => getById(entity.id));
}

function getAll() {
    return db
    .select('Entity.*')
    .from('Group')
    .leftJoin('Entity', function() {
        this.on('Group.id', '=', 'Entity.id')
    });
}