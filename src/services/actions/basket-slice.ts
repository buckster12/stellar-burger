import {createSelector, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {v4 as uuidv4} from 'uuid';
import {IIngredient} from "../../types/ingredient-types";
import {RootState} from "../store";

type TBasketState = {
    bun: IIngredient | null;
    ingredients: IIngredient[];
}

export const initialState: TBasketState = {
    bun: null,
    ingredients: [],
};

const basketSlice = createSlice({
    name: 'basket',
    initialState,
    reducers: {
        addIngredient: (state: TBasketState, action: PayloadAction<IIngredient>) => {
            const ingredient = {
                ...action.payload,
                uuid: uuidv4(),
            };
            if (ingredient.type === 'bun') {
                state.bun = ingredient;
            } else {
                state.ingredients.push(ingredient);
            }
        },
        removeIngredient: (state: TBasketState, action: PayloadAction<string>) => {
            const ingredientUuid = action.payload;
            state.ingredients = state.ingredients.filter(ingredient => ingredient.uuid !== ingredientUuid);
        },
        resetBasket: (state: TBasketState) => {
            state.ingredients = [];
            state.bun = null;
        },
        swapElements: (state: TBasketState, action: PayloadAction<{ dragIndex: number, hoverIndex: number }>) => {
            const {dragIndex, hoverIndex} = action.payload;
            const dragElement = state.ingredients[dragIndex];
            const hoverElement = state.ingredients[hoverIndex];
            state.ingredients.splice(dragIndex, 1, hoverElement);
            state.ingredients.splice(hoverIndex, 1, dragElement);
        }
    }
});

export const selectTotalPrice = createSelector((state: RootState) => {
        let totalPrice = 0;
        state.basket.ingredients.forEach(item => {
                totalPrice += item.price;
            }
        );
        if (state.basket.bun && state.basket.bun._id) {
            totalPrice += state.basket.bun.price * 2;
        }
        return totalPrice;
    }, (state) => state
);

export const {
    addIngredient,
    removeIngredient,
    resetBasket,
    swapElements
} = basketSlice.actions;

const basketReducer = basketSlice.reducer;
export default basketReducer;
