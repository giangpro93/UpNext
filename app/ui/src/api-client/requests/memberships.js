const { axiosInstance, logAPICall } = require('../api-client');

module.exports = {
    getAll,
    create,
    deleteMembership,
    get,
    makeAdmin,
    getContainingId,
    getGroupsOfUser,
    getUsersOfGroup
}

function getAll() {
    return logAPICall(null, () => 
        axiosInstance.get('/memberships/')
    );
}

function create(membershipInfo) {
    return logAPICall(membershipInfo, () => 
        axiosInstance.post('/memberships/', membershipInfo)
    );
}

function deleteMembership(membershipInfo) {
    return logAPICall(membershipInfo, () =>
        axiosInstance.delete('/memberships/', membershipInfo)
    );
}

function get(membershipInfo) {
    return logAPICall(membershipInfo, () =>
        axiosInstance.get('/memberships/get/', membershipInfo)
    );
}

function makeAdmin(membershipInfo) {
    return logAPICall(membershipInfo, () =>
        axiosInstance.put('/membership/makeadmin/', membershipInfo)
    );
}

function getContainingId(entity_id) {
    return logAPICall(entity_id, () =>
        axiosInstance.get(`/memberships/${entity_id}`)
    );
}

function getGroupsOfUser(user_id) {
    return logAPICall(user_id, () => 
        axiosInstance.get(`/memberships/groups/${user_id}`)
    );
}

function getUsersOfGroup(group_id) {
    return logAPICall(group_id, () => 
        axiosInstance.get(`/memberships/users/${group_id}`)
    );
}
