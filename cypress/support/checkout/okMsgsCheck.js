Cypress.Commands.add('okMsgsCheck', () => {
    cy.fixture('okMsg.json').then((text) => {
        cy.get('[data-test="title"]').should('have.text', text.ok_title);
        cy.get('[data-test="complete-header"]').should('have.text', text.h2_complete);
        cy.get('[data-test="complete-text"]').should('have.text', text.ok_message);
    });
});