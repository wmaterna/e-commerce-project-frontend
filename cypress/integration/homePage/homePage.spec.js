/// <reference types="Cypress" />

describe('Home Page Component', () => {
    beforeEach(() => {
        cy.visit('/')
    })
    it('should render headers text on home page', () => {
        cy.get('h2').
        should('have.text', 'The easiest way to make healthy life is by buying your favourite plants')
        cy.get('.welcome-box').within(() => { return cy.contains('Very beautiful plant decorations make our lives healthy and home enviroment so that the atmosphere becomes calmer').should('have.class', 'header-p')}).
        should('have.class', 'welcome-box')
        cy.get('#promotion').should('have.text', 'Plants that cannot be found in any other shops')
        cy.get('#promotion2').should('have.text', 'Everything you need to pop up your apartments even more')
        cy.get('#promotion3').should('have.text', 'Because clean apartment is also healthy apartment')
    })

    it('should change directory to shop', () => {
        cy.get('button[id=shop-header]').click()
        cy.url().should('include', '/shop')
    })

    it('should change directory to loginPage', () => {
        cy.get('[data-test-id="login-btn"]').click()
        cy.url().should('include', '/login')
    })

    it('should render an image', () => {
        cy.get('.home-page-container').should('have.css', 'background-image').and('include', 'https://images.unsplash.com/photo-1501004318641-b39e6451bec6?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1373&q=80');
    })
})

