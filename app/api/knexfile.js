// Load environment settings from '.env' file
require('dotenv').config(
  {
    path: `${__dirname}/.env`
  }
);

module.exports = {
  development: {
    client: 'mysql',
    version: '8',
    connection: {
      host: 'localhost',
      user: process.env.MYSQL_USER,
      password: process.env.MYSQL_PASSWORD,
      database: process.env.MYSQL_DATABASE
    },
    migrations: {
      directory: __dirname + '/src/db/migrations'
    },
    seeds: {
      directory: __dirname + '/src/db/seeds'
    },
    useNullAsDefault: true
  },
  production: {
    client: 'mysql',
    version: '8',
    connection: {
      host: process.env.MYSQL_HOSTNAME,
      user: process.env.MYSQL_USER,
      password: process.env.MYSQL_PASSWORD,
      database: process.env.MYSQL_DATABASE
    }
    // migrations: {
    //   directory: __dirname + '/src/db/migrations'
    // },
    // seeds: {
    //   directory: __dirname + '/src/db/seeds'
    // }
    // useNullAsDefault: true
  }
};
