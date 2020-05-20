/// <reference types="Cypress" />

context('Window', () => {
    beforeEach(() => {
      cy.visit('http://localhost:4200')
    })
  
    it('expect user submit form', () => {
      cy.get('.mat-toolbar > span') .should('have.text', 'Bold Penguin');
      cy.get('#mat-input-0').type('Bill');
      cy.get('#mat-input-1').type('Gates');
      cy.get('.mat-select-value').click();
      cy.get('#mat-option-0 > .mat-option-text').click();
      cy.get('#mat-input-2').type('a');
      cy.get('#mat-option-20 > .mat-option-text').click();
      cy.get('[type="submit"]').click();
     
    })
  
 
  })
  