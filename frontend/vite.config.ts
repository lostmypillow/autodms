import vue from '@vitejs/plugin-vue'
import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'
import * as path from 'node:path'
// https://vite.dev/config/
export default defineConfig({
    plugins: [tailwindcss(), vue()],
    envDir: path.resolve(__dirname, '..'),
    resolve: {
        alias: {
            shared: path.resolve(__dirname, '../shared'),
        },
    }
})
