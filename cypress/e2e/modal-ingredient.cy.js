describe("Modal ingredient", function () {
    before(function () {
        // cy.intercept("GET", `${INGREDIENTS_URL}`, {fixture: "ingredients.json"});
        cy.visit("http://localhost:3000");
    });

    beforeEach(function () {
        cy.get("[class^=ingredient_ingredientContainer__]").first().as("ingredient");
    });

    it("Open modal ingredient", function () {
        cy.get("@ingredient").click();
        cy.get("[class^=modal_modal__]").should("be.visible");
    });

    it("Close modal ingredient", function () {
        cy.get("[class^=modal_modal__]").as("modal");
        cy.get("@modal").should("be.visible");
        cy.get("@modal").find("span[class^=modal_icon__]").click();
        cy.get("@modal").should("not.be");
    });

    // Check all info in modal
    it("Check all info in modal", function () {
        cy.fixture("ingredients.json").as("ingredients");
        cy.get("@ingredient").click();
        cy.get("[class^=modal_modal__]").as("modal");

        // save ingredient name in variable
        cy.get("@ingredient").find("p").invoke("text").as("ingredientName");

        // find ingredient in fixture ingredients by name
        cy.get("@ingredients").then((ingredients) => {
            const data = ingredients.data;
            cy.get("@ingredientName").then((ingredientName) => {
                const ingredient = data.find((ingredient) => ingredient.name === ingredientName);
                console.log(ingredient);
                // calories
                cy.get("@modal").find("[class^=ingredient-details_footerRow__] div").eq(0)
                    .find('span').eq(1)
                    .invoke("text").then(parseInt).should("eq", ingredient.calories);

                // proteins
                cy.get("@modal").find("[class^=ingredient-details_footerRow__] div").eq(1)
                    .find('span').eq(1)
                    .invoke("text").then(parseInt).should("eq", ingredient.proteins);

                // fat
                cy.get("@modal").find("[class^=ingredient-details_footerRow__] div").eq(2)
                    .find('span').eq(1)
                    .invoke("text").then(parseInt).should("eq", ingredient.fat);

                // carbohydrates
                cy.get("@modal").find("[class^=ingredient-details_footerRow__] div").eq(3)
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
