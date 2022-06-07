import type { Route } from '@config';
import { routes, siteConfig } from '@config';

describe('Header', () => {
  const menuItems = ['/', ...routes, 'SearchBar', 'ThemeSwitch', 'Ellipsis'];
  const logoIndex = 0;
  const linksStartIndex = logoIndex + 1;
  const searchBarIndex = linksStartIndex + routes.length;
  const themeSwitchIndex = searchBarIndex + 1;

  it('should display fully menu items on each route', () => {
    cy.wrap(routes).each((route: Route) => {
      cy.visitRoute(route.path, route.name);

      cy.getByRole('menu')
        .findByRole('menuitem')
        .should('have.length', menuItems.length);
    });
  });

  it('should route to home page when logo clicked', () => {
    cy.wrap(routes).each((route: Route) => {
      cy.visitRoute(route.path, route.name);

      cy.getByRole('menu').findByRole('menuitem').eq(logoIndex).click();

      cy.validRoute('/', siteConfig.title);
    });
  });

  it('should route to pages when links clicked', () => {
    cy.wrap(routes).each((route: Route, index) => {
      cy.visitRoute(route.path, route.name);

      cy.getByRole('menu')
        .findByRole('menuitem')
        .eq(index + linksStartIndex)
        .click();

      cy.validRoute(routes[index].path, routes[index].name);
    });
  });

  it('should focus search bar when search bar clicked', () => {
    cy.wrap(routes).each((route: Route) => {
      cy.visitRoute(route.path, route.name);

      cy.getByRole('menu')
        .findByRole('menuitem')
        .eq(searchBarIndex)
        .click()
        .should('have.class', 'ant-menu-item-selected');
    });
  });

  it('should search posts when search bar worked', () => {
    cy.wrap(routes).each((route: Route) => {
      cy.visitRoute(route.path, route.name);

      cy.getByRole('menu')
        .findByRole('menuitem')
        .eq(searchBarIndex)
        .findByRole('combobox')
        .type('Notes')
        .should('have.value', 'Notes');
    });
  });

  it('should clear input when search bar clear button clicked', () => {
    cy.wrap(routes).each((route: Route) => {
      cy.visitRoute(route.path, route.name);

      cy.getByRole('menu')
        .findByRole('menuitem')
        .eq(searchBarIndex)
        .findByRole('combobox')
        .type('Notes')
        .should('have.value', 'Notes');

      cy.getByRole('menu')
        .findByRole('menuitem')
        .eq(searchBarIndex)
        .findByLabel('close-circle')
        .click();

      cy.getByRole('menu')
        .findByRole('menuitem')
        .eq(searchBarIndex)
        .findByRole('combobox')
        .should('have.value', '');
    });
  });

  it('should switch theme when theme switch button clicked', () => {
    cy.wrap(routes).each((route: Route) => {
      cy.visitRoute(route.path, route.name);
      cy.clearLocalStorage();

      cy.getByRole('menu')
        .findByRole('menuitem')
        .eq(themeSwitchIndex)
        .findByLabel('sun')
        .click();

      cy.window().then(window => {
        expect(window.localStorage.getItem('dark-mode')).to.equal('true');
        expect(window.document.body.classList.contains('dark')).to.equal(true);
      });

      cy.getByRole('menu')
        .findByRole('menuitem')
        .eq(themeSwitchIndex)
        .findByLabel('moon')
        .click();

      cy.window().then(window => {
        expect(window.localStorage.getItem('dark-mode')).to.equal('false');
        expect(window.document.body.classList.contains('dark')).to.equal(false);
      });
    });
  });
});
