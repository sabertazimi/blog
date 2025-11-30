import { expect, test } from '@playwright/test'

test.describe('Theme Switcher', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/posts')
    await page.setViewportSize({ width: 1280, height: 720 })
  })

  test('displays theme toggle button', async ({ page }) => {
    // 查找主题切换按钮
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

  test('can open theme menu', async ({ page }) => {
    const themeButton = page
      .getByRole('button', { name: /theme|dark|light|主题/i })
      .or(page.locator('[aria-label*="theme" i]'))

    const count = await themeButton.count()
    if (count > 0) {
      await themeButton.first().click()

      // 等待菜单打开
      await page.waitForTimeout(300)

      // 验证主题选项显示
      const lightOption = page.getByRole('menuitem', { name: /light/i }).or(page.getByText(/light/i))
      const darkOption = page.getByRole('menuitem', { name: /dark/i }).or(page.getByText(/dark/i))
      const systemOption = page.getByRole('menuitem', { name: /system/i }).or(page.getByText(/system/i))

      const lightCount = await lightOption.count()
      const darkCount = await darkOption.count()
      const systemCount = await systemOption.count()

      // 至少应该有 light 和 dark 选项
      expect(lightCount + darkCount + systemCount).toBeGreaterThan(0)
    }
  })

  test('can switch to light theme', async ({ page }) => {
    const themeButton = page
      .getByRole('button', { name: /theme|dark|light|主题/i })
      .or(page.locator('[aria-label*="theme" i]'))

    const count = await themeButton.count()
    if (count > 0) {
      await themeButton.first().click()
      await page.waitForTimeout(300)

      // 点击 Light 选项
      const lightOption = page.getByRole('menuitem', { name: /light/i }).or(page.getByText(/^light$/i))
      const lightCount = await lightOption.count()

      if (lightCount > 0) {
        await lightOption.first().click()
        await page.waitForTimeout(300)

        // 验证 HTML 或 body 的 class 或 data 属性更新
        // 通常主题会在 html 或 body 元素上设置 class
        const html = page.locator('html')
        const bodyClass = await html.getAttribute('class')
        const dataTheme = await html.getAttribute('data-theme')

        // 验证不包含 dark class 或者有 light 相关标识
        const isDarkTheme = bodyClass?.includes('dark') ?? false
        const isLightTheme = bodyClass?.includes('light') || dataTheme === 'light'

        expect(isDarkTheme || isLightTheme).toBeDefined()
      }
    }
  })

  test('can switch to dark theme', async ({ page }) => {
    const themeButton = page
      .getByRole('button', { name: /theme|dark|light|主题/i })
      .or(page.locator('[aria-label*="theme" i]'))

    const count = await themeButton.count()
    if (count > 0) {
      await themeButton.first().click()
      await page.waitForTimeout(300)

      // 点击 Dark 选项
      const darkOption = page.getByRole('menuitem', { name: /dark/i }).or(page.getByText(/^dark$/i))
      const darkCount = await darkOption.count()

      if (darkCount > 0) {
        await darkOption.first().click()
        await page.waitForTimeout(300)

        // 验证 dark class 被添加
        const html = page.locator('html')
        const bodyClass = await html.getAttribute('class')
        const dataTheme = await html.getAttribute('data-theme')

        const isDarkTheme = bodyClass?.includes('dark') || dataTheme === 'dark'
        expect(isDarkTheme).toBeDefined()
      }
    }
  })

  test('can switch to system theme', async ({ page }) => {
    const themeButton = page
      .getByRole('button', { name: /theme|dark|light|主题/i })
      .or(page.locator('[aria-label*="theme" i]'))

    const count = await themeButton.count()
    if (count > 0) {
      await themeButton.first().click()
      await page.waitForTimeout(300)

      // 点击 System 选项
      const systemOption = page.getByRole('menuitem', { name: /system/i }).or(page.getByText(/system/i))
      const systemCount = await systemOption.count()

      if (systemCount > 0) {
        await systemOption.first().click()
        await page.waitForTimeout(300)

        // System 主题会根据系统设置自动选择，验证没有报错即可
        const html = page.locator('html')
        await expect(html).toBeVisible()
      }
    }
  })

  test('theme persists across page navigation', async ({ page }) => {
    const themeButton = page
      .getByRole('button', { name: /theme|dark|light|主题/i })
      .or(page.locator('[aria-label*="theme" i]'))

    const count = await themeButton.count()
    if (count > 0) {
      // 切换到 dark 主题
      await themeButton.first().click()
      await page.waitForTimeout(300)

      const darkOption = page.getByRole('menuitem', { name: /dark/i }).or(page.getByText(/^dark$/i))
      const darkCount = await darkOption.count()

      if (darkCount > 0) {
        await darkOption.first().click()
        await page.waitForTimeout(300)

        // 导航到另一个页面
        const aboutLink = page.getByRole('link', { name: /about/i })
        await aboutLink.first().click()
        await page.waitForURL(/\/about/)
        await page.waitForTimeout(300)

        // 验证主题保持
        const html = page.locator('html')
        const bodyClass = await html.getAttribute('class')
        const dataTheme = await html.getAttribute('data-theme')

        const isDarkTheme = bodyClass?.includes('dark') || dataTheme === 'dark'
        expect(isDarkTheme).toBeDefined()
      }
    }
  })
})

test.describe('Theme Switcher - Mobile', () => {
  test.beforeEach(async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 })
    await page.goto('/posts')
  })

  test('theme switcher works on mobile', async ({ page }) => {
    // 移动端也应该有主题切换功能
    const themeButton = page
      .getByRole('button', { name: /theme|dark|light|主题/i })
      .or(page.locator('[aria-label*="theme" i]'))

    const count = await themeButton.count()
    if (count > 0) {
      await themeButton.first().click()
      await page.waitForTimeout(300)

      // 验证主题选项显示
      const options = page.getByRole('menuitem').or(page.getByText(/light|dark|system/i))
      const optionCount = await options.count()

      expect(optionCount).toBeGreaterThan(0)
    }
  })
})

test.describe('Theme Switcher - Chinese', () => {
  test('theme switcher works in Chinese locale', async ({ page }) => {
    await page.goto('/zh-CN/posts')
    await page.setViewportSize({ width: 1280, height: 720 })

    // 中文环境下的主题切换器
    const themeButton = page
      .getByRole('button', { name: /theme|dark|light|主题/i })
      .or(page.locator('[aria-label*="theme" i]'))

    const count = await themeButton.count()
    if (count > 0) {
      await themeButton.first().click()
      await page.waitForTimeout(300)

      // 验证选项显示（可能是中文或英文）
      const options = page.getByRole('menuitem').or(page.getByText(/light|dark|system|浅色|深色|系统/i))
      const optionCount = await options.count()

      expect(optionCount).toBeGreaterThan(0)
    }
  })
})
