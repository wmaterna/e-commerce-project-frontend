
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
        cy.setCookie('jwt-token', 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9%2EeyJhdWQiOiJodHRwOi8vMC4wLjAuMDozXFxcXD04MDgwL2hlbGxvMiIsImlzcyI6Imh0dHA6Ly8wLjAuMC4wOjNcXFxcPTgwODAiLCJpZCI6IjExMTY3OTkzMTM5ODcxMjg5MjAyMiIsImV4cCI6MTY1Njg2NTc2M30%2E7gAn4iaFjUpvJNnh9wiUZz4J6i1o9W0awmiowbZZ3TA')
        cy.visit('/')
        cy.get('[data-test-id=userProfile]').click()
        cy.url().should('include', '/user/info')
        cy.get('[data-test-id=userOrders]').click()
        cy.url().should('include', '/orders')
    })

    it('should user logout correctly', () => {
        cy.setCookie('jwt-token', 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9%2EeyJhdWQiOiJodHRwOi8vMC4wLjAuMDozXFxcXD04MDgwL2hlbGxvMiIsImlzcyI6Imh0dHA6Ly8wLjAuMC4wOjNcXFxcPTgwODAiLCJpZCI6IjExMTY3OTkzMTM5ODcxMjg5MjAyMiIsImV4cCI6MTY1Njg2NTc2M30%2E7gAn4iaFjUpvJNnh9wiUZz4J6i1o9W0awmiowbZZ3TA')
        cy.visit('/shop')
        cy.get('[data-test-id=logout]').click()
        cy.get('[data-test-id="login-btn"]')
    })

})
