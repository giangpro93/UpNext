const faker = require('faker');
const { hashPassword } = require('../../api/helpers');

const spawnUser = () => {
  return {
    name: `${faker.name.firstName()} ${faker.name.lastName()}`,
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
      let users = spawnMany(spawnUser, 10);
      return knex('Entity')
              .insert(users.map(u => ({ name: u.name, email: u.email })))
              .then(() => {
                const password_hash = hashPassword('password');
                return knex.select('id').from('Entity')
                .then(ids => 
                  knex('User')
                  .insert(ids.map(res => ({ id: res.id, password_hash }))))
                });
    });
  return populateUsers();
};
