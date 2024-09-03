const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    // Otras configuraciones...

    screenshotOnRunFailure: true, // Activar capturas de pantalla en caso de fallos
    viewportHeight: 1080,
    viewportWidth: 1920,
    
    setupNodeEvents(on, config) {
      // Configuración para capturar página completa en caso de fallo
      on('after:screenshot', (details) => {
        // Puedes modificar el nombre del archivo de la captura de pantalla aquí
        console.log('Captura de pantalla tomada:', details);
      });

      on('after:run', () => {
        // Configuración para capturar la página completa en caso de fallo
        const failedTests = Cypress.mocha.getRunner().failures;

        failedTests.forEach((test) => {
          cy.screenshot(`failure-screenshot-${test.title}`, {
            capture: 'runner', // Captura de la página completa
            fullPage: true // Captura de la página completa
          });
        });
      });
    },
  },
  video: true,
  chromeWebSecurity: false
});




