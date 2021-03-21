process.chdir('./backend');
const { setupWithRetries } = require('./backend/knex_startup.js');

setupWithRetries(10, 5000)
.then(() => { process.exit(0); });