<script setup lang="ts">
import { store } from '../store.js'
import { onMounted, nextTick } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import EditDialog from '../components/EditDialog.vue'
const route = useRoute()
const router = useRouter()

onMounted(() => {
    nextTick(() => {
        if (window.ui) window.ui()
    })
})
</script>
<template>
    <!-- 2. DESKTOP / TABLET SIDEBAR (m l)-->

    <header>
        <nav id="sidebar">
            <h6 class="max" style="font-weight: bolder">DMS</h6>
            <button :class="route.fullPath == '/' ? '' : 'transparent'"  @click="() => router.push('/')">
                <i>home</i>
                <span>主頁</span>
            </button>
            <button :class="route.fullPath == '/add' ? '' : 'transparent'"  @click="() => router.push('/add')">
                <i>add</i>
                <span>新增</span>
            </button>

            <button :class="route.fullPath == '/export' ? '' : 'transparent'"  @click="() => router.push('/export')">
                <i>file_export</i>
                <span>輸出</span>
            </button>
        </nav>
    </header>
    <!-- 3. MOBILE BOTTOM BAR (s) -->

    <main style="padding: 8px; width: 100%">
        <EditDialog />
        <slot></slot>
    </main>
</template>
