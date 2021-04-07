const Models = require('../Models');
const { addDays, addHours } = require('../../helpers/dates');

const random = () => { return Math.random(); }

const removeSpaces = str => str.split(' ').join('');

const userFromName = (name, is_prof) => ({
    name,
    email: removeSpaces(name) + '@ku.edu',
    description: `Hi, my name is ${name}` + is_prof ? 'I am a professor at KU' : 'I am a student at KU' ,
    password: 'password'
});

const groupFromName = (name, is_class) => ({
    name,
    email: removeSpaces(name) + '@ku.edu',
    description: `Welcome to the group: ${name}. This is ${is_class ? 'a class' : 'an organization'} at KU`,
});

const promiseMapList = (list, mapElementToPromise) => 
    Promise.all(list.map(e => mapElementToPromise(e)));

const professorNames = ['Dr. Henry Jacob', 'Dr. Ann Sally', 'Dr. Curtis Shelby'];
const studentNames = ['John Lee', 'Stacy Stevenson', 'Michael Johnson', 'Lauren Smith', 'Tom Davidson', 'Abby Jones', 'Grace Long', 'Brad White', 'Stacy Young', 'Chris Loveland', 'User User'];
const classNames = ['EECS 168', 'MATH 125', 'ECON 142'];
const orgNames = ['Investing Club', 'Programming Club', 'Running Club'];

const createProfessors = () => Promise.all(professorNames.map(name => Models.User.create(userFromName(name, true))));
const createStudents = () => Promise.all(studentNames.map(name => Models.User.create(userFromName(name, false))));
const createClasses = () => Promise.all(classNames.map(name => Models.Group.create(groupFromName(name, true))));
const createOrgs = () => Promise.all(orgNames.map(name => Models.Group.create(groupFromName(name, true))));

exports.seed = function(knex) {
    return createProfessors()
    .then(profs =>
        createStudents()
        .then(students => 
            createClasses()
            .then(classes => 
                createOrgs()
                .then(orgs => {
                    const users = [...profs, ...students];
                    const groups = [...classes, ...orgs];
                    const enities = [...users, ...groups];
                    const now = new Date();

                    const getEntity = entities => name => 
                        entities.filter(e => e.name === name)[0];

                    const getUser = getEntity(users);
                    const getGroup = getEntity(groups);

                    const createMemberships = () => {
                        // create admin (professor) of each class
                        let profAdmins = [];
                        for(let i=0; i < classes.length; i++) {
                            profAdmins.push({
                                user_id: profs[i].id,
                                group_id: classes[i].id,
                                is_admin: true
                            });
                        }

                        // create admin (student) of each organization
                        let orgAdmins = [];
                        for(let i=0; i < orgs.length; i++) {
                            orgAdmins.push({
                                user_id: students[i].id,
                                group_id: orgs[i].id,
                                is_admin: true
                            });
                        }

                        let otherMemberships = [];
                        students.forEach((s, i) => {
                            groups.forEach((g, j) => {
                                if(j !== i + classes.length && (s.id + g.id % 2 === 0 || Math.floor(random()) === 0)) {
                                    otherMemberships.push({
                                        user_id: s.id,
                                        group_id: g.id,
                                        is_admin: false
                                    });
                                }
                            });
                        });

                        return promiseMapList(
                            [...profAdmins, ...orgAdmins, ...otherMemberships], 
                            Models.Membership.create
                        );

                    };

                    const createFriendRequests = () => {
                        let requests = [];
                        users.forEach((u1, i) => {
                            users.slice(i + 1).forEach((u2, j) => {
                                if(u1.id + u2.id % 2 === 0 || Math.floor(random()) === 0) {
                                    const u1_requests = Math.floor(random()) === 0;
                                    requests.push({
                                        requester_id: u1_requests ? u1.id : u2.id,
                                        requested_id: u1_requests ? u2.id : u1.id,
                                        is_accepted: Boolean(random() > 0.3)
                                    });
                                }
                            });
                        });
                        
                        return promiseMapList(requests, Models.FriendRequest.create);
                    };

                    const createMessages = (friendships, memberships) => {
                        let messages = [];

                        // correspondence between friends
                        friendships.forEach(f => {
                            const u1_id = f.requester_id;
                            const u2_id = f.requested_id;
                            const u1_first = random() > 0.5;
                            messages.push({
                                sender_id: u1_first ? u1_id : u2_id,
                                receiver_id: u1_first ? u2_id : u1_id,
                                content: 'Hello, how are you?',
                                created_at: addHours(now, (-3 - random()))
                            });
                            messages.push({
                                sender_id: u1_first ? u2_id : u1_id,
                                receiver_id: u1_first ? u1_id : u2_id,
                                content: 'I am good. How are you?',
                                created_at: addHours(now, (-2 - random()))
                            });
                            messages.push({
                                sender_id: u1_first ? u1_id : u2_id,
                                receiver_id: u1_first ? u2_id : u1_id,
                                content: 'Good! Would you like to grab a coffee sometime and discuss our upcoming deadlines?',
                                created_at: addHours(now, (-1 - random()))
                            });
                            messages.push({
                                sender_id: u1_first ? u2_id : u1_id,
                                receiver_id: u1_first ? u1_id : u2_id,
                                content: 'Yes, that sounds great! We\'ll keep in touch.',
                                created_at: addHours(now, -1 * random())
                            });
                        });

                        // correspondence between member and group
                        memberships.forEach(m => {
                            if(!m.is_admin) {
                                messages.push({
                                    sender_id: m.user_id,
                                    receiver_id: m.group_id,
                                    content: 'Hello, I have a question.',
                                    created_at: addHours(now, (-3 - random()))
                                });
                                messages.push({
                                    sender_id: m.group_id,
                                    receiver_id: m.user_id,
                                    content: 'Hi. I\'d be glad to help. What is your question?',
                                    created_at: addHours(now, (-2 - random()))
                                });
                                messages.push({
                                    sender_id: m.user_id,
                                    receiver_id: m.group_id,
                                    content: 'Could we possibly schedule a Zoom call to discuss some ideas I have?',
                                    created_at: addHours(now, (-1 - random()))
                                });
                                messages.push({
                                    sender_id: m.group_id,
                                    receiver_id: m.user_id,
                                    content: 'Yes, we could do that. Let me get back to you shortly when I get something set up.',
                                    created_at: addHours(now, -1 * random())
                                });
                            }
                        });

                        return promiseMapList(messages, Models.Message.create);
                        
                    };

                    // memberships
                    return createMemberships()
                    // friend requests
                    .then(memberships => 
                        createFriendRequests(users)
                        .then(requests => requests.filter(req => req.is_accepted))
                        // messages
                        .then(friendships => createMessages(friendships, memberships))
                        // user posts

                        // group posts

                        // schedule events

                        // schedule tasks

                        // schedule reminders
                    );
                })
            )
        )
    )
    .catch(console.log);
}