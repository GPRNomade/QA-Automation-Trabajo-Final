describe('Usuario Standard', {testIsolation:false}, () => {
  before(() => {
    // Cargar los datos del fixture antes de que comiencen los tests
    cy.loadProdList();
  }); 

  it('Login Usuario Standard', () => {
    cy.visit('https://www.saucedemo.com/');
    cy.fixture('data.json').then((data) => {
      const usuarioStandard = data['standard_user'];
      cy.login(
        usuarioStandard.user,
        usuarioStandard.password
      );
    })
    cy.urlCheck('/inventory');
    
  })


  it('Agregar un producto al carrito',()=>{
   
    // load los datos de los productos

    // cy.fixture('prodList.json').then((prodList) => {
    //   let dataItem0 = Object.assign({}, {'name': prodList.item_0.name,
    //     'description': prodList.item_0.description,
    //     'price': prodList.item_0.price});
    //   let dataItem1 = Object.assign({}, {'name': prodList.item_1.name,
    //     'description':prodList.item_1.description,
    //     'price':prodList.item_1.price})
    //   let dataItem2 = Object.assign({},{'name': prodList.item_2.name,
    //     'description':prodList.item_2.description,
    //     'price':prodList.item_2.price})
    //   let dataItem3 = Object.assign({},{'name': prodList.item_3.name,
    //     'description':prodList.item_3.description,
    //     'price':prodList.item_3.price})
    //   let dataItem4 = Object.assign({},{'name': prodList.item_4.name,
    //     'description':prodList.item_4.description,
    //     'price':prodList.item_4.price})
    //   let dataItem5 = Object.assign({},{'name': prodList.item_5.name,
    //     'description':prodList.item_5.description,
    //     'price':prodList.item_5.price})
    //   cy.wrap(dataItem0).as('dataItem0')
    //   cy.wrap(dataItem1).as('dataItem1')
    //   cy.wrap(dataItem2).as('dataItem2')
    //   cy.wrap(dataItem3).as('dataItem3')
    //   cy.wrap(dataItem4).as('dataItem4')
    //   cy.wrap(dataItem5).as('dataItem5')
    //   })

    // cy.get('.pricebar').each((button) => {
    //   cy.wrap(button).find('button').contains('Add to cart').click()
    // })
    cy.get('.pricebar').each((button) => {
      cy.wrap(button).find('button').contains('Add to cart').click();
    });
   
    cy.getAllLocalStorage().then((localStorageContent) => {
      try {
        const cartContents = JSON.parse(localStorageContent['https://www.saucedemo.com']['cart-contents']) //con json.parse hago de un string, un array
        const cartContentsText = cartContents.length.toString() //convertir el 6 q trae a string para poder compararlo
        cy.get('.shopping_cart_badge').should('have.text', cartContentsText)
        cy.log(`El carrito tiene ${cartContentsText} items agregados`)
        cartElements=cartContents
      }
      catch (error) {
        cy.log(`El carrito tiene tiene una cantidad distinta de items agregados:${cartContentsText} items`)
      }
    }) 

    cy.get('.shopping_cart_link').should('be.visible', 'be.enabled').click()

    cy.urlCheck('/cart');   
    
//validacion items carrito
    cy.validateCartItems();

    // cy.get('@dataItem0').then((dataItem0)=>{
    //   cy.get('#item_0_title_link .inventory_item_name').contains(dataItem0.name).should('have.text', dataItem0.name);
    //   cy.get('#item_0_title_link + .inventory_item_desc').contains(dataItem0.description).should('have.text', dataItem0.description);
    //   cy.get('#item_0_title_link ~ .item_pricebar>.inventory_item_price').contains(dataItem0.price).should('have.text', dataItem0.price);
    // })
    // cy.get('@dataItem1').then((dataItem1)=>{
    //   cy.get('#item_1_title_link .inventory_item_name').contains(dataItem1.name).should('have.text', dataItem1.name);
    //   cy.get('#item_1_title_link + .inventory_item_desc').contains(dataItem1.description).should('have.text', dataItem1.description);
    //   cy.get('#item_1_title_link ~ .item_pricebar>.inventory_item_price').contains(dataItem1.price).should('have.text', dataItem1.price);
    // })
    // cy.get('@dataItem2').then((dataItem2)=>{
    //   cy.get('#item_2_title_link .inventory_item_name').contains(dataItem2.name).should('have.text', dataItem2.name);
    //   cy.get('#item_2_title_link + .inventory_item_desc').contains(dataItem2.description).should('have.text', dataItem2.description);
    //   cy.get('#item_2_title_link ~ .item_pricebar>.inventory_item_price').contains(dataItem2.price).should('have.text', dataItem2.price);
    // })

    // cy.get('@dataItem3').then((dataItem3)=>{
    //   cy.get('#item_3_title_link .inventory_item_name').contains(dataItem3.name).should('have.text', dataItem3.name);
    //   cy.get('#item_3_title_link + .inventory_item_desc').contains(dataItem3.description).should('have.text', dataItem3.description);
    //   cy.get('#item_3_title_link ~ .item_pricebar>.inventory_item_price').contains(dataItem3.price).should('have.text', dataItem3.price);
    // })
    // cy.get('@dataItem4').then((dataItem4)=>{
    //   cy.get('#item_4_title_link .inventory_item_name').contains(dataItem4.name).should('have.text', dataItem4.name);
    //   cy.get('#item_4_title_link + .inventory_item_desc').contains(dataItem4.description).should('have.text', dataItem4.description);
    //   cy.get('#item_4_title_link ~ .item_pricebar>.inventory_item_price').contains(dataItem4.price).should('have.text', dataItem4.price);
    // })
    // cy.get('@dataItem5').then((dataItem5)=>{
    //   cy.get('#item_5_title_link .inventory_item_name').contains(dataItem5.name).should('have.text', dataItem5.name);
    //   cy.get('#item_5_title_link + .inventory_item_desc').contains(dataItem5.description).should('have.text', dataItem5.description);
    //   cy.get('#item_5_title_link ~ .item_pricebar>.inventory_item_price').contains(dataItem5.price).should('have.text', dataItem5.price);
    // })
  })





//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////



  it('Hacer checkout',()=>{
    
    //click en id="checkout"
    cy.get('#checkout').should('be.visible', 'be.enabled').click()


    //validar estar en la pagina /checkout-step-one
    cy.urlCheck('/checkout-step-one');

    //llenar datos
    cy.fixture('userCheckout.json').then((userCheckout) => {
      cy.formUserCheckout(userCheckout)
    })

    //validar estar en la pag overview
    cy.urlCheck('/overview');

    //validar prod + precio total (ver)
    cy.validateCartItems();
    cy.validateTotals();
    // cy.get('@dataItem0').then((dataItem0)=>{
    //   cy.get('#item_0_title_link .inventory_item_name').contains(dataItem0.name).should('have.text', dataItem0.name);
    //   cy.get('#item_0_title_link + .inventory_item_desc').contains(dataItem0.description).should('have.text', dataItem0.description);
    //   cy.get('#item_0_title_link ~ .item_pricebar>.inventory_item_price').contains(dataItem0.price).should('have.text', dataItem0.price);
    //   cy.get('.summary_subtotal_label').contains('Item total: $', )
    // })

    //click en finish
    cy.get('#finish').should('be.visible', 'be.enabled').click()
    //validar checkout-complete página, mensajes
    cy.urlCheck('/checkout-complete');
    cy.get('')
    
    //click botón back home
    cy.get('#back-to-products').should('be.visible', 'be.enabled').click()
    //validar carrito vacío (ver si se puede reutilizar el command de get alllocalsotrage)


    cy.get('#react-burger-menu-btn').click()
    cy.get('#reset_sidebar_link').click()
    cy.clearAllLocalStorage();
  })


// cuando haga las validaciones del plp: cy.get('#item_0_title_link inventory_item_img').should('have.attr', 'src').should('not.have.text', '404')

})
