import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {LOGIN_URL} from "../../utils/constants";
import checkResponse from "../../utils/check-response";
import Cookies from "js-cookie";
import {saveTokens} from "../auth";

type TLoginResponse = {
    success: boolean;
    accessToken: string;
    refreshToken: string;
}

type TLoginRequest = {
    email: string;
    password: string;
}

export const login = createAsyncThunk<TLoginResponse, TLoginRequest>('auth/login',
    async (user: TLoginRequest) => {
        const res = await fetch(LOGIN_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(user),
        });
        const data = await checkResponse<TLoginResponse>(res).catch(err => {
            throw err;
        });
        if (!data.success) {
            throw new Error("Не удалось войти");
        }
        return data;
    }
);

type TLoginState = {
    email: string;
    password: string;
    passwordVisible: boolean;
    error: string | null;
    isLoading: boolean;
    isLoggedIn: boolean;
}
const initialState: TLoginState = {
    email: "",
    password: "",
    passwordVisible: false,
    error: null,
    isLoading: false,
    isLoggedIn: (Cookies.get('accessToken') || "").length > 0,
};

const loginSlice = createSlice({
    name: 'login',
    initialState,
    reducers: {
        setIsLoggedIn: (state: TLoginState, action: PayloadAction<boolean>) => {
            state.isLoggedIn = action.payload;
        },
        setField: (state: TLoginState, action: PayloadAction<{ name: string, value: string }>) => {
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
        setError: (state: TLoginState, action: PayloadAction<string>) => {
            state.error = action.payload;
        },
        setLoading: (state: TLoginState, action: PayloadAction<boolean>) => {
            state.isLoading = action.payload;
        },
        setPasswordVisible: (state: TLoginState, action: PayloadAction<boolean>) => {
            state.passwordVisible = action.payload;
        },
        setLoggedIn: (state: TLoginState, action: PayloadAction<boolean>) => {
            state.isLoggedIn = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(login.pending, (state: TLoginState) => {
            state.isLoading = true;
            state.error = null;
        });
        builder.addCase(login.fulfilled, (state: TLoginState, action: PayloadAction<TLoginResponse>) => {
            state.isLoading = false;
            if (action.payload.success) {
                state.isLoggedIn = true;
                state.error = null;
                const accessToken = (action.payload.accessToken || '').split('Bearer ')[1];
                const refreshToken = (action.payload.refreshToken);
                saveTokens(refreshToken, accessToken);
            } else {
                state.error = null;
            }
        });
        builder.addCase(login.rejected, (state: TLoginState) => {
            state.isLoading = false;
            state.error = null;
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
