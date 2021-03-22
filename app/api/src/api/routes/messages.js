// All these routes are prefixed with 'messages/'

var express = require('express');
var router = express.Router();
const { respond } = require('../responses');
const Message = require('../../db/models/Message');

// get all messages
router.get('/', function(req, res) {
    respond(req, res, Message.getAll);
});

router.post('/', function(req, res) {
    respond(req, res, Message.create);
});

router.get('/recent/:entity_id', function(req, res) {
    respond(req, res, Message.getRecentCorrespondents, req.params.entity_id);
});

router.get('/conversation/', function(req, res) {
    respond(req, res, Message.getConversation);
});

module.exports = router;