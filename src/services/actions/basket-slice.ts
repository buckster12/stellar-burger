import {createSelector, createSlice} from "@reduxjs/toolkit";
import {v4 as uuidv4} from 'uuid';
import {IIngredient} from "../../types/ingredient-types";
import {IMainState} from "../../types/redux";


type TBasketState = {
    bun: IIngredient | {};
    ingredients: IIngredient[];
}
const initialState: TBasketState = {
    bun: {},
    ingredients: [],
};

const basketSlice = createSlice({
    name: 'basket',
    initialState,
    reducers: {
        addIngredient: (state: TBasketState, action) => {
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
        removeIngredient: (state: TBasketState, action) => {
            const ingredientUuid = action.payload;
            state.ingredients = state.ingredients.filter(ingredient => ingredient.uuid !== ingredientUuid);
        },
        resetBasket: (state) => {
            state.ingredients = [];
            state.bun = {};
        },
        swapElements: (state: TBasketState, action) => {
            const {dragIndex, hoverIndex} = action.payload;
            const dragElement = state.ingredients[dragIndex];
            const hoverElement = state.ingredients[hoverIndex];
            state.ingredients.splice(dragIndex, 1, hoverElement);
            state.ingredients.splice(hoverIndex, 1, dragElement);
        }
    }
});

export const selectTotalPrice = createSelector((state: IMainState) => {
        let totalPrice = 0;
        state.basket.ingredients.forEach(item => {
                totalPrice += item.price;
            }
        );
        if (state.basket.bun._id) {
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
