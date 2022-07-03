import {INGREDIENTS_URL} from "../utils/constants";

export const getAllIngredients = async () => {
    return await new Promise((resolve, reject) => {

        fetch(INGREDIENTS_URL)
            .then(response => {
                if (response.ok) {
                    resolve(response.json());
                }
                reject(`Ошибка ${response.status}`);
            });
    });
}

