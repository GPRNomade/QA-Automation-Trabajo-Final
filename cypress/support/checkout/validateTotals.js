Cypress.Commands.add('validateTotals', () => {
    // Definir la tasa de impuestos
    const taxRate = 0.08;

    // Sumar los precios de los items
    cy.get('@item_0').then((dataItem0) => {
        cy.get('@item_1').then((dataItem1) => {
            cy.get('@item_2').then((dataItem2) => {
                cy.get('@item_3').then((dataItem3) => {
                    cy.get('@item_4').then((dataItem4) => {
                        cy.get('@item_5').then((dataItem5) => {
                            const prices = [
                                parseFloat(dataItem0.price.replace('$', '')),
                                parseFloat(dataItem1.price.replace('$', '')),
                                parseFloat(dataItem2.price.replace('$', '')),
                                parseFloat(dataItem3.price.replace('$', '')),
                                parseFloat(dataItem4.price.replace('$', '')),
                                parseFloat(dataItem5.price.replace('$', ''))
                            ];

                            // Calcular subtotal, impuestos y total
                            const subtotal = prices.reduce((acc, price) => acc + price, 0);
                            const taxes = subtotal * taxRate;
                            const total = subtotal + taxes;

                            // Comparar con valores en la UI
                            cy.get('[data-test="subtotal-label"]').should('have.text', `Item total: $${subtotal.toFixed(2)}`);
                            cy.get('[data-test="tax-label"]').should('have.text', `Tax: $${taxes.toFixed(2)}`);
                            cy.get('[data-test="total-label"]').should('have.text', `Total: $${total.toFixed(2)}`);
                        });
                    });
                });
            });
        });
    });
});