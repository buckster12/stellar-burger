import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {LOGOUT_URL} from "../../utils/constants";
import checkResponse from "../../utils/check-response";


export const logout = createAsyncThunk('auth/logout',
    async (refreshToken) => {
        const res = await fetch(LOGOUT_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({token: refreshToken}),
        });
        return await checkResponse(res).catch(err => {
            throw err;
        });
    }
);

const logoutSlice = createSlice({
    name: 'logout',
    initialState: {
        isLoading: false,
        error: null,
    },
    reducers: {
    },
    extraReducers: {
        [logout.pending]: (state) => {
            state.isLoggingOut = true;
        },
        [logout.fulfilled]: (state) => {
            state.isLoggingOut = false;
            state.isLoggedIn = false;
        },
        [logout.rejected]: (state) => {
            state.isLoggingOut = false;
            state.isLoggedIn = true;
        },
    },
});

const logoutReducer = logoutSlice.reducer;
export default logoutReducer;
