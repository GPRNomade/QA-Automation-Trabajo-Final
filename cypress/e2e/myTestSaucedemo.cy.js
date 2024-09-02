describe('Usuario Standard', {testIsolation:false}, () => {
    
  it('Login Usuario Standard', () => {
    cy.visit('https://www.saucedemo.com/');
    cy.fixture('data.json').then((data) => {
      const usuarioStandard = data['standard_user'];
      cy.login(
        usuarioStandard.user,
        usuarioStandard.password
      );
    })
    try{
      cy.get('span').contains('Products').should('be.visible');
      cy.log('Usuario Standar ingresó correctamente')
    }
    catch (error){
      cy.log('Usuario Standard no ingresó correctamente')
    }
  })




  it('Agregar un producto al carrito',()=>{
   
    cy.fixture('prodList.json').then((prodList) => {
      let dataItem0 = Object.assign({}, {'name': prodList.item_0.name,
        'description': prodList.item_0.description,
        'price': prodList.item_0.price});
      let dataItem1 = Object.assign({}, {'name': prodList.item_1.name,
        'description':prodList.item_1.description,
        'price':prodList.item_1.price})
      let dataItem2 = Object.assign({},{'name': prodList.item_2.name,
        'description':prodList.item_2.description,
        'price':prodList.item_2.price})
      let dataItem3 = Object.assign({},{'name': prodList.item_3.name,
        'description':prodList.item_3.description,
        'price':prodList.item_3.price})
      let dataItem4 = Object.assign({},{'name': prodList.item_4.name,
        'description':prodList.item_4.description,
        'price':prodList.item_4.price})
      let dataItem5 = Object.assign({},{'name': prodList.item_5.name,
        'description':prodList.item_5.description,
        'price':prodList.item_5.price})
      cy.wrap(dataItem0).as('dataItem0')
      cy.wrap(dataItem1).as('dataItem1')
      cy.wrap(dataItem2).as('dataItem2')
      cy.wrap(dataItem3).as('dataItem3')
      cy.wrap(dataItem4).as('dataItem4')
      cy.wrap(dataItem5).as('dataItem5')
      
      })
      
    

    cy.get('.pricebar').each((button) => {
      cy.wrap(button).find('button').contains('Add to cart').click()
    })
   
    cy.getAllLocalStorage().then((localStorageContent) => {
      try {
        const cartContents = JSON.parse(localStorageContent['https://www.saucedemo.com']['cart-contents']) //con json.parse hago de un string, un array
        const cartContentsText = cartContents.length.toString() //convertir el 6 q trae a string para poder compararlo
        cy.get('.shopping_cart_badge').should('have.text', cartContentsText)
        cy.log(`El carrito tiene ${cartContentsText} items agregados`)
        cartElements=cartContents
      }
      catch (error) {
        cy.log("El carrito tiene tiene una cantidad distinta de items agregados")
      }
    })
    

    cy.get('.shopping_cart_link').click()
    cy.get('.header_secondary_container span').contains('Your Cart').should('be.visible')

     
//validacion items carrito
    cy.get('@dataItem0').then((dataItem0)=>{
      cy.get('#item_0_title_link .inventory_item_name').contains(dataItem0.name).should('have.text', dataItem0.name);
      cy.get('#item_0_title_link + .inventory_item_desc').contains(dataItem0.description).should('have.text', dataItem0.description);
      cy.get('#item_0_title_link ~ .item_pricebar>.inventory_item_price').contains(dataItem0.price).should('have.text', dataItem0.price);
    })
    
  

    cy.get('#react-burger-menu-btn').click()
    cy.get('#reset_sidebar_link').click()
    cy.clearAllLocalStorage();

  })



// cuando haga las validaciones del plp: cy.get('#item_0_title_link inventory_item_img').should('have.attr', 'src').should('not.have.text', '404')

})
