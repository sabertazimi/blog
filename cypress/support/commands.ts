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
  (subject, role, options) => {
    return cy.wrap(subject, { log: false }).find(`[role="${role}"]`, options);
  }
);

Cypress.Commands.add(
  'findByTestId',
  { prevSubject: 'element' },
  (subject, testId, options) => {
    return cy
      .wrap(subject, { log: false })
      .find(`[data-testid="${testId}"]`, options);
  }
);

Cypress.Commands.add('getByRole', (role, options) => {
  return cy.get(`[role="${role}"]`, options);
});

Cypress.Commands.add('getByTestId', (testId, options) => {
  return cy.get(`[data-testid="${testId}"]`, options);
});
