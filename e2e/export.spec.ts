import { test, expect } from '@playwright/test'

test.describe('Export View E2E Tests', () => {
    test('should navigate to export view and render export controls', async ({ page }) => {
        await page.goto('/')
        await page.locator('nav#sidebar a', { hasText: '輸出' }).click()
        await expect(page.locator('nav#sidebar a.active')).toContainText('輸出')
    })
})
