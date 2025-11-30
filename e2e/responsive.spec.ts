import { expect, test } from '@playwright/test'

test.describe('Responsive Layout', () => {
  test.beforeEach(async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 })
    await page.goto('/posts')
  })

  test('displays posts page with mobile tag trigger', async ({ page }) => {
    const mainHeading = page.getByRole('heading', { level: 1 })
    await expect(mainHeading.first()).toBeVisible()

    const tagTrigger = page.locator('button').filter({ hasText: /all|全部/i })
    await expect(tagTrigger.first()).toBeVisible()
  })

  test('displays post detail with back button', async ({ page }) => {
    const postLink = page.locator('a[href*="/post/"]').first()
    await postLink.click()
    await page.waitForURL(/\/post\//)

    const articleContent = page.getByRole('article')
    await expect(articleContent).toBeVisible()

    const backButton = page.getByRole('link', { name: /back|返回/i })
    await expect(backButton).toBeVisible()
  })
})
