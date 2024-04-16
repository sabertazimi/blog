import type { Route } from '@/config'
import { routes } from '@/config'

describe('Header', () => {
  const menuItems = ['/', ...routes, 'SearchBar', 'ThemeSwitch', 'Ellipsis']
  const logoIndex = 0
  const linksStartIndex = logoIndex + 1
  const searchBarIndex = linksStartIndex + routes.length
  const themeSwitchIndex = searchBarIndex + 1

  it('should display fully menu items on each route', () => {
    cy.wrap(routes).each((route: Route) => {
      cy.visitRoute(route.path, route.name)

      cy.getByRole('menu')
        .findByRole('menuitem')
        .should('have.length', menuItems.length)
    })
  })

  it('should route to pages when links clicked', () => {
    cy.wrap(routes).each((route: Route, index) => {
      cy.visitRoute(route.path, route.name)

      cy.getByRole('menu')
        .findByRole('menuitem')
        .eq(index + linksStartIndex)
        .click()

      cy.validRoute(routes[index].path, routes[index].name)
    })
  })

  it('should have search bar', () => {
    cy.wrap(routes).each((route: Route) => {
      cy.visitRoute(route.path, route.name)

      cy.getByRole('menu')
        .findByRole('menuitem')
        .eq(searchBarIndex)
        .findByRole('combobox')
    })
  })

  it('should have theme switch', () => {
    cy.wrap(routes).each((route: Route) => {
      cy.visitRoute(route.path, route.name)
      cy.clearLocalStorage()

      cy.window().then((window) => {
        expect(window.localStorage.getItem('dark-mode')).to.equal(null)
        expect(window.document.body.classList.contains('dark')).to.equal(false)
      })

      cy.getByRole('menu')
        .findByRole('menuitem')
        .eq(themeSwitchIndex)
        .findByLabel('sun')
    })
  })
})
