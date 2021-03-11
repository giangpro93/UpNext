const db = require('../../knex_db');
const Entity = require('../models/Entity');

const testEntity = {
    name: 'Test Test',
    email: 'test@test.com',
    description: 'This is a test entity'
}

module.exports = [
    {
        title: 'Create entity',
        test: () => Entity.create(testEntity)
    },
    {
        title: 'Get all entities',
        test: () => Entity.getAll()
    },
    {
        title: 'Update entity',
        test: () => Entity.getByEmail(testEntity.email)
        .then(entity => Entity.update({ id: entity.id, ...testEntity, name: 'Test Updated', description: 'Description Updated'}))
    },
    {
        title: 'Get entity by email',
        test: () => Entity.getByEmail(testEntity.email)
    },
    {
        title: 'Delete entity by id',
        test: () => 
            Entity.getByEmail(testEntity.email)
            .then(entity => Entity.deleteById(entity.id))
    }
];