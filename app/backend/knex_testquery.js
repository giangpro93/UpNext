const db = require('./knex_db');
const ScheduleEvent = require('./api/models/ScheduleEvent');

const id = 1;
const user_id = 1;
const requested_id = 1;
const requester_id = 3;
const group_id = 11;

const id1 = 1;
const id2 = 2;
const sender_id = 1;
const receiver_id = 2;
const creator_id = 1;
const context_id = 1;

const item = { 
    entity_id: 1,
    title: 'Test title',
    description: 'Test description'
}

const post_attrs = ['Post.post_id', 'Post.creator_id', 'Post.content', 'Entity.name', 'Entity.email', 'Entity.image', 'Post.created_at'];
const reminders_attrs = ['ScheduleItem.*', 'ScheduleReminder.time', 'ScheduleReminder.link_id', 'Entity.name'];
const tasks_attrs = ['ScheduleItem.*', 'ScheduleTask.assigned', 'ScheduleTask.due', 'Entity.name'];
const events_attrs = ['ScheduleItem.*', 'ScheduleEvent.start', 'ScheduleEvent.end', 'Entity.name'];

const query = 
ScheduleEvent.eventsInfo()
.where('ScheduleEvent.id', id);

console.log(query.toSQL().toNative());
query.then(console.log).catch(console.log)