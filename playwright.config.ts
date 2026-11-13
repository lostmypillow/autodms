import { defineConfig, devices } from '@playwright/test'

export default defineConfig({
    testDir: './e2e',
    fullyParallel: true,
    forbidOnly: !!process.env.CI,
    retries: process.env.CI ? 2 : 0,
    workers: 1,
    reporter: 'list',
    use: {
        baseURL: process.env.E2E_URL || 'http://localhost:5173',
        trace: 'on-first-retry',
        ignoreHTTPSErrors: true,
    },
    projects: [
        {
            name: 'chromium',
            use: { ...devices['Desktop Chrome'],
                launchOptions: {
                    args: [
                        '--host-resolver-rules=MAP dms-dev.lostmypillow.com 192.168.50.2',
                    ],
                },},

        },
    ],
})
