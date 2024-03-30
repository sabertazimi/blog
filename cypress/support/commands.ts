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
    return cy.wrap(subject, { log: false }).find(`[role="${role}"]`, options)
  },
)

Cypress.Commands.add(
  'findByTestId',
  { prevSubject: 'element' },
  (subject, testId, options) => {
    return cy
      .wrap(subject, { log: false })
      .find(`[data-testid="${testId}"]`, options)
  },
)

Cypress.Commands.add(
  'findByLabel',
  { prevSubject: 'element' },
  (subject, label, options) => {
    return cy
      .wrap(subject, { log: false })
      .find(`[aria-label="${label}"]`, options)
  },
)

Cypress.Commands.add('getByRole', (role, options) => {
  return cy.get(`[role="${role}"]`, options)
})

Cypress.Commands.add('getByTestId', (testId, options) => {
  return cy.get(`[data-testid="${testId}"]`, options)
})

Cypress.Commands.add('getByLabel', (label, options) => {
  return cy.get(`[aria-label="${label}"]`, options)
})

Cypress.Commands.add('validRoute', (path, title) => {
  cy.url().should('include', path)

  if (title)
    cy.title().should('include', title)
})

Cypress.Commands.add('visitRoute', (path, title) => {
  cy.visit(path)
  cy.validRoute(path, title)
})
