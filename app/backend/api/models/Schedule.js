const ScheduleItem = require('./ScheduleItem');
const ScheduleEvent = require('./ScheduleEvent');
const ScheduleReminder = require('./ScheduleReminder');
const ScheduleTask = require('./ScheduleTask');
const Membership = require('./Membership');

module.exports = {
    getById,
    getEntitySchedule
};

function getById(id) {
    return ScheduleItem.getById(id)
    .then(item => {
        if(item.id === 'event') 
            return ScheduleEvent.getById(id)
        else if(item.id === 'task') 
            return ScheduleTask.getById(id)
        else 
            return ScheduleReminder.getById(id)
    });
}

function getEntitySchedule(entity_id) {
    return Membership.getUserMemberships(entity_id)
    .then(memberships => {
        const ids = [entity_id, ...memberships.map(m => m.group_id)]
        return ScheduleEvent.eventsInfo()
        .whereIn('ScheduleItem.entity_id', ids)
        .then(events => 
            ScheduleTask.tasksInfo()
            .whereIn('ScheduleItem.entity_id', ids)
            .then(tasks => 
                ScheduleReminder.remindersInfo()
                .whereIn('ScheduleItem.entity_id', ids)
                .then(reminders => 
                    [...events, ...tasks, ...reminders]
                )       
            )
        )
    });
}