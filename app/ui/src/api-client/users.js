import { API_URL, axios, axiosConfig } from './apiConfig'
// import axios ??

// const fakeUser = {
//     id: 0,
//     firstName: 'John',
//     lastName: 'Smith',
//     email: 'johnsmith@gmail.com',
//     bio: ''
// }

export async function signup(userInfo) {
    try {
        let res = await axios.post(
            `${API_URL}/users/signup/`, 
            userInfo,
            axiosConfig
        );
        console.log(res.data);
        return res.data;
    } catch(err) {
        return err;
    }
}

export async function login(loginInfo) {
    try {
        let res = await axios.post(
            `${API_URL}/users/login/`, 
            loginInfo,
            axiosConfig
        );
        console.log(res.data);
        return res.data;
    } catch(err) {
        return err;
    }
}