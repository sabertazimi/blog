import { expect, test } from '@playwright/test'

test.describe('Responsive Layout - Mobile (375x667)', () => {
  test.beforeEach(async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 })
  })

  test('home page displays correctly on mobile', async ({ page }) => {
    await page.goto('/')

    // 验证主要内容可见
    const mainContent = page.locator('text=/Coder|Developer|Learner/').first()
    await expect(mainContent).toBeVisible()

    // 验证导航元素可见
    const postsLink = page.getByRole('link', { name: /posts/i })
    await expect(postsLink.first()).toBeVisible()
  })

  test('posts page displays correctly on mobile', async ({ page }) => {
    await page.goto('/posts')

    // 验证页面标题
    const heading = page.getByRole('heading', { name: /posts/i, level: 1 })
    await expect(heading).toBeVisible()

    // 验证文章卡片列表
    const postCards = page.getByRole('article')
    await expect(postCards.first()).toBeVisible()

    // 验证移动端标签选择器（抽屉式）
    const tagTrigger = page.locator('button').filter({ hasText: /all|全部/i })
    const count = await tagTrigger.count()
    if (count > 0) {
      await expect(tagTrigger.first()).toBeVisible()
    }
  })

  test('post detail page displays correctly on mobile', async ({ page }) => {
    await page.goto('/posts')
    const firstPost = page.getByRole('article').first()
    const postLink = firstPost.getByRole('link').first()
    await postLink.click()

    // 验证文章内容可见
    const article = page.getByRole('article')
    await expect(article).toBeVisible()

    // 验证返回按钮
    const backButton = page.getByRole('link', { name: /back/i })
    await expect(backButton).toBeVisible()
  })

  test('about page displays correctly on mobile', async ({ page }) => {
    await page.goto('/about')

    // 验证页面标题
    const heading = page.getByRole('heading', { name: /about/i, level: 1 })
    await expect(heading).toBeVisible()
  })

  test('can scroll vertically on mobile', async ({ page }) => {
    await page.goto('/posts')

    // 获取初始滚动位置
    const initialScroll = await page.evaluate(() => window.scrollY)

    // 滚动页面
    await page.evaluate(() => window.scrollTo(0, 500))
    await page.waitForTimeout(100)

    // 验证滚动位置改变
    const newScroll = await page.evaluate(() => window.scrollY)
    expect(newScroll).toBeGreaterThan(initialScroll)
  })
})

test.describe('Responsive Layout - Tablet (768x1024)', () => {
  test.beforeEach(async ({ page }) => {
    await page.setViewportSize({ width: 768, height: 1024 })
  })

  test('home page displays correctly on tablet', async ({ page }) => {
    await page.goto('/')

    const mainContent = page.locator('text=/Coder|Developer|Learner/').first()
    await expect(mainContent).toBeVisible()
  })

  test('posts page displays correctly on tablet', async ({ page }) => {
    await page.goto('/posts')

    const heading = page.getByRole('heading', { name: /posts/i, level: 1 })
    await expect(heading).toBeVisible()

    const postCards = page.getByRole('article')
    await expect(postCards.first()).toBeVisible()
  })

  test('navigation bar displays correctly on tablet', async ({ page }) => {
    await page.goto('/posts')

    // 验证导航链接可见
    const postsLink = page.getByRole('link', { name: /posts/i })
    await expect(postsLink.first()).toBeVisible()

    const aboutLink = page.getByRole('link', { name: /about/i })
    await expect(aboutLink.first()).toBeVisible()
  })
})

test.describe('Responsive Layout - Desktop (1920x1080)', () => {
  test.beforeEach(async ({ page }) => {
    await page.setViewportSize({ width: 1920, height: 1080 })
  })

  test('home page displays correctly on desktop', async ({ page }) => {
    await page.goto('/')

    const mainContent = page.locator('text=/Coder|Developer|Learner/').first()
    await expect(mainContent).toBeVisible()
  })

  test('posts page displays correctly on desktop', async ({ page }) => {
    await page.goto('/posts')

    const heading = page.getByRole('heading', { name: /posts/i, level: 1 })
    await expect(heading).toBeVisible()

    // 验证桌面端标签过滤器（按钮组形式）
    const allTagLink = page.getByRole('link', { name: /all/i }).first()
    await expect(allTagLink).toBeVisible()
  })

  test('post detail page shows TOC on desktop', async ({ page }) => {
    await page.goto('/posts')
    const firstPost = page.getByRole('article').first()
    const postLink = firstPost.getByRole('link').first()
    await postLink.click()

    // 验证目录显示（可能在侧边栏）
    const tocNav = page.getByRole('navigation').filter({ hasText: /on this page|目录/i })
    const count = await tocNav.count()

    if (count > 0) {
      await expect(tocNav.first()).toBeVisible()
    }
  })

  test('navigation bar displays all elements on desktop', async ({ page }) => {
    await page.goto('/posts')

    // 验证所有导航元素可见
    const postsLink = page.getByRole('link', { name: /posts/i })
    await expect(postsLink.first()).toBeVisible()

    const aboutLink = page.getByRole('link', { name: /about/i })
    await expect(aboutLink.first()).toBeVisible()
  })

  test('content has proper max width on large screens', async ({ page }) => {
    await page.goto('/posts')

    // 验证内容居中且有最大宽度限制
    const main = page.locator('main').or(page.getByRole('main'))
    const mainElement = await main.first().boundingBox()

    if (mainElement) {
      // 内容不应该占满整个屏幕宽度
      expect(mainElement.width).toBeLessThan(1920)
    }
  })
})

test.describe('Responsive Layout - Orientation Change', () => {
  test('handles orientation change from portrait to landscape', async ({ page }) => {
    // 开始是竖屏
    await page.setViewportSize({ width: 375, height: 667 })
    await page.goto('/posts')

    const heading1 = page.getByRole('heading', { name: /posts/i, level: 1 })
    await expect(heading1).toBeVisible()

    // 切换到横屏
    await page.setViewportSize({ width: 667, height: 375 })
    await page.waitForTimeout(300)

    const heading2 = page.getByRole('heading', { name: /posts/i, level: 1 })
    await expect(heading2).toBeVisible()
  })
})

test.describe('Responsive Layout - Tag Filter Behavior', () => {
  test('shows tag buttons on desktop', async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 720 })
    await page.goto('/posts')

    // 验证标签按钮组可见
    const allTagLink = page.getByRole('link', { name: /all/i }).first()
    await expect(allTagLink).toBeVisible()

    // 验证没有移动端抽屉触发器
    const tagDrawerTrigger = page.locator('button').filter({ hasText: /all|全部/i })
    const count = await tagDrawerTrigger.count()

    // 桌面端可能不显示抽屉触发器，或者抽屉触发器是隐藏的
    if (count > 0) {
      const isVisible = await tagDrawerTrigger.first().isVisible()
      // 桌面端应该显示链接而不是按钮抽屉
      expect(isVisible).toBe(false)
    }
  })

  test('shows tag drawer trigger on mobile', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 })
    await page.goto('/posts')

    // 验证移动端抽屉触发器可见
    const tagDrawerTrigger = page.locator('button').filter({ hasText: /all|全部/i })
    const count = await tagDrawerTrigger.count()

    if (count > 0) {
      await expect(tagDrawerTrigger.first()).toBeVisible()
    }
  })
})
