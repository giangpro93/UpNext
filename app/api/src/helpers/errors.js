
module.exports = { logAndThrow };

function logAndThrow(msg) {
    return (err) => {
        console.log(msg);
        console.log(err);
        throw err;
    }
}