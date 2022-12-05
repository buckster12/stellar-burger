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

export type IIngredientsArray = IIngredient[];