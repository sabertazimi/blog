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

  test('shows tooltips on navigation hover', async ({ page }) => {
    // 测试其中一个导航链接的 tooltip
    const postsLink = page.getByRole('link', { name: /posts/i })
    await postsLink.hover()

    // 验证 tooltip 显示
    const tooltip = page.getByRole('tooltip')
    await expect(tooltip).toBeVisible()
  })
})
