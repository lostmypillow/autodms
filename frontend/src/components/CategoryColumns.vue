<script setup lang="ts">
import { store } from '../store.js'
import OverviewCard from './OverviewCard.vue'
import { DragDropProvider, DragOverlay } from '@dnd-kit/vue'
import { generateKeyBetween } from 'fractional-indexing'
import CategoryDroppable from './CategoryDroppable.vue'
import { ref } from 'vue'
import axios from 'axios'

const responseFromApi = ref()

function onDragEnd(event: any) {
        responseFromApi.value = ''

    console.log('[@dragEnd] Drag ended:', {
        event,
        canceled: event.canceled,
        source: event.operation?.source,
        target: event.operation?.target,
    })

    if (event.canceled) return
    const { source, target } = event.operation || {}
    if (!source || !target) return

    const sourceId = source.id
    const targetCategory = target.group || target.id
    if (!targetCategory) return

    const targetItems = store.data
        .filter(
            (item: any) =>
                item.category === targetCategory &&
                (item.id || item.PK) !== sourceId
        )
        .sort((a, b) => (a.orderKey  < b.orderKey ? -1 : a.orderKey  > b.orderKey  ? 1 : 0))

    function getNewOrderKey(targetIndex: number) {
        if (targetItems.length === 0) {
            return generateKeyBetween(null, null)
        }
        const prevItem = targetIndex > 0 ? targetItems[targetIndex - 1] : null
        const nextItem =
            targetIndex < targetItems.length ? targetItems[targetIndex] : null
        const prevKey = prevItem ? prevItem.orderKey || null : null
        const nextKey = nextItem ? nextItem.orderKey || null : null
        console.log(`Generating key between previous key of ${prevKey} and next key of ${nextKey}`)
        return generateKeyBetween(prevKey, nextKey)
    }

    const destIndex =
        typeof target.index === 'number' ? target.index : targetItems.length

    const movedItem = store.data.find(
        (x: any) => (x.id || x.PK) === sourceId
    )
    if (movedItem) {
        movedItem.orderKey = getNewOrderKey(destIndex)
        movedItem.category = targetCategory
        console.log('changedObject', movedItem)
        axios.post(`http://${import.meta.env.VITE_API_ENDPOINT}/update`, movedItem).then((response) => {
                console.log(response.data)
                 ui('#snackbar')
            }).catch((e) => {
                console.error(e)
                ui('#error-snackbar')
            })
    }

  
           
  
}
</script>

<template>
     <div class="snackbar primary top" id="snackbar">
        <span>{{ responseFromApi }}</span>
    </div>

    <div id="error-snackbar" class="snackbar error top">
        {{ responseFromApi }}
    </div>
    <DragDropProvider @dragEnd="onDragEnd">
        <div
            style="
                grid-column: 1 / -1;
                display: grid;
                grid-template-columns: repeat(5, minmax(0, 1fr));
                gap: 1rem;
                align-items: start;
            "
        >
            <CategoryDroppable
                v-for="x in store.compoundCategories"
                :category="x.value"
                :key="x.value"
                :id="x.value"
                :count="store.data.filter((y: any) => y.category === x.value).length"
            >
                <OverviewCard
                    v-for="(item, index) in store.data
                        .filter((y: any) => y.category == x.value)
                        .sort((a, b) => (a.orderKey  < b.orderKey ? -1 : a.orderKey  > b.orderKey  ? 1 : 0))"
                    :key="item.id || item.PK"
                    :id="item.id || item.PK"
                    :index="index"
                    :group="x.value"
                    :data="item"
                    :order-key="item.orderKey || ''"
                />
            </CategoryDroppable>
        </div>

            <DragOverlay  :drop-animation="null">
        <template #default="{ source }">
            <OverviewCard
                v-if="source"
                :data="store.data.find(x => (x.id || x.PK) === source.id)"
                :id="source.id"
                :index="-1"
                :order-key="''"
            />
        </template>
    </DragOverlay>
    </DragDropProvider>
</template>

<style scoped></style>
