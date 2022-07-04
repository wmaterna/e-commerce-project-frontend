describe('Shop component with adding to cart', () => {
    beforeEach(() => {
        cy.clearLocalStorage('items')
        cy.clearLocalStorage('total')
        cy.visit('/shop')
    })
    it('should add to cart from shop page', () => {
        cy.get('button[data-test-id=addToCartBtn]').first().click().should(() => {
            expect(localStorage.getItem('items')).not.to.eq([])
            expect(localStorage.getItem('total')).not.to.eq(0)
        });
    })

    it('should add to cart from details page', () => {
        cy.get('button[data-test-id=productDetailBtn]').first().click()
        cy.get('button[data-test-id=addToCartDetailBtn]').first().click().should(() => {
             expect(localStorage.getItem('items')).not.to.eq([])
             expect(localStorage.getItem('total')).not.to.eq(0)
       });
    })

    it('should change category and render good number of elements' , () => {
        cy.get('button[data-test-id=subcategoryBtn').first().click()
        cy.get('.productCard').its('length').should('eq',5)
    });

    it('should add to cart from shop page and go to the cart page check if there is good no of elements', () => {
        cy.get('button[data-test-id=addToCartBtn]').first().click().should(() => {
            expect(localStorage.getItem('items')).not.to.eq([])
            expect(localStorage.getItem('total')).not.to.eq(0)
        });
        cy.get('button[data-test-id=cartBtn]').click()
        cy.url().should('include', '/card')
        cy.get('.basketItem').its('length').should('eq',1)
    })

    it('should render all info about product detail', () => {
        cy.get('button[data-test-id=productDetailBtn]').first().click()
        cy.get('.productImg').find('img').should('have.attr', 'src', 'https://images.unsplash.com/photo-1602425224901-e7949d43938e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=765&q=80')
        cy.get('.productTitle').should('have.text','Warscewiczii')
        cy.get('.productDescription').should('have.text','Calatheas are magnificent tropical plants with beautifully shaped leaves. This Calathea Warscewiczii baby is perhaps one of the most remarkable varieties. Its exotic velvety leaves with two colours of green and burgundy undersides really make it stand out from your other plants. Besides being super decorative, she is also very air purifying! We don\'t know why you shouldn\'t take this beautiful baby into your home...')
        cy.get('.productPrice').should('have.text','Price: 2.99 $')
    })
})