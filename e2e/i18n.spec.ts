import { expect, test } from '@playwright/test'

test.describe('i18n - Default Locale', () => {
  test('default locale (en-US) has locale prefix in URL', async ({ page }) => {
    await page.goto('/')
    await expect(page).toHaveURL(/\/en-US/)

    const html = page.locator('html')
    await expect(html).toHaveAttribute('lang', 'en-US')
  })

  test('Chinese locale(zh-CN) has locale prefix in URL', async ({ page }) => {
    await page.goto('/zh-CN')
    await expect(page).toHaveURL(/\/zh-CN/)

    const html = page.locator('html')
    await expect(html).toHaveAttribute('lang', 'zh-CN')
  })
})

test.describe('i18n - Multilingual Routes', () => {
  test('English posts page is accessible', async ({ page }) => {
    await page.goto('/posts')
    await expect(page).toHaveTitle(/Posts/)
  })

  test('Chinese posts page is accessible', async ({ page }) => {
    await page.goto('/zh-CN/posts')
    await expect(page).toHaveTitle(/文章/)
  })

  test('English about page is accessible', async ({ page }) => {
    await page.goto('/about')
    await expect(page).toHaveTitle(/About/)
  })

  test('Chinese about page is accessible', async ({ page }) => {
    await page.goto('/zh-CN/about')
    await expect(page).toHaveTitle(/关于/)
  })
})
