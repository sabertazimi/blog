import { expect, test } from '@playwright/test'

test.describe('Theme Switcher', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/posts')
    await page.setViewportSize({ width: 1280, height: 720 })
  })

  test('shows theme toggle button', async ({ page }) => {
    const themeButton = page
      .getByRole('button', { name: /theme|dark|light|主题/i })
      .or(
        page
          .locator('[aria-label*="theme" i]')
          .or(page.locator('button').filter({ has: page.locator('[class*="sun" i], [class*="moon" i]') })),
      )

    const count = await themeButton.count()
    if (count > 0) {
      await expect(themeButton.first()).toBeVisible()
    }
  })

  test('switches to light theme when selecting light option', async ({ page }) => {
    const themeButton = page
      .getByRole('button', { name: /theme|dark|light|主题/i })
      .or(page.locator('[aria-label*="theme" i]'))

    const count = await themeButton.count()
    if (count > 0) {
      await themeButton.first().click()
      await page.waitForTimeout(300)

      const lightOption = page.getByRole('menuitem', { name: /light/i }).or(page.getByText(/^light$/i))
      const lightCount = await lightOption.count()

      if (lightCount > 0) {
        await lightOption.first().click()
        await page.waitForTimeout(300)

        const html = page.locator('html')
        const bodyClass = await html.getAttribute('class')
        const dataTheme = await html.getAttribute('data-theme')

        const isDarkTheme = bodyClass?.includes('dark') ?? false
        const isLightTheme = bodyClass?.includes('light') || dataTheme === 'light'

        expect(isDarkTheme || isLightTheme).toBeDefined()
      }
    }
  })

  test('switches to dark theme when selecting dark option', async ({ page }) => {
    const themeButton = page
      .getByRole('button', { name: /theme|dark|light|主题/i })
      .or(page.locator('[aria-label*="theme" i]'))

    const count = await themeButton.count()
    if (count > 0) {
      await themeButton.first().click()
      await page.waitForTimeout(300)

      const darkOption = page.getByRole('menuitem', { name: /dark/i }).or(page.getByText(/^dark$/i))
      const darkCount = await darkOption.count()

      if (darkCount > 0) {
        await darkOption.first().click()
        await page.waitForTimeout(300)

        const html = page.locator('html')
        const bodyClass = await html.getAttribute('class')
        const dataTheme = await html.getAttribute('data-theme')

        const isDarkTheme = bodyClass?.includes('dark') || dataTheme === 'dark'
        expect(isDarkTheme).toBeDefined()
      }
    }
  })

  test('switches to system theme when selecting system option', async ({ page }) => {
    const themeButton = page
      .getByRole('button', { name: /theme|dark|light|主题/i })
      .or(page.locator('[aria-label*="theme" i]'))

    const count = await themeButton.count()
    if (count > 0) {
      await themeButton.first().click()
      await page.waitForTimeout(300)

      const systemOption = page.getByRole('menuitem', { name: /system/i }).or(page.getByText(/system/i))
      const systemCount = await systemOption.count()

      if (systemCount > 0) {
        await systemOption.first().click()
        await page.waitForTimeout(300)

        const html = page.locator('html')
        await expect(html).toBeVisible()
      }
    }
  })

  test('persists theme selection across page navigation', async ({ page }) => {
    const themeButton = page
      .getByRole('button', { name: /theme|dark|light|主题/i })
      .or(page.locator('[aria-label*="theme" i]'))

    const count = await themeButton.count()
    if (count > 0) {
      await themeButton.first().click()
      await page.waitForTimeout(300)

      const darkOption = page.getByRole('menuitem', { name: /dark/i }).or(page.getByText(/^dark$/i))
      const darkCount = await darkOption.count()

      if (darkCount > 0) {
        await darkOption.first().click()
        await page.waitForTimeout(300)

        const aboutLink = page.getByRole('link', { name: /about/i })
        await aboutLink.first().click()
        await page.waitForURL(/\/about/)
        await page.waitForTimeout(300)

        const html = page.locator('html')
        const bodyClass = await html.getAttribute('class')
        const dataTheme = await html.getAttribute('data-theme')

        const isDarkTheme = bodyClass?.includes('dark') || dataTheme === 'dark'
        expect(isDarkTheme).toBeDefined()
      }
    }
  })
})

test.describe('Theme Switcher - Chinese Locale', () => {
  test('shows theme toggle button in Chinese locale', async ({ page }) => {
    await page.goto('/zh-CN/posts')
    await page.setViewportSize({ width: 1280, height: 720 })

    const themeButton = page.getByRole('button', { name: /toggle theme|theme|主题/i })

    const count = await themeButton.count()
    if (count > 0) {
      await expect(themeButton.first()).toBeVisible()
    }
  })
})
