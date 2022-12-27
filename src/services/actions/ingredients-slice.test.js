import ingredientsReducer, {initialState} from "./ingredients-slice";

const testIngredient = {
    "_id": "60d3b41abdacab0026a733c6",
    "name": "Краторная булка N-200i",
    "type": "bun",
    "proteins": 80,
    "fat": 24,
    "carbohydrates": 53,
    "calories": 420,
    "price": 1255,
    "image": "https://code.s3.yandex.net/react/code/bun-02.png",
    "image_mobile": "https://code.s3.yandex.net/react/code/bun-02-mobile.png",
    "image_large": "https://code.s3.yandex.net/react/code/bun-02-large.png",
    "__v": 0
};

describe("ingredientsSlice", () => {
    it("should return the initial state", () => {
        expect(ingredientsReducer(undefined, {})).toEqual(initialState);
    });

    it("ingredients/getAllIngredients/pending", () => {
        expect(ingredientsReducer(initialState, {
            type: "ingredients/getAllIngredients/pending"
        })).toEqual({
            isLoading: true,
            hasError: false,
            data: []
        });
    });

    it("ingredients/getAllIngredients/fulfilled", () => {
        expect(ingredientsReducer(initialState, {
            type: "ingredients/getAllIngredients/fulfilled",
            payload: [
                testIngredient
            ]
        })).toEqual({
            isLoading: false,
            hasError: false,
            data: [
                testIngredient
            ]
        });
    });

    it("ingredients/getAllIngredients/rejected", () => {
        expect(ingredientsReducer(initialState, {
            type: "ingredients/getAllIngredients/rejected"
        })).toEqual({
            isLoading: false,
            hasError: true,
            data: []
        });
    });
});