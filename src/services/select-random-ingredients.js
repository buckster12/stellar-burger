const selectRandomIngredients = (data) => {
    // randomly add ingredients to the basket
    const mainIngredients = data.filter(item => item.type === 'main' || item.type === 'sauce');
    let mainBasketRandom = [];

    // randomly add bun to the basket
    const bunIngredients = data.filter(item => item.type === 'bun');
    const random = Math.floor(Math.random() * bunIngredients.length);
    const bunIngredient = bunIngredients[random];
    mainBasketRandom.push(bunIngredient);

    // randomly add main ingredients to the basket
    for (let i = 0; i < 10; i++) {
        const random = Math.floor(Math.random() * mainIngredients.length);
        const ingredient = mainIngredients[random];
        mainBasketRandom.push(ingredient);
    }
    // add bun to bottom
    mainBasketRandom.push(bunIngredient);

    return mainBasketRandom;

}

export default selectRandomIngredients;