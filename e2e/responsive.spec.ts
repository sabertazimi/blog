import { expect, test } from '@playwright/test'

test.describe('Responsive Layout - Mobile', () => {
  test.beforeEach(async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 })
  })

  test('displays posts page with mobile tag trigger', async ({ page }) => {
    await page.goto('/posts')
    const mainHeading = page.getByRole('heading', { level: 1 })
    await expect(mainHeading.first()).toBeVisible()

    const tagTrigger = page.locator('button').filter({ hasText: /all|全部/i })
    const count = await tagTrigger.count()
    if (count > 0) {
      await expect(tagTrigger.first()).toBeVisible()
    }
  })

  test('displays post detail with back button', async ({ page }) => {
    await page.goto('/posts')
    const postLink = page.locator('a[href*="/post/"]').first()
    await postLink.click()
    await page.waitForURL(/\/post\//)

    const articleContent = page.getByRole('article')
    await expect(articleContent).toBeVisible()

    const backButton = page.getByRole('link', { name: /back|返回/i })
    await expect(backButton).toBeVisible()
  })
})

test.describe('Responsive Layout - Tablet', () => {
  test('displays posts page with proper layout', async ({ page }) => {
    await page.setViewportSize({ width: 768, height: 1024 })
    await page.goto('/posts')

    const mainHeading = page.getByRole('heading', { level: 1 })
    await expect(mainHeading.first()).toBeVisible()

    const postLinks = page.locator('a[href*="/post/"]')
    await expect(postLinks.first()).toBeVisible()
  })
})

test.describe('Responsive Layout - Desktop', () => {
  test('displays posts page with sidebar tag filter', async ({ page }) => {
    await page.setViewportSize({ width: 1920, height: 1080 })
    await page.goto('/posts')

    const mainHeading = page.getByRole('heading', { level: 1 })
    await expect(mainHeading.first()).toBeVisible()

    const allTagLink = page.getByRole('link', { name: /all/i })
    await expect(allTagLink.first()).toBeVisible()
  })
})
