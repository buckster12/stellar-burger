export interface IIngredient {
    type: 'bun' | 'sauce' | 'main';
    uuid: string;
    image: string;
    carbohydrates: number;
    fat: number;
    proteins: number;
    calories: number;
    image_large: string;
    _id: string;
    name: string;
    price: number;
}

export interface IIngredientsState {
    data: IIngredientsArray;
    isLoading: boolean;
    hasError: boolean;
}

export type IIngredientsArray = IIngredient[];