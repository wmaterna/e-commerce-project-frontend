describe('User Profile flow', () => {
    beforeEach(() => {
        cy.clearCookies()
    })
    it('check if save disabled when no data', () => {
        cy.setCookie('jwt-token', Cypress.env('TEST_TOKEN'))
        cy.visit('/')
        cy.get('button[data-test-id=userProfile]').click()
        cy.url().should('include', '/user/info')
        cy.get('button[data-test-id=editFormBtn]').click()
        cy.get('button[data-test-id=saveFromBtn]').should('be.disabled')
    })

    it('test enable save button and add save new data', () => {
        cy.setCookie('jwt-token',  Cypress.env('TEST_TOKEN'))
        cy.visit('/')
        cy.get('button[data-test-id=userProfile]').click()
        cy.url().should('include', '/user/info')
        cy.get('button[data-test-id=editFormBtn]').click()
        cy.get('button[data-test-id=saveFromBtn]').should('be.disabled')
        cy.get('[data-test-id=streetInput]').type('Test Street')
        cy.get('[data-test-id=apartmentInput]').type('Test 22')
        cy.get('[data-test-id=postCodeInput]').type('Test 31-202')
        cy.get('[data-test-id=cityInput]').type('Test city')
        cy.get('button[data-test-id=saveFromBtn]').should('not.be.disabled')
        cy.get('button[data-test-id=saveFromBtn]').click()
    })
})