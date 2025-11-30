import { expect, test } from '@playwright/test'

test.describe('Posts Page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/posts')
  })

  test('loads successfully with heading', async ({ page }) => {
    await expect(page).toHaveTitle(/Posts/)
    const mainHeading = page.getByRole('heading', { level: 1 })
    await expect(mainHeading.first()).toBeVisible()
  })

  test('displays post cards with clickable links', async ({ page }) => {
    const postLinks = page.locator('a[href*="/post/"]')
    await expect(postLinks.first()).toBeVisible()
    await expect(postLinks.first()).toHaveAttribute('href', /\/post\//)
  })

  test('displays tag filter with all tags link', async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 720 })
    const allTagLink = page.getByRole('link', { name: /all/i })
    await expect(allTagLink.first()).toBeVisible()
  })
})
