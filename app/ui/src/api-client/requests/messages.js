const { axiosInstance, logAPICall } = require('../api-client');

module.exports = {
    getAll,
    create,
    recentMessengers,
    getConversation
};

function getAll() {
    return logAPICall(null, () => 
        axiosInstance.get('/messages/')
    );
}

function create(message) {
    return logAPICall(message, () => 
        axiosInstance.post('/messages/', message)
    );
}

function recentMessengers(entity_id) {
    return logAPICall(entity_id, () => 
        axiosInstance.get(`/messages/${entity_id}`)
    );
}

function getConversation(messengers) {
    return logAPICall(messengers, () => 
        axiosInstance.get('/messages/conversation/', {data: messengers})
    );
}