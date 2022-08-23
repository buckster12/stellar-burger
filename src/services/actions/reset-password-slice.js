import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {emailPattern, RESET_PASSWORD_SET_URL, RESET_PASSWORD_URL} from "../../utils/constants";
import checkResponse from "../../utils/check-response";

export const setNewPasswordRequest = createAsyncThunk(
    'reset-password/setNewPasswordRequest',
    async (data) => {
        const response = await fetch(RESET_PASSWORD_SET_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });
        return checkResponse(response);
    }
);

export const resetPassword = createAsyncThunk(
    "resetPassword/resetPassword",
    async (email) => {
        const options = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({email}),
        };
        const response = await fetch(RESET_PASSWORD_URL, options);
        return checkResponse(response);
    }
)

const initialState = {
    email: '',
    error: false,
    newPassword: '',
    emailToken: '',
    successPasswordChanged: false,
    isLoading: false,
    errorMessage: '',
};

const resetPasswordSlice = createSlice({
    name: 'resetPassword',
    initialState,
    reducers: {
        setEmail: (state, action) => {
            state.email = action.payload;
            state.error = !action.payload.match(emailPattern);
        },
        setNewPassword: (state, action) => {
            state.newPassword = action.payload;
        },
        setEmailToken: (state, action) => {
            state.emailToken = action.payload;
        },
        setField: (state, action) => {
            state[action.payload.field] = action.payload.value;
        },
        clearData: () => initialState
    },
    extraReducers: {
        [resetPassword.pending]: (state) => {
            state.error = false;
            state.isLoading = true;
        },
        [resetPassword.fulfilled]: (state, action) => {
            state.isLoading = false;
            if (action.payload.success) {
            } else {
                state.errorMessage = action.payload.message;
            }
        },
        [resetPassword.rejected]: (state) => {
            state.isLoading = false;
            state.error = true;
        },
        [setNewPasswordRequest.pending]: (state) => {
            state.isLoading = true;
        },
        [setNewPasswordRequest.fulfilled]: (state, action) => {
            state.isLoading = false;
            console.log(action.payload);

            if (action.payload.success) {
                state.successPasswordChanged = true;
            } else {
                state.errorMessage = action.payload.message;
            }
        },
        [setNewPasswordRequest.rejected]: (state, action) => {
            state.isLoading = false;
            state.error = true;
            state.errorMessage = action.error.message || 'network error';
        }
    }
});

export const {
    setNewPassword,
    setEmailToken,
    clearData,
    setEmail,
    setField,
} = resetPasswordSlice.actions;

const resetPasswordReducer = resetPasswordSlice.reducer;
export default resetPasswordReducer;
