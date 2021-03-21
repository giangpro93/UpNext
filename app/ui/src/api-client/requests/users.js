const { axiosInstance, logAPICall } = require('../api-client');

module.exports = {
    getAll,
    create,
    getById,
    update,
    deleteById,
    search,
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

function getById(id) {
    return logAPICall(id, () =>
        axiosInstance.get(`/users/${id}`)
    );
}

function update(userInfo) {
    const { id, ...other } = userInfo;
    return logAPICall(userInfo, () =>
        axiosInstance.put(`/users/${id}`, other)
    );
}

function deleteById(id) {
    return logAPICall(id, () =>
        axiosInstance.delete(`/users/${id}`)
    );
}

function search(term) {
    return logAPICall(term, () => 
        axiosInstance.get(`/users/search/${term}`)
    );
}

function authenticate(userInfo) {
    return logAPICall(userInfo, () => 
        axiosInstance.post('/users/authenticate/', userInfo)
    );
}