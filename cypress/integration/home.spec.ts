import { routes } from '@config';

describe('Home', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('should display home page', () => {
    cy.url().should('include', '/');
  });

  it('should display home page title', () => {
    cy.get('span[role="banner"').should('be.visible');
  });

  it('should toggle navigation menu when navigation button toggled', () => {
    cy.get('span[data-testid="hamburger-button"]').click();
    cy.get('div[role="banner"]').should('be.visible');
    cy.get('div[role="navigation"]')
      .should('be.visible')
      .find('span[role="link"]')
      .should('have.length', routes.length)
      .should('be.visible');

    cy.get('svg[data-testid="hamburger-icon"]').type('{enter}');
    cy.get('div[role="banner"]').should('not.be.visible');
    cy.get('div[role="navigation"]')
      .should('not.be.visible')
      .find('span[role="link"]')
      .should('not.be.visible');
  });

  it('should contain navigation links to pages', () => {
    cy.get('span[data-testid="hamburger-button"]').click();
    cy.get('div[role="navigation"]')
      .find('span[role="link"]')
      .each((link, index) => {
        cy.wrap(link)
          .contains(routes[index].name)
          .should('have.attr', 'href', routes[index].path);
      });
  });
});
