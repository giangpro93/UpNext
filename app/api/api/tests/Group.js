const Group = require('../models/Group');

const testGroup = {
    name: 'Test Group',
    email: 'testgroup@test.com',
    description: 'This is a test group'
}

module.exports = [
    {
        title: 'Create group',
        test: () =>
            Group.create(testGroup)
            .then(console.log)
    },
    {
        title: 'Update group',
        test: () =>
            Group.getByEmail(testGroup.email)
            .then(group =>
                Group.update({
                    id: group.id,
                    ...testGroup,
                    name: 'Updated name',
                    description: 'Updated description'
                })
            )
            .then(console.log)
    },
    {
        title: 'Fetch group',
        test: () =>
            Group.getByEmail(testGroup.email)
            .then(console.log)
    },
    {
        title: 'Get all groups',
        test: () =>
            Group.getAll()
            .then(groups => {
                console.log(`Number of groups: ${groups.length}`);
            })
    },
    {
        title: 'Delete group',
        test: () =>
            Group.getByEmail(testGroup.email)
            .then(group => Group.deleteById(group.id))
            .then(console.log)
    }
]