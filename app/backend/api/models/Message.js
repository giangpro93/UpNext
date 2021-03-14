const Entity = require('./Entity');
const db = require('../../knex_db');

module.exports = {
    create,
    getAll,
    getLatest,
    getConversation
};

function create(message) {
    const { sender_id, receiver_id, content } = message;

    return db('Message')
    .insert(message)
    .then(() => getLatest({ sender_id, receiver_id }))
}

function getAll() {
    return db.select().from('Message');
}

function getLatest(message) {
    const { sender_id, receiver_id } = message;
    return db
    .first()
    .from('Message')
    .where('sender_id', sender_id)
    .andWhere('receiver_id', receiver_id)
    .orderBy('created_at', 'desc');
}

function getConversation({ id1, id2 }) {
    return db
    .select()
    .from('Message')
    .where(function() {
        this.where('sender_id', id1)
        .andWhere('receiver_id', id2)
    })
    .orWhere(function() {
        this.where('sender_id', id2)
        .andWhere('receiver_id', id1)
    })
    .orderBy('created_at');
}