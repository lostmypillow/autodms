import { defineConfig } from 'vitest/config'
import path from 'path'

export default defineConfig({
    test: {
        include: ['shared/test/**/*.test.ts', 'extension/test/**/*.test.ts'],
        testTimeout: 25000,
        exclude: [
            '**/node_modules/**',
            '**/dist/**',
            'api/aws/legacy/**',
            'shared/assets/**',
        ],
        coverage: {
            exclude: ['**/shared/assets/**'],
        },
    },
    resolve: {
        alias: {
            shared: path.resolve(__dirname, './shared/index.ts'),
        },
    },
})
