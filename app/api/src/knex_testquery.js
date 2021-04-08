const db = require('./knex_db');
const Models = require('./db/Models');

const term = 'user';
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

const userNames = ['User User', 'John Lee', 'Stacy Stevenson', 'Michael Johnson', 'Lauren Smith', 'Tom Davidson', 'Abby Jones'];

const removeSpaces = str => str.split(' ').join('');

const userFromName = name => ({
    name,
    email: removeSpaces(name) + '@ku.edu',
    description: `Hi, my name is ${name}. I am a student at KU.`,
    password: 'password'
});


Promise.all(userNames.map(name => Models.User.create(userFromName(name))))
.then(console.log)
.catch(console.log);