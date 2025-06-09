Cypress.Commands.add('loginFake', () => {
  cy.visit('login.html')
  cy.get('#login-button').click()
})
