const tests = [
    ...require('./Entity'),
    ...require('./User')
];

module.exports = { testRunner, runTest, runTests, tests };

// test is a void function that returns a Promise
// title is the label of the test
function testRunner(title, test) {
    return Promise.resolve()
    .then(() => console.log(`TEST: ${title}`))
    .then(test)
    .then(() => { console.log('PASSED\n'); return true;} )
    .catch(() => { console.log('FAILED\n'); return false;} );
}

function runTest({ title, test }) {
    testRunner(title, test);
}

function runTests() {
    const testThunks = 
        tests.map(t => (() => testRunner(t.title, t.test)));
    
    let seq = Promise.resolve();
    testThunks.forEach(test => {
        seq = seq.then(test);
    });
}

runTests();