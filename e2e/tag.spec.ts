import { expect, test } from '@playwright/test'

test.describe('Tag Filter Page', () => {
  test('can access tag page from posts page', async ({ page }) => {
    await page.goto('/posts')
    await page.setViewportSize({ width: 1280, height: 720 })

    // 获取第一个非 "All" 的标签
    const tagLinks = page.getByRole('link').filter({ hasText: /MDX|React|Next\.js|Web Development/i })
    const count = await tagLinks.count()

    if (count > 0) {
      const firstTag = tagLinks.first()
      const tagText = await firstTag.textContent()
      await firstTag.click()

      // 验证进入标签页
      await expect(page).toHaveURL(/\/tag\//)

      // 验证页面标题
      await expect(page).toHaveTitle(/Posts/)

      // 验证标签被选中
      if (tagText !== null) {
        const selectedTag = page.getByRole('link').filter({ hasText: tagText.split(/\d+/)[0].trim() })
        await expect(selectedTag.first()).toBeVisible()
      }
    }
  })

  test('displays filtered posts for selected tag', async ({ page }) => {
    await page.goto('/posts')
    await page.setViewportSize({ width: 1280, height: 720 })

    const tagLinks = page.getByRole('link').filter({ hasText: /MDX|React|Next\.js|Web Development/i })
    const count = await tagLinks.count()

    if (count > 0) {
      await tagLinks.first().click()
      await page.waitForURL(/\/tag\//)

      // 验证有文章显示
      const postCards = page.getByRole('article')
      await expect(postCards.first()).toBeVisible()
    }
  })

  test('can switch between different tags', async ({ page }) => {
    await page.goto('/posts')
    await page.setViewportSize({ width: 1280, height: 720 })

    const tagLinks = page.getByRole('link').filter({ hasText: /MDX|React|Next\.js|Web Development/i })
    const count = await tagLinks.count()

    if (count > 1) {
      // 点击第一个标签
      await tagLinks.first().click()
      await page.waitForURL(/\/tag\//)
      const firstUrl = page.url()

      // 点击第二个标签
      const newTagLinks = page.getByRole('link').filter({ hasText: /MDX|React|Next\.js|Web Development/i })
      await newTagLinks.nth(1).click()
      await page.waitForURL(/\/tag\//)
      const secondUrl = page.url()

      // 验证 URL 变化
      expect(firstUrl).not.toBe(secondUrl)
    }
  })

  test('can return to all posts by clicking All tag', async ({ page }) => {
    await page.goto('/posts')
    await page.setViewportSize({ width: 1280, height: 720 })

    // 点击一个标签
    const tagLinks = page.getByRole('link').filter({ hasText: /MDX|React|Next\.js|Web Development/i })
    const count = await tagLinks.count()

    if (count > 0) {
      await tagLinks.first().click()
      await page.waitForURL(/\/tag\//)

      // 点击 All 标签
      const allTag = page.getByRole('link', { name: /all|全部/i }).first()
      await allTag.click()

      // 验证返回到 posts 页面
      await expect(page).toHaveURL(/\/posts$/)
    }
  })
})

test.describe('Tag Filter Page - Mobile', () => {
  test.beforeEach(async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 })
  })

  test('displays tag drawer on mobile', async ({ page }) => {
    await page.goto('/posts')

    // 查找标签选择触发器（移动端显示为下拉按钮）
    const tagTrigger = page.locator('button').filter({ hasText: /all|全部/i })
    const count = await tagTrigger.count()

    if (count > 0) {
      await expect(tagTrigger.first()).toBeVisible()
    }
  })

  test('can select tag from mobile drawer', async ({ page }) => {
    await page.goto('/posts')

    // 点击标签选择器
    const tagTrigger = page.locator('button').filter({ hasText: /all|全部/i })
    const count = await tagTrigger.count()

    if (count > 0) {
      await tagTrigger.first().click()

      // 等待抽屉打开
      await page.waitForTimeout(300)

      // 查找抽屉中的标签链接
      const tagLinks = page.getByRole('link').filter({ hasText: /MDX|React|Next\.js|Web Development/i })
      const tagCount = await tagLinks.count()

      if (tagCount > 0) {
        // 点击一个标签
        await tagLinks.first().click()

        // 验证跳转到标签页
        await expect(page).toHaveURL(/\/tag\//)
      }
    }
  })
})

test.describe('Tag Filter Page - Chinese', () => {
  test('works correctly in Chinese locale', async ({ page }) => {
    await page.goto('/zh-CN/posts')
    await page.setViewportSize({ width: 1280, height: 720 })

    // 获取标签链接
    const tagLinks = page.getByRole('link').filter({ hasText: /MDX|React|Next\.js|Web Development/i })
    const count = await tagLinks.count()

    if (count > 0) {
      await tagLinks.first().click()

      // 验证进入中文标签页
      await expect(page).toHaveURL(/\/zh-CN\/tag\//)

      // 验证有文章显示
      const postCards = page.getByRole('article')
      await expect(postCards.first()).toBeVisible()
    }
  })
})
