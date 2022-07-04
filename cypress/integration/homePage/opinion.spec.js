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
        cy.setCookie('jwt-token', 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9%2EeyJhdWQiOiJodHRwOi8vMC4wLjAuMDozXFxcXD04MDgwL2hlbGxvMiIsImlzcyI6Imh0dHA6Ly8wLjAuMC4wOjNcXFxcPTgwODAiLCJpZCI6IjExMTY3OTkzMTM5ODcxMjg5MjAyMiIsImV4cCI6MTY1Njg3MDUwNn0%2EonfUOOaziFcBeaSm%5FPOQptNf%5FBVJ1WYskDVIr2WaL94')
        cy.visit('/shop')
        cy.get('button[data-test-id=productDetailBtn]').first().click()
        cy.get('button[data-test-id=binBtn]').first().click()
        cy.get('button[data-test-id=removeOpinion]').click()
    })

    it('should delete opinion', () => {
        cy.setCookie('jwt-token', 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9%2EeyJhdWQiOiJodHRwOi8vMC4wLjAuMDozXFxcXD04MDgwL2hlbGxvMiIsImlzcyI6Imh0dHA6Ly8wLjAuMC4wOjNcXFxcPTgwODAiLCJpZCI6IjExMTY3OTkzMTM5ODcxMjg5MjAyMiIsImV4cCI6MTY1Njg3MDUwNn0%2EonfUOOaziFcBeaSm%5FPOQptNf%5FBVJ1WYskDVIr2WaL94')
        cy.visit('/shop')
        cy.get('button[data-test-id=productDetailBtn]').first().click()
        cy.get('button[data-test-id=binBtn]').first().click()
        cy.get('button[data-test-id=cancelRemoveOpinion]').click();
    })
})