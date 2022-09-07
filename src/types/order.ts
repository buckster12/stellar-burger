import {IIngredient, IIngredientsArray} from "./ingredient-types";

export interface IOrder {
    ingredients: IIngredientsArray;
}

export interface IOrderState {
    isOk: boolean;
    isOrderProcessing: boolean;
    orderId: number | null;
    isModalOpen: boolean;
}

export interface IBasket {
    ingredients: IIngredientsArray;
    bun: IIngredient;
}