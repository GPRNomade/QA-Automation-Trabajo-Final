Cypress.Commands.add('login', (user, password)=> {
    cy.get('#user-name').type(user)
    cy.get('#password').type(password)
    cy.captureScreenshot();
    cy.get('#login-button').should('be.visible', 'be.enabled').click()

})


