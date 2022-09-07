import {fetchWithRefresh, getCookie} from "../auth";
import {PROFILE_URL} from "../../utils/constants";
import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {TUser, IProfileState, TProfileForm} from "../../types/redux";

export const updateProfile = createAsyncThunk<any, TProfileForm>(
    'profile/update',
    async (user) => {
        return await fetchWithRefresh<TUser>(PROFILE_URL, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${getCookie('accessToken')}`,
            },
            body: JSON.stringify(user),
        });
    }
);

type TLoadProfileResponse = {
    user: TUser;
}

export const loadProfile = createAsyncThunk<TLoadProfileResponse>(
    'profile/loadProfile',
    async () => {
        return await fetchWithRefresh<TLoadProfileResponse>(
            PROFILE_URL,
            {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${getCookie("accessToken")}`,
                }
            });
    });

const initialState: IProfileState = {
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
}

const profileSlice = createSlice({
        name: 'profile',
        initialState,
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
        extraReducers: (builder) => {
            builder.addCase(loadProfile.pending, (state: IProfileState) => {
                state.isLoading = true;
                state.error = false;
            });
            builder.addCase(loadProfile.fulfilled, (state: IProfileState, action) => {
                state.isLoading = false;
                state.error = false;
                state.user = action.payload.user;
                state.form.name = state.user.name;
                state.form.email = state.user.email;
                //
                state.disabled.email_disabled = true;
                state.disabled.password_disabled = true;
                state.disabled.name_disabled = true;
            });
            builder.addCase(loadProfile.rejected, (state: IProfileState) => {
                state.isLoading = false;
                state.error = true;
            });
            builder.addCase(updateProfile.pending, (state: IProfileState) => {
                state.isLoading = true;
                state.error = false;
            });
            builder.addCase(updateProfile.fulfilled, (state: IProfileState, action) => {
                state.isLoading = false;
                state.error = false;
                state.user = action.payload.user;
                state.form.name = state.user.name;
                state.form.email = state.user.email;
                //disable all disabled fields
                state.disabled.email_disabled = true;
                state.disabled.password_disabled = true;
                state.disabled.name_disabled = true;
            });
            builder.addCase(updateProfile.rejected, (state) => {
                state.isLoading = false;
                state.error = true;
            });
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
