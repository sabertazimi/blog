import { routes, siteConfig } from '@config';

describe('Home Page', () => {
  beforeEach(() => {
    cy.visitRoute('/', siteConfig.title);
  });

  it('should display page title', () => {
    cy.getByRole('main').should('be.visible');
  });

  it('should toggle navigation menu when navigation button toggled', () => {
    cy.getByTestId('hamburger-button').click();

    cy.getByRole('banner').should('be.visible');
    cy.getByRole('navigation')
      .should('be.visible')
      .findByRole('link')
      .should('have.length', routes.length)
      .and('be.visible');

    cy.getByTestId('hamburger-icon').type('{enter}');

    cy.getByRole('banner').should('not.be.visible');
    cy.getByRole('navigation')
      .should('not.be.visible')
      .findByRole('link')
      .should('not.be.visible');
  });

  it('should contain navigation links to pages', () => {
    cy.getByTestId('hamburger-button').click();

    cy.getByRole('navigation')
      .findByRole('link')
      .each((link, index) => {
        cy.wrap(link)
          .contains(routes[index].name)
          .and('have.attr', 'href', routes[index].path);
      });
  });
});
