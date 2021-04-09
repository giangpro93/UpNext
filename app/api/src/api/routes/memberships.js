// All these routes are prefixed with 'memberships/'

var express = require('express');
var router = express.Router();
const { respond } = require('../responses');
const Membership = require('../../db/models/Membership');

// get all memberships
router.get('/', function(req, res) {
    respond(req, res, Membership.getAll);
});

// create a membership
router.post('/', function(req, res) {
    respond(req, res, Membership.create);
});

router.put('/makeadmin', function(req, res) {
    respond(req, res, Membership.makeAdmin);
});

// delete a membership by { user_id, group_id }
router.delete('/', function(req, res) {
    respond(req, res, Membership.deleteMembership);
});

router.get('/:entity_id', function(req, res) {
    respond(req, res, Membership.getByEntityId, req.params.entity_id);
});

router.get('/groups/:user_id', function(req, res) {
    console.log(`Request User ID: ${req.params.user_id}`);
    respond(req, res, Membership.getUserMembershipGroups, req.params.user_id);
});

router.get('/users/:group_id', function(req, res) {
    respond(req, res, Membership.getGroupMembers, req.params.group_id);
});

// get a membership by { user_id, group_id }
router.get('/:user_id/:group_id', function(req, res) {
    const { user_id, group_id } = req.params;
    respond(req, res, Membership.get, {user_id, group_id});
});

module.exports = router;