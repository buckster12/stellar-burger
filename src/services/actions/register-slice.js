import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {REGISTER_URL} from "../../utils/constants";
import checkResponse from "../../utils/check-response";

export const register = createAsyncThunk('auth/register',
    async (user) => {
        const res = await fetch(REGISTER_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(user),
        });
        const data = await checkResponse(res)
            .catch(err => {
                throw err;
            });
        if (data.success !== true) {
            throw new Error(data.message);
        }
        return data;
    }
);

const registerSlice = createSlice({
    name: 'register',
    initialState: {
        name: "",
        email: "",
        password: "",
        error: null,
        isLoading: false,
    },
    reducers: {
        setRegisterForm: (state, action) => {
            state[action.payload.name] = action.payload.value;
        },
    },
    extraReducers: {
        [register.pending]: (state) => {
            state.isLoading = true;
            state.error = null;
        },
        [register.fulfilled]: (state) => {
            state.isLoading = false;
        },
        [register.rejected]: (state, action) => {
            state.isLoading = false;
            state.error = action.error.message;
        }
    },
});

export const {
    setRegisterForm,
} = registerSlice.actions;

const registerReducer = registerSlice.reducer;
export default registerReducer;

