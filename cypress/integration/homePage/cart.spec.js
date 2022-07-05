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
        cy.setCookie('jwt-token', 'some-jwt-token')
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

    it('should add number of element in cart', () => {
        cy.get('button[data-test-id=addToCartBtn]').first().click()
        cy.get('button[data-test-id=cartBtn]').click()
        cy.url().should('include', '/card')
        cy.get('button[data-test-id=plusBtn]').click().should(() => {
            expect(localStorage.getItem('total')).to.eq("5.98")
        });
    })

    it('should add and reduce number of element in cart', () => {
        cy.get('button[data-test-id=addToCartBtn]').first().click()
        cy.get('button[data-test-id=cartBtn]').click()
        cy.url().should('include', '/card')
        cy.get('button[data-test-id=plusBtn]').click().should(() => {
            expect(localStorage.getItem('total')).to.eq("5.98")
        });
        cy.get('button[data-test-id=minusBtn]').click().should(() => {
            expect(localStorage.getItem('total')).to.eq("2.99")
        });

    })

    it('should delete items from cart', () => {
        cy.get('button[data-test-id=addToCartBtn]').first().click()
        cy.get('button[data-test-id=cartBtn]').click()
        cy.url().should('include', '/card')
        cy.get('button[data-test-id=plusBtn]').click().should(() => {
            expect(localStorage.getItem('total')).to.eq("5.98")
        });
        cy.get('button[data-test-id=deleteFromBinBtn]').click().should(() => {
            expect(localStorage.getItem('items')).not.to.eq([])
            expect(localStorage.getItem('total')).not.to.eq(0)
        });
    })

    it('cart remember shopping value after logout', () => {
        cy.setCookie('jwt-token', 'jwt-token')
        cy.visit('/shop')
        cy.get('button[data-test-id=addToCartBtn]').first().click()
        cy.get('[data-test-id=logout]').click()
        cy.url().should('include', '/')
        cy.get('button[data-test-id=cartBtn]').click()
        expect(localStorage.getItem('items')).not.to.eq([])
        expect(localStorage.getItem('total')).not.to.eq(0)

    })


})