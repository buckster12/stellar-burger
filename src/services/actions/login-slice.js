import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {LOGIN_URL} from "../../utils/constants";
import checkResponse from "../../utils/check-response";
import Cookies from "js-cookie";
import {saveTokens} from "../auth";

export const login = createAsyncThunk('auth/login',
    async (user) => {
        const res = await fetch(LOGIN_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(user),
        });
        const data = await checkResponse(res).catch(err => {
            throw err;
        });
        if (data.success !== true) {
            throw new Error("Не удалось войти");
        }
        return data;
    }
);

const loginSlice = createSlice({
    name: 'login',
    initialState: {
        email: "",
        password: "",
        passwordVisible: false,
        error: false,
        isLoading: false,
        isLoggedIn: (Cookies.get('accessToken') || "").length > 0,
    },
    reducers: {
        setIsLoggedIn: (state, action) => {
            state.isLoggedIn = action.payload;
        },
        setField: (state, action) => {
            state[action.payload.name] = action.payload.value;
        },
        setError: (state, action) => {
            state.error = action.payload;
        },
        setLoading: (state, action) => {
            state.isLoading = action.payload;
        },
        setPasswordVisible: (state, action) => {
            state.passwordVisible = action.payload;
        },
        setLoggedIn: (state, action) => {
            state.isLoggedIn = action.payload;
        }
    },
    extraReducers: {
        [login.pending]: (state) => {
            state.isLoading = true;
            state.error = false;
        },
        [login.fulfilled]: (state, action) => {
            state.isLoading = false;
            if (action.payload && action.payload.success === true) {
                state.isLoggedIn = true;
                state.error = false;
                const accessToken = (action.payload.accessToken || '').split('Bearer ')[1];
                const refreshToken = (action.payload.refreshToken);
                saveTokens(refreshToken, accessToken);
            } else {
                state.error = true;
            }
        },
        [login.rejected]: (state) => {
            state.isLoading = false;
            state.error = true;
        },
    },
});

export const {
    setIsLoggedIn
} = loginSlice.actions;

const loginReducer = loginSlice.reducer;
export default loginReducer;
