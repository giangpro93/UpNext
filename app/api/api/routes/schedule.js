// All these routes are prefixed with 'schedule/'

var express = require('express');
var router = express.Router();
const { respond } = require('../responses');
const Schedule = require('../models/Schedule');
const ScheduleItem = require('../models/ScheduleItem');
const ScheduleEvent = require('../models/ScheduleEvent');
const ScheduleTask = require('../models/ScheduleTask');
const ScheduleReminder = require('../models/ScheduleReminder');

router.get('/:id', function(req, res) {
    respond(req, res, Schedule.getById, req.params.id);
});

router.delete('/:id', function(req, res) {
    respond(req, res, ScheduleItem.deleteById, req.params.id);
});

router.post('/event', function(req, res) {
    respond(req, res, ScheduleEvent.create);
});

router.put('/event', function(req, res) {
    respond(req, res, ScheduleEvent.update);
});

router.post('/task', function(req, res) {
    respond(req, res, ScheduleTask.create);
});

router.put('/task', function(req, res) {
    respond(req, res, ScheduleTask.update);
});

router.post('/reminder', function(req, res) {
    respond(req, res, ScheduleReminder.create);
});

router.put('/reminder', function(req, res) {
    respond(req, res, ScheduleReminder.update);
});

router.get('/get/:entity_id', function(req, res) {
    respond(req, res, Schedule.getEntitySchedule, req.params.entity_id);
});

module.exports = router;