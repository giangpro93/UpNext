const faker = require('faker');
const { hashPassword } = require('../../api/helpers');

const USERS = 9;
const GROUPS = 3;

const customUser = {
  name: 'User User',
  email: 'user@user.com'
};

const spawnUser = () => {
  return {
    name: `${faker.name.firstName()} ${faker.name.lastName()}`,
    email: faker.internet.email()
  }
}

const spawnGroup = () => {
  return {
    name: faker.company.companyName(),
    email: faker.internet.email()
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
              .insert([customUser, ...users.map(u => ({ name: u.name, email: u.email }))])
              .then(() => {
                const password_hash = hashPassword('password');
                return knex.select('id').from('Entity')
                .then(ids => 
                  knex('User')
                  .insert(ids.map(res => ({ id: res.id, password_hash }))))
                });
    });
  
  const populateGroups = () => 
    knex('Group').del()
    .then(() => {
      const groups = spawnMany(spawnGroup, GROUPS);
      return knex('Entity')
              .insert(groups.map(g => ({ name: g.name, email: g.email })))
              .then(() => 
                knex.select('id')
                      .from('Entity')
                      .whereIn('email', groups.map(g => g.email))
              )
              .then(ids => 
                knex('Group')
                .insert(ids.map(res => ({ id: res.id }))))
    })
  
  // every user belongs to every group
  // every user is an admin
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
              memberships.push({user_id: u.id, group_id: g.id, is_admin: true});
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
  const populateFriendRequestsAndFriendships = () =>
      knex('FriendRequest').del()
      .then(() => 
        knex.select('id').from('User')
        .then(user_ids => {
          let friendships = [];
          let requests = [];
          for(u of user_ids) {
            for(u2 of user_ids.filter(u2 => u2.id > u.id)) {
              if(((u.id + u2.id) % 2) === 0) {
                friendships.push({user1_id: u.id, user2_id: u2.id})
              } else {
                requests.push({requester_id: u.id, requested_id: u2.id})
              }
            }
          }
          return knex('FriendRequest').insert(requests)
                  .then(() =>
                    knex('Friendship').insert(friendships))
        }))

  const populatePosts = () => 
    knex('Post').del()
    .then(() => 
      knex.select('id').from('User')
      .then(user_ids => user_ids.map(u => u.id))
      .then(ids => {
        const POSTS_PER_PERSON = 5;
        let posts = [];
        for(let i = 0; i < POSTS_PER_PERSON; i++) {
          for(uid of ids) {
            posts.push({creator_id: uid, content: faker.lorem.paragraph()});
          }
        }
        return knex('Post').insert(posts);
      })
    )
  
  return populateUsers()
          .then(populateGroups)
          .then(populateMemberships)
          .then(populateMessages)
          .then(populateFriendRequestsAndFriendships)
          .then(populatePosts)
          .catch(err => console.log(err));
};
