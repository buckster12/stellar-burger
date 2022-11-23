import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit'
import {INGREDIENTS_URL} from "../../utils/constants";
import checkResponse from "../../utils/check-response";
import {IIngredient} from "../../types/ingredient-types";

export type TIngredientsResponse = {
    success: boolean;
    data: IIngredient[];
}

export const getAllIngredients = createAsyncThunk<Array<IIngredient>>(
    'ingredients/getAllIngredients',
    async () => {
        const res = await fetch(INGREDIENTS_URL);
        const data = await checkResponse<TIngredientsResponse>(res).catch(err => {
            throw err;
        });
        return data.data;
    });

type TIngredientSliceState = {
    isLoading: boolean,
    hasError: boolean,
    data: IIngredient[]
};
const initialState: TIngredientSliceState = {
    isLoading: false,
    hasError: false,
    data: []
};
const ingredientsSlice = createSlice({
    name: 'ingredients',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getAllIngredients.pending, (state: TIngredientSliceState) => {
            state.isLoading = true;
            state.hasError = false;
        });
        builder.addCase(getAllIngredients.fulfilled, (state: TIngredientSliceState, action: PayloadAction<Array<IIngredient>>) => {
            state.isLoading = false;
            state.hasError = false;
            state.data = action.payload;
        });
        builder.addCase(getAllIngredients.rejected, (state: TIngredientSliceState) => {
            state.isLoading = false;
            state.hasError = true;
        });
    }
});


const ingredientsReducer = ingredientsSlice.reducer;
export default ingredientsReducer;
