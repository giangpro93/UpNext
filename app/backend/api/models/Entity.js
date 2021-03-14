const db = require('../../knex_db');

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
        .then(() => getByEmail(email));
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
        .then(() => getById(id));

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
        );
}

function getById(id) {
    return db.first()
    .from('Entity')
    .where('id', id);
}

function getByEmail(email) {
    return db.first()
    .from('Entity')
    .where('email', email);
}