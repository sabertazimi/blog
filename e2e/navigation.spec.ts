import { expect, test } from '@playwright/test'

test.describe('Navigation', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/posts')
    await page.setViewportSize({ width: 1280, height: 720 })
  })

  test('displays main navigation with posts and about links', async ({ page }) => {
    const postsLink = page.getByRole('link', { name: /posts/i })
    await expect(postsLink.first()).toBeVisible()
    const aboutLink = page.getByRole('link', { name: /about/i })
    await expect(aboutLink.first()).toBeVisible()
  })

  test('navigates to about page', async ({ page }) => {
    const aboutLink = page.getByRole('link', { name: /about/i })
    await aboutLink.first().click()
    await expect(page).toHaveURL(/\/about/)
  })
})
