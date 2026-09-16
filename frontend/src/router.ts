import { createMemoryHistory, createRouter } from 'vue-router'
import AddView from './pages/AddView.vue'
import HomeView from './pages/HomeView.vue'
import ExportView from './pages/ExportView.vue'
const routes = [
    { path: '/', component: HomeView, name: 'overview' },
    { path: '/add', component: AddView, name: 'add' },
    { path: '/export', component: ExportView, name: 'export' },
]

export const router = createRouter({
    history: createMemoryHistory(),
    routes,
})
