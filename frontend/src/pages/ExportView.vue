<script setup lang="ts">
import { saveAs } from 'file-saver'

async function exportDocx() {
    try {
        const getDoc = await fetch(
            `${import.meta.env.VITE_API_ENDPOINT}/export/${new Date().toISOString().split('T')[0]}`
        )
        saveAs(
            await getDoc.blob(),
            getDoc.headers
                .get('content-disposition')
                ?.split(';')[1]
                .replaceAll('"', '')
                .split('=')[1] ?? 'download.docx'
        )
    } catch (error) {
        console.error('Error handling document generation and patching:', error)
    }
}
</script>
<template>
    <button @click="exportDocx" rounded="xl" color="primary">
        Export to DOCX
    </button>
</template>
