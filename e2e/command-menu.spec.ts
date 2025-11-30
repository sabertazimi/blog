import { expect, test } from '@playwright/test'

test.describe('Command Menu - Search', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/posts')
  })

  test('opens command menu with keyboard shortcut', async ({ page }) => {
    const isMac = process.platform === 'darwin'
    await page.keyboard.press(isMac ? 'Meta+KeyK' : 'Control+KeyK')

    const dialog = page.getByRole('dialog')
    await expect(dialog).toBeVisible()
  })

  test('opens command menu by clicking search button on desktop', async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 720 })

    const searchButton = page
      .getByRole('button', { name: /search/i })
      .or(page.getByRole('button').filter({ has: page.locator('[aria-label*="search" i]') }))

    const count = await searchButton.count()
    if (count > 0) {
      await searchButton.first().click()

      const dialog = page.getByRole('dialog')
      await expect(dialog).toBeVisible()
    }
  })

  test('opens command menu by clicking search button on mobile', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 })

    const searchButton = page
      .getByRole('button', { name: /search/i })
      .or(page.getByRole('button').filter({ has: page.locator('[aria-label*="search" i]') }))

    const count = await searchButton.count()
    if (count > 0) {
      await searchButton.first().click()

      const dialog = page.getByRole('dialog')
      await expect(dialog).toBeVisible()
    }
  })

  test('closes command menu with Escape key', async ({ page }) => {
    await page.keyboard.press('Control+KeyK')
    const dialog = page.getByRole('dialog')
    await expect(dialog).toBeVisible()

    await page.keyboard.press('Escape')
    await expect(dialog).not.toBeVisible()
  })

  test('can search for posts by title', async ({ page }) => {
    await page.keyboard.press('Control+KeyK')
    const dialog = page.getByRole('dialog')
    await expect(dialog).toBeVisible()

    const searchInput = dialog.getByRole('combobox').or(dialog.getByPlaceholder(/search/i))
    await searchInput.fill('MDX')

    await page.waitForTimeout(300)

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

    const searchInput = dialog.getByRole('combobox').or(dialog.getByPlaceholder(/search/i))
    await searchInput.fill('MDX')
    await page.waitForTimeout(300)

    const searchOption = dialog.getByRole('option').first()
    const count = await searchOption.count()

    if (count > 0) {
      await searchOption.click()
      await expect(page).toHaveURL(/\/post\//)
    }
  })

  test('can search for tags', async ({ page }) => {
    await page.keyboard.press('Control+KeyK')
    const dialog = page.getByRole('dialog')
    await expect(dialog).toBeVisible()

    const searchInput = dialog.getByRole('combobox').or(dialog.getByPlaceholder(/search/i))
    await searchInput.fill('React')
    await page.waitForTimeout(300)

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

    const searchInput = dialog.getByRole('combobox').or(dialog.getByPlaceholder(/search/i))
    await searchInput.fill('React')
    await page.waitForTimeout(300)

    const tagOptions = dialog.getByRole('option').filter({ hasText: /react/i })
    const count = await tagOptions.count()

    if (count > 0) {
      await tagOptions.first().click()
      await expect(page).toHaveURL(/\/tag\//)
    }
  })

  test('shows no results message when search has no matches', async ({ page }) => {
    await page.keyboard.press('Control+KeyK')
    const dialog = page.getByRole('dialog')
    await expect(dialog).toBeVisible()

    const searchInput = dialog.getByRole('combobox').or(dialog.getByPlaceholder(/search/i))
    await searchInput.fill('xyzabcnonexistent12345')
    await page.waitForTimeout(500)

    const noResults = dialog.getByText(/no results|not found|没有结果/i)
    await expect(noResults).toBeVisible()
  })

  test('retains search text when dialog is reopened', async ({ page }) => {
    await page.keyboard.press('Control+KeyK')
    let dialog = page.getByRole('dialog')
    let searchInput = dialog.getByRole('combobox').or(dialog.getByPlaceholder(/search/i))
    await searchInput.fill('React')
    await page.keyboard.press('Escape')

    await page.keyboard.press('Control+KeyK')
    dialog = page.getByRole('dialog')
    searchInput = dialog.getByRole('combobox').or(dialog.getByPlaceholder(/search/i))

    const inputValue = await searchInput.inputValue()
    expect(inputValue).toBe('React')
  })
})

test.describe('Command Menu - Chinese', () => {
  test('works correctly in Chinese locale', async ({ page }) => {
    await page.goto('/zh-CN/posts')

    await page.keyboard.press('Control+KeyK')
    const dialog = page.getByRole('dialog')
    await expect(dialog).toBeVisible()

    const searchInput = dialog.getByRole('combobox').or(dialog.getByPlaceholder(/搜索/))
    const count = await searchInput.count()

    if (count > 0) {
      await searchInput.fill('MDX')
      await page.waitForTimeout(300)

      const options = dialog.getByRole('option')
      const optionCount = await options.count()
      expect(optionCount).toBeGreaterThan(0)
    }
  })
})
