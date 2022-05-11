import { routes, siteConfig } from '@config';

describe('Home', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('should display home page', () => {
    cy.url().should('include', '/');
    cy.title().should('include', siteConfig.title);
  });

  it('should display home page title', () => {
    cy.get('[role="main"]').should('be.visible');
  });

  it('should toggle navigation menu when navigation button toggled', () => {
    cy.get('[data-testid="hamburger-button"]').click();
    cy.get('[role="banner"]').should('be.visible');
    cy.get('[role="navigation"]')
      .should('be.visible')
      .find('[role="link"]')
      .should('have.length', routes.length)
      .and('be.visible');

    cy.get('[data-testid="hamburger-icon"]').type('{enter}');
    cy.get('[role="banner"]').should('not.be.visible');
    cy.get('[role="navigation"]')
      .should('not.be.visible')
      .find('[role="link"]')
      .should('not.be.visible');
  });

  it('should contain navigation links to pages', () => {
    cy.get('[data-testid="hamburger-button"]').click();
    cy.get('[role="navigation"]')
      .find('[role="link"]')
      .each((link, index) => {
        cy.wrap(link)
          .contains(routes[index].name)
          .and('have.attr', 'href', routes[index].path);
      });
  });
});
