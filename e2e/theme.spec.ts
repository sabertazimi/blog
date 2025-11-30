import { expect, test } from '@playwright/test'

test.describe('Theme Switcher', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/posts')
    await page.setViewportSize({ width: 1280, height: 720 })
  })

  test('displays theme toggle button', async ({ page }) => {
    const themeButton = page.getByRole('button', { name: /theme/i })
    await expect(themeButton.first()).toBeVisible()
  })

  test('toggles theme between light and dark', async ({ page }) => {
    const themeButton = page.getByRole('button', { name: /theme/i })
    const html = page.locator('html')

    await themeButton.first().click()
    await expect(html).toHaveClass(/dark/)
    await expect(html).toHaveCSS('color-scheme', 'dark')

    await themeButton.first().click()
    await expect(html).toHaveClass(/light/)
    await expect(html).toHaveCSS('color-scheme', 'light')
  })
})
