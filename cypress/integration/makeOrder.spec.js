describe('Make Order ', () => {
    beforeEach(() => {
    })
    it('make order with no user data', () => {
        cy.setCookie('jwt-token', Cypress.env('TEST_TOKEN'))
        cy.visit('/shop')
        cy.get('button[data-test-id=addToCartBtn]').first().click().should(() => {
            expect(localStorage.getItem('items')).not.to.eq([])
            expect(localStorage.getItem('total')).not.to.eq(0)
        });
        cy.get('button[data-test-id=cartBtn]').click()
        cy.url().should('include', '/card')
        cy.get('button[data-test-id=payBtn]').click()
        cy.url().should('include', '/pre-order-info')
        cy.get('button[data-test-id=fillUserData]').click()
        cy.url().should('include', '/user/info')
    })

    it('make order when data already filled', () => {
        cy.setCookie('jwt-token', Cypress.env('TEST_TOKEN'))
        cy.visit('/shop')
        cy.get('button[data-test-id=addToCartBtn]').first().click().should(() => {
            expect(localStorage.getItem('items')).not.to.eq([])
            expect(localStorage.getItem('total')).not.to.eq(0)
        });
        cy.get('button[data-test-id=cartBtn]').click()
        cy.url().should('include', '/card')
        cy.get('button[data-test-id=payBtn]').click()
        cy.url().should('include', '/pre-order-info')
        cy.get('button[data-test-id=navigatePayBtn]').click()
        cy.url().should('include', '/payments')
    })
    it('make order after payment', () => {
        cy.visit('/shop');
        cy.get('button[data-test-id=addToCartBtn]').first().click().should(() => {
            expect(localStorage.getItem('items')).not.to.eq([])
            expect(localStorage.getItem('total')).not.to.eq(0)
        });
        cy.setCookie('jwt-token', Cypress.env('TEST_TOKEN'))
        cy.visit("/payments-details")
        cy.get('button[data-test-id=seeOrders]').click()
        cy.url().should('include', '/orders')
    })
})