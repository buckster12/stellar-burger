import {fetchWithRefresh, getCookie} from "../auth";
import {PROFILE_URL} from "../../utils/constants";
import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {IProfileState, TProfileForm, TUser} from "../../types/redux";

type TUpdateProfileResponse = {
    success: boolean;
    user: TUser;
}

export const updateProfile = createAsyncThunk<TUpdateProfileResponse, TProfileForm>(
    'profile/update',
    async (user: TProfileForm) => {
        return await fetchWithRefresh<TUpdateProfileResponse>(PROFILE_URL, {
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

export const initialState: IProfileState = {
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
            setName: (state, action: PayloadAction<string>) => {
                state.form.name = action.payload;
            },
            setNameDisabled: (state, action: PayloadAction<boolean>) => {
                state.disabled.name_disabled = action.payload;
            },
            setEmail: (state, action: PayloadAction<string>) => {
                state.form.email = action.payload;
            },
            setEmailDisabled: (state, action: PayloadAction<boolean>) => {
                state.disabled.email_disabled = action.payload;
            },
            setPassword: (state, action: PayloadAction<string>) => {
                state.form.password = action.payload;
            },
            setPasswordDisabled: (state, action: PayloadAction<boolean>) => {
                state.disabled.password_disabled = action.payload;
            },
            revertChangesInForm: (state: IProfileState) => {
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
            builder.addCase(updateProfile.fulfilled, (state: IProfileState, action: PayloadAction<TUpdateProfileResponse>) => {
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
            builder.addCase(updateProfile.rejected, (state: IProfileState) => {
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
