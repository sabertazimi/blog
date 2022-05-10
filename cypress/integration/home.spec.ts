describe('Home', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('should display the home page', () => {
    cy.url().should('include', '/');
  });
});
