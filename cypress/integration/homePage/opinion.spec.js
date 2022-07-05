/// <reference types="Cypress" />

describe('Opinion functionality', () => {
    beforeEach(() => {
        cy.visit('/shop')
    })
    it('Should add opinion', () => {
        cy.setCookie('jwt-token', 'not-empty-token')
        cy.visit('/shop')
        cy.get('button[data-test-id=productDetailBtn]').first().click()
        cy.get('button[data-test-id=showAddForm]').click()
        cy.get('[data-test-id=opinionTextInput]').type('New test opinion')
        cy.get('button[data-test-id=addOpinionBtn]').click()
        cy.get('div[data-test-id=opinionToggle]').first().click()
    })

    it('Should try add opinion and cancel', () => {
        cy.setCookie('jwt-token', 'not-empty-token')
        cy.visit('/shop')
        cy.get('button[data-test-id=productDetailBtn]').first().click()
        cy.get('button[data-test-id=showAddForm]').click()
        cy.get('[data-test-id=opinionTextInput]').type('New test opinion')
        cy.get('button[data-test-id=cancelOpinionBtn]').click()
        cy.get('button[data-test-id=showAddForm]')
    })

    it('Should not add opinion', () => {
        cy.clearCookies()
        cy.visit('/shop')
        cy.get('button[data-test-id=productDetailBtn]').first().click()
        cy.get('button[data-test-id=addYourOpinion]').should('not.exist')
    })

    it('should try delete opinion and cancel', () => {
        cy.setCookie('jwt-token', Cypress.env('TEST_TOKEN'))
        cy.visit('/shop')
        cy.get('button[data-test-id=productDetailBtn]').first().click()
        cy.get('button[data-test-id=binBtn]').first().click()
        cy.get('button[data-test-id=removeOpinion]').click()
    })

    it('should delete opinion', () => {
        cy.setCookie('jwt-token', Cypress.env('TEST_TOKEN'))
        cy.visit('/shop')
        cy.get('button[data-test-id=productDetailBtn]').first().click()
        cy.get('button[data-test-id=binBtn]').first().click()
        cy.get('button[data-test-id=cancelRemoveOpinion]').click();
    })
})