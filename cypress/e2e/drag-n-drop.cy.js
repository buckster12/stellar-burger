describe('Ingredient drugs and drops', function () {
    beforeEach(function () {
        cy.visit('/');
        cy.intercept("GET", "api/auth/user", {fixture: "user.json"});
    });

    it('DnD bun', function () {
        cy.get('#section-bun img[draggable=true]').first().as('drag-bun-element');
        cy.get('[class^=burger-constructor_divOverScrollbar__]').first().as('drop-zone-target');

        cy.get('@drag-bun-element').trigger('dragstart').trigger('dragleave');
        cy.get('@drop-zone-target').first().trigger('dragenter').trigger('dragover').trigger('drop');

        // check that ul now have 2 li elements
        cy.get('div.burger-constructor_div__wqk0s.mb-10 > ul').children("li").should('have.length', 2);
    });
});
