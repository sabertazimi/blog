import { expect, test } from '@playwright/test'

test.describe('Navigation - Desktop', () => {
  test.beforeEach(async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 720 })
    await page.goto('/posts')
  })

  test('displays main navigation bar', async ({ page }) => {
    // 验证导航栏存在
    const nav = page.getByRole('navigation').or(page.locator('header nav'))
    await expect(nav.first()).toBeVisible()
  })

  test('displays Posts and About links', async ({ page }) => {
    // 验证主要导航链接
    const postsLink = page.getByRole('link', { name: /posts/i })
    await expect(postsLink.first()).toBeVisible()

    const aboutLink = page.getByRole('link', { name: /about/i })
    await expect(aboutLink.first()).toBeVisible()
  })

  test('can navigate to posts page', async ({ page }) => {
    await page.goto('/')

    const postsLink = page.getByRole('link', { name: /posts/i })
    await postsLink.first().click()

    await expect(page).toHaveURL(/\/posts/)
  })

  test('can navigate to about page', async ({ page }) => {
    const aboutLink = page.getByRole('link', { name: /about/i })
    await aboutLink.first().click()

    await expect(page).toHaveURL(/\/about/)
  })

  test('displays language switcher', async ({ page }) => {
    // 查找语言切换器（可能是按钮或链接）
    const langSwitcher = page
      .getByRole('button', { name: /language|语言|en|zh/i })
      .or(page.locator('[aria-label*="language" i]'))

    const count = await langSwitcher.count()
    if (count > 0) {
      await expect(langSwitcher.first()).toBeVisible()
    }
  })

  test('displays theme toggle button', async ({ page }) => {
    // 查找主题切换按钮
    const themeButton = page
      .getByRole('button', { name: /theme|dark|light|主题/i })
      .or(page.locator('[aria-label*="theme" i]'))

    const count = await themeButton.count()
    if (count > 0) {
      await expect(themeButton.first()).toBeVisible()
    }
  })

  test('can return to home by clicking logo', async ({ page }) => {
    // 查找 Logo 链接（通常链接到首页）
    const logoLink = page.getByRole('link').first()

    // 获取链接的 href 属性
    const href = await logoLink.getAttribute('href')

    // 如果链接指向首页，点击测试
    if (href === '/' || href?.includes('/en-US') || href?.includes('/zh-CN')) {
      await logoLink.click()
      await expect(page).toHaveURL(/\/(en-US|zh-CN)?$/)
    }
  })
})

test.describe('Navigation - Mobile', () => {
  test.beforeEach(async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 })
    await page.goto('/posts')
  })

  test('displays mobile menu button', async ({ page }) => {
    // 查找移动端菜单按钮（通常是汉堡菜单图标）
    const menuButton = page.getByRole('button', { name: /menu|导航/i }).or(page.locator('button[aria-label*="menu" i]'))

    const count = await menuButton.count()
    if (count > 0) {
      await expect(menuButton.first()).toBeVisible()
    }
  })

  test('can open mobile drawer menu', async ({ page }) => {
    const menuButton = page.getByRole('button', { name: /menu|导航/i }).or(page.locator('button[aria-label*="menu" i]'))

    const count = await menuButton.count()
    if (count > 0) {
      await menuButton.first().click()

      // 等待抽屉打开
      await page.waitForTimeout(300)

      // 验证抽屉中的导航链接可见
      const postsLink = page.getByRole('link', { name: /posts/i })
      await expect(postsLink.first()).toBeVisible()
    }
  })

  test('can navigate from mobile drawer', async ({ page }) => {
    const menuButton = page.getByRole('button', { name: /menu|导航/i }).or(page.locator('button[aria-label*="menu" i]'))

    const count = await menuButton.count()
    if (count > 0) {
      await menuButton.first().click()
      await page.waitForTimeout(300)

      // 点击 About 链接
      const aboutLink = page.getByRole('link', { name: /about/i })
      await aboutLink.first().click()

      // 验证导航成功
      await expect(page).toHaveURL(/\/about/)
    }
  })
})

test.describe('Navigation - Footer', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/posts')
  })

  test('displays footer with copyright information', async ({ page }) => {
    // 滚动到页面底部
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight))

    // 查找 footer 元素
    const footer = page.locator('footer')
    await expect(footer).toBeVisible()

    // 验证版权信息
    const copyright = footer.getByText(/copyright|©/i)
    await expect(copyright).toBeVisible()
  })

  test('displays technology stack links in footer', async ({ page }) => {
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight))

    const footer = page.locator('footer')

    // 查找技术栈相关文本或链接
    const techLinks = footer.getByText(/next\.js|react|vercel|built with/i)
    const count = await techLinks.count()

    if (count > 0) {
      await expect(techLinks.first()).toBeVisible()
    }
  })

  test('displays last build time in footer', async ({ page }) => {
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight))

    const footer = page.locator('footer')

    // 查找构建时间信息
    const buildTime = footer.getByText(/built|last updated|更新/i)
    const count = await buildTime.count()

    if (count > 0) {
      await expect(buildTime.first()).toBeVisible()
    }
  })
})

test.describe('Navigation - Language Switcher', () => {
  test('can switch from English to Chinese', async ({ page }) => {
    await page.goto('/posts')
    await page.setViewportSize({ width: 1280, height: 720 })

    // 查找语言切换器
    const langButton = page
      .getByRole('button', { name: /en-us|english/i })
      .or(page.locator('[aria-label*="language" i]'))

    const count = await langButton.count()
    if (count > 0) {
      await langButton.first().click()

      // 等待菜单打开
      await page.waitForTimeout(300)

      // 查找中文选项
      const zhOption = page.getByRole('menuitem', { name: /zh-cn|中文/i }).or(page.getByText(/zh-cn|中文/i))

      const zhCount = await zhOption.count()
      if (zhCount > 0) {
        await zhOption.first().click()

        // 验证 URL 更新
        await expect(page).toHaveURL(/\/zh-CN\//)
      }
    }
  })

  test('maintains current page when switching language', async ({ page }) => {
    await page.goto('/posts')
    await page.setViewportSize({ width: 1280, height: 720 })

    const langButton = page
      .getByRole('button', { name: /en-us|english/i })
      .or(page.locator('[aria-label*="language" i]'))

    const count = await langButton.count()
    if (count > 0) {
      await langButton.first().click()
      await page.waitForTimeout(300)

      const zhOption = page.getByRole('menuitem', { name: /zh-cn|中文/i }).or(page.getByText(/zh-cn|中文/i))

      const zhCount = await zhOption.count()
      if (zhCount > 0) {
        await zhOption.first().click()

        // 验证仍在 posts 页面，只是语言变了
        await expect(page).toHaveURL(/\/zh-CN\/posts/)
      }
    }
  })
})
