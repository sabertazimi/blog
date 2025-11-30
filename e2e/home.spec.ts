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

  test('can navigate to posts page from landing nav', async ({ page }) => {
    // 点击 Posts 链接
    const postsLink = page.getByRole('link', { name: /posts/i })
    await postsLink.click()

    // 验证导航到 posts 页面
    await expect(page).toHaveURL(/\/posts/)
    await expect(page).toHaveTitle(/Posts/)
  })

  test('can navigate to about page from landing nav', async ({ page }) => {
    // 点击 About 链接
    const aboutLink = page.getByRole('link', { name: /about/i })
    await aboutLink.click()

    // 验证导航到 about 页面
    await expect(page).toHaveURL(/\/about/)
    await expect(page).toHaveTitle(/About/)
  })
})
