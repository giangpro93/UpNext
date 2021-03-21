const Entity = require('./Entity');
const FriendRequest = require('./FriendRequest');
const Membership = require('./Membership');
const db = require('../../knex_db');

module.exports = {
    create,
    postsInfo,
    getById,
    getLatest,
    deleteById
};


function postsInfo() {
    const post_attrs = ['Post.*', 'Entity.name', 'Entity.email', 'Entity.image'];

    return db
    .select(...post_attrs)
    .from('Post')
    .leftJoin('Entity', 'Post.creator_id', 'Entity.id');
}

function create(post) {
    const { creator_id, content, context_id } = post;

    return db('Post')
    .insert(post)
    .then(() => getLatest({creator_id, context_id: context_id ? context_id : null}));
}

function getById(post_id) {
    return postsInfo()
    .where('post_id', post_id)
    .then(posts => posts[0])
}

function getLatest({creator_id, context_id}) {
    return db
    .first()
    .from('Post')
    .where('creator_id', creator_id)
    .andWhere('context_id', context_id)
    .orderBy('created_at', 'desc');
}

function deleteById(post_id) {
    return db('Post')
    .where('post_id', post_id)
    .del();
}