import type { Route } from '@config';
import { routes } from '@config';

describe('Routes', () => {
  it('should make all routes accessible', () => {
    cy.wrap(routes).each((route: Route) => {
      cy.visit(route.path);

      cy.url().should('include', route.path);
      cy.title().should('include', route.name);
    });
  });
});
