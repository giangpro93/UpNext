const { axiosInstance, logAPICall } = require('../api-client');

module.exports = {
    getScheduleItemById,
    deleteScheduleItemById,
    createEvent,
    updateEvent,
    createTask,
    updateTask,
    createReminder,
    updateReminder,
    getEntityScheduleById
};

function getScheduleItemById(item_id) {
    return logAPICall(item_id, () => 
        axiosInstance.get(`/schedule/${item_id}`)
    );
}

function deleteScheduleItemById(item_id) {
    return logAPICall(item_id, () => 
        axiosInstance.delete(`/schedule/${item_id}`)
    );
}

function createEvent(event) {
    return logAPICall(event, () => 
        axiosInstance.post('/schedule/event/', event)
    );
}

function updateEvent(event) {
    return logAPICall(event, () => 
        axiosInstance.put('/schedule/event/', event)
    );
}

function createTask(task) {
    return logAPICall(task, () => 
        axiosInstance.post('/schedule/task/', task)
    );
}

function updateTask(task) {
    return logAPICall(task, () => 
        axiosInstance.put('/schedule/task/', task)
    );
}

function createReminder(reminder) {
    return logAPICall(reminder, () => 
        axiosInstance.post('/schedule/reminder/', reminder)
    );
}

function updateReminder(reminder) {
    return logAPICall(reminder, () => 
        axiosInstance.put('/schedule/reminder/', reminder)
    );
}

function getEntityScheduleById(entity_id) {
    return logAPICall(entity_id, () => 
        axiosInstance.get(`/schedule/get/${entity_id}`)
    );
}
