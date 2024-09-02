Cypress.Commands.add('validateCartItems', () => {
    const itemKeys = ['item_0', 'item_1', 'item_2', 'item_3', 'item_4', 'item_5'];

    itemKeys.forEach((itemKey) => {
        cy.get(`@${itemKey}`).then((dataItem) => {
            cy.get(`#${itemKey}_title_link .inventory_item_name`)
                .contains(dataItem.name)
                .should('have.text', dataItem.name);
            cy.get(`#${itemKey}_title_link + .inventory_item_desc`)
                .contains(dataItem.description)
                .should('have.text', dataItem.description);
            cy.get(`#${itemKey}_title_link ~ .item_pricebar > .inventory_item_price`)
                .contains(dataItem.price)
                .should('have.text', dataItem.price);
        });
    });
});