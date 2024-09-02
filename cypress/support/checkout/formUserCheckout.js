Cypress.Commands.add('formCheckout', ({ first_name, last_name, zip }) => {
    cy.get('#first-name').type(first_name)
    cy.get('#last-name').type(last_name)
    cy.get('#postal-code').type(zip)
    cy.get('#cancel').should('be.visible', 'be.enabled')
    cy.get('#continue').should('be.visible', 'be.enabled').click()
})

