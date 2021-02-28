
export const API_PORT = 9000
export const API_DOMAIN = 'http://localhost'
// export const API_PREFIX = 'api'
export const API_URL = `${API_DOMAIN}:${API_PORT}`

export const axios = require('axios');

export const axiosConfig = {
    headers: {
        'Content-Type': 'application/json;charset=UTF-8',
        'Access-Control-Allow-Origin': '*',
        'Cache-Control': 'no-cache',
        'Pragma': 'no-cache',
        'Expires': '0'
    }
}