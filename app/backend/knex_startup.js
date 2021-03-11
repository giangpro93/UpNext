const db = require('./knex_db');
const { seed } = require('./db/seeds/initial');

function reboot() {
    db.migrate.down()
    .then(() => db.migrate.latest())
    .then(() => seed(db));
}

function waitForConnect() {
}