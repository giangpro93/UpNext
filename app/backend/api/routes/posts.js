// All these routes are prefixed with 'posts/'

var express = require('express');
var router = express.Router();
const { respond } = require('../responses');
const Post = require('../models/Post');
const PostFeed = require('../models/PostFeed');

// get all posts
router.get('/', function(req, res) {
    respond(req, res, Post.postsInfo);
});

router.post('/', function(req, res) {
    respond(req, res, Post.create);
});

router.get('/:post_id', function(req, res) {
    respond(req, res, Post.getById, req.params.post_id);
});

router.delete('/:post_id', function(req, res) {
    respond(req, res, Post.deleteById, req.params.post_id);
});

router.get('/by/:entity_id', function(req, res) {
    respond(req, res, PostFeed.getGlobalProfileFeed, req.params.entity_id);
});

router.get('/feed/:user_id', function(req, res) {
    respond(req, res, PostFeed.getGlobalFeed, req.params.user_id);
});

router.get('/forum/:group_id', function(req, res) {
    respond(req, res, PostFeed.getGroupFeed, req.params.group_id);
});

module.exports = router;