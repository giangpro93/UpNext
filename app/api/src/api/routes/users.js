// All these routes are prefixed with 'users/'

var express = require('express');
var router = express.Router();
const { respond } = require('../responses');
const User = require('../../db/models/User');

// get all users
router.get('/', function(req, res) {
  req.query.id
  ? respond(req, res, User.getById, req.query.id)
  : respond(req, res, User.getAll);
});

// post a user creation
router.post('/', (req, res) => {
  respond(req, res, User.create);
});

router.get('/:id', function(req, res) {
  respond(req, res, User.getById, req.params.id);
});

router.put('/:id', (req, res) => {
  respond(req, res, User.update, {id: req.params.id, ...req.body} );
});

router.delete('/:id', (req, res) => {
  respond(req, res, User.deleteById, req.params.id);
});

// authenticate a user & return user info
router.post('/authenticate', (req, res) => {
  respond(req, res, User.authenticate);
});

router.get('/search/:term', function(req, res) {
  respond(req, res, User.search, req.params.term);
});

module.exports = router;
