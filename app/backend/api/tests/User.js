const User = require('../models/User');
const Entity = require('./Entity');

const testUser = {
    name: 'Test User',
    email: 'testuser@testuser.com',
    password: 'password'
};

module.exports = [
    {
        title: 'Create user',
        test: () => User.create(testUser)
    },
    {
        title: 'Authenticate user with valid password',
        test: () => User.authenticate(testUser)
    },
    {
        title: 'Authenticate user with invalid password',
        test: () => 
            User.authenticate({...testUser, password: 'wrong'})
            .then(() => { throw('Authentication succeeded on invalid password') })
            .catch(() => true)
    },
    {
        title: 'Get user by email',
        test: () => User.getByEmail(testUser.email)
    },
    {
        title: 'Get user by id',
        test: () => 
            User.getByEmail(testUser.email)
            .then(user => 
                User.getById(user.id)
            )
    },
    {
        title: 'Update user and password',
        test: () =>
            User.getByEmail(testUser.email)
            .then(user => 
                User.update({id: user.id, ...testUser, password: 'newpassword'})
            )
    },
    {
        title: 'Authenticate user after changed password with valid password',
        test: () => User.authenticate({email: testUser.email, password: 'newpassword'})
    },
    {
        title: 'Delete user',
        test: () =>
            User.getByEmail(testUser.email)
            .then(user => User.deleteById(user.id))
    }
]