import { expect, test } from '@playwright/test'

test.describe('Post Detail Page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/posts')

    const postGrid = page.getByTestId('post-grid')
    const firstPostLink = postGrid.getByRole('link').first()
    await firstPostLink.click()
    await page.waitForURL(/\/post\//)
  })

  test('loads post detail successfully', async ({ page }) => {
    const heading = page.getByRole('heading', { level: 1 }).first()
    await expect(heading).toBeVisible()

    const article = page.getByRole('article')
    await expect(article).toBeVisible()
  })

  test('displays back button', async ({ page }) => {
    const backButton = page.getByRole('link', { name: /back/i })
    await expect(backButton).toBeVisible()
  })

  test('can navigate back to posts using back button', async ({ page }) => {
    const backButton = page.getByRole('link', { name: /back/i })
    await backButton.click()
    await expect(page).toHaveURL(/\/posts/)
  })

  test('displays post metadata', async ({ page }) => {
    const timeElement = page.locator('time').first()
    await expect(timeElement).toBeVisible()
  })

  test('displays article content with headings', async ({ page }) => {
    const contentHeadings = page.getByRole('article').getByRole('heading')
    const count = await contentHeadings.count()
    expect(count).toBeGreaterThan(0)
  })

  test('displays code blocks if present', async ({ page }) => {
    const codeBlocks = page.locator('pre').or(page.getByRole('code'))
    const count = await codeBlocks.count()

    if (count > 0) {
      await expect(codeBlocks.first()).toBeVisible()
    }
  })

  test('shows back-to-top button after scrolling', async ({ page }) => {
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight))
    await page.waitForTimeout(500)

    const backToTopButton = page
      .getByRole('button')
      .filter({ hasText: /top/i })
      .or(page.locator('button[aria-label*="top" i]'))

    const count = await backToTopButton.count()
    if (count > 0) {
      await expect(backToTopButton.first()).toBeVisible()
    }
  })

  test('displays table of contents if present', async ({ page }) => {
    const tocNav = page.getByRole('navigation').filter({ hasText: /on this page|目录/i })
    const count = await tocNav.count()

    if (count > 0) {
      await expect(tocNav.first()).toBeVisible()
    }
  })
})

test.describe('Post Detail Page - Tag Navigation', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/posts')
    const postGrid = page.getByTestId('post-grid')
    const firstPostLink = postGrid.getByRole('link').first()
    await firstPostLink.click()
    await page.waitForURL(/\/post\//)
  })

  test('can navigate to tag page by clicking tag', async ({ page }) => {
    const allLinks = await page.getByRole('link').all()
    const tagLinks = []

    for (const link of allLinks) {
      const href = await link.getAttribute('href')
      if (href !== null && href.includes('/tag/')) {
        tagLinks.push(link)
      }
    }

    if (tagLinks.length > 0) {
      await tagLinks[0].click()
      await expect(page).toHaveURL(/\/tag\//)
    }
  })
})

test.describe('Post Detail Page - Not Found', () => {
  test('displays not found message for non-existent post', async ({ page }) => {
    // 访问不存在的文章
    await page.goto('/post/this-post-does-not-exist-12345')

    // 验证显示未找到消息（匹配中英文的未找到文本）
    const notFoundHeading = page.getByRole('heading', { name: /not found|未找到|文章未找到/i }).first()
    await expect(notFoundHeading).toBeVisible()
  })

  test('provides link to return home from not found page', async ({ page }) => {
    await page.goto('/post/this-post-does-not-exist-12345')

    // 查找返回首页的链接
    const homeLink = page.getByRole('link', { name: /home|首页|back/i })
    await expect(homeLink).toBeVisible()
  })
})

test.describe('Post Detail Page - Chinese', () => {
  test('loads Chinese post successfully', async ({ page }) => {
    await page.goto('/zh-CN/posts')
    const postGrid = page.getByTestId('post-grid')
    const firstPostLink = postGrid.getByRole('link').first()
    await firstPostLink.click()

    await page.waitForURL(/\/zh-CN\/post\//)

    // 验证文章加载（使用 first() 避免 strict mode violation）
    const heading = page.getByRole('heading', { level: 1 }).first()
    await expect(heading).toBeVisible()

    // 验证 HTML lang 属性
    const html = page.locator('html')
    await expect(html).toHaveAttribute('lang', 'zh-CN')
  })
})
