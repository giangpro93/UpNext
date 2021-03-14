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
    const post_attrs = ['Post.post_id', 'Post.creator_id', 'Post.content', 'Entity.name', 'Entity.email', 'Entity.image', 'Post.created_at'];

    return db
    .select(...post_attrs)
    .from('Post')
    .leftJoin('Entity', 'Post.creator_id', 'Entity.id');
}

function create(post) {
    let { creator_id, content, context_id } = post;
    context_id = context_id ? context_id : null;

    return db('Post')
    .insert({creator_id, content, context_id})
    .then(() => getLatest({creator_id, context_id}));
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