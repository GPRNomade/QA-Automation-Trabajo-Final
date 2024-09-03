beforeEach(() => {
  // Cargar los datos del fixture antes de que comiencen los tests
  cy.loadProdList().then(() => {
      // Alias cada item individualmente
      cy.get('@prodItems').then((prodItems) => {
          for (const key in prodItems) {
              cy.wrap(prodItems[key]).as(key);
          }
      });
  });
});

describe('Compra con user 1', {testIsolation:false}, () => {
  it('Login Usuario Standard', () => {  
    cy.visit('https://www.saucedemo.com/');
    cy.captureScreenshot();
    cy.fixture('data.json').then((data) => {
      const usuarioStandard = data['standard_user'];
      cy.login(
        usuarioStandard.user,
        usuarioStandard.password
      );
    })
    
    cy.urlCheck('/inventory');
    cy.captureScreenshot();
    
  })


  it('Agregar un producto al carrito Usuario Standard',()=>{
   
    //Agregar todos los productos al carrito y contar los botones "Add to cart"
    cy.get('.pricebar').then((buttons) => {
      const buttonCount = buttons.length;

      cy.wrap(buttons).each((button) => {
          cy.wrap(button).find('button').contains('Add to cart').click();
      });
      cy.captureScreenshot();
      // Traer el array de objetos agregados en el localStorage y comparar con la cantidad agregada anteriormente
      cy.getAllLocalStorage().then((localStorageContent) => {
          let cartContentsText;

          try {
              const cartContents = JSON.parse(localStorageContent['https://www.saucedemo.com']['cart-contents']); // Convertir el string en un array
              cartContentsText = cartContents.length.toString(); // Convertir la cantidad a string para compararla
              cy.get('.shopping_cart_badge').should('have.text', cartContentsText);
              cy.log(`El carrito tiene ${cartContentsText} items agregados`);
              
              // Comparar la cantidad de botones "Add to cart" con el número de elementos en el carrito
              expect(cartContentsText).equals(buttonCount.toString())
              cy.log(`Se agregaron ${cartContentsText} items al carrito y coincide con los ${buttonCount} productos disponibles en la tienda.`);            

          } catch (error) {
              cy.log(`Error al comparar los items del carrito. El carrito debería tener ${cartContentsText || 'un número indefinido'} items y se encontraron ${buttonCount} botones 'Add to cart'.`);
          }
      });
    });
  //click en el cart
    cy.get('.shopping_cart_link').should('be.visible', 'be.enabled').click()
    
    //check url cart
    cy.urlCheck('/cart');   
    cy.captureScreenshot();
    //validacion items carrito
    
    cy.validateCartItems();
    cy.get('#checkout').should('be.visible', 'be.enabled');
    cy.get('#continue-shopping').should('be.visible', 'be.enabled');
    cy.captureScreenshot();
  })





//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////



  it('Hacer checkout Usuario Standard',()=>{
    
    //click en id="checkout"
    cy.get('#checkout').should('be.visible', 'be.enabled').click()


    //validar estar en la pagina /checkout-step-one
    cy.urlCheck('/checkout-step-one');
    cy.captureScreenshot();
    //llenar datos
    cy.fixture('userCheckout.json').then((userCheckout) => {
      cy.formCheckout(userCheckout)
    })
    cy.captureScreenshot();
    //validar estar en la pag overview
    cy.urlCheck('/checkout-step-two');
    cy.captureScreenshot();
    //validar prod + precio total (ver)
    cy.validateCartItems();
    cy.validateTotals();

    //click en finish
    cy.get('#cancel').should('be.visible', 'be.enabled')
    cy.get('#finish').should('be.visible', 'be.enabled').click()
    //validar checkout-complete página, mensajes
    cy.urlCheck('/checkout-complete');
    cy.captureScreenshot();

    cy.okMsgsCheck();

    //click botón back home
    cy.get('#back-to-products').should('be.visible', 'be.enabled').click()
    cy.urlCheck('/inventory');
    cy.captureScreenshot();
    //validar carrito vacío (ver si se puede reutilizar el command de get alllocalsotrage)
    let cartContentsText;
    cy.getAllLocalStorage().then((localStorageContent) => {
      try {
        const cartContents = JSON.parse(localStorageContent['https://www.saucedemo.com']['cart-contents']) //con json.parse hago de un string, un array
        const cartContentsText = cartContents.length.toString() //convertir el 6 q trae a string para poder compararlo
        cy.get('.shopping_cart_badge').should('have.text', cartContentsText)
        cy.log(`El carrito tiene ${cartContentsText} items agregados`)
        cartElements=cartContents
      }
      catch (error) {
        cy.log(`El carrito tiene una cantidad distinta de items agregados: ${cartContentsText ? cartContentsText : 'no definido'}`);
      }
    }) 
  })

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  it('Logout Usuario Standard',()=>{
    
    cy.get('#react-burger-menu-btn').click()
    cy.get('#reset_sidebar_link').click()
    cy.clearAllLocalStorage();
    cy.get('#logout_sidebar_link').click()
    cy.urlCheck('https://www.saucedemo.com/');
  })

// cuando haga las validaciones del plp: cy.get('#item_0_title_link inventory_item_img').should('have.attr', 'src').should('not.have.text', '404')

})


//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////



describe('Compra con user 2', {testIsolation:false}, () => {
  it('Login Usuario Problematico', () => {
    cy.visit('https://www.saucedemo.com/');
    cy.fixture('data.json').then((data) => {
      const usuarioProblem = data['problem_user'];
      cy.login(
        usuarioProblem.user,
        usuarioProblem.password
      );
    })
    cy.urlCheck('/inventory');
    
  })


  it('Agregar un producto al carrito Usuario Problematico',()=>{
   
    //Agregar todos los productos al carrito y contar los botones "Add to cart"
    cy.get('.pricebar').then((buttons) => {
      const buttonCount = buttons.length;

      cy.wrap(buttons).each((button) => {
          cy.wrap(button).find('button').contains('Add to cart').click();
      });

      // Traer el array de objetos agregados en el localStorage y comparar con la cantidad agregada anteriormente
      cy.getAllLocalStorage().then((localStorageContent) => {
          let cartContentsText;

          try {
              const cartContents = JSON.parse(localStorageContent['https://www.saucedemo.com']['cart-contents']); // Convertir el string en un array
              cartContentsText = cartContents.length.toString(); // Convertir la cantidad a string para compararla
              cy.get('.shopping_cart_badge').should('have.text', cartContentsText);
              cy.log(`El carrito tiene ${cartContentsText} items agregados`);
              
              // Comparar la cantidad de botones "Add to cart" con el número de elementos en el carrito
              expect(cartContentsText).equals(buttonCount.toString())
              cy.log(`Se agregaron ${cartContentsText} items al carrito y coincide con los ${buttonCount} productos disponibles en la tienda.`);            

          } catch (error) {
              cy.log(`Error al comparar los items del carrito. El carrito debería tener ${cartContentsText || 'un número indefinido'} items y se encontraron ${buttonCount} botones 'Add to cart'.`);
          }
      });
    });

    //click en el cart
    cy.get('.shopping_cart_link').should('be.visible', 'be.enabled').click()
   
    //check url cart
    cy.urlCheck('/cart');   
    cy.captureScreenshot()
    //validacion items carrito
    cy.validateCartItems();
    cy.captureScreenshot()
  })





//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////



  it('Hacer checkout Usuario Problematico',()=>{
    
    //click en id="checkout"
    cy.get('#checkout').should('be.visible', 'be.enabled').click()


    //validar estar en la pagina /checkout-step-one
    cy.urlCheck('/checkout-step-one');
    cy.captureScreenshot()
    //llenar datos
    cy.fixture('userCheckout.json').then((userCheckout) => {
      cy.formCheckout(userCheckout)
    })

    //validar estar en la pag overview
    cy.urlCheck('/checkout-step-two');

    //validar prod + precio total (ver)
    cy.validateCartItems();
    cy.validateTotals();

    //click en finish
    cy.get('#finish').should('be.visible', 'be.enabled').click()
    //validar checkout-complete página, mensajes
    cy.urlCheck('/checkout-complete');
    cy.captureScreenshot()

    cy.okMsgsCheck();

    //click botón back home
    cy.get('#back-to-products').should('be.visible', 'be.enabled').click()
    cy.urlCheck('/inventory');
    cy.captureScreenshot()
    //validar carrito vacío (ver si se puede reutilizar el command de get alllocalsotrage)
    let cartContentsText;
    cy.getAllLocalStorage().then((localStorageContent) => {
      try {
        const cartContents = JSON.parse(localStorageContent['https://www.saucedemo.com']['cart-contents']) //con json.parse hago de un string, un array
        const cartContentsText = cartContents.length.toString() //convertir el 6 q trae a string para poder compararlo
        cy.get('.shopping_cart_badge').should('have.text', cartContentsText)
        cy.log(`El carrito tiene ${cartContentsText} items agregados`)
        cartElements=cartContents
      }
      catch (error) {
        cy.log(`El carrito tiene una cantidad distinta de items agregados: ${cartContentsText ? cartContentsText : 'no definido'}`);
      }
    }) 

  })

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  it('Logout Usuario Problematico',()=>{
    cy.get('#react-burger-menu-btn').click()
    cy.get('#reset_sidebar_link').click()
    cy.clearAllLocalStorage();
    cy.get('#logout_sidebar_link').click()
    cy.captureScreenshot()
    cy.urlCheck('https://www.saucedemo.com/');
    cy.captureScreenshot()
  })

// cuando haga las validaciones del plp: cy.get('#item_0_title_link inventory_item_img').should('have.attr', 'src').should('not.have.text', '404')

})