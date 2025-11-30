import { expect, test } from '@playwright/test'

test.describe('Home Page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/')
  })

  test('loads successfully with main content', async ({ page }) => {
    await expect(page).toHaveTitle(/Sabertaz Blog/)
    const mainContent = page.getByTestId('hero-section')
    await expect(mainContent).toBeVisible()
    await expect(mainContent).toHaveText(/Coder|Developer|Learner/)
  })

  test('navigates to posts page', async ({ page }) => {
    const postsLink = page.getByRole('link', { name: /posts/i })
    await postsLink.click()
    await expect(page).toHaveURL(/\/posts/)
  })
})
