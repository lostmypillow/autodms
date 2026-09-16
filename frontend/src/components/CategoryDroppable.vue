<script setup lang="ts">
import { ref } from 'vue'
import { useDroppable } from '@dnd-kit/vue'

const props = defineProps({
    category: {
        type: String,
        required: true,
    },
    count: {
        type: Number,
        default: 0,
    },
})

const element = ref(null)

const { isDropTarget } = useDroppable({
    id: () => props.category,
    element,
})
</script>

<template>
    <div
        ref="element"
        :style="{
            minHeight: '600px',
            border: isDropTarget ? '2px dashed currentColor' : '1px dashed currentColor',
            backgroundColor: isDropTarget
                ? 'rgba(99, 102, 241, 0.08)'
                : 'rgba(241, 245, 249, 0.02)',
            borderRadius: '8px',
            padding: '8px',
            boxSizing: 'border-box',
            display: 'flex',
            flexDirection: 'column',
            gap: '12px',
        }"
    >
        <slot></slot>
    </div>
</template>

<style scoped></style>
