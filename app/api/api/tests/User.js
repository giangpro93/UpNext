const User = require('../models/User');

const testUser = {
    name: 'Test User',
    email: 'testuser@testuser.com',
    password: 'password'
};

module.exports = [
    {
        title: 'Create user',
        test: () => 
            User.create(testUser)
            .then(console.log)
    },
    {
        title: 'Authenticate user with valid password',
        test: () => 
            User.authenticate(testUser)
            .then(console.log)
    },
    {
        title: 'Authenticate user with invalid password',
        test: () => 
            User.authenticate({...testUser, password: 'wrong'})
            .then(user => { throw('Authentication succeeded on invalid password')})
            .catch(() => true)

    },
    {
        title: 'Fetch user',
        test: () => 
            User.getByEmail(testUser.email)
            .then(console.log)
    },
    {
        title: 'Get all users',
        test: () =>
            User.getAll()
            .then(users => {
                console.log(`Number of users: ${users.length}`);
            })
    },
    {
        title: 'Update user and password',
        test: () =>
            User.getByEmail(testUser.email)
            .then(user => 
                User.update({
                    id: user.id, 
                    ...testUser, 
                    description: 'Updated description', 
                    password: 'newpassword'
                })
            )
            .then(console.log)
    },
    {
        title: 'Authenticate user after changed password with valid password',
        test: () => 
            User.authenticate({email: testUser.email, password: 'newpassword'})
            .then(console.log)
    },
    {
        title: 'Delete user',
        test: () =>
            User.getByEmail(testUser.email)
            .then(user => User.deleteById(user.id))
            .then(console.log)
    }
]