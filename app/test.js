const { hashPassword, comparePasswords } = require('./backend/api/helpers');

const mkHash = () => {
    const hash = hashPassword('password');
    return hash;
}

const cmpHash = () => {
    const hash = mkHash();
    if(comparePasswords('password', hash))
        console.log('Matched!');
    else
        console.log('Failed');
}

cmpHash();