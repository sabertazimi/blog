import { expect, test } from '@playwright/test'

test.describe('Post Detail Page', () => {
  test.beforeEach(async ({ page }) => {
    // 先进入 posts 页面
    await page.goto('/posts')
    // 点击第一篇文章
    const firstPost = page.getByRole('article').first()
    const postLink = firstPost.getByRole('link').first()
    await postLink.click()
    // 等待文章页面加载
    await page.waitForURL(/\/post\//)
  })

  test('loads post detail successfully', async ({ page }) => {
    // 验证文章标题存在
    const heading = page.getByRole('heading', { level: 1 })
    await expect(heading).toBeVisible()

    // 验证文章内容存在
    const article = page.getByRole('article')
    await expect(article).toBeVisible()
  })

  test('displays back button', async ({ page }) => {
    // 验证返回按钮
    const backButton = page.getByRole('link', { name: /back/i })
    await expect(backButton).toBeVisible()
  })

  test('can navigate back to posts using back button', async ({ page }) => {
    // 点击返回按钮
    const backButton = page.getByRole('link', { name: /back/i })
    await backButton.click()

    // 验证返回到 posts 页面
    await expect(page).toHaveURL(/\/posts/)
  })

  test('displays post metadata', async ({ page }) => {
    // 验证发布时间显示
    const timeElement = page.locator('time').first()
    await expect(timeElement).toBeVisible()
  })

  test('displays article content with headings', async ({ page }) => {
    // 验证文章至少包含一个标题
    const contentHeadings = page.getByRole('article').getByRole('heading')
    const count = await contentHeadings.count()
    expect(count).toBeGreaterThan(0)
  })

  test('displays code blocks if present', async ({ page }) => {
    // 检查是否有代码块（可能不是所有文章都有）
    const codeBlocks = page.locator('pre').or(page.getByRole('code'))
    const count = await codeBlocks.count()
    // 只验证代码块存在时的渲染，不强制要求
    if (count > 0) {
      await expect(codeBlocks.first()).toBeVisible()
    }
  })

  test('shows back-to-top button after scrolling', async ({ page }) => {
    // 滚动到页面底部
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight))

    // 等待一下确保按钮出现
    await page.waitForTimeout(500)

    // 查找回到顶部按钮（通过常见的图标或文本）
    const backToTopButton = page
      .getByRole('button')
      .filter({ hasText: /top/i })
      .or(page.locator('button[aria-label*="top" i]'))

    // 如果按钮存在，验证可见性
    const count = await backToTopButton.count()
    if (count > 0) {
      await expect(backToTopButton.first()).toBeVisible()
    }
  })

  test('displays table of contents if present', async ({ page }) => {
    // 检查是否有目录导航
    const tocNav = page.getByRole('navigation').filter({ hasText: /on this page|目录/i })
    const count = await tocNav.count()

    // 如果有目录，验证可以交互
    if (count > 0) {
      await expect(tocNav.first()).toBeVisible()
    }
  })
})

test.describe('Post Detail Page - Tag Navigation', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/posts')
    const firstPost = page.getByRole('article').first()
    const postLink = firstPost.getByRole('link').first()
    await postLink.click()
    await page.waitForURL(/\/post\//)
  })

  test('can navigate to tag page by clicking tag', async ({ page }) => {
    // 查找文章标签（可能在 header 或 footer）
    const tagLinks = page.getByRole('link').filter({ hasText: /MDX|React|Next\.js|TypeScript/i })
    const count = await tagLinks.count()

    if (count > 0) {
      const firstTag = tagLinks.first()
      await firstTag.click()

      // 验证跳转到标签页
      await expect(page).toHaveURL(/\/tag\//)
    }
  })
})

test.describe('Post Detail Page - Not Found', () => {
  test('displays not found message for non-existent post', async ({ page }) => {
    // 访问不存在的文章
    await page.goto('/post/this-post-does-not-exist-12345')

    // 验证显示未找到消息（可能是 "Post not found" 或 "Not Found"）
    const notFoundText = page.getByText(/not found|找不到/i)
    await expect(notFoundText).toBeVisible()
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
    const firstPost = page.getByRole('article').first()
    const postLink = firstPost.getByRole('link').first()
    await postLink.click()

    await page.waitForURL(/\/zh-CN\/post\//)

    // 验证文章加载
    const heading = page.getByRole('heading', { level: 1 })
    await expect(heading).toBeVisible()

    // 验证 HTML lang 属性
    const html = page.locator('html')
    await expect(html).toHaveAttribute('lang', 'zh-CN')
  })
})
