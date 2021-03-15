// All these routes are prefixed with 'groups/'

var express = require('express');
var router = express.Router();
const { respond } = require('../responses');
const Group = require('../models/Group');

router.get('/', function(req, res) {
    respond(req, res, Group.getAll);
  });
  
  router.get('/:id', function(req, res) {
    respond(req, res, Group.getById, req.params.id);
  });
  
  // post a user creation
  router.post('/', (req, res) => {
    respond(req, res, Group.create);
  });
  
  router.put('/', (req, res) => {
    respond(req, res, Group.update);
  })
  
  router.delete('/:id', (req, res) => {
    respond(req, res, Group.deleteById, req.params.id);
  })