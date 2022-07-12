import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'
import {INGREDIENTS_URL} from "../../utils/constants";
import checkResponse from "../../utils/check-response";

export const getAllIngredients = createAsyncThunk(
    'ingredients/getAllIngredients',
    async () => {
        const res = await fetch(INGREDIENTS_URL);
        const data = await checkResponse(res).catch(err => {
            throw err;
        });
        return data.data;
    });

const ingredientsSlice = createSlice({
    name: 'ingredients',
    initialState: {
        isLoading: false,
        hasError: false,
        data: []
    },
    reducers: {},
    extraReducers: {
        [getAllIngredients.pending]: (state) => {
            state.isLoading = true;
            state.hasError = false;
        },
        [getAllIngredients.fulfilled]: (state, action) => {
            state.isLoading = false;
            state.hasError = false;
            state.data = action.payload;
        },
        [getAllIngredients.rejected]: (state) => {
            state.isLoading = false;
            state.hasError = true;
        },
    }
});


const ingredientsReducer = ingredientsSlice.reducer;
export default ingredientsReducer;
