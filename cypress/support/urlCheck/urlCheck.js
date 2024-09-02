Cypress.Commands.add('urlCheck', (expectedUrl) => {
    cy.url().then((currentUrl) => {
        cy.log(`Usuario Standard se encuentra en la página ${currentUrl}`);

        // Verificar que la URL incluya el fragmento esperado
        cy.url().should('include', expectedUrl)
            .then(() => {
                cy.log(`Usuario Standard está en la página correcta ${expectedUrl}`);
            });
    });
});