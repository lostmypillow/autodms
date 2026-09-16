<script setup lang="ts">
import { exportDocx } from '../lib/generateDocx.ts'
</script>
<template>
    <button @click="exportDocx" rounded="xl" color="primary">
        Export to DOCX
    </button>
</template>
