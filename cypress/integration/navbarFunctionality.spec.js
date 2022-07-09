describe('Shop component with adding to cart', () => {
    beforeEach(() => {
        cy.setCookie('jwt-token', 'some-jwt-token')
        cy.visit('/')
    })
    it('change navbar info after logout', () => {
        cy.get('button[data-test-id=logout').click()
        cy.get('button[data-test-id=login-btn').should('exist')
        cy.get('button[data-test-id=login-btn').should('exist')
        cy.get('button[data-test-id=cartBtn]').should('exist')
        cy.get('button[data-test-id=userOrders]').should('not.exist')
        cy.get('button[data-test-id=userProfile]').should('not.exist')
    });

    it('should render all buttons', () => {
        cy.get('button[data-test-id=login-btn').should('not.exist')
        cy.get('button[data-test-id=logout').should('exist')
        cy.get('button[data-test-id=cartBtn]').should('exist')
        cy.get('button[data-test-id=userOrders]').should('exist')
        cy.get('button[data-test-id=userProfile]').should('exist')
    })
    it('should go back to home page', () => {
        cy.visit('/shop')
        cy.get('button[data-test-id=homeBtn').click()
        cy.url().should('include', '/')
    })
})