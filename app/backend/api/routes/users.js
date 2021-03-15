// All these routes are prefixed with 'users/'

var express = require('express');
var router = express.Router();
const { respond } = require('../responses');
const User = require('../models/User');

/* GET users listing. */
router.get('/', function(req, res) {
  req.query.id
  ? respond(req, res, User.getById, req.query.id)
  : respond(req, res, User.getAll);
});

router.get('/:id', function(req, res) {
  respond(req, res, User.getById, req.params.id);
});

// post a user creation
router.post('/', (req, res) => {
  respond(req, res, User.create);
});

router.put('/', (req, res) => {
  respond(req, res, User.update);
})

router.delete('/:id', (req, res) => {
  respond(req, res, User.deleteById, req.params.id);
})

// authenticate a user
router.post('/authenticate', (req, res) => {
  respond(req, res, User.authenticate);
});

module.exports = router;
