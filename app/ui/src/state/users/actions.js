import { createAsyncThunk } from '@reduxjs/toolkit';
const api = require('../../api-client/api.js');

export const signup = createAsyncThunk(
    'users/signup',
    function(signupInfo, { rejectWithValue }) {
        return api.users.create({
            name: `${signupInfo.firstName} ${signupInfo.lastName}`,
            email: signupInfo.email,
            password: signupInfo.password
        })
        .catch(err =>
            rejectWithValue(err.response.data)
        )
    }
)

export const login = createAsyncThunk(
    'users/login',
    async (loginInfo, { rejectWithValue }) => {
        try {
            const res = await api.users.authenticate(loginInfo);
            return res; // returns the user object as the payload
        } catch(err) {
            return rejectWithValue(err.response.data);
        }
    }
)

