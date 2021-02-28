const env = process.env.NODE_ENV || 'development';    // set environment
const db_config = require('../../knexfile')[env];   // pull in correct db with env configs
const db = require('knex')(db_config);           // define database based on above
const bcrypt = require('bcrypt');                       // bcrypt will encrypt passwords to be saved in db

module.exports = {
    createUser,
    loginUser,
    getUserById
};

function createUser({ firstName, lastName, email, password }) {
    // generate password hash
    return hashPassword(password)
    // insert user into db
        .then(passwordHash => 
            db('users')
            .insert({ firstName, lastName, email, passwordHash }))
        .then(() => loginUser({ email, password }))
    
    // if email not unique -> error
    // if connection issue -> error
}

function loginUser({ email, password }) {
    // get user with that email
    return db.select()
        .from('users')
        .where('email', '=', email)
        .then(users => {
            const user = users[0];
            return comparePasswords(password, user.passwordHash)
            .then(() => user);
        })
    // compare the user's password hash
}


function getUserById(id) {

}

function hashPassword(password) {
    return new Promise((resolve, reject) => {
        bcrypt.hash(password, 10, (err, hash) => {
            err ? reject('Error when hashing password') : resolve(hash);
        })
    });
}

function comparePasswords(password, hash) {
    return new Promise((resolve, reject) => {
        bcrypt.compare(password, hash, (err, match) => {
            match ? resolve(true) : reject('Invalid password');
        })
    })
}