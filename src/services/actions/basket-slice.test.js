import basketReducer, {addIngredient, removeIngredient, resetBasket, swapElements} from "./basket-slice";

jest.mock('uuid', () => ({v4: () => '123456789'}));

const initialState = {
    ingredients: [],
    bun: null,
}

const bunIngredient = {
    "_id": "60d3b41abdacab0026a733c7",
    "name": "Флюоресцентная булка R2-D3",
    "type": "bun",
    "proteins": 44,
    "fat": 26,
    "carbohydrates": 85,
    "calories": 643,
    "price": 988,
    "image": "https://code.s3.yandex.net/react/code/bun-01.png",
    "image_mobile": "https://code.s3.yandex.net/react/code/bun-01-mobile.png",
    "image_large": "https://code.s3.yandex.net/react/code/bun-01-large.png",
    "__v": 0
};
const ingredient = {
    "_id": "60d3b41abdacab0026a733c9",
    "name": "Мясо бессмертных моллюсков Protostomia",
    "type": "main",
    "proteins": 433,
    "fat": 244,
    "carbohydrates": 33,
    "calories": 420,
    "price": 1337,
    "image": "https://code.s3.yandex.net/react/code/meat-02.png",
    "image_mobile": "https://code.s3.yandex.net/react/code/meat-02-mobile.png",
    "image_large": "https://code.s3.yandex.net/react/code/meat-02-large.png",
    "__v": 0
};
const ingredient2 = {
    "_id": "60d3b41abdacab0026a733d0",
    "name": "Хрустящие минеральные кольца",
    "type": "main",
    "proteins": 808,
    "fat": 689,
    "carbohydrates": 609,
    "calories": 986,
    "price": 300,
    "image": "https://code.s3.yandex.net/react/code/mineral_rings.png",
    "image_mobile": "https://code.s3.yandex.net/react/code/mineral_rings-mobile.png",
    "image_large": "https://code.s3.yandex.net/react/code/mineral_rings-large.png",
    "__v": 0
};

describe('basketSlice tests', function () {
    it('should return the initial state', function () {
        expect(basketReducer(undefined, {})).toEqual(initialState);
    });

    // addIngredient
    it('should handle addIngredient', function () {
        // test Bun
        expect(basketReducer(initialState, addIngredient(bunIngredient))).toEqual({
            bun: {...bunIngredient, uuid: '123456789'},
            ingredients: [],
        });
        // test Ingredient
        expect(basketReducer(initialState, addIngredient(ingredient))).toEqual({
            bun: null,
            ingredients: [{...ingredient, uuid: '123456789'}],
        });
    });

    // removeIngredient
    it('should handle removeIngredient', function () {
        expect(basketReducer({
            bun: null,
            ingredients: [{...ingredient, uuid: '123456789'}],
        }, removeIngredient('123456789'))).toEqual({
            bun: null,
            ingredients: [],
        });
    });

    // resetBasket
    it('should handle resetBasket', function () {
        expect(basketReducer({
            bun: {...bunIngredient, uuid: '123456789'},
            ingredients: [{...ingredient, uuid: '123456789'}]
        }, resetBasket())).toEqual({
            bun: null,
            ingredients: [],
        });
    });

    // swapElements
    it('should handle swapElements', function () {
        expect(basketReducer({
            bun: null,
            ingredients: [
                {...ingredient},
                {...ingredient2},
            ]
        }, swapElements({dragIndex: 0, hoverIndex: 1}))).toEqual({
            bun: null,
            ingredients: [
                {...ingredient2},
                {...ingredient},
            ]
        });
    });

});