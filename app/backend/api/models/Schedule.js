const ScheduleEvent = require('./ScheduleEvent');
const ScheduleReminder = require('./ScheduleReminder');
const ScheduleTask = require('./ScheduleTask');
const Membership = require('./Membership');

module.exports = {
    getEntitySchedule
};

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