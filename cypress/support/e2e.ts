/**
 * @see https://on.cypress.io/configuration
 */

import './commands'

declare global {
  namespace Cypress {
    interface Chainable {
      findByRole(
        role: Parameters<Cypress.ChainableMethods['find']>[0],
        options?: Parameters<Cypress.ChainableMethods['find']>[1]
      ): Chainable<JQuery<HTMLElement>>

      findByTestId(
        testId: Parameters<Cypress.ChainableMethods['find']>[0],
        options?: Parameters<Cypress.ChainableMethods['find']>[1]
      ): Chainable<JQuery<HTMLElement>>

      findByLabel(
        label: Parameters<Cypress.ChainableMethods['find']>[0],
        options?: Parameters<Cypress.ChainableMethods['find']>[1]
      ): Chainable<JQuery<HTMLElement>>

      getByRole(
        role: Parameters<Cypress.ChainableMethods['get']>[0],
        options?: Parameters<Cypress.ChainableMethods['get']>[1]
      ): Chainable<JQuery<HTMLElement>>

      getByTestId(
        testId: Parameters<Cypress.ChainableMethods['get']>[0],
        options?: Parameters<Cypress.ChainableMethods['get']>[1]
      ): Chainable<JQuery<HTMLElement>>

      getByLabel(
        label: Parameters<Cypress.ChainableMethods['get']>[0],
        options?: Parameters<Cypress.ChainableMethods['get']>[1]
      ): Chainable<JQuery<HTMLElement>>

      validRoute(path: string, title?: string): void
      visitRoute(path: string, title?: string): void
    }
  }
}
