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
    <nav id="sidebar" class="left m l scroll">
        <header>
            <h6 class="max">DMS</h6>
            <button
                type="button"
                class="extend square round"
                @click="() => router.push('/add')"
            >
                <i>add</i>
                <span>新增</span>
            </button>
        </header>

        <a
            @click="() => router.push('/')"
            :class="route.fullPath == '/' ? 'active' : ''"
        >
            <i>dashboard</i>
            <span>Overview</span>
        </a>
        <a
            :class="route.fullPath == '/export' ? 'active' : ''"
            @click="() => router.push('/export')"
        >
            <i>file_export</i>
            <span>Export</span>
        </a>
    </nav>

    <!-- 3. MOBILE BOTTOM BAR (s) -->
    <nav class="bottom s">
        <a
            @click="() => router.push('/')"
            :class="route.fullPath == '/' ? 'active' : ''"
        >
            <i>dashboard</i>
            <span>Overview</span>
        </a>
        <button
            type="button"
            class="extend square round"
            @click="() => router.push('/add')"
        >
            <i>add</i>
            <span>新增</span>
        </button>
        <a
            :class="route.fullPath == '/export' ? 'active' : ''"
            @click="() => router.push('/export')"
        >
            <i>file_export</i>
            <span>Export</span>
        </a>
    </nav>
    <main style="padding: 8px; width: 100%">
        <EditDialog />
        <slot></slot>
    </main>
</template>
