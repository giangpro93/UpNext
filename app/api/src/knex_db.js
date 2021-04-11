// This sets up the database object usable by the models
const env = 'production';    // set environment
const db_config = require('../knexfile')[env];   // pull in correct db with env configs
const db = require('knex')(db_config);           // define database based on above

module.exports = db;