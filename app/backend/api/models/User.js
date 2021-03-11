
const Entity = require('./Entity');
const { hashPassword, comparePasswords } = require('../helpers/passwords');
const db = require('../../knex_db');
const { logAndThrow } = require('../helpers/errors');

module.exports = {
    create,
    update,
    authenticate,
    deleteById,
    getById,
    getByEmail
};

function create(user) {
    const { name, email, password } = user;
    // generate password hash
    return Entity.create({name, email})
        .then(() => hashPassword(password))
    // insert user into db
        .then(password_hash =>
            Entity.getByEmail(email)
            .then(entity => 
                db('User')
                .insert({ id: entity.id, password_hash })
        ))
        // .then(() => authenticate({ email, password }))
        .catch(logAndThrow('User creation failed'));
}

function update(user) {
    const { id, name, email, description, image, password } = user;
    return Entity.update({id, name, email, description, image})
    .then(() =>
        password 
        ? hashPassword(password)
            .then(password_hash => 
                db('User')
                .where('id', id)
                .update({ id, password_hash }))
        : Promise.resolve()
    )
}

// checks for user with that email and password,
// then returns the user's info
function authenticate({ email, password }) {
    // get user with that email
    return getByEmail(email)
        .then(user => 
            // compare the user's password hash with given password
            comparePasswords(password, user.password_hash)
            .then(() => user)
        )
        .catch(logAndThrow(`User authentication failed (email = ${email})`))
}

function deleteById(id) {
    // automatically deletes user due to CASCADE
    return Entity.deleteById(id);
}

function getById(id) {
    // get the entity
    return Entity.getById(id)
    // check that the entity is a user
    // if so, return the entity object
    .then(entity => 
        db.select()
        .from('User')
        .where('id', id)
        .then(users => users[0])
        .then(user => ({...entity, password_hash: user.password_hash}))
        .catch(logAndThrow('Could not fetch user'))
    )
}

function getByEmail(email) {
    // get the entity
    return Entity.getByEmail(email)
    // check that the entity is a user
    // if so, return the entity object
    .then(entity => 
        db.select()
        .from('User')
        .where('id', entity.id)
        .then(users => users[0])
        .then(user => ({...entity, password_hash: user.password_hash}))
        .catch(logAndThrow('Could not fetch user'))
    )
}