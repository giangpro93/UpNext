process.chdir('./api');
const { setupWithRetries } = require('./api/src/knex_startup.js');

setupWithRetries(10, 5000)
.then(() => { process.exit(0); });