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

router.get('/unaccepted/:requested_id', function(req, res) {
    respond(req, res, FriendRequest.getUnacceptedUsersOf, req.params.requested_id);
});

router.get('/accepted/:id', function(req, res) {
    respond(req, res, FriendRequest.getUserFriends, req.params.id);
});

router.get('/:requester_id/:requested_id', function(req, res) {
    const { requester_id, requested_id } = req.params;
    respond(req, res, FriendRequest.get, {requester_id, requested_id});
});

router.put('/accept', function(req, res) {
    respond(req, res, FriendRequest.accept);
});

router.delete('/:id1/:id2', function(req, res) {
    const { id1, id2 } = req.params;
    respond(req, res, FriendRequest.deleteFriendRequest, {id1, id2});
});

module.exports = router;