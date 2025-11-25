import { expect, test } from '@playwright/test'

test.describe('i18n - Language Switching', () => {
  test('default locale (en-US) has no prefix in URL', async ({ page }) => {
    await page.goto('/')

    // 默认语言应该没有 locale 前缀
    await expect(page).toHaveURL(/^\/$|^\/[^z]/)

    // 验证 HTML lang 属性
    const html = page.locator('html')
    await expect(html).toHaveAttribute('lang', 'en-US')
  })

  test('can switch to Chinese (zh-CN)', async ({ page }) => {
    await page.goto('/')

    // 打开语言切换器
    const languageSwitcher = page.getByRole('button', { name: /select language/i })
    await languageSwitcher.click()

    // 选择中文
    await page.getByRole('menuitemradio', { name: /中文/ }).click()

    // 验证 URL 包含 zh-CN 前缀
    await expect(page).toHaveURL(/\/zh-CN/)

    // 验证 HTML lang 属性
    const html = page.locator('html')
    await expect(html).toHaveAttribute('lang', 'zh-CN')
  })

  test('can switch back to English from Chinese', async ({ page }) => {
    // 先访问中文页面
    await page.goto('/zh-CN')
    await expect(page.locator('html')).toHaveAttribute('lang', 'zh-CN')

    // 打开语言切换器
    const languageSwitcher = page.getByRole('button', { name: /select language/i })
    await languageSwitcher.click()

    // 选择英文
    await page.getByRole('menuitemradio', { name: /English/i }).click()

    // 验证 URL 没有 zh-CN 前缀
    await expect(page).toHaveURL(/^\/$/)

    // 验证 HTML lang 属性
    const html = page.locator('html')
    await expect(html).toHaveAttribute('lang', 'en-US')
  })

  test('maintains current path when switching language', async ({ page }) => {
    // 访问 posts 页面
    await page.goto('/posts')

    // 切换到中文
    const languageSwitcher = page.getByRole('button', { name: /select language/i })
    await languageSwitcher.click()
    await page.getByRole('menuitemradio', { name: /中文/ }).click()

    // 验证仍在 posts 页面，但 URL 有 zh-CN 前缀
    await expect(page).toHaveURL(/\/zh-CN\/posts/)
  })
})

test.describe('i18n - Multilingual Routes', () => {
  test('English posts page is accessible', async ({ page }) => {
    await page.goto('/posts')
    await expect(page).toHaveTitle(/Posts/i)
  })

  test('Chinese posts page is accessible', async ({ page }) => {
    await page.goto('/zh-CN/posts')
    await expect(page).toHaveTitle(/文章|Posts/i)
  })

  test('English about page is accessible', async ({ page }) => {
    await page.goto('/about')
    await expect(page).toHaveTitle(/About/i)
  })

  test('Chinese about page is accessible', async ({ page }) => {
    await page.goto('/zh-CN/about')
    await expect(page).toHaveTitle(/关于|About/i)
  })
})
