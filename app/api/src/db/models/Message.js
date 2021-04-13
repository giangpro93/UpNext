const Entity = require('./Entity');
const db = require('../../knex_db');

module.exports = {
    create,
    getAll,
    getLatest,
    getRecentCorrespondents,
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

// returns list of previously messaged entities
// in reverse chronological order
function getRecentCorrespondents(entity_id) {
    const query1 = db => 
        db.select('Entity.*', 'Message.created_at as time')
        .from('Message')
        .leftJoin('Entity', 'Message.sender_id', 'Entity.id')
        .where('Message.receiver_id', entity_id)

    const query2 = db => 
        db.select('Entity.*', 'Message.created_at as time')
        .from('Message')
        .leftJoin('Entity', 'Message.receiver_id', 'Entity.id')
        .where('Message.sender_id', entity_id)

    // return db.with('t', db =>
    //     db.select('t.id', 't.name', 't.email', 't.time')
    //     .from(db =>
    //         (query1(db)
    //         .union(query2)).as('t')      
    //     )
    //     .orderBy('t.time', 'desc')
    // )
    // .distinct('t.id', 't.name', 't.email')
    // .from('t');

    return db.select('t.id', 't.name', 't.email', 't.time')
        .from(db =>
            query1(db)
            .union(db => query2(db))
            .as('t')
        )
        .whereRaw(`time >= ALL 
                (select created_at as time
                from Message
                where (Message.sender_id = t.id and Message.receiver_id = ${entity_id})
                or (Message.sender_id = ${entity_id} and Message.receiver_id = t.id)
                )`)
        .orderBy('t.time', 'desc');
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
    .orderBy('created_at', 'asc');
}