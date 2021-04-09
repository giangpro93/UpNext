const api = require('./api');

const reqObj = {requester_id: 13, requested_id: 14};

api.friends.get(reqObj)
.then(console.log)
.catch(console.log)