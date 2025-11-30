import { expect, test } from '@playwright/test'

test.describe('Post Detail Page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/posts')
    const postLink = page.locator('a[href*="/post/"]').first()
    await postLink.click()
    await page.waitForURL(/\/post\//)
  })

  test('loads post content successfully', async ({ page }) => {
    const mainHeading = page.getByRole('heading', { level: 1 }).first()
    await expect(mainHeading).toBeVisible()
    const articleContent = page.getByRole('article')
    await expect(articleContent).toBeVisible()
  })

  test('displays post metadata', async ({ page }) => {
    const metadata = page.locator('text=/\\d{4}|\\d+ min/')
    await expect(metadata.first()).toBeVisible()
  })

  test('displays back button', async ({ page }) => {
    const backButton = page.getByRole('link', { name: /back|返回/i })
    await expect(backButton.first()).toBeVisible()
  })

  test('displays tag links', async ({ page }) => {
    const tagLink = page.getByRole('link').filter({ hasText: /MDX|React|Next\.js|Web Development/i })
    await expect(tagLink.first()).toBeVisible()
  })
})

test.describe('Post Detail Page - Not Found', () => {
  test('displays not found message for non-existent post', async ({ page }) => {
    await page.goto('/post/this-post-does-not-exist-12345')
    const notFoundHeading = page.getByRole('heading', { name: /not found/i }).first()
    await expect(notFoundHeading).toBeVisible()
  })
})
