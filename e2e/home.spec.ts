import { expect, test } from '@playwright/test'

test('has title', async ({ page }) => {
  await page.goto('/')
  await expect(page).toHaveTitle(/Sabertaz Blog/)
})

test('get gravity stars background ', async ({ page }) => {
  await page.goto('/')
})

test('get morphing text', async ({ page }) => {
  await page.goto('/')
})

test('get navigation links', async ({ page }) => {
  await page.goto('/')
})
