const db = require('./knex_db');
const { seed } = require('./db/seeds/initial');

module.exports = { setup, setupWithRetries };

function setup() {
    return db.migrate.down()
    .then(() => db.migrate.latest())
    .then(() => seed(db));
}

function delay(ms) {
    return new Promise((resolve, reject) => {
        setTimeout(() => { resolve(true); }, ms);
    });
}

function retryWithDelay(p, tries, ms) {
    return tries <= 0 
    ? Promise.reject('Number of retries exceeded')
    : delay(ms)
        .then(p)
        .catch(err => retryWithDelay(p, tries - 1, ms));
}

function setupWithRetries(tries=10, delay_ms=5000) {
    return Promise.resolve()
        .then(() => { console.log('Running database migrations and seeds...');})
        .then(() => retryWithDelay(setup, tries, delay_ms))
        .then(() => { console.log('Migrations and seeds complete'); })
        .catch(() => { console.log(`Database migrations failed after ${tries} attempts`);})
}