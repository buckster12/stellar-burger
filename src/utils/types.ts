export interface IIngredientType {
    id: string;
    title: string;
}

type IIngredientTypesArray = IIngredientType[];

const ingredientType: IIngredientTypesArray = [
    {
        "id": "bun",
        "title": "Булки"
    },
    {
        "id": "sauce",
        "title": "Соусы"
    },
    {
        "id": "main",
        "title": "Начинки"
    }
];

export default ingredientType;
