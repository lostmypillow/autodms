<script setup lang="ts">
import { store } from '../store.js'
import { ref } from 'vue'
import { useSortable } from '@dnd-kit/vue/sortable'

const props = defineProps({
    id: {
        type: String,
        required: true,
    },
    index: {
        type: Number,
        required: true,
    },
    group: {
        type: String,
        default: undefined,
    },
    orderKey: {
        type: String,
        required: true,
    },
    data: {
        type: Object,
        required: true,
    },
})

const handleEdit = (PK: string) => {
    console.log(`To edit PK of ${PK}`)
    console.log(store.data.filter((x: any) => x.PK === PK)[0])
    store.setCurrentlyEditing(PK)
    store.isDialogOpen = !store.isDialogOpen
}
const element = ref(null)

const { isDragging, isDropTarget } = useSortable({
    id: () => props.id,
    index: () => props.index,
    group: () => props.group,
    element,
})
const handleDelete = async (sk, pk) => await store.sendDelete(sk, pk)
</script>
<template>
    <article
        ref="element"
        style="grid-column: span 1"
        :style="{
            touchAction: 'none',
            cursor: isDragging ? 'grabbing' : 'grab',
            boxShadow: isDragging ? '0 12px 24px rgba(0,0,0,0.35)' : 'none',
            opacity: isDragging ? 0.6 : 1,
        }"
        :id="data.PK || data.id"
    >
        <p style="font-weight: bold; position: relative">
            <span
                style="
                    text-overflow: ellipsis;
                    overflow: hidden;
                    white-space: nowrap;
                    display: block;
                "
            >
                {{ data.title }}
            </span>
            <ins class="tooltip right">{{ data.title }}</ins>
        </p>

        <p>{{ data.date }}</p>
        <p>{{ data.source + ' / ' + data.author }}</p>
        <nav class="group" style="width: 100%; justify-content: space-between">
            <button @click="handleEdit(data.PK)" class="primary">
                <i>edit</i>
                <span>編輯</span>
            </button>
            <button
                :loading="store.isLoading"
                @click="handleDelete(data.SK, data.PK)"
                class="border"
            >
                <i>delete_forever</i>
            </button>
        </nav>
    </article>
</template>
<style lang="css" scoped>
article {
    min-width: 0; /* Crucial for nested grids/flexboxes */
    overflow-wrap: anywhere; /* Breaks long URLs or unbroken words */
}

/* Prevent images/media from pushing parent width */
article img,
article video {
    max-width: 100%;
    height: auto;
}
</style>
