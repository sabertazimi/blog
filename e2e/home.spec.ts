import { expect, test } from '@playwright/test'

test.describe('Home Page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/')
  })

  test('loads successfully with main content', async ({ page }) => {
    await expect(page).toHaveTitle(/Sabertaz Blog/)
    const mainContent = page.locator('text=/Coder|Developer|Learner/').first()
    await expect(mainContent).toBeVisible()
  })

  test('navigates to posts page', async ({ page }) => {
    const postsLink = page.getByRole('link', { name: /posts/i })
    await postsLink.click()
    await expect(page).toHaveURL(/\/posts/)
  })
})
