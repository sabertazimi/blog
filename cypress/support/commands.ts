/**
 * -- This is a dual command --
 * Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
 *
 * -- This will overwrite an existing command --
 * Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
 *
 * @see https://on.cypress.io/custom-commands
 */

Cypress.Commands.add(
  'findByRole',
  { prevSubject: 'element' },
  (subject, role) => {
    return cy.wrap(subject, { log: false }).find(`[role="${role}"]`);
  }
);

Cypress.Commands.add(
  'findByTestId',
  { prevSubject: 'element' },
  (subject, testId) => {
    return cy.wrap(subject, { log: false }).find(`[data-testid="${testId}"]`);
  }
);

Cypress.Commands.add('getByRole', role => {
  return cy.get(`[role="${role}"]`);
});

Cypress.Commands.add('getByTestId', testId => {
  return cy.get(`[data-testid="${testId}"]`);
});
