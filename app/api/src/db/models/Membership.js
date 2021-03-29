const db = require('../../knex_db');
const Entity = require('./Entity');
const User = require('./User');
const Group = require('./Group');

module.exports = {
    create,
    get,
    getAll,
    getUserMemberships,
    getGroupMemberships,
    getByEntityId,
    getUserMembershipGroups,
    getGroupMembers,
    update,
    deleteMembership,
    makeAdmin
};

function create(membership) {
    const { user_id, group_id, is_admin } = membership;
    return db('Membership')
    .insert(membership)
    .then(() => get({ user_id, group_id }));
}

function get({user_id, group_id}) {
    return db
    .first()
    .from('Membership')
    .where('user_id', user_id)
    .andWhere('group_id', group_id);
}

function getAll() {
    return db
    .select()
    .from('Membership');
}

function getUserMemberships(user_id) {
    return db
    .select()
    .from('Membership')
    .where('user_id', user_id);
}

function getGroupMemberships(group_id) {
    return db
    .select()
    .from('Membership')
    .where('group_id', group_id);
}

function getByEntityId(id) {
    return Entity.getType(id)
    .then(res => 
        (res.type === 'user'
        ? getUserMemberships
        : getGroupMemberships)(id)
    );
}

function getUserMembershipGroups(user_id) {
    return db
    .select('Entity.*', 'Membership.is_admin')
    .from('Membership')
    .leftJoin('Group', 'Membership.group_id', 'Group.id')
    .leftJoin('Entity', 'Group.id', 'Entity.id')
    .where('Membership.user_id', user_id);
}

function getGroupMembers(group_id) {
    return db
    .select('Entity.*', 'Membership.is_admin')
    .from('Membership')
    .leftJoin('User', 'Membership.user_id', 'User.id')
    .leftJoin('Entity', 'User.id', 'Entity.id')
    .where('Membership.group_id', group_id);
}

function update(membership) {
    const { user_id, group_id, is_admin } = membership;
    return db('Membership')
    .where({user_id, group_id})
    .update(membership)
    .then(() => get({user_id, group_id}));
}

function makeAdmin({user_id, group_id}) {
    return update({user_id, group_id, is_admin: true});
}

function deleteMembership({user_id, group_id}) {
    return get({user_id, group_id})
    .then(membership => 
        db('Membership')
        .where('user_id', user_id)
        .andWhere('group_id', group_id)
        .del()
        .then(() => membership)
    );
}
