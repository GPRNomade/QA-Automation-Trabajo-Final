Cypress.Commands.add('loadProdList', () => {
    cy.fixture('prodList.json').then((prodList) => {
        // Crear objetos para cada item
        const items = {};
        for (const key in prodList) {
            if (Object.hasOwnProperty.call(prodList, key)) {
                items[key] = {
                    name: prodList[key].name,
                    description: prodList[key].description,
                    price: prodList[key].price
                };
            }
        }

        // Alias de cada item
        cy.wrap(items).as('prodItems'); // Guardar todos los items juntos en un alias
    });
});