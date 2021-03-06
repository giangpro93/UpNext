// Update with your config settings.

module.exports = {
  development: {
    client: 'mysql',
    version: '8',
    connection: {
      host: 'localhost',
      user: 'admin',
      password: 'password',
      database: 'upnext'
    },
    migrations: {
      directory: './db/migrations'
    },
    seeds: {
      directory: './db/seeds'
    },
    useNullAsDefault: true
  }
  // development: {
  //   client: 'sqlite3',
  //   connection: {
  //     filename: './db/data/dev.db3'
  //   },
  //   migrations: {
  //     directory: './db/migrations'
  //   },
  //   seeds: {
  //     directory: './db/seeds'
  //   },
  //   useNullAsDefault: true
  // }
};
