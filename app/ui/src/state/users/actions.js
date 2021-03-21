import { createAsyncThunk } from '@reduxjs/toolkit';
const api = require('../../api-client/api.js');

export const signup = createAsyncThunk(
    'users/signup',
    async (signupInfo, { rejectWithValue }) => {
        try {
            const res = await api.users.create(signupInfo);
            return res; // returns the user object as the payload
        } catch(err) {
            return rejectWithValue(err.response.data);
        }
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

