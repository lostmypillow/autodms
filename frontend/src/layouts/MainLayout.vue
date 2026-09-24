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

    <header
        class="no-wrap"
        style="
            display: flex;
            justify-content: space-between;
            align-items: center;
            width: 100%;
            padding-inline: 8px;
        "
    >
        <h4 class="no-margin" style="font-weight: bolder">AutoDMS</h4>

        <nav id="sidebar" class="tabbed" style="width: auto; margin-left: auto">
            <a
                :class="route.fullPath == '/' ? 'active' : ''"
                @click="() => router.push('/')"
            >
                <i>home</i>
                <span>主頁</span>
            </a>
            <a
                :class="route.fullPath == '/add' ? 'active' : ''"
                @click="() => router.push('/add')"
            >
                <i>add</i>
                <span>新增</span>
            </a>

            <a
                :class="route.fullPath == '/export' ? 'active' : ''"
                @click="() => router.push('/export')"
            >
                <i>file_export</i>
                <span>輸出</span>
            </a>
        </nav>
    </header>
    <!-- 3. MOBILE BOTTOM BAR (s) -->

    <main style="padding: 8px; width: 100%">
        <EditDialog />
        <slot></slot>
    </main>
</template>
