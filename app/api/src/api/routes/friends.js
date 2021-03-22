// All these routes are prefixed with 'friends/'

var express = require('express');
var router = express.Router();
const { respond } = require('../responses');
const FriendRequest = require('../../db/models/FriendRequest');

// get all friend requests
router.get('/', function(req, res) {
    respond(req, res, FriendRequest.getAll);
});

router.post('/', function(req, res) {
    respond(req, res, FriendRequest.create);
});

router.get('/get', function(req, res) {
    respond(req, res, FriendRequest.get);
});

router.put('/accept', function(req, res) {
    respond(req, res, FriendRequest.accept);
});

router.get('/unaccepted/:requested_id', function(req, res) {
    respond(req, res, FriendRequest.getUnacceptedUsersOf, req.params.requested_id);
});

router.get('/accepted/:id', function(req, res) {
    respond(req, res, FriendRequest.getUserFriends, req.params.id);
});

router.delete('/', function(req, res) {
    respond(req, res, FriendRequest.deleteFriendRequest);
});

module.exports = router;