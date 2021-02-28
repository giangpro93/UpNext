import { createAsyncThunk } from '@reduxjs/toolkit'
import { api } from '../../api-client/api.js'

export const signup = createAsyncThunk(
    'users/signup',
    async (signupInfo, { rejectWithValue }) => {
        try {
            const res = await api.users.signup(signupInfo);
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
            const res = await api.users.login(loginInfo);
            return res; // returns the user object as the payload
        } catch(err) {
            return rejectWithValue(err.response.data);
        }
    }
)

