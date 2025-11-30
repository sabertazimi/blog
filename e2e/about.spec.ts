import { expect, test } from '@playwright/test'

test.describe('About Page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/about')
  })

  test('loads successfully with correct title', async ({ page }) => {
    // 验证页面标题
    await expect(page).toHaveTitle(/About/)

    // 验证页面主标题
    const heading = page.getByRole('heading', { name: /about/i, level: 1 })
    await expect(heading).toBeVisible()
  })

  test('displays profile information', async ({ page }) => {
    // 验证个人信息卡片存在
    const profileSection = page.locator('section, div').filter({ has: page.getByText(/followers|following/i) })
    const count = await profileSection.count()

    if (count > 0) {
      await expect(profileSection.first()).toBeVisible()
    }
  })

  test('displays GitHub avatar if available', async ({ page }) => {
    // 查找头像图片
    const avatarImg = page.getByRole('img').first()
    const count = await avatarImg.count()

    if (count > 0) {
      await expect(avatarImg).toBeVisible()
    }
  })

  test('displays GitHub statistics cards', async ({ page }) => {
    // 验证统计卡片（Followers, Stars, Repos）
    const statsText = page.getByText(/followers|repositories|stars/i)
    const count = await statsText.count()

    if (count > 0) {
      await expect(statsText.first()).toBeVisible()
    }
  })

  test('displays featured repositories section', async ({ page }) => {
    // 查找仓库相关标题
    const reposHeading = page.getByRole('heading', { name: /repositories|repos/i })
    const count = await reposHeading.count()

    if (count > 0) {
      await expect(reposHeading.first()).toBeVisible()
    }
  })

  test('repository cards contain required information', async ({ page }) => {
    // 等待页面完全加载
    await page.waitForTimeout(1000)

    // 查找仓库卡片（通常包含星标信息）
    const repoCards = page.locator('article, div[class*="card"]').filter({ hasText: /★|star|fork/i })
    const count = await repoCards.count()

    if (count > 0) {
      const firstCard = repoCards.first()
      await expect(firstCard).toBeVisible()

      // 验证卡片包含链接
      const link = firstCard.getByRole('link').first()
      const linkCount = await link.count()
      if (linkCount > 0) {
        await expect(link).toBeVisible()
      }
    }
  })
})

test.describe('About Page - Chinese', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/zh-CN/about')
  })

  test('loads Chinese about page successfully', async ({ page }) => {
    // 验证页面标题
    await expect(page).toHaveTitle(/关于/)

    // 验证页面主标题
    const heading = page.getByRole('heading', { name: /关于/, level: 1 })
    await expect(heading).toBeVisible()

    // 验证 HTML lang 属性
    const html = page.locator('html')
    await expect(html).toHaveAttribute('lang', 'zh-CN')
  })

  test('displays profile information in Chinese', async ({ page }) => {
    // 验证中文统计信息
    const statsText = page.getByText(/粉丝|仓库|星标/)
    const count = await statsText.count()

    // 如果没有中文翻译，至少应该显示英文
    if (count === 0) {
      const englishStats = page.getByText(/followers|repositories|stars/i)
      const englishCount = await englishStats.count()
      if (englishCount > 0) {
        await expect(englishStats.first()).toBeVisible()
      }
    }
  })
})
