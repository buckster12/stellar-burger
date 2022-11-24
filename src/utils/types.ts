export interface IIngredientType {
    id: string;
    title: string;
}

type TIngredientTypesArray = IIngredientType[];

const ingredientType: TIngredientTypesArray = [
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
