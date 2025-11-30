import { expect, test } from '@playwright/test'

function getKeyboardShortcut() {
  const isMac = process.platform === 'darwin'
  return isMac ? 'Meta+KeyK' : 'Control+KeyK'
}

test.describe('Command Menu', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/posts')
  })

  test('opens command menu with keyboard shortcut', async ({ page }) => {
    await page.keyboard.press(getKeyboardShortcut())
    const dialog = page.getByRole('dialog')
    await expect(dialog).toBeVisible()
  })

  test('closes command menu with escape key', async ({ page }) => {
    await page.keyboard.press(getKeyboardShortcut())
    const dialog = page.getByRole('dialog')
    await expect(dialog).toBeVisible()

    await page.keyboard.press('Escape')
    await expect(dialog).not.toBeVisible()
  })

  test('searches for posts by keyword', async ({ page }) => {
    await page.keyboard.press(getKeyboardShortcut())
    const dialog = page.getByRole('dialog')
    const searchInput = dialog.getByRole('combobox').or(dialog.getByPlaceholder(/search/i))

    await searchInput.fill('React')

    const options = dialog.getByRole('option')
    await expect(options.first()).toBeVisible()
    const optionCount = await options.count()
    expect(optionCount).toBeGreaterThan(0)
  })

  test('navigates to selected post from search results', async ({ page }) => {
    await page.keyboard.press(getKeyboardShortcut())
    const dialog = page.getByRole('dialog')
    const searchInput = dialog.getByRole('combobox').or(dialog.getByPlaceholder(/search/i))

    await searchInput.fill('MDX')

    const firstOption = dialog.getByRole('option').first()
    await expect(firstOption).toBeVisible()

    const currentUrl = page.url()
    await firstOption.click()

    await page.waitForFunction(oldUrl => window.location.href !== oldUrl, currentUrl)
    await expect(page).toHaveURL(/\/post\/|\/tag\//)
  })
})
