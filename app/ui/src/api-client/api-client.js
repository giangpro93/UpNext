const axios = require('axios');
const API_PORT = process.env.NODE_PORT || 9000;
const API_HOST = process.env.NODE_HOST || 'localhost';
// export const API_PREFIX = 'api'
const API_URL = `http://${API_HOST}:${API_PORT}`

const axiosInstance = axios.create({
    baseURL: API_URL,
    port: API_PORT,
    headers: {
        'Content-Type': 'application/json;charset=UTF-8',
        'Access-Control-Allow-Origin': '*',
        'Cache-Control': 'no-cache',
        'Pragma': 'no-cache',
        'Expires': '0'
    }
});

function logAPICall(data, thunk) {
    console.log(`Request data: ${data}`);
    return thunk()
    .then(res => {
        console.log(`Response data: ${JSON.stringify(res.data)}`);
        return res.data;
    })
    .catch(console.log);
}

module.exports = {
    logAPICall,
    axiosInstance
}