import { expect, test } from '@playwright/test'

test.describe('About Page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/about')
  })

  test('loads successfully with heading', async ({ page }) => {
    await expect(page).toHaveTitle(/About/)
    const heading = page.getByRole('heading', { level: 1 })
    await expect(heading.first()).toBeVisible()
  })

  test('displays profile information', async ({ page }) => {
    const profileContent = page.locator('text=/followers|following|repositories/i')
    await expect(profileContent.first()).toBeVisible()
  })
})
