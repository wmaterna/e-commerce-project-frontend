
describe('Log in flow', () => {
    beforeEach(() => {
        cy.clearCookies()
        cy.visit('/')
    })
    it('should render login google correctly', () => {
        cy.get('[data-test-id="login-btn"]').click()
        cy.url().should('include', '/login')
        cy.get('[data-test-id="google-login"]')
    })

    it('should render login github correctly', () => {
        cy.get('[data-test-id="login-btn"]').click()
        cy.url().should('include', '/login')
        cy.get('[data-test-id="github-login"]')
    })

    it('should render navbar correctly', () => {
        cy.setCookie('jwt-token', 'jwt-token')
        cy.visit('/')
        cy.get('[data-test-id=userProfile]').click()
        cy.url().should('include', '/user/info')
        cy.get('[data-test-id=userOrders]').click()
        cy.url().should('include', '/orders')
    })

    it('should user logout correctly', () => {
        cy.setCookie('jwt-token', 'jwt-token')
        cy.visit('/shop')
        cy.get('[data-test-id=logout]').click()
        cy.get('[data-test-id="login-btn"]')
    })

})
