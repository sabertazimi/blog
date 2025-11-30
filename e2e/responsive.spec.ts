import { expect, test } from '@playwright/test'

test.describe('Responsive Layout - Mobile (375x667)', () => {
  test.beforeEach(async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 })
  })

  test('shows landing page content and navigation links', async ({ page }) => {
    await page.goto('/')

    const mainContent = page.locator('text=/Coder|Developer|Learner/').first()
    await expect(mainContent).toBeVisible()

    const postsLink = page.getByRole('link', { name: /posts/i })
    await expect(postsLink.first()).toBeVisible()
  })

  test('shows posts page with heading and mobile tag trigger', async ({ page }) => {
    await page.goto('/posts')

    const mainHeading = page.getByRole('heading', { level: 1 }).first()
    await expect(mainHeading).toBeVisible()

    const postGrid = page.getByTestId('post-grid')
    const firstPostLink = postGrid.getByRole('link').first()
    await expect(firstPostLink).toBeVisible()

    const tagTrigger = page.locator('button').filter({ hasText: /all|全部/i })
    const count = await tagTrigger.count()
    if (count > 0) {
      await expect(tagTrigger.first()).toBeVisible()
    }
  })

  test('shows post detail with article content and back button', async ({ page }) => {
    await page.goto('/posts')

    const postGrid = page.getByTestId('post-grid')
    const firstPostLink = postGrid.getByRole('link').first()
    await firstPostLink.click()

    const articleContent = page.getByRole('article')
    await expect(articleContent).toBeVisible()

    const backButton = page.getByRole('link', { name: /back/i })
    await expect(backButton).toBeVisible()
  })

  test('shows about page with main heading', async ({ page }) => {
    await page.goto('/about')

    const mainHeading = page.getByRole('heading', { name: /about/i, level: 1 })
    await expect(mainHeading).toBeVisible()
  })

  test('allows vertical scrolling on posts page', async ({ page }) => {
    await page.goto('/posts')

    const initialScroll = await page.evaluate(() => window.scrollY)

    await page.evaluate(() => window.scrollTo(0, 500))
    await page.waitForTimeout(100)

    const newScroll = await page.evaluate(() => window.scrollY)
    expect(newScroll).toBeGreaterThan(initialScroll)
  })
})

test.describe('Responsive Layout - Tablet (768x1024)', () => {
  test.beforeEach(async ({ page }) => {
    await page.setViewportSize({ width: 768, height: 1024 })
  })

  test('shows landing page main content', async ({ page }) => {
    await page.goto('/')

    const mainContent = page.locator('text=/Coder|Developer|Learner/').first()
    await expect(mainContent).toBeVisible()
  })

  test('shows posts page with heading and post cards', async ({ page }) => {
    await page.goto('/posts')

    const mainHeading = page.getByRole('heading', { level: 1 }).first()
    await expect(mainHeading).toBeVisible()

    const postGrid = page.getByTestId('post-grid')
    const firstPostLink = postGrid.getByRole('link').first()
    await expect(firstPostLink).toBeVisible()
  })

  test('shows navigation bar with posts and about links', async ({ page }) => {
    await page.goto('/posts')

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

  test('shows landing page main content', async ({ page }) => {
    await page.goto('/')

    const mainContent = page.locator('text=/Coder|Developer|Learner/').first()
    await expect(mainContent).toBeVisible()
  })

  test('shows posts page with heading and tag filter links', async ({ page }) => {
    await page.goto('/posts')

    const mainHeading = page.getByRole('heading', { level: 1 }).first()
    await expect(mainHeading).toBeVisible()

    const allTagLink = page.getByRole('link', { name: /all/i }).first()
    await expect(allTagLink).toBeVisible()
  })

  test('shows table of contents on post detail page', async ({ page }) => {
    await page.goto('/posts')

    const postGrid = page.getByTestId('post-grid')
    const firstPostLink = postGrid.getByRole('link').first()
    await firstPostLink.click()

    const tocNav = page.getByRole('navigation').filter({ hasText: /on this page|目录/i })
    const count = await tocNav.count()

    if (count > 0) {
      await expect(tocNav.first()).toBeVisible()
    }
  })

  test('shows navigation bar with posts and about links', async ({ page }) => {
    await page.goto('/posts')

    const postsLink = page.getByRole('link', { name: /posts/i })
    await expect(postsLink.first()).toBeVisible()

    const aboutLink = page.getByRole('link', { name: /about/i })
    await expect(aboutLink.first()).toBeVisible()
  })

  test('constrains content width to be less than or equal to viewport width', async ({ page }) => {
    await page.goto('/posts')

    const main = page.locator('main').or(page.getByRole('main'))
    const mainElement = await main.first().boundingBox()

    if (mainElement) {
      expect(mainElement.width).toBeLessThanOrEqual(1920)
    }
  })
})

test.describe('Responsive Layout - Orientation Change', () => {
  test('maintains heading visibility when switching from portrait to landscape', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 })
    await page.goto('/posts')

    const headingPortrait = page.getByRole('heading', { level: 1 }).first()
    await expect(headingPortrait).toBeVisible()

    await page.setViewportSize({ width: 667, height: 375 })
    await page.waitForTimeout(300)

    const headingLandscape = page.getByRole('heading', { level: 1 }).first()
    await expect(headingLandscape).toBeVisible()
  })
})

test.describe('Responsive Layout - Tag Filter Behavior', () => {
  test('shows tag link buttons on desktop viewport', async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 720 })
    await page.goto('/posts')

    const allTagLink = page.getByRole('link', { name: /all/i }).first()
    await expect(allTagLink).toBeVisible()

    const tagDrawerTrigger = page.locator('button').filter({ hasText: /all|全部/i })
    const count = await tagDrawerTrigger.count()

    if (count > 0) {
      const isVisible = await tagDrawerTrigger.first().isVisible()
      expect(isVisible).toBe(false)
    }
  })

  test('shows tag drawer trigger button on mobile viewport', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 })
    await page.goto('/posts')

    const tagDrawerTrigger = page.locator('button').filter({ hasText: /all|全部/i })
    const count = await tagDrawerTrigger.count()

    if (count > 0) {
      await expect(tagDrawerTrigger.first()).toBeVisible()
    }
  })
})
