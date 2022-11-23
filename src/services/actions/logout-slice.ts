import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {LOGOUT_URL} from "../../utils/constants";
import checkResponse from "../../utils/check-response";

export type TLogoutResponse = {
    error?: {
        message: string
    },
    success: boolean,
    payload: {
        success: boolean
    }
}

export const logout = createAsyncThunk<TLogoutResponse, string>('auth/logout',
    async (refreshToken: string, thunkAPI) => {
        try {
            const res = await fetch(LOGOUT_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({token: refreshToken}),
            });
            return await checkResponse<TLogoutResponse>(res);
        } catch (err) {
            return thunkAPI.rejectWithValue(err);
        }
    }
);

type TLogoutState = {
    isLoading: boolean;
}
const initialState: TLogoutState = {
    isLoading: false,
};
const logoutSlice = createSlice({
    name: 'logout',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(logout.pending, (state: TLogoutState) => {
            state.isLoading = true;
        });
        builder.addCase(logout.fulfilled, (state: TLogoutState) => {
            state.isLoading = false;
        });
        builder.addCase(logout.rejected, (state: TLogoutState) => {
            state.isLoading = false;
        });
    }
});

const logoutReducer = logoutSlice.reducer;
export default logoutReducer;
