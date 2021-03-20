const { apiRoute, axiosInstance, axiosConfig, logAPICall } = require('../api-client');

// const fakeUser = {
//     id: 0,
//     firstName: 'John',
//     lastName: 'Smith',
//     email: 'johnsmith@gmail.com',
//     bio: ''
// }

module.exports = {
    getAll,
    create,
    authenticate
}

function getAll() {
    return logAPICall(null, () => 
        axiosInstance.get('/users/')
    );
}

function create(userInfo) {
    return logAPICall(userInfo, () => 
        axiosInstance.post('/users/', userInfo)
    );
}

function authenticate(userInfo) {
    return logAPICall(userInfo, () => 
        axiosInstance.post('/users/authenticate/', userInfo)
    );
}