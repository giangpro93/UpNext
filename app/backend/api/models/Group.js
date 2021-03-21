const Entity = require('./Entity');
const db = require('../../knex_db');

module.exports = {
    create,
    update,
    deleteById,
    getById,
    getByEmail,
    getAll,
    search
};

function create(group) {
    const { name, email, description, image } = group;
    // generate password hash
    return Entity.create({...group, type: 'group'})
        .then(() =>
            Entity.getByEmail(email)
            .then(entity => 
                db('Group')
                .insert({ id: entity.id })
                .then(() => getById(entity.id))
        ));
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
    .first('Entity.*')
    .from('Group')
    .leftJoin('Entity', function() {
        this.on('Group.id', '=', 'Entity.id')
    })
    .where('Entity.id', id);
}

function getByEmail(email) {
    // get the entity
    return Entity.getByEmail(email)
        .where('type', 'group');
}

function getAll() {
    return db
    .select()
    .from('Entity')
    .where('type', 'group');
}

function search(term) {
    return getAll()
    .andWhere(function(q) {
        q.where('name', 'like', `%${term}%`)
        .orWhere('email', 'like', `%${term}%`)
    });
}