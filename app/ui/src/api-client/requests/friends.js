const { axiosInstance, logAPICall } = require('../api-client');

module.exports = {
    getAll,
    create,
    deleteFriend,
    get,
    acceptFriendRequest,
    getUserUnacceptedFriends,
    getUserFriends
}

function getAll() {
    return logAPICall(null, () => 
        axiosInstance.get('/friends/')
    );
}

function create(friendRequest) {
    return logAPICall(friendRequest, () => 
        axiosInstance.post('/friends/', friendRequest)
    );
}

function deleteFriend(friendRequest) {
    return logAPICall(friendRequest, () => 
        axiosInstance.delete('/friends/', friendRequest)
    );
}

function get(friendRequest) {
    return logAPICall(friendRequest, () => 
        axiosInstance.get('/friends/get', friendRequest)
    );
}

function acceptFriendRequest(friendRequest) {
    return logAPICall(friendRequest, () =>
        axiosInstance.put('/friends/accept/', friendRequest)
    );
}

function getUserUnacceptedFriends(user_id) {
    return logAPICall(user_id, () => 
        axiosInstance.get(`/friends/unaccepted/${user_id}`)
    );
}

function getUserFriends(user_id) {
    return logAPICall(user_id, () => 
        axiosInstance.get(`/friends/accepted/${user_id}`)
    );
}