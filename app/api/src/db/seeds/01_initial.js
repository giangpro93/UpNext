const faker = require('faker');
const { hashPassword } = require('../../helpers/passwords');
const { addDays, addHours } = require('../../helpers/dates');

const USERS = 9;
const GROUPS = 3;

const customUser = {
  name: 'User User',
  email: 'user@user.com',
  type: 'user'
};

const customGroup = {
  name: 'Group',
  email: 'group@group.com',
  type: 'group'
}

const spawnUser = () => {
  return {
    name: `${faker.name.firstName()} ${faker.name.lastName()}`,
    email: faker.internet.email(),
    type: 'user'
  }
}

const spawnGroup = () => {
  return {
    name: faker.company.companyName(),
    email: faker.internet.email(),
    type: 'group'
  }
}

const spawnMany = (generate, n) => {
  let users = [];
      for(let i = 0; i < n; i++) {
        users.push(generate());
  }
  return users;
}

exports.seed = function(knex) {

  const populateUsers = () => 
    knex('User').del()
    .then(() => knex('Entity').del())
    .then(() => {
      const users = spawnMany(spawnUser, USERS);
      return knex('Entity')
              .insert([customUser, ...users.map(u => ({ name: u.name, email: u.email, type: u.type }))])
              .then(() =>
                hashPassword('password')
                .then(password_hash =>
                  knex.select('id').from('Entity')
                  .then(ids => 
                    knex('User')
                    .insert(ids.map(res => ({ id: res.id, password_hash }))))
              ));
    });
  
  const populateGroups = () => 
    knex('Group').del()
    .then(() => {
      const groups = spawnMany(spawnGroup, GROUPS);
      return knex('Entity')
              .insert([customGroup, ...groups.map(g => ({ name: g.name, email: g.email, type: g.type }))])
              .then(() => 
                knex.select('id')
                      .from('Entity')
                      .where('type', 'group')
              )
              .then(ids => 
                knex('Group')
                .insert(ids.map(res => ({ id: res.id }))))
    })
  
  // every user belongs to every group where user_id and group_id are same parity
  // every user is randomly an admin or not
  const populateMemberships = () =>
    knex('Membership').del()
    .then(() =>
      knex.select('id').from('User')
      .then(user_ids => 
        knex.select('id').from('Group')
        .then(group_ids => {
          let memberships = [];
          for(g of group_ids) {
            for(u of user_ids) {
              if((u.id + g.id) % 2 == 0)
                memberships.push({user_id: u.id, group_id: g.id, is_admin: faker.random.boolean()});
            }
          }
          return knex('Membership').insert(memberships);
        }))
    )

  const populateMessages = () =>
    knex('Message').del()
    .then(() =>
      knex.select('id').from('User')
      .then(user_ids => {
        const NUM_EXCHANGES = 3;
        let messages = [];
        for(let i = 0; i < NUM_EXCHANGES; i++) {
          for(u of user_ids) {
            for(u2 of user_ids) {
              if(u.id != u2.id)
                messages.push({ sender_id: u.id, receiver_id: u2.id, content: faker.lorem.sentence()});
            }
          }
        }
        return knex('Message').insert(messages);
      })
    )

  // if same parity, users are friends
  // otherwise, the lower id friend will send a friend request to the other
  const populateFriendRequests = () =>
      knex('FriendRequest').del()
      .then(() => 
        knex.select('id').from('User')
        .then(user_ids => {
          let requests = [];
          for(u of user_ids) {
            for(u2 of user_ids.filter(u2 => u2.id > u.id)) {
              if((u.id + u2.id) % 2 == 0)
                requests.push({
                  requester_id: u.id, 
                  requested_id: u2.id,
                  is_accepted: faker.random.boolean()
                });
            }
          }
          return knex('FriendRequest').insert(requests)
        }))

  const populatePosts = () => 
    knex('Post').del()
    .then(() => 
      knex.select('id').from('User')
      .then(us =>
        knex.select('id').from('Group')
        .then(gs => {
          const POSTS_PER_ENTITY = 5;
          let posts = [];

          const pushEntityPosts = es => {
            let isGlobal = true;
            for(let i = 0; i < POSTS_PER_ENTITY; i++) {
              for(e of es) {
                posts.push({creator_id: e.id, content: faker.lorem.paragraph(), context_id: (isGlobal ? null : e.id)});
              }
              isGlobal = !isGlobal;
            }
          }
          
          pushEntityPosts(us);
          pushEntityPosts(gs);

          for(let i = 0; i < POSTS_PER_ENTITY; i++) {
            for(g of gs) {
              for(u of us) {
                posts.push({creator_id: u.id, content: faker.lorem.paragraph(), context_id: g.id});
              }
            }
          }

          return knex('Post').insert(posts);
        })
      )
    )

  // for each person/group, create...
  // an event that is (id * 2) number of hrs out and lasts 1 hr
  // a task that starts at id number of hrs out and ends (id * 3) number of hrs out
  const populateScheduleItems = () =>
      knex('ScheduleItem').del()
      .then(() => knex('ScheduleEvent').del())
      .then(() => knex('ScheduleTask').del())
      .then(() => knex('ScheduleReminder').del())
      .then(() => knex.select('id').from('Entity'))
      .then(es => {
        const ITEMS_PER_ENTITY = 9;
        const now = new Date();
        let items = [];
        let reminders = [];
        let events = [];
        let tasks = [];
        // create schedule items for each entity
        const pushItem = (type, e, lbl) => {
          items.push({
            entity_id: e.id, 
            title: `${lbl} for entity ${e.id}`,
            location: faker.address.city(),
            description: faker.lorem.sentence(),
            type: type
          });
        }
        let i = 0;
        for (e of es) {
          pushItem('event', e, 'Event 1');
          pushItem('reminder', e, 'Reminder for Event 1');
          pushItem('task', e, 'Task 1');
          pushItem('reminder', e, 'Reminder for Task 1');
          pushItem('event', e, 'Event 2');
          pushItem('reminder', e, 'Reminder for Event 2');
          pushItem('task', e, 'Task 2');
          pushItem('reminder', e, 'Reminder for Task 2');
          pushItem('reminder', e, 'Standalone Reminder');
          const offset = i * ITEMS_PER_ENTITY;
          events.push({
            id: offset + 1,
            start: addHours(now, e.id * 2),
            end: addHours(now, e.id * 2 + 1)
          });
          reminders.push({
            id: offset + 2,
            time: addHours(now, e.id * 2 - 0.5),
            link_id: offset + 1
          });
          tasks.push({
            id: offset + 3,
            assigned: addHours(now, e.id),
            due: addHours(now, e.id * 3)
          });
          reminders.push({
            id: offset + 4,
            time: addHours(now, e.id - 0.5),
            link_id: offset + 3
          });
          events.push({
            id: offset + 5,
            start: addDays(now, e.id * 2),
            end: addDays(now, e.id * 2 + 1)
          });
          reminders.push({
            id: offset + 6,
            time: addDays(now, e.id * 2 - 0.5),
            link_id: offset + 5
          });
          tasks.push({
            id: offset + 7,
            assigned: addDays(now, e.id),
            due: addDays(now, e.id * 3)
          });
          reminders.push({
            id: offset + 8,
            time: addDays(now, e.id * 3 - 0.5),
            link_id: offset + 7
          });
          reminders.push({
            id: offset + 9,
            time: addHours(now, 0.5)
          });
          i++;
        }
        return knex('ScheduleItem').insert(items)
          .then(() => knex('ScheduleEvent').insert(events))
          .then(() => knex('ScheduleTask').insert(tasks))
          .then(() => knex('ScheduleReminder').insert(reminders));
      })
  
  return populateUsers()
          .then(populateGroups)
          .then(populateMemberships)
          .then(populateMessages)
          .then(populateFriendRequests)
          .then(populatePosts)
          .then(populateScheduleItems)
          .catch(err => console.log(err));
};
