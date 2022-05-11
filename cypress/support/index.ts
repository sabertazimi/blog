/**
 * @see https://on.cypress.io/configuration
 */

declare global {
  namespace Cypress {
    interface Chainable {
      findByRole(role: string): Chainable<JQuery<HTMLElement>>;
      findByTestId(testId: string): Chainable<JQuery<HTMLElement>>;
      getByRole(role: string): Chainable<JQuery<HTMLElement>>;
      getByTestId(testId: string): Chainable<JQuery<HTMLElement>>;
    }
  }
}

import './commands';
