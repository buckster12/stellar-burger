const modalSelector = "[class^=modal_modal__]";
describe("Modal ingredient", function () {
    before(function () {
        // cy.intercept("GET", `${INGREDIENTS_URL}`, {fixture: "ingredients.json"});
    });

    beforeEach(function () {
        cy.visit("");
        cy.get("[class^=ingredient_ingredientContainer__]").first().as("ingredient");
    });

    it("Open modal ingredient", function () {
        cy.get("@ingredient").click();
        cy.get(modalSelector).should("be.visible");
    });

    it("Close modal ingredient", function () {
        cy.get("@ingredient").click();

        cy.get(modalSelector).as("modal");
        cy.get("@modal").should("be.visible");
        cy.get("@modal").find("span[class^=modal_icon__]").click();
        cy.get("@modal").should("not.be");
    });

    // Check all info in modal
    it("Check all info in modal", function () {
        cy.fixture("ingredients.json").as("ingredients");
        cy.get("@ingredient").click();
        cy.get(modalSelector).as("modal");

        // save ingredient name in variable
        cy.get("@ingredient").find("p").invoke("text").as("ingredientName");

        const ingredientDetailsFooterSelector = "[class^=ingredient-details_footerRow__] div";

        // find ingredient in fixture ingredients by name
        cy.get("@ingredients").then((ingredients) => {
            const data = ingredients.data;
            cy.get("@ingredientName").then((ingredientName) => {
                const ingredient = data.find((ingredient) => ingredient.name === ingredientName);

                // calories
                cy.get("@modal").find(ingredientDetailsFooterSelector).eq(0)
                    .find('span').eq(1)
                    .invoke("text").then(parseInt).should("eq", ingredient.calories);

                // proteins
                cy.get("@modal").find(ingredientDetailsFooterSelector).eq(1)
                    .find('span').eq(1)
                    .invoke("text").then(parseInt).should("eq", ingredient.proteins);

                // fat
                cy.get("@modal").find(ingredientDetailsFooterSelector).eq(2)
                    .find('span').eq(1)
                    .invoke("text").then(parseInt).should("eq", ingredient.fat);

                // carbohydrates
                cy.get("@modal").find(ingredientDetailsFooterSelector).eq(3)
                    .find('span').eq(1)
                    .invoke("text").then(parseInt).should("eq", ingredient.carbohydrates);

                // image_large
                cy.get("@modal")
                    .find("[class^=ingredient-details_modalContentContainer__] >div >img")
                    .invoke("attr", "src")
                    .should("eq", ingredient.image_large);
            });
        });

        // Check ingredient name
        cy.get("@ingredient").find("p").invoke("text").then((text) => {
            cy.get("@modal")
                .find("[class^=ingredient-details_modalContentContainer__] > span")
                .invoke("text")
                .should("eq", text);
        });
    });
});
