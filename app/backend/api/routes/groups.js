// All these routes are prefixed with 'groups/'

var express = require('express');
var router = express.Router();
const { respond } = require('../responses');
const Group = require('../models/Group');

router.get('/', function(req, res) {
    respond(req, res, Group.getAll);
});
  
// post a user creation
router.post('/', (req, res) => {
  respond(req, res, Group.create);
});

router.get('/:id', function(req, res) {
  respond(req, res, Group.getById, req.params.id);
});

router.put('/:id', (req, res) => {
  respond(req, res, Group.update, {id: req.params.id, ...req.body});
});

router.delete('/:id', (req, res) => {
  respond(req, res, Group.deleteById, req.params.id);
});

router.get('/search', (req, res) => {
  respond(req, res, Group.search);
});

module.exports = router;