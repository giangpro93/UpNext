const bcrypt = require('bcrypt');

module.exports = {
    hashPassword,
    comparePasswords,
};

function hashPassword(password) {
    return new Promise((resolve, reject) => 
        resolve(bcrypt.hashSync(password, 10)));
}

function comparePasswords(password, hash) {
    return new Promise((resolve, reject) =>
     bcrypt.compareSync(password, hash) ? resolve(true) : reject(false))
}