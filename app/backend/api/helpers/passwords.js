const bcrypt = require('bcrypt');

module.exports = {
    hashPassword,
    comparePasswords,
};

function hashPassword(password) {
    return bcrypt.hashSync(password, 10);
}

function comparePasswords(password, hash) {
    return bcrypt.compareSync(password, hash)
}