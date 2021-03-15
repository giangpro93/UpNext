// Load environment settings from '.env' file
require('dotenv').config();

module.exports[process.env.NODE_ENV || 'development'] = {
    client: 'mysql',
    version: '8',
    connection: {
      host: process.env.MYSQL_HOSTNAME || 'localhost',
      user: process.env.MYSQL_USER,
      password: process.env.MYSQL_PASSWORD,
      database: process.env.MYSQL_DATABASE
    },
    migrations: {
      directory: './db/migrations'
    },
    seeds: {
      directory: './db/seeds'
    },
    useNullAsDefault: true
};
