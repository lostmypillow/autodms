import { test, expect } from '@playwright/test'

test.describe('Navigation and Layout E2E Tests', () => {
    test('should load the homepage and display brand header', async ({ page }) => {
        await page.goto('/')
        await expect(page.locator('h4')).toContainText('AutoDMS')
        await expect(page.locator('nav#sidebar')).toBeVisible()
    })

    test('should navigate between Overview, Add, and Export views', async ({ page }) => {
        await page.goto('/')
        await page.locator('nav#sidebar a', { hasText: '新增' }).click()
        await expect(page.locator('h6')).toContainText('Manual Import')
        await expect(
            page.locator('label:visible', { hasText: '連結' })
        ).toBeVisible()
        await page.locator('nav#sidebar a', { hasText: '輸出' }).click()
        await expect(page.locator('nav#sidebar a.active')).toContainText('輸出')
        await page.locator('nav#sidebar a', { hasText: '主頁' }).click()
        await expect(page.locator('nav#sidebar a.active')).toContainText('主頁')
    })
})
