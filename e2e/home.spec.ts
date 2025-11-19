import { expect, test } from '@playwright/test'

test.describe('Home Page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/')
  })

  test('loads successfully with correct title and main content', async ({ page }) => {
    // 验证页面标题
    await expect(page).toHaveTitle(/Sabertaz Blog/)

    // 验证主要内容已加载
    const mainContent = page.locator('text=/Coder|Developer|Learner/').first()
    await expect(mainContent).toBeVisible()
  })

  test('can navigate to all main sections', async ({ page }) => {
    // 测试导航到 Posts
    await page.getByRole('link', { name: /posts/i }).click()
    await expect(page).toHaveURL(/\/posts/)

    // 返回首页
    await page.goto('/')

    // 测试导航到 Tags
    await page.getByRole('link', { name: /tags/i }).click()
    await expect(page).toHaveURL(/\/tags/)

    // 返回首页
    await page.goto('/')

    // 测试导航到 About
    await page.getByRole('link', { name: /about/i }).click()
    await expect(page).toHaveURL(/\/about/)
  })

  test('shows tooltips on navigation hover', async ({ page }) => {
    // 测试其中一个导航链接的 tooltip
    const postsLink = page.getByRole('link', { name: /posts/i })
    await postsLink.hover()

    // 验证 tooltip 显示
    const tooltip = page.getByRole('tooltip')
    await expect(tooltip).toBeVisible()
  })
})
