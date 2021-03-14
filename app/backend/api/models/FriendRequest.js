const User = require('./User');
const Entity = require('./Entity');
const db = require('../../knex_db');

module.exports = {
    create,
    get,
    accept,
    getOfRequester,
    getOfRequested,
    getUnacceptedRequestsTo,
    getUserFriends,
    deleteFriendRequest
};

function create(request) {
    const { requester_id, requested_id } = request;
    return db('FriendRequest')
    .insert({...request, is_accepted: false})
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
    .update(request)
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

function getUserFriends(user_id) {
    return getAll()
    .where(function() {
        this.where('requester_id', user_id)
        .orWhere('requested_id', user_id)
    })
    .andWhere('is_accepted', true);
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