import {fetchWithRefresh, getCookie} from "../auth";
import {PROFILE_URL} from "../../utils/constants";
import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";

export const updateProfile = createAsyncThunk(
    'profile/update',
    async (user) => {
        return await fetchWithRefresh(PROFILE_URL, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${getCookie('accessToken')}`,
            },
            body: JSON.stringify(user),
        });
    }
);

export const loadProfile = createAsyncThunk(
    'profile/loadProfile',
    async () => {
        return await fetchWithRefresh(
            PROFILE_URL,
            {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${getCookie("accessToken")}`,
                }
            });
    });

const profileSlice = createSlice({
        name: 'profile',
        initialState: {
            isLoading: false,
            error: false,
            form: {
                name: "",
                email: "",
                password: "",
            },
            disabled: {
                name_disabled: true,
                email_disabled: true,
                password_disabled: true,
            },
            user: {
                name: "",
                email: "",
            }
        },
        reducers: {
            setName: (state, action) => {
                state.form.name = action.payload;
            },
            setNameDisabled: (state, action) => {
                state.disabled.name_disabled = action.payload;
            },
            setEmail: (state, action) => {
                state.form.email = action.payload;
            },
            setEmailDisabled: (state, action) => {
                state.disabled.email_disabled = action.payload;
            },
            setPassword: (state, action) => {
                state.form.password = action.payload;
            },
            setPasswordDisabled: (state, action) => {
                state.disabled.password_disabled = action.payload;
            },
            revertChangesInForm: (state) => {
                state.form.name = state.user.name;
                state.form.email = state.user.email;
                state.disabled.email_disabled = true;
                state.disabled.password_disabled = true;
                state.disabled.name_disabled = true;
            }
        },
        extraReducers: {
            [loadProfile.pending]: (state) => {
                state.isLoading = true;
                state.error = false;
            },
            [loadProfile.fulfilled]: (state, action) => {
                state.isLoading = false;
                state.error = false;
                state.user = action.payload.user;
                state.form.name = state.user.name;
                state.form.email = state.user.email;
                //
                state.disabled.email_disabled = true;
                state.disabled.password_disabled = true;
                state.disabled.name_disabled = true;
            },
            [loadProfile.rejected]: (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            },
            [updateProfile.pending]: (state) => {
                state.isLoading = true;
                state.error = false;
            },
            [updateProfile.fulfilled]: (state, action) => {
                state.isLoading = false;
                state.error = false;
                state.user = action.payload.user;
                state.form.name = state.user.name;
                state.form.email = state.user.email;
                //disable all disabled fields
                state.disabled.email_disabled = true;
                state.disabled.password_disabled = true;
                state.disabled.name_disabled = true;
            },
            [updateProfile.rejected]: (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            }
        }
    }
);

export const {
    setName,
    setNameDisabled,
    setEmail,
    setEmailDisabled,
    setPassword,
    setPasswordDisabled,
    revertChangesInForm
} = profileSlice.actions;
const profileReducer = profileSlice.reducer;
export default profileReducer;
