<script setup>
import Cards from './Cards.vue'
import { defineProps } from 'vue'
import { store } from './store.js'
const props = defineProps(['category'])
</script>
<template>
    <div class="h-full flex flex-col gap-6 items-center justify-start p-6">
        <Cards :category="props.category" />

    </div>
</template>
