const knex_startup = require('../../knex_startup');

const tests = [
    ...require('./Entity'),
    ...require('./User'),
    ...require('./Group')
];

module.exports = { testRunner, runTest, runTests, tests };

// test is a void function that returns a Promise
// title is the label of the test
function testRunner(title, test) {
    return Promise.resolve()
    .then(() => console.log(`TEST: ${title}`))
    .then(test)
    .then(() => { console.log('PASSED\n'); return true; } )
    .catch(() => { console.log('FAILED\n'); throw false; } );
}

function runTest({ title, test }) {
    testRunner(title, test);
}

function runTests() {
    const testThunks = 
        tests.map(t => (() => testRunner(t.title, t.test)));
    
    let seq = Promise.resolve()
        .then(() => {console.log('Running tests...')});

    let failed = 0;
    testThunks.forEach(test => {
        seq = seq
            .then(test)
            .catch(() => { failed++; });
    });

    const numtests = tests.length;
    return seq
        .then(() => { console.log(`Results: ${numtests - failed} / ${numtests} PASSED`)})
        .catch(() => 'Tests failed');
}

process.chdir('../../');
knex_startup.setup()
.then(runTests)
.then(knex_startup.setup)
.then(() => { process.exit(0); })