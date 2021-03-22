
const Entity = require('./Entity');
const { hashPassword, comparePasswords } = require('../../helpers/passwords');
const db = require('../../knex_db');

module.exports = {
    create,
    update,
    authenticate,
    deleteById,
    getById,
    getByEmail,
    getAll,
    search
};

function create(user) {
    const { name, email, password } = user;
    // generate password hash
    return Entity.create({name, email, type: 'user'})
        .then(() => hashPassword(password))
    // insert user into db
        .then(password_hash =>
            Entity.getByEmail(email)
            .then(entity => 
                db('User')
                .insert({ id: entity.id, password_hash })
                .then(() => getById(entity.id))
        ))
        .then(() => authenticate({ email, password }));
}

function update(user) {
    const { id, name, email, description, image, password } = user;
    return Entity.update({id, name, email, description, image})
    .then(() =>
        (password 
        ? hashPassword(password)
            .then(password_hash => 
                db('User')
                .where('id', id)
                .update({ id, password_hash }))
        : Promise.resolve())
        .then(() => getById(id))
    );
}

// checks for user with that email and password,
// then returns the user's info
function authenticate({ email, password }) {
    // get user with that email
    return getByEmail(email)
        .then(user => 
            db.first('password_hash')
            .from('User')
            .where('id', user.id)
            .then(res => res.password_hash)
            .then(hash => 
                // compare the user's password hash with given password
                comparePasswords(password, hash)
            )
            .then(() => user)
        );
}

function deleteById(id) {
    // automatically deletes user due to CASCADE
    return getById(id)
    .then(user => 
        Entity.deleteById(id)
        .then(() => user)
    );
}

function getById(id) {
    // get the entity
    return db
    .first('Entity.*')
    .from('User')
    .leftJoin('Entity', 'User.id', 'Entity.id')
    .where('Entity.id', id);
}

function getByEmail(email) {
    // get the entity
    return Entity.getByEmail(email)
        .where('type', 'user');
}

function getAll() {
    return db
    .select()
    .from('Entity')
    .where('type', 'user');
}

function search(term) {
    return getAll()
    .andWhere(function(q) {
        q.where('name', 'like', `%${term}%`)
        .orWhere('email', 'like', `%${term}%`)
    });
    // return db.raw(
    //     "select * from Entity where type = 'user' and ((name like '%?%') or (email like '%?%'))",
    //     [term, term]
    // )
}