Cypress.Commands.add('captureScreenshot', (name) => {
    cy.screenshot(name, {
      capture: 'runner',
      fullPage: true
    });
  });