describe('Shop component with adding to cart', () => {
    beforeEach(() => {
        cy.clearLocalStorage('items')
        cy.clearLocalStorage('total')
        cy.visit('/shop')
    })
    it('should move to login btn when cookies clear', () => {
        cy.clearCookies()
        cy.visit('/shop')
        cy.get('button[data-test-id=addToCartBtn]').first().click().should(() => {
            expect(localStorage.getItem('items')).not.to.eq([])
            expect(localStorage.getItem('total')).not.to.eq(0)
        });
        cy.get('button[data-test-id=cartBtn]').click()
        cy.url().should('include', '/card')
        cy.get('button[data-test-id=payBtn]').click()
        cy.url().should('include', '/login')
    })

    it('should move to address details if user login', () => {
        cy.setCookie('jwt-token', 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9%2EeyJhdWQiOiJodHRwOi8vMC4wLjAuMDozXFxcXD04MDgwL2hlbGxvMiIsImlzcyI6Imh0dHA6Ly8wLjAuMC4wOjNcXFxcPTgwODAiLCJpZCI6IjExMTY3OTkzMTM5ODcxMjg5MjAyMiIsImV4cCI6MTY1Njg2NTc2M30%2E7gAn4iaFjUpvJNnh9wiUZz4J6i1o9W0awmiowbZZ3TA')
        cy.visit('/shop')
        cy.get('button[data-test-id=addToCartBtn]').first().click().should(() => {
            expect(localStorage.getItem('items')).not.to.eq([])
            expect(localStorage.getItem('total')).not.to.eq(0)
        });
        cy.get('button[data-test-id=cartBtn]').click()
        cy.url().should('include', '/card')
        cy.get('button[data-test-id=payBtn]').click()
        cy.url().should('include', '/pre-order-info')
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
})