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
        const data = await checkResponse<any>(res).catch(err => {
            throw err;
        });
        if (data.success !== true) {
            throw new Error("Не удалось войти");
        }
        return data;
    }
);

type TLoginState = {
    email: string;
    password: string;
    passwordVisible: boolean;
    error: boolean;
    isLoading: boolean;
    isLoggedIn: boolean;
}
const initialState: TLoginState = {
    email: "",
    password: "",
    passwordVisible: false,
    error: false,
    isLoading: false,
    isLoggedIn: (Cookies.get('accessToken') || "").length > 0,
};

const loginSlice = createSlice({
    name: 'login',
    initialState,
    reducers: {
        setIsLoggedIn: (state: TLoginState, action) => {
            state.isLoggedIn = action.payload;
        },
        setField: (state: TLoginState, action: { payload: { name: string, value: string } }) => {
            const {name, value} = action.payload;
            switch (name) {
                case 'email':
                    state.email = value;
                    break;
                case 'password':
                    state.password = value;
                    break;
            }
        },
        setError: (state: TLoginState, action) => {
            state.error = action.payload;
        },
        setLoading: (state: TLoginState, action) => {
            state.isLoading = action.payload;
        },
        setPasswordVisible: (state: TLoginState, action) => {
            state.passwordVisible = action.payload;
        },
        setLoggedIn: (state: TLoginState, action) => {
            state.isLoggedIn = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(login.pending, (state: TLoginState) => {
            state.isLoading = true;
            state.error = false;
        });
        builder.addCase(login.fulfilled, (state: TLoginState, action) => {
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
        });
        builder.addCase(login.rejected, (state: TLoginState) => {
            state.isLoading = false;
            state.error = true;
        });
    }
});

export const {
    setIsLoggedIn,
    setField,
    setError,
    setPasswordVisible,
} = loginSlice.actions;

const loginReducer = loginSlice.reducer;
export default loginReducer;
