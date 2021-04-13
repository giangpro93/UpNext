const db = require('./knex_db');
const initial = require('./db/seeds/01_initial');
const migration = require('./db/migrations/20210305120924_initial');
const demo_data = require('./db/seeds/02_demo_data.js');

const migrations = () => 
    migration.down(db)
    .then(() => migration.up(db));

const seeds = () => demo_data.seed(db);
    // initial.seed(db)
    // .then(() => demo_data.seed(db));

module.exports = { setup, setupWithRetries };

function setup() {
    // return db.migrate.down()
    // .then(() => db.migrate.latest())
    // .then(() => seeds());
    return migrations().then(seeds)
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
        .catch(err => {
            console.log(err);
            return retryWithDelay(p, tries - 1, ms);
        });
}

function setupWithRetries(tries=10, delay_ms=5000) {
    return Promise.resolve()
        .then(() => { console.log('Running database migrations and seeds...');})
        .then(() => retryWithDelay(setup, tries, delay_ms))
        .then(() => { console.log('Migrations and seeds complete'); })
        .catch(() => { console.log(`Database migrations failed after ${tries} attempts`);})
}