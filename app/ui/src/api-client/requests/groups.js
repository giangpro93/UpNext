const { axiosInstance, logAPICall } = require('../api-client');

module.exports = {
    getAll,
    create,
    getById,
    update,
    deleteById,
    search
}

function getAll() {
    return logAPICall(null, () => 
        axiosInstance.get('/groups/')
    );
}

function create(groupInfo) {
    return logAPICall(groupInfo, () => 
        axiosInstance.post('/groups/', groupInfo)
    );
}

function getById(id) {
    return logAPICall(id, () =>
        axiosInstance.get(`/groups/${id}`)
    );
}

function update(groupInfo) {
    const { id, ...other } = groupInfo;
    return logAPICall(groupInfo, () =>
        axiosInstance.put(`/groups/${id}`, other)
    );
}

function deleteById(id) {
    return logAPICall(id, () =>
        axiosInstance.delete(`/groups/${id}`)
    );
}

function search(term) {
    return logAPICall(term, () => 
        axiosInstance.get(`/groups/search/${term}`)
    );
}