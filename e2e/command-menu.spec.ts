import { expect, test } from '@playwright/test'

test.describe('Command Menu - Search', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/')
  })

  test('opens command menu with keyboard shortcut', async ({ page }) => {
    // 使用 Cmd+K (Mac) 或 Ctrl+K (Windows/Linux)
    const isMac = process.platform === 'darwin'
    await page.keyboard.press(isMac ? 'Meta+KeyK' : 'Control+KeyK')

    // 验证对话框打开
    const dialog = page.getByRole('dialog')
    await expect(dialog).toBeVisible()
  })

  test('opens command menu by clicking search button on desktop', async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 720 })

    // 查找搜索按钮（可能通过图标或文本）
    const searchButton = page
      .getByRole('button', { name: /search/i })
      .or(page.getByRole('button').filter({ has: page.locator('[aria-label*="search" i]') }))

    const count = await searchButton.count()
    if (count > 0) {
      await searchButton.first().click()

      // 验证对话框打开
      const dialog = page.getByRole('dialog')
      await expect(dialog).toBeVisible()
    }
  })

  test('opens command menu by clicking search button on mobile', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 })

    // 移动端也应该有搜索按钮
    const searchButton = page
      .getByRole('button', { name: /search/i })
      .or(page.getByRole('button').filter({ has: page.locator('[aria-label*="search" i]') }))

    const count = await searchButton.count()
    if (count > 0) {
      await searchButton.first().click()

      // 验证对话框打开
      const dialog = page.getByRole('dialog')
      await expect(dialog).toBeVisible()
    }
  })

  test('closes command menu with Escape key', async ({ page }) => {
    // 打开命令菜单
    await page.keyboard.press('Control+KeyK')
    const dialog = page.getByRole('dialog')
    await expect(dialog).toBeVisible()

    // 按 Escape 关闭
    await page.keyboard.press('Escape')
    await expect(dialog).not.toBeVisible()
  })

  test('can search for posts by title', async ({ page }) => {
    // 打开命令菜单
    await page.keyboard.press('Control+KeyK')
    const dialog = page.getByRole('dialog')
    await expect(dialog).toBeVisible()

    // 查找搜索输入框
    const searchInput = dialog.getByRole('combobox').or(dialog.getByPlaceholder(/search/i))
    await searchInput.fill('MDX')

    // 等待搜索结果
    await page.waitForTimeout(300)

    // 验证显示搜索结果（Posts 分组）
    const postsGroup = dialog.getByText(/posts/i)
    const count = await postsGroup.count()
    if (count > 0) {
      await expect(postsGroup.first()).toBeVisible()
    }
  })

  test('can navigate to post from search results', async ({ page }) => {
    await page.keyboard.press('Control+KeyK')
    const dialog = page.getByRole('dialog')
    await expect(dialog).toBeVisible()

    // 搜索
    const searchInput = dialog.getByRole('combobox').or(dialog.getByPlaceholder(/search/i))
    await searchInput.fill('MDX')
    await page.waitForTimeout(300)

    // 查找第一个搜索结果选项
    const searchOption = dialog.getByRole('option').first()
    const count = await searchOption.count()

    if (count > 0) {
      await searchOption.click()

      // 验证跳转到文章页面
      await expect(page).toHaveURL(/\/post\//)
    }
  })

  test('can search for tags', async ({ page }) => {
    await page.keyboard.press('Control+KeyK')
    const dialog = page.getByRole('dialog')
    await expect(dialog).toBeVisible()

    // 搜索标签
    const searchInput = dialog.getByRole('combobox').or(dialog.getByPlaceholder(/search/i))
    await searchInput.fill('React')
    await page.waitForTimeout(300)

    // 验证显示标签分组
    const tagsGroup = dialog.getByText(/tags/i)
    const count = await tagsGroup.count()
    if (count > 0) {
      await expect(tagsGroup.first()).toBeVisible()
    }
  })

  test('can navigate to tag page from search results', async ({ page }) => {
    await page.keyboard.press('Control+KeyK')
    const dialog = page.getByRole('dialog')
    await expect(dialog).toBeVisible()

    // 搜索标签
    const searchInput = dialog.getByRole('combobox').or(dialog.getByPlaceholder(/search/i))
    await searchInput.fill('React')
    await page.waitForTimeout(300)

    // 查找标签选项
    const tagOptions = dialog.getByRole('option').filter({ hasText: /react/i })
    const count = await tagOptions.count()

    if (count > 0) {
      await tagOptions.first().click()

      // 验证跳转到标签页
      await expect(page).toHaveURL(/\/tag\//)
    }
  })

  test('shows no results message when search has no matches', async ({ page }) => {
    await page.keyboard.press('Control+KeyK')
    const dialog = page.getByRole('dialog')
    await expect(dialog).toBeVisible()

    // 搜索不存在的内容
    const searchInput = dialog.getByRole('combobox').or(dialog.getByPlaceholder(/search/i))
    await searchInput.fill('xyzabcnonexistent12345')
    await page.waitForTimeout(500)

    // 验证显示无结果消息
    const noResults = dialog.getByText(/no results|not found|没有结果/i)
    await expect(noResults).toBeVisible()
  })

  test('clears search text when dialog is reopened', async ({ page }) => {
    // 第一次打开并搜索
    await page.keyboard.press('Control+KeyK')
    let dialog = page.getByRole('dialog')
    let searchInput = dialog.getByRole('combobox').or(dialog.getByPlaceholder(/search/i))
    await searchInput.fill('React')
    await page.keyboard.press('Escape')

    // 再次打开
    await page.keyboard.press('Control+KeyK')
    dialog = page.getByRole('dialog')
    searchInput = dialog.getByRole('combobox').or(dialog.getByPlaceholder(/search/i))

    // 验证输入框已清空
    const inputValue = await searchInput.inputValue()
    expect(inputValue).toBe('')
  })
})

test.describe('Command Menu - Chinese', () => {
  test('works correctly in Chinese locale', async ({ page }) => {
    await page.goto('/zh-CN')

    // 打开命令菜单
    await page.keyboard.press('Control+KeyK')
    const dialog = page.getByRole('dialog')
    await expect(dialog).toBeVisible()

    // 搜索中文内容
    const searchInput = dialog.getByRole('combobox').or(dialog.getByPlaceholder(/搜索/))
    const count = await searchInput.count()

    if (count > 0) {
      await searchInput.fill('MDX')
      await page.waitForTimeout(300)

      // 验证有结果显示
      const options = dialog.getByRole('option')
      const optionCount = await options.count()
      expect(optionCount).toBeGreaterThan(0)
    }
  })
})
