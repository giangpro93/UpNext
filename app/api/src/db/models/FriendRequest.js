const User = require('./User');
const Entity = require('./Entity');
const db = require('../../knex_db');

module.exports = {
    getAll,
    create,
    get,
    accept,
    getOfRequester,
    getOfRequested,
    getUnacceptedRequestsTo,
    getUnacceptedUsersOf,
    getUserFriends,
    deleteFriendRequest
};

function create(request) {
    const { requester_id, requested_id, is_accepted } = request;
    return db('FriendRequest')
    .insert(request)
    .then(() => get(request));
}

function get(request) {
    const { requester_id, requested_id } = request;
    return db
    .first()
    .from('FriendRequest')
    .where('requester_id', requester_id)
    .andWhere('requested_id', requested_id);
}

function getAll() {
    return db.select().from('FriendRequest');
}

function accept(request) {
    const { requester_id, requested_id } = request;
    return db('FriendRequest')
    .where('requester_id', requester_id)
    .andWhere('requested_id', requested_id)
    .update({...request, is_accepted: true})
    .then(() => get(request));
}

function getOfRequester(requester_id) {
    return db
    .select()
    .from('FriendRequest')
    .where('requester_id', requester_id);
}

function getOfRequested(requested_id) {
    return db
    .select()
    .from('FriendRequest')
    .where('requested_id', requested_id);
}

function getUnacceptedRequestsTo(requested_id) {
    return getOfRequested(requested_id)
    .andWhere('is_accepted', false);
}

function getUnacceptedUsersOf(requested_id) {
    return db.select('Entity.*')
    .from('FriendRequest')
    .leftJoin('Entity', 'FriendRequest.requester_id', 'Entity.id')
    .where('FriendRequest.requested_id', requested_id)
    .andWhere('is_accepted', false);
}

function getUserFriends(user_id) {
    const query1 = () => 
        db.select('Entity.*')
        .from('FriendRequest')
        .leftJoin('Entity', 'FriendRequest.requester_id', 'Entity.id')
        .where('FriendRequest.requested_id', user_id)
        .andWhere('is_accepted', true);

    const query2 = db => 
        db.select('Entity.*')
        .from('FriendRequest')
        .leftJoin('Entity', 'FriendRequest.requested_id', 'Entity.id')
        .where('FriendRequest.requester_id', user_id)
        .andWhere('is_accepted', true);

    return query1().union(query2);
}

function deleteFriendRequest(request) {
    const { requester_id, requested_id } = request;
    return get(request)
    .then(req => 
        db('FriendRequest')
        .where('requester_id', requester_id)
        .andWhere('requested_id', requested_id)
        .del()
        .then(() => req)
    );
}