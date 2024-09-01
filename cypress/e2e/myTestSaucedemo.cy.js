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

  it('Agregar un producto al carrito',() =>{
    // cy.get('.pricebar').each((button) => {
    //   cy.wrap(button).find('button').contains('Add to cart').click()
    // })
    let getTitle = ""
    let productsAdded = []
    cy.get('button').contains('Add to cart').click()
    cy.get('.inventory_item_name').then((element) => {
      getTitle = element.text()
      cy.log(getTitle)
    })
    productsAdded.push({
      'title': getTitle,
      'description':"",
      'price':""
    })
    cy.log(productsAdded[0].title)

   
    let cartElements = []
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
    cy.log(cartElements)
  

  
    cy.clearAllLocalStorage();

  })





})



// describe('template spec', () => {
//   it('passes', () => {
//     cy.visit('https://www.saucedemo.com/')
//   })
// })
