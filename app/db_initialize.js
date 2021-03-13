const { setupWithRetries } = require('./backend/knex_startup.js');
process.chdir('./backend');

setupWithRetries(10, 5000)
.then(() => { process.exit(0); });