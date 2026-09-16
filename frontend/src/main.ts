import { createApp } from 'vue'
import ui from 'beercss' // Import the default function export
import 'material-dynamic-colors'
import './style.css'
import App from './App.vue'
import { router } from './router.ts'
// Make ui accessible across components and window
window.ui = ui

const app = createApp(App)
app.config.globalProperties.$ui = ui
ui('mode', 'light')
app.use(router).mount('#app')
