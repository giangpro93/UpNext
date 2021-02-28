const { json } = require('express');
var express = require('express');
var router = express.Router();
const responses = require('../responses');
const users = require('../models/users');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

// post a users signup
router.post('/signup', (req, res) => {
  console.log(req.body);
  users.createUser(req.body)
    .then(newuser => responses.okResponse(res, newuser))
    .catch(err => responses.errResponse(res, err));
  // res.json(req.body);
});

// login a user
router.post('/login', (req, res) => {
  console.log(req.body);
  users.loginUser(req.body)
    .then(user => responses.okResponse(res, user))
    .catch(err => responses.errResponse(res, err));
});

// logout a user
router.post('/logout', (req, res) => {
  console.log(req.body);
  res.json(req.body);
});

module.exports = router;
