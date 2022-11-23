import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {REGISTER_URL} from "../../utils/constants";
import checkResponse from "../../utils/check-response";
import {TProfileForm} from "../../types/redux";

export type TRegisterResponse = {
    success: boolean;
    message: string;
    accessToken: string;
    refreshToken: string;
    error: string;
}

export const register = createAsyncThunk<TRegisterResponse, TProfileForm>('auth/register',
    async (user) => {
        const res = await fetch(REGISTER_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(user),
        });
        const data = await checkResponse<TRegisterResponse>(res)
            .catch(err => {
                throw err;
            });
        if (!data.success) {
            throw new Error(data.message);
        }
        return data;
    }
);

type TRegisterState = TProfileForm & {
    error: string | null;
    isLoading: boolean;
};

const initialState: TRegisterState = {
    name: "",
    email: "",
    password: "",
    error: null,
    isLoading: false,
};

const registerSlice = createSlice({
    name: 'register',
    initialState,
    reducers: {
        setRegisterForm: (state: TRegisterState, action: { payload: { name: string, value: string } }) => {
            const {name, value} = action.payload;
            switch (name) {
                case 'name':
                    state.name = value;
                    break;
                case 'email':
                    state.email = value;
                    break;
                case 'password':
                    state.password = value;
                    break;
            }
        },
    },
    extraReducers: (builder) => {
        builder.addCase(register.pending, (state: TRegisterState) => {
            state.isLoading = true;
            state.error = null;
        });
        builder.addCase(register.fulfilled, (state: TRegisterState) => {
            state.isLoading = false;
        });
        builder.addCase(register.rejected, (state: TRegisterState, action) => {
            state.isLoading = false;
            state.error = action.error.message || 'Something went wrong';
        });
    },
});

export const {
    setRegisterForm,
} = registerSlice.actions;

const registerReducer = registerSlice.reducer;
export default registerReducer;

