const { axiosInstance, logAPICall } = require('../api-client');

module.exports = {
    getAll,
    create,
    getById,
    deleteById,
    getEntityGlobalPosts,
    getUserFeed,
    getGroupForumPosts,
}

function getAll() {
    return logAPICall(null, () => 
        axiosInstance.get('/posts/')
    );
}

function create(post) {
    return logAPICall(post, () => 
        axiosInstance.post('/posts/', post)
    );
}

function getById(post_id) {
    return logAPICall(post_id, () => 
        axiosInstance.get(`/posts/${post_id}`)
    );
}

function deleteById(post_id) {
    return logAPICall(post_id, () => 
        axiosInstance.delete(`/posts/${post_id}`)
    );
}

function getEntityGlobalPosts(entity_id) {
    return logAPICall(entity_id, () => 
        axiosInstance.get(`/posts/by/${entity_id}`)
    );
}

function getUserFeed(user_id) {
    return logAPICall(user_id, () => 
        axiosInstance.get(`/posts/feed/${user_id}`)
    );
}

function getGroupForumPosts(group_id) {
    return logAPICall(group_id, () => 
        axiosInstance.get(`/posts/forum/${group_id}`)
    );
}

