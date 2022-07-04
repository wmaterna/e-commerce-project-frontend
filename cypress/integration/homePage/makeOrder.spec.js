describe('Make Order ', () => {
    beforeEach(() => {
    })
    it('make order with no user data', () => {
        cy.setCookie('jwt-token', 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9%2EeyJhdWQiOiJodHRwOi8vMC4wLjAuMDozXFxcXD04MDgwL2hlbGxvMiIsImlzcyI6Imh0dHA6Ly8wLjAuMC4wOjNcXFxcPTgwODAiLCJpZCI6IjExMTY3OTkzMTM5ODcxMjg5MjAyMiIsImV4cCI6MTY1Njg3NzM1Nn0%2EywNC4PoWURtHTCdiVIP6AoB9TgEJOobf%2DiHjSzYqXHU')
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
        cy.setCookie('jwt-token', 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9%2EeyJhdWQiOiJodHRwOi8vMC4wLjAuMDozXFxcXD04MDgwL2hlbGxvMiIsImlzcyI6Imh0dHA6Ly8wLjAuMC4wOjNcXFxcPTgwODAiLCJpZCI6IjExMTY3OTkzMTM5ODcxMjg5MjAyMiIsImV4cCI6MTY1Njg3NzM1Nn0%2EywNC4PoWURtHTCdiVIP6AoB9TgEJOobf%2DiHjSzYqXHU')
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
})