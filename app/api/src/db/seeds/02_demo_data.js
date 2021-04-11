const Models = require('../Models');
const { addDays, addHours } = require('../../helpers/dates');

const random = () => { return Math.random(); }

const removeSpaces = str => str.split(' ').join('');

const userFromName = (name, is_prof) => ({
    name,
    email: removeSpaces(name) + '@ku.edu',
    description: `Hi, my name is ${name}. ${is_prof ? 'I am a professor at KU' : 'I am a student at KU'}` ,
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
                    const entities = [...users, ...groups];
                    const now = new Date();

                    const getEntityByName = (name, es=entities) => 
                        es.filter(e => e.name === name)[0];

                    const getEntityById = (id, es=entities) =>
                        es.filter(e => e.id === id)[0];

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

                    const createPosts = memberships => {
                        let posts = [];
                        // create global user & group posts
                        entities.forEach(e => {
                            posts.push({
                                creator_id: e.id,
                                content: `This is the first global post from ${e.name}`,
                                created_at: addHours(now, -1 * random())
                            });
                        });

                        // create user forum posts based on memberships
                        memberships.forEach(m => {
                            posts.push({
                                creator_id: m.user_id,
                                content: `This is a forum post from ${getEntityById(m.user_id).name}`,
                                context_id: m.group_id,
                                created_at: addHours(now, -1 * random())
                            });
                        });

                        // create group forum posts in their own context
                        groups.forEach(g => {
                            posts.push({
                                creator_id: g.id,
                                content: `This is a forum post from ${getEntityById(g.id).name}`,
                                context_id: g.id,
                                created_at: addHours(now, -1 * random())
                            });
                        });

                        return promiseMapList(posts, Models.Post.create);
                    }

                    const createEvents = () => {
                        let events = [];
                        // create personal events for each user
                        users.forEach(u => {
                            let r = random();
                            let start = addHours(now, 24 + 3 * (random() - 0.5));
                            let end = addHours(start, 1 + (random() - 0.5));

                            events.push({
                                entity_id: u.id,
                                title: r < 0.33 ? 'Dentist' : r < 0.67 ? 'Doctor\'s' : 'Chiropractor\'s' + ' Appointment',
                                description: 'This is a personal appointment.',
                                location: 'Clinton Parkway and Wakarusa',
                                start,
                                end,
                                reminder: addHours(start, -1)
                            });

                            r = random();
                            start = addHours(now, 72 + 3 * (random() - 0.5));
                            end = addHours(start, 4 + (random() - 0.5));

                            events.push({
                                entity_id: u.id,
                                title: r < 0.33 ? 'Family Gathering' : r < 0.67 ? 'Friend\'s Birthday Party' : 'Golf Tee Time',
                                location: r < 0.33 ? 'Uncle Tim\'s house' : r < 0.67 ? 'Friend\'s Apartment' : 'Eagle Bend Golf Course',
                                description: 'This is a personal event.',
                                start,
                                end,
                                reminder: addHours(start, -1)
                            });

                            start = addHours(now, (24 * 7) + 3 * (random() - 0.5));
                            end = addHours(start, 3);

                            events.push({
                                entity_id: u.id,
                                title: 'Hosting Party',
                                location: 'My house',
                                description: 'This is a personal event. I will be hosting a party for friends.',
                                start,
                                end,
                                reminder: addHours(start, -24)
                            });

                            start = addHours(now, 84 + 3 * (random() - 0.5));
                            end = addHours(start, 0.5);

                            events.push({
                                entity_id: u.id,
                                title: 'Advising Appointment',
                                location: 'Eaton Hall',
                                description: 'I must meet with my advisor to get my enrollment hold lifted.',
                                start,
                                end,
                                reminder: addHours(start, -24)
                            });
                        });


                        // create class events (exams, review sessions, class times, etc)
                        classes.forEach((c, i) => {
                            let start = addHours(now, (24 * (i + 1)) + 2 * (i + (random() / 2)));
                            let end = addHours(start, 1);

                            events.push({
                                entity_id: c.id,
                                title: 'Exam 1 Review Session',
                                location: 'Strong Hall',
                                description: 'We will be solving practice problems relevant to Exam 1.',
                                start,
                                end,
                                reminder: addHours(start, -2)
                            });

                            events.push({
                                entity_id: c.id,
                                title: 'Exam 1',
                                location: 'Budig Hall',
                                description: 'This exam covers all content from chapters 1-3 in the textbook.',
                                start: addHours(start, 24),
                                end: addHours(end, 25),
                                reminder: addHours(start, -2)
                            });

                            events.push({
                                entity_id: c.id,
                                title: 'Quiz 2 Review Session',
                                location: 'Wescoe Hall',
                                description: 'We will be solving practice problems relevant to Quiz 2.',
                                start: addHours(start, 24 * 7),
                                end: addHours(end, 24 * 7),
                                reminder: addHours(start, -2)
                            });

                            events.push({
                                entity_id: c.id,
                                title: 'Quiz 2',
                                location: 'Budig Hall',
                                description: 'This quiz covers content from chapters 4-5 in the textbook.',
                                start: addHours(start, 24 * 8),
                                end: addHours(end, (24 * 8)),
                                reminder: addHours(start, -2)
                            });

                        });

                        // create org events (meetings, events)
                        orgs.forEach((org, i) => {
                            let start = addHours(now, (24 * i) + 2 * (i + (random() / 2)));
                            let end = addHours(start, 1);

                            events.push({
                                entity_id: org.id,
                                title: 'Weekly Meeting',
                                location: 'Capitol Federal Hall',
                                description: 'We will be discussing recruitment and fundraising.',
                                start,
                                end,
                                reminder: addHours(start, -2)
                            });

                            events.push({
                                entity_id: org.id,
                                title: 'Officer Meeting',
                                location: 'Zoom Meeting (Virtual)',
                                description: 'We will plan fundraising event.',
                                start: addHours(start, 24),
                                end: addHours(end, 24),
                                reminder: addHours(start, -2)
                            });

                            events.push({
                                entity_id: org.id,
                                title: 'Fundraising Event',
                                location: 'Speedy Carwash',
                                description: 'Fundraiser at the local carwash.',
                                start: addHours(start, 24 * 6),
                                end: addHours(end, 24 * 6 + 2),
                                reminder: addHours(start, -2)
                            });

                            events.push({
                                entity_id: org.id,
                                title: 'Post-Fundraiser Meal',
                                location: 'The Big Biscuit',
                                description: 'Meal to celebrate the completion of the fundraiser',
                                start: addHours(start, 24 * 8),
                                end: addHours(end, (24 * 8))
                            });
                        });

                        promiseMapList(events, Models.ScheduleEvent.create);
                    }

                    const createTasks = () => {
                        let tasks = [];
                        // create personal tasks for each user
                        users.forEach(u => {
                            let r = random();
                            let assigned = addHours(now, 2);
                            let due = addHours(assigned, 24 * 7);

                            tasks.push({
                                entity_id: u.id,
                                title: r < 0.33 ? 'Learn React' : r < 0.67 ? 'Learn Angular' : 'Learn Vue',
                                description: 'Learn a frontend web framework to be able to build an interactive website',
                                location: 'Home',
                                assigned,
                                due
                            });

                            r = random();
                            assigned = addHours(due, 24);
                            due = addHours(assigned, 24 * 14);

                            tasks.push({
                                entity_id: u.id,
                                title: 'Build Personal Website',
                                location: 'Home',
                                description: 'Build my personal website',
                                assigned,
                                due
                            });

                            due = new Date('2021-05-17T00:00:00');

                            tasks.push({
                                entity_id: u.id,
                                title: 'File Taxes',
                                location: 'Online - TurboTax',
                                description: 'Must pay my taxes before the deadline',
                                assigned: now,
                                due,
                                reminder: addHours(due, -24)
                            });

                        });


                        // create class tasks (exams, review sessions, class times, etc)
                        classes.forEach((c, i) => {
                            let assigned = addHours(now, 1 + i * 3);
                            let due = addHours(assigned, 24 * 7);

                            tasks.push({
                                entity_id: c.id,
                                title: 'Homework 3',
                                location: 'Eaton Hall',
                                description: 'Covers material from chapter 3 in the textbook',
                                assigned,
                                due,
                                reminder: addHours(due, -2)
                            });

                            tasks.push({
                                entity_id: c.id,
                                title: 'Take Home Quiz 2',
                                location: 'Online',
                                description: 'Covers chapter 2 in the textbook',
                                assigned: addHours(assigned, 24),
                                due: addHours(assigned, 48),
                                reminder: addHours(assigned, 23)
                            });

                            tasks.push({
                                entity_id: c.id,
                                title: 'Chapter 4 Reading',
                                location: 'Home',
                                description: 'Read chapter 4 prior to next week\'s lecture.',
                                assigned: addHours(assigned, 24 * 3),
                                due: addHours(due, 24 * 7)
                            });

                        });

                        // create org tasks (meetings, tasks)
                        orgs.forEach((org, i) => {
                            let assigned = addHours(now, 26 * i + 0.5);
                            let due = addHours(assigned, 24 * 7);

                            tasks.push({
                                entity_id: org.id,
                                title: 'Find Fundraiser Donors',
                                location: 'Online, door-to-door',
                                description: 'Find people willing to donate to our organization',
                                assigned,
                                due
                            });
                        });

                        promiseMapList(tasks, Models.ScheduleTask.create);
                    }

                    const createReminders = () => {
                        let reminders = [];
                        users.forEach(u => {
                            reminders.push({
                                entity_id: u.id,
                                title: 'Take out the trash',
                                location: 'Home',
                                description: 'Trash is picked up today.',
                                time: addHours(now, 48)
                            });

                            reminders.push({
                                entity_id: u.id,
                                title: 'Feed the neighbor\'s dogs',
                                location: 'Neighbor\'s house',
                                description: 'The neighbors are going out of town for the day.',
                                time: addHours(now, 96)
                            });
                        })

                        return promiseMapList(reminders, Models.ScheduleReminder.create);
                    }

                    // memberships
                    return createMemberships()
                    // friend requests
                    .then(memberships => 
                        createFriendRequests(users)
                        .then(requests => requests.filter(req => req.is_accepted))
                        // messages
                        .then(friendships => createMessages(friendships, memberships))
                        // posts
                        .then(() => createPosts(memberships))
                        // schedule events
                        .then(createEvents)
                        // schedule tasks
                        .then(createTasks)
                        // schedule reminders
                        .then(createReminders)
                    );
                })
            )
        )
    )
    .catch(console.log);
}