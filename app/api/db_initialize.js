const { setupWithRetries } = require('./knex_startup.js');

setupWithRetries(10, 5000)
.then(() => { process.exit(0); });