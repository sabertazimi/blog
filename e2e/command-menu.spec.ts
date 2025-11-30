import { expect, test } from '@playwright/test'

function getKeyboardShortcut() {
  const isMac = process.platform === 'darwin'
  return isMac ? 'Meta+KeyK' : 'Control+KeyK'
}

test.describe('Command Menu', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/posts')
  })

  test('opens and closes command menu with keyboard shortcut', async ({ page }) => {
    await page.keyboard.press(getKeyboardShortcut())
    const dialog = page.getByRole('dialog')
    await expect(dialog).toBeVisible()

    await page.keyboard.press('Escape')
    await expect(dialog).not.toBeVisible()
  })

  test('navigates to selected post from search results', async ({ page }) => {
    await page.keyboard.press(getKeyboardShortcut())
    const dialog = page.getByRole('dialog')
    const searchInput = dialog.getByRole('combobox').or(dialog.getByPlaceholder(/search/i))

    await searchInput.fill('MDX')
    const options = dialog.getByRole('option')

    const optionCount = await options.count()
    expect(optionCount).toBeGreaterThan(0)

    const firstOption = options.first()
    await expect(firstOption).toBeVisible()

    await firstOption.click()
    await page.waitForURL(/\/post\/|\/tag\//)
    await expect(page).toHaveURL(/\/post\/|\/tag\//)
  })
})
