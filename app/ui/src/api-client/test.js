const api = require('./api');
const { axiosInstance } = require('./api-client');

const reqObj = {user_id: 1, group_id: 11};

api.memberships.deleteMembership(reqObj)
.then(console.log)
.catch(console.log)