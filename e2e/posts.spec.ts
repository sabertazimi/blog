import { expect, test } from '@playwright/test'

test.describe('Posts Page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/posts')
  })

  test('loads successfully with correct title', async ({ page }) => {
    // 验证页面标题
    await expect(page).toHaveTitle(/Posts/)

    // 验证页面主标题
    const heading = page.getByRole('heading', { name: /posts/i, level: 1 })
    await expect(heading).toBeVisible()
  })

  test('displays list of post cards', async ({ page }) => {
    // 验证至少有一篇文章
    const postCards = page.getByRole('article')
    await expect(postCards.first()).toBeVisible()

    // 验证文章卡片包含标题链接
    const postLink = postCards.first().getByRole('link')
    await expect(postLink).toBeVisible()
  })

  test('can navigate to post detail by clicking card', async ({ page }) => {
    // 点击第一篇文章
    const firstPost = page.getByRole('article').first()
    const postLink = firstPost.getByRole('link').first()
    await postLink.click()

    // 验证跳转到文章详情页
    await expect(page).toHaveURL(/\/post\//)
  })

  test('displays tag filter on desktop', async ({ page }) => {
    // 设置桌面视口
    await page.setViewportSize({ width: 1280, height: 720 })

    // 验证标签过滤器可见
    const allTagLink = page.getByRole('link', { name: /all/i }).first()
    await expect(allTagLink).toBeVisible()
  })

  test('can filter posts by clicking tag', async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 720 })

    // 获取所有标签链接（跳过第一个 "All"）
    const tags = page.getByRole('link').filter({ hasText: /MDX|React|Next\.js|Web Development/i })
    const tagCount = await tags.count()

    if (tagCount > 0) {
      // 点击第一个标签
      const firstTag = tags.first()
      const tagText = await firstTag.textContent()
      await firstTag.click()

      // 验证 URL 包含标签参数
      await expect(page).toHaveURL(/\/tag\//)

      // 验证页面标题包含标签名
      if (tagText !== null) {
        await expect(page).toHaveTitle(tagText.split(/\d+/)[0].trim())
      }
    }
  })
})

test.describe('Posts Page - Chinese', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/zh-CN/posts')
  })

  test('loads Chinese posts page successfully', async ({ page }) => {
    // 验证页面标题
    await expect(page).toHaveTitle(/文章/)

    // 验证页面主标题
    const heading = page.getByRole('heading', { name: /文章/, level: 1 })
    await expect(heading).toBeVisible()
  })

  test('displays Chinese post cards', async ({ page }) => {
    // 验证至少有一篇文章
    const postCards = page.getByRole('article')
    await expect(postCards.first()).toBeVisible()
  })
})
